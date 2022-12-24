// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCConfigurableLib as clib } from "libraries/JSCConfigurableLib.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";
import "./JSCConfigurable.sol";
import "../IJSCJurisdiction.sol";

/**
  @dev This is the top level container for all other smart contracts in the jurisdiction.
*/
contract JSCJurisdiction is IJSCJurisdiction, JSCConfigurable {
  using clib for clib.ParameterMap;
  string jurisdictionName;

  /**
   * @dev See {IJSCJurisdiction-init}.
   */
  function init(
      string calldata name,
      string[] calldata contractKeys, 
      address[] calldata contracts, 
      string[] calldata descriptions,
      bool changeOwner) external onlyOwner {
    require(contractKeys.length == contracts.length, "Inconsistent arguments");
    require(contractKeys.length == descriptions.length, "Inconsistent arguments");
    require(contractKeys.length >= 3, "Insufficient contracts specified");
    require(bytes(jurisdictionName).length == 0, "init() cannot be called twice");

    jurisdictionName = name;
    JSCConfigurable._init();
    
    for (uint i = 0; i < contracts.length; i++) {
      require(contracts[i] != address(0), "zero contract");
      _addAddressParameter(clib.AddressParameter(contractKeys[i], descriptions[i], contracts[i]));
    }
    _addParameterRevisions();
    _addJurisdictionRevisions();

    if (changeOwner) {
      // Change ownership of this contract to the governor
      address governor = getAddressParameter("jsc.contracts.governor");
      require(governor != address(0), "Governor contract not found");
      transferOwnership(governor);
    }

    // These calls will revert the transaction if any contract is missing
    getAddressParameter("jsc.contracts.governor");
    getAddressParameter("jsc.contracts.tokens");
    getAddressParameter("jsc.contracts.cabinet");
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, JSCConfigurable) returns (bool) {
    return
      interfaceId == type(IJSCJurisdiction).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  /** 
   * @dev See {IJSCJurisdiction.getContractAddress} 
   */
  function getContractAddress(string memory name) external view returns (address) {
    return getAddressParameter(name);
  }

  function _addJurisdictionRevisions() internal {
    _addRevision(_createRevisionForAddContract("AddContract", "Add a new contract called {key} deployed at {address}"));
    _addHandler("AddContract", _handlerAddContract);
    _addRevision(_createRevisionForRemoveContract("RemoveContract", "Remove the contract {key}"));
    _addHandler("RemoveContract", _handleRemoveContract);
  }

  function _createRevisionForAddContract(string memory rname, string memory description) internal pure returns (rlib.Revision memory) {
    string[] memory names = new string[](3);
    names[0] = "key";
    names[1] = "description";
    names[2] = "address";
    rlib.ParamType[] memory types = new rlib.ParamType[](3);
    types[0] = rlib.ParamType.t_string;
    types[1] = rlib.ParamType.t_string;
    types[2] = rlib.ParamType.t_address;
    string[] memory hints = new string[](3);
    hints[0] = "Unique key for this contract within the jurisdiction";
    hints[1] = "Description of this contract";
    hints[2] = "Address of this contract";
    string[] memory roles = new string[](1);
    roles[0] = "Legislative";

    return rlib.Revision({
      name: rname,
      description: description,
      paramNames: names,
      paramTypes: types,
      paramHints: hints,
      rules: rlib.VotingRules(rlib.BlocksPerWeek,0,51,51,roles)
    });
  }

  function _createRevisionForRemoveContract(string memory rname, string memory description) internal pure returns (rlib.Revision memory) {
    string[] memory names = new string[](2);
    names[0] = "key";
    names[1] = "address";
    rlib.ParamType[] memory types = new rlib.ParamType[](2);
    types[0] = rlib.ParamType.t_string;
    types[1] = rlib.ParamType.t_address;
    string[] memory hints = new string[](2);
    hints[0] = "Unique key for this contract within the jurisdiction";
    hints[1] = "Current address of this contract";
    string[] memory roles = new string[](1);
    roles[0] = "Legislative";

    return rlib.Revision({
      name: rname,
      description: description,
      paramNames: names,
      paramTypes: types,
      paramHints: hints,
      rules: rlib.VotingRules(rlib.BlocksPerWeek,0,51,51,roles)
    });
  }

  function _handlerAddContract(bytes memory pdata) internal {
    string memory name;
    string memory description;
    address contractAddress; 
    (name, description, contractAddress) = abi.decode(pdata, (string, string, address));
    _addAddressParameter(clib.AddressParameter({
      name: name,
      value: contractAddress,
      description: description
    }));
    emit ContractAdded(name, contractAddress);
  }

  function _handleRemoveContract(bytes memory pdata) internal {
    string memory name;
    address contractAddress; 
    (name, contractAddress) = abi.decode(pdata, (string, address));
    require(getAddressParameter(name) == contractAddress, "Unexpected contract address");
    _removeAddressParameter(name);
    emit ContractRemoved(name, contractAddress);
  }

  function _onUpdateAddressParameter(string memory name, address oldValue, address newValue) internal override {
    emit ContractReplaced(name, oldValue, newValue);
  }
}
