module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 6721975, // Set a higher gas limit
      gasPrice: 20000000000, // 20 gwei
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match your Solidity version
    },
  },
};
