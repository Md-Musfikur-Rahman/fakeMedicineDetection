export const formatBalance = (rawBalance: string): string => {
  const balance = (parseInt(rawBalance) / 1e18).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string): number => {
  const chainIdNum = parseInt(chainIdHex, 16); // Chain ID is typically in hexadecimal
  return chainIdNum;
};

export const formatAddress = (addr: string): string => {
  const upperAfterLastTwo = addr.slice(0, 2).toUpperCase() + addr.slice(2);
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(
    addr.length - 4
  )}`;
};
