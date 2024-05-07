// SPDX-License-Identifier: MIT
const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Voting);
};
