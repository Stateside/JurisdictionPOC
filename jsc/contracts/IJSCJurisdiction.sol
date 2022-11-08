// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IJSCConfigurable.sol";

/**
  This is the  interface for the top level container for all other smart contracts in the jurisdiction.

  It contains references to all the other contracts in the jurisdiction in a mapping whose
  key is the name of the contract. All contracts should go through the jurisdiction contract
  to determine the latest contract instances in use.
*/
interface IJSCJurisdiction is IJSCConfigurable {
  event ContractAdded(string name, address contractAddress);
  event ContractRemoved(string name, string contractAddress);
  event ContractReplaced(string name, address contractAddress);

  /** Returns the address of the contract with the given name */
  function getContractAddress(string memory name) external view returns (address);
}