// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCConfigurableLib as clib } from "../libraries/JSCConfigurableLib.sol";
import { JSCRevisionsLib as rlib } from "../libraries/JSCRevisionsLib.sol";
import "./JSCBaseProposable.sol";

/**
  This is the base class for all smart contracts that contain configurable parameters that must be
  made available for update using the revisions mechanism. Supported parameter types are: address, uint, and string.

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
abstract contract JSCBaseConfigurable is JSCBaseProposable {
  using clib for clib.ParameterMap;

  clib.ParameterMap internal _parameters;
  /** Rules for creating revisions for changing parameter values. Same rules apply to all parameters for a given contract */
  rlib.VotingRules internal _paramRules = rlib.VotingRules(0,0,0,0,new string[](0));

  event AddressParameterAdded(string name, address value);
  event NumberParameterAdded(string name, uint value);
  event StringParameterAdded(string name, string value);
  event AddressParameterUpdated(string name, address value);
  event NumberParameterUpdated(string name, uint value);
  event StringParameterUpdated(string name, string value);
  event AddressParameterRemoved(string name, address value);

  function _addAddressParameter(clib.AddressParameter memory p) internal {
    _parameters.insertAddress(p);
    emit AddressParameterAdded(p.name, p.value);
  }

  function _removeAddressParameter(string memory name) internal {
    address a = _parameters.getAddress(name);
    _parameters.remove(name);
    emit AddressParameterRemoved(name, a);
  }

  function _addNumberParameter(clib.NumberParameter memory p) internal {
    _parameters.insertNumber(p);
    emit NumberParameterAdded(p.name, p.value);
  }

  function _addStringParameter(clib.StringParameter memory p) internal {
    _parameters.insertString(p);
    emit StringParameterAdded(p.name, p.value);
  }

  function getAddressParameter(string memory name) public view returns (address) {
    return _parameters.getAddress(name);
  }

  function getNumberParameter(string memory name) public view returns (uint) {
    return _parameters.getNumber(name);
  }

  function getStringParameter(string memory name) public view returns (string memory) {
    return _parameters.getString(name);
  }

  function parameterCount() public view returns (uint) {
    return _parameters.size;
  }

  function iterateParameters() public view returns (clib.Iterator) {
    return _parameters.iterateStart();
  }

  function isValidParameterIterator(clib.Iterator i) public view returns (bool) {
    return _parameters.iterateValid(i);
  }

  function nextParameter(clib.Iterator i) public view returns (clib.Iterator) {
    return _parameters.iterateNext(i);
  }

  function parameterIteratorGet(clib.Iterator i) public view returns (clib.ParameterInfo memory) {
    return _parameters.iterateGet(i);
  }

  /** Adds revisions for changing parameters */
  function _addParameterRevisions() internal { 
    rlib.Revision[] memory revs = _parameters.getRevisions(_paramRules);
    for (uint i = 0; i < revs.length; i++) {
      _addRevision(revs[i]);
      rlib.ParamType t = revs[i].paramTypes[1];
      if (t == rlib.ParamType.t_address)
        _addHandler(revs[i].name, _updateAddressParameter);
      else if (t == rlib.ParamType.t_number)
        _addHandler(revs[i].name, _updateNumberParameter);
      else if (t == rlib.ParamType.t_string)
        _addHandler(revs[i].name, _updateStringParameter);      
    }
  }

  function _updateAddressParameter(bytes memory pdata) internal {
      string memory name;
      address value; 
      (name, value) = abi.decode(pdata, (string, address));
      _parameters.setAddress(name, value);
    emit AddressParameterUpdated(name, value);
  }

  function _onUpdateAddressParameter(string memory name, address value) internal virtual {}

  function _updateNumberParameter(bytes memory pdata) internal {
      string memory name;
      uint value; 
      (name, value) = abi.decode(pdata, (string, uint));
      _parameters.setNumber(name, value);
    emit NumberParameterUpdated(name, value);
  }

  function _updateStringParameter(bytes memory pdata) internal {
      string memory name;
      string memory value; 
      (name, value) = abi.decode(pdata, (string, string));
      _parameters.setString(name, value);
    emit StringParameterUpdated(name, value);
  }
}
