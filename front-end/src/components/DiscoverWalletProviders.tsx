import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { formatAddress, formatBalance, formatChainAsNum } from "../utils";
import { EIP6963ProviderDetail } from "../types";

export const DiscoverWalletProviders: React.FC = () => {
  const [selectedWallet, setSelectedWallet] =
    useState<EIP6963ProviderDetail | null>(null);
  const [userAccount, setUserAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [chainId, setChainId] = useState<number | null>(null);
  const providers = useSyncProviders();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts[0]);

      const web3 = new Web3(providerWithInfo.provider);

      // Fetch balance
      const rawBalance = await web3.eth.getBalance(accounts[0]);
      setBalance(formatBalance(rawBalance));

      // Fetch chain ID
      const chainIdHex = await web3.eth.getChainId();
      setChainId(formatChainAsNum(chainIdHex.toString(16)));

      // Listen for account changes
      providerWithInfo.provider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setUserAccount(accounts[0]);
          web3.eth.getBalance(accounts[0]).then((balance) => {
            setBalance(formatBalance(balance));
          });
        } else {
          handleDisconnect();
        }
      });

      // Listen for chain changes
      providerWithInfo.provider.on("chainChanged", (chainIdHex: string) => {
        setChainId(formatChainAsNum(chainIdHex));
      });
    } catch (error) {
      console.error("Failed to connect to provider:", error);
    }
  };

  const handleDisconnect = async () => {
    setSelectedWallet(null);
    setUserAccount("");
    setBalance("");
    setChainId(null);
  };

  const handleRevokePermissions = async () => {
    if (!selectedWallet || !userAccount) return;

    try {
      await selectedWallet.provider.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      // Revoke permissions for the connected account
      await selectedWallet.provider.request({
        method: "wallet_removePermissions",
        params: [{ eth_accounts: {} }],
      });

      handleDisconnect();
    } catch (error) {
      console.error("Failed to switch account:", error);
    }
  };

  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {providers.length > 0 ? (
          providers.map((provider) => (
            <button
              key={provider.info.uuid}
              onClick={() => handleConnect(provider)}
              className="wallet-button"
            >
              <img
                src={provider.info.icon}
                alt={provider.info.name}
                className="wallet-icon"
              />
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
      <hr />
      <h2>{userAccount ? "Selected Wallet " : "No Wallet Selected"}</h2>
      {userAccount && selectedWallet && (
        <div>
          <div>
            <img
              src={selectedWallet.info.icon}
              alt={selectedWallet.info.name}
              className="wallet-icon"
            />
            <div>{selectedWallet.info.name}</div>
            <div>Address: {formatAddress(userAccount)}</div>
            <div>Balance: {balance} ETH</div>
            <div>Chain ID: {chainId}</div>
            <button onClick={handleDisconnect} className="disconnect-button">
              Disconnect
            </button>
            <button onClick={handleRevokePermissions} className="revoke-button">
              Switch Account
            </button>
          </div>
        </div>
      )}
    </>
  );
};
