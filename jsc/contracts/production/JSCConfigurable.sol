// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCConfigurableLib as clib } from "libraries/JSCConfigurableLib.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";
import "./JSCFreezable.sol";
import "../IJSCConfigurable.sol";

/**
  @dev This is the base class for all smart contracts that contain configurable parameters that must be
  made available for update using the revisions mechanism. Supported parameter types are: address, bool, uint, and string.

  This base class maintains a list of parameters, their current values, and provides functionality to allow the 
  governor to modify the values of the parameters using the Jurisdictions governance protocol.

  To use this base class do the following:

  1. In your constructor, add appropriate configuration parameters and their default values by calling _addParameter().
  
  2. Then call the _addParameterRevisions() method to register all the revisions for your parameters (these are the 
     rules about whoe is allowed propose changes in your parameters and voting rules for doing so).

  3. Add handlers for the parameter revisions

  3. Always access these parameters using the get() method to ensure you are using their current values which may 
     change over the life of the contract
 */
abstract contract JSCConfigurable is IJSCConfigurable, JSCFreezable {
  using clib for clib.ParameterMap;

  clib.ParameterMap internal _parameters;

  /**
   * @dev Initializes this contract
   */
  function _init() internal override onlyOwner {
    JSCFreezable._init();
  }
  
  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, JSCFreezable) returns (bool) {
    return
      interfaceId == type(IJSCConfigurable).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  /**
   * @dev See {IJSCConfigurable-getAccountParameter}.
   */
  function getAccountParameter(string memory name) public view override returns (address) {
    return _parameters.getAccount(name);
  }

  /**
   * @dev See {IJSCConfigurable-getContractParameter}.
   */
  function getContractParameter(string memory name) public view override returns (address) {
    return _parameters.getContract(name);
  }

  /**
   * @dev See {IJSCConfigurable-getBoolParameter}.
   */
  function getBoolParameter(string memory name) public view override returns (bool) {
    return _parameters.getBool(name);
  }

  /**
   * @dev See {IJSCConfigurable-getNumberParameter}.
   */
  function getNumberParameter(string memory name) public view override returns (uint) {
    return _parameters.getNumber(name);
  }

  /**
   * @dev See {IJSCConfigurable-getRoleParameter}.
   */
  function getRoleParameter(string memory name) public view override returns (uint) {
    return _parameters.getRole(name);
  }

  /**
   * @dev See {IJSCConfigurable-getStringParameter}.
   */
  function getStringParameter(string memory name) public view override returns (string memory) {
    return _parameters.getString(name);
  }

  /**
   * @dev See {IJSCConfigurable-parameterCount}.
   */
  function parameterCount() public view override returns (uint) {
    return _parameters.size;
  }

  /**
   * @dev See {IJSCConfigurable-iterateParameters}.
   */
  function iterateParameters() public view override returns (clib.Iterator) {
    return _parameters.iterateStart();
  }

  /**
   * @dev See {IJSCConfigurable-isValidParameterIterator}.
   */
  function isValidParameterIterator(clib.Iterator i) public view override returns (bool) {
    return _parameters.iterateValid(i);
  }

  /**
   * @dev See {IJSCConfigurable-nextParameter}.
   */
  function nextParameter(clib.Iterator i) public view override returns (clib.Iterator) {
    return _parameters.iterateNext(i);
  }

  /**
   * @dev See {IJSCConfigurable-parameterIteratorGet}.
   */
  function parameterIteratorGet(clib.Iterator i) public view override returns (clib.ParameterInfo memory) {
    return _parameters.iterateGet(i);
  }

  /** Adds revisions for changing parameters */
  function _addParameterRevisions() internal { 
    rlib.Revision[] memory revs = _parameters.getRevisions();
    for (uint i = 0; i < revs.length; i++) {
      _addRevision(revs[i]);
      rlib.ParamType t = revs[i].paramTypes[1];
      if (t == rlib.ParamType.t_account)
        _addHandler(revs[i].name, _updateAccountParameter);
      else if (t == rlib.ParamType.t_contract)
        _addHandler(revs[i].name, _updateContractParameter);
      else if (t == rlib.ParamType.t_bool)
        _addHandler(revs[i].name, _updateBoolParameter);
      else if (t == rlib.ParamType.t_number)
        _addHandler(revs[i].name, _updateNumberParameter);
      else if (t == rlib.ParamType.t_role)
        _addHandler(revs[i].name, _updateRoleParameter);
      else if (t == rlib.ParamType.t_string)
        _addHandler(revs[i].name, _updateStringParameter);      
    }
  }

  function _updateAccountParameter(bytes memory pdata) internal virtual {
    string memory name;
    address value; 
    (name, value) = abi.decode(pdata, (string, address));
    _parameters.setAccount(name, value);
    emit AccountParameterUpdated(name, value);
  }

  function _updateBoolParameter(bytes memory pdata) internal {
      string memory name;
      bool value; 
      (name, value) = abi.decode(pdata, (string, bool));
      _parameters.setBool(name, value);
    emit BoolParameterUpdated(name, value);
  }

  function _updateContractParameter(bytes memory pdata) internal virtual {
    string memory name;
    address value; 
    (name, value) = abi.decode(pdata, (string, address));
    address oldValue = _parameters.getContract(name);
    _parameters.setContract(name, value);
    emit ContractParameterUpdated(name, value);
    _onUpdateContractParameter(name, oldValue, value);
  }

  function _onUpdateContractParameter(string memory name, address oldValue, address newValue) internal virtual {}

  function _updateNumberParameter(bytes memory pdata) internal {
      string memory name;
      uint value; 
      (name, value) = abi.decode(pdata, (string, uint));
      _parameters.setNumber(name, value);
    emit NumberParameterUpdated(name, value);
  }

  function _updateRoleParameter(bytes memory pdata) internal {
      string memory name;
      uint value; 
      (name, value) = abi.decode(pdata, (string, uint));
      _parameters.setRole(name, value);
    emit RoleParameterUpdated(name, value);
  }

  function _updateStringParameter(bytes memory pdata) internal {
      string memory name;
      string memory value; 
      (name, value) = abi.decode(pdata, (string, string));
      _parameters.setString(name, value);
    emit StringParameterUpdated(name, value);
  }
}
