// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCConfigurableLib as clib } from "libraries/JSCConfigurableLib.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";
import "./JSCBaseConfigurable.sol";

/**
  This is the top level container for all other smart contracts in the jurisdiction.

  It contains references to all the other contracts in the jurisdiction in a mapping whose
  key is the name of the contract. All contracts should go through the jurisdiction contract
  to determine the latest contract instances in use.
*/
contract JSCJurisdiction is JSCBaseConfigurable {
  using clib for clib.ParameterMap;
  string jurisdictionName;

  event ContractAdded(string name, address contractAddress);
  event ContractRemoved(string name, string contractAddress);
  event ContractReplaced(string name, address contractAddress);

  function init(
    string calldata name,
    string[] calldata contractKeys, 
    address[] calldata contracts, 
    string[] calldata descriptions) external onlyOwner {
    require(contractKeys.length == contracts.length, "Inconsistent argument lengths");
    require(bytes(jurisdictionName).length == 0, "init() cannot be called twice");

    jurisdictionName = name;
    for (uint i = 0; i < contracts.length; i++)
      _addAddressParameter(clib.AddressParameter(contractKeys[i], descriptions[i], contracts[i]));
    _addParameterRevisions();
    _addJurisdictionRevisions();
  }

  function getContractAddress(string memory name) external view returns (address) {
    return getAddressParameter(name);
  }

  function _addJurisdictionRevisions() internal {
    _addRevision(_createRevisionForContractUpsert("AddContract", "Add a new contract called {key} deployed at {address}"));
    _addHandler("AddContract", _handlerAddContract);
    _addRevision(_createRevisionForRemoveContract("RemoveContract", "Remove the contract {key}"));
    _addHandler("RemoveContract", _handleRemoveContract);
  }

  function _createRevisionForContractUpsert(string memory rname, string memory description) internal pure returns (rlib.Revision memory) {
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
      rules: rlib.VotingRules(0,0,0,0,roles)
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
      rules: rlib.VotingRules(0,0,0,0,roles)
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
  }

  function _handleRemoveContract(bytes memory pdata) internal {
    string memory name;
    address contractAddress; 
    (name, contractAddress) = abi.decode(pdata, (string, address));
    require(getAddressParameter(name) == contractAddress, "Unexpected contract address");
    _removeAddressParameter(name);
  }

  function _onUpdateAddressParameter(string memory name, address value) internal override {
    emit ContractReplaced(name, value);
  }
}
