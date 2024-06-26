"use client";
import React, { useState } from "react";
import Web3 from "web3";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { formatAddress, formatBalance, formatChainAsNum } from "../utils";

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wallets Detected:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <button
              key={provider.info.uuid}
              onClick={() => handleConnect(provider)}
              className="wallet-button p-4 border rounded-lg hover:bg-gray-100"
            >
              <img
                src={provider.info.icon}
                alt={provider.info.name}
                className="wallet-icon w-12 h-12 mb-2"
              />
              <div className="font-medium">{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
      <hr className="my-4" />
      <h2 className="text-2xl font-bold mb-4">
        {userAccount ? "Selected Wallet" : "No Wallet Selected"}
      </h2>
      {userAccount && selectedWallet && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src={selectedWallet.info.icon}
              alt={selectedWallet.info.name}
              className="wallet-icon w-12 h-12 mr-4"
            />
            <div>
              <div className="font-medium text-lg">
                {selectedWallet.info.name}
              </div>
              <div className="text-sm text-gray-600">
                Address: {formatAddress(userAccount)}
              </div>
              <div className="text-sm text-gray-600">
                Balance: {balance} ETH
              </div>
              <div className="text-sm text-gray-600">Chain ID: {chainId}</div>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="disconnect-button bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mr-2"
          >
            Disconnect
          </button>
          <button
            onClick={handleRevokePermissions}
            className="revoke-button bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Switch Account
          </button>
        </div>
      )}
    </div>
  );
};
