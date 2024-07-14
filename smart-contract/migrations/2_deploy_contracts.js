const SupplyChain = artifacts.require("SupplyChain");

module.exports = function (deployer) {
  deployer.deploy(SupplyChain, { gas: 6721975 }); // Increase the gas limit as needed
};
