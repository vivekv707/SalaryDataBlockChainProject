const SalaryContract = artifacts.require("SalaryData");
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(SalaryContract);
};
