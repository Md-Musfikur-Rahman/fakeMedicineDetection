"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface WalletContextProps {
  selectedWallet: EIP6963ProviderDetail | null;
  userAccount: string;
  balance: string;
  chainId: number | null;
  setSelectedWallet: (wallet: EIP6963ProviderDetail | null) => void;
  setUserAccount: (account: string) => void;
  setBalance: (balance: string) => void;
  setChainId: (chainId: number | null) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedWallet, setSelectedWallet] =
    useState<EIP6963ProviderDetail | null>(null);
  const [userAccount, setUserAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    const savedWallet = localStorage.getItem("selectedWallet");
    const savedAccount = localStorage.getItem("userAccount");
    const savedBalance = localStorage.getItem("balance");
    const savedChainId = localStorage.getItem("chainId");

    if (savedWallet && savedAccount && savedBalance && savedChainId) {
      setSelectedWallet(JSON.parse(savedWallet));
      setUserAccount(savedAccount);
      setBalance(savedBalance);
      setChainId(Number(savedChainId));
    }
  }, []);

  useEffect(() => {
    if (selectedWallet && userAccount && balance && chainId !== null) {
      localStorage.setItem("selectedWallet", JSON.stringify(selectedWallet));
      localStorage.setItem("userAccount", userAccount);
      localStorage.setItem("balance", balance);
      localStorage.setItem("chainId", chainId.toString());
    }
  }, [selectedWallet, userAccount, balance, chainId]);

  return (
    <WalletContext.Provider
      value={{
        selectedWallet,
        userAccount,
        balance,
        chainId,
        setSelectedWallet,
        setUserAccount,
        setBalance,
        setChainId,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
