// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCRevisionsLib as rlib } from "../libraries/JSCRevisionsLib.sol";

/**
  This library contains code for use by the JSCBaseConfigurable smart contract. It's purpose is primarily to reduce the size of 
  smart contracts that use this contract as a base class and centralize the type and functionality definitions.

  Supported parameter types are: address, uint, and string.
 */
library JSCConfigurableLib {
  struct AddressParameter {
    /** Name of this parameter */
    string name;
    /** Description of this parameter */
    string description;
    /** Holds current value of this parameter */
    address value;
  }
  struct NumberParameter {
    /** Name of this parameter */
    string name;
    /** Description of this parameter */
    string description;
    /** Holds current value of this parameter */
    uint value;
  }
  struct StringParameter {
    /** Name of this parameter */
    string name;
    /** Description of this parameter */
    string description;
    /** Holds current value of this parameter */
    string value;
  }
  struct ParameterInfo {
    /** Name of this parameter */
    string name;
    /** Description of this parameter */
    string description;
    /** Type of this parameter */
    rlib.ParamType ptype;
  }

  /** Iterable implementation */
  struct IndexInfoValue { uint keyIndex; ParameterInfo value; }
  struct KeyFlag { string key; bool deleted; }
  struct ParameterMap {
    mapping(string => IndexInfoValue) paramInfos;
    mapping(string => address) addressValues;
    mapping(string => uint) numberValues;
    mapping(string => string) stringValues;
    KeyFlag[] keys;
    uint size;
  }
  type Iterator is uint;

  /** Adds the given address parameter. Fails if another address parameter with the same name already exists */
  function insertAddress(ParameterMap storage self, AddressParameter calldata r) public {
    checkCanAdd(self, r.name);
    self.addressValues[r.name] = r.value;
    _insertInfo(self, ParameterInfo(r.name, r.description, rlib.ParamType.t_address));
  }

  /** Adds the given number parameter. Fails if another number parameter with the same name already exists */
  function insertNumber(ParameterMap storage self, NumberParameter calldata r) public {
    checkCanAdd(self, r.name);
    self.numberValues[r.name] = r.value;
    _insertInfo(self, ParameterInfo(r.name, r.description, rlib.ParamType.t_number));
  }

  /** Adds the given string parameter. Fails if another string parameter with the same name already exists */
  function insertString(ParameterMap storage self, StringParameter calldata r) public {
    checkCanAdd(self, r.name);
    self.stringValues[r.name] = r.value;
    _insertInfo(self, ParameterInfo(r.name, r.description, rlib.ParamType.t_string));
  }

  function _insertInfo(ParameterMap storage self, ParameterInfo memory pi) internal {
    self.paramInfos[pi.name].value = pi;
    uint keyIndex = self.keys.length;
    self.keys.push();
    self.paramInfos[pi.name].keyIndex = keyIndex + 1;
    self.keys[keyIndex].key = pi.name;
    self.size++;
  }

  /** Removes the given parameter. Fails if the given parameter does not exist */
  function remove(ParameterMap storage self, string calldata name) public {
    uint keyIndex = self.paramInfos[name].keyIndex;
    require(keyIndex > 0, "Trying to remove non-existant parameter");

    ParameterInfo storage pi = self.paramInfos[name].value;
    if (pi.ptype == rlib.ParamType.t_address)
      delete self.addressValues[name];
    else if (pi.ptype == rlib.ParamType.t_number)
      delete self.numberValues[name];
    else if (pi.ptype == rlib.ParamType.t_string)
      delete self.stringValues[name];

    self.keys[keyIndex - 1].deleted = true;
    self.size--;
  }

  function getAddress(ParameterMap storage self, string calldata name) public view returns (address value) {
    require(self.paramInfos[name].keyIndex > 0, "Trying to access non-existant parameter");
    return self.addressValues[name];
  }

  function getNumber(ParameterMap storage self, string calldata name) public view returns (uint value) {
    require(self.paramInfos[name].keyIndex > 0, "Trying to access non-existant parameter");
    return self.numberValues[name];
  }

  function getString(ParameterMap storage self, string calldata name) public view returns (string storage value) {
    require(self.paramInfos[name].keyIndex > 0, "Trying to access non-existant parameter");
    return self.stringValues[name];
  }

  function setAddress(ParameterMap storage self, string memory name, address value) internal {
    require(self.paramInfos[name].keyIndex > 0, "Trying to access non-existant parameter");
    self.addressValues[name] = value;
  }

  function setNumber(ParameterMap storage self, string memory name, uint value) internal {
    require(self.paramInfos[name].keyIndex > 0, "Trying to access non-existant parameter");
    self.numberValues[name] = value;
  }

  function setString(ParameterMap storage self, string memory name, string memory value) internal {
    require(self.paramInfos[name].keyIndex > 0, "Trying to access non-existant parameter");
    self.stringValues[name] = value;
  }

  /** Determines if a parameter with the given name already exists. */
  function contains(ParameterMap storage self, string calldata name) public view returns (bool) {
    return self.paramInfos[name].keyIndex > 0;
  }
  
  function checkCanAdd(ParameterMap storage self, string calldata name) public view {
    require(bytes(name).length > 0, "Missing parameter name");
    require(!contains(self, name), "Parameter with same name already exists");
  }

  function iterateStart(ParameterMap storage self) public view returns (Iterator) {
    return iteratorSkipDeleted(self, 0);
  }

  function iterateValid(ParameterMap storage self, Iterator iterator) public view returns (bool) {
    return Iterator.unwrap(iterator) < self.keys.length;
  }

  function iterateNext(ParameterMap storage self, Iterator iterator) public view returns (Iterator) {
    require(iterateValid(self, iterator), "Invalid iterator");
    return iteratorSkipDeleted(self, Iterator.unwrap(iterator) + 1);
  }

  function iterateGet(ParameterMap storage self, Iterator iterator) public view returns (ParameterInfo storage) {
    require(iterateValid(self, iterator), "Invalid iterator");
    uint keyIndex = Iterator.unwrap(iterator);
    return self.paramInfos[self.keys[keyIndex].key].value;
  }

  function iteratorSkipDeleted(ParameterMap storage self, uint keyIndex) private view returns (Iterator) {
      while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
          keyIndex++;
      return Iterator.wrap(keyIndex);
  }

  /** Create revisions and handlers for all existing parameters */
  function getRevisions(ParameterMap storage self, rlib.VotingRules storage rules) view public returns (rlib.Revision[] memory result) {
    result = new rlib.Revision[](self.size);
    uint r = 0;
    Iterator i = iterateStart(self);
    while(iterateValid(self, i)) {
      ParameterInfo storage pi = iterateGet(self, i);
      result[r++] = getRevisionForParameter(pi, rules);
      i = iterateNext(self, i);
    }
  }

  function getRevisionForParameter(ParameterInfo storage pi, rlib.VotingRules storage rules) public view returns (rlib.Revision memory) {
    string[] memory names = new string[](2);
    names[0] = "name";
    names[1] = "value";
    rlib.ParamType[] memory types = new rlib.ParamType[](2);
    types[0] = rlib.ParamType.t_string;
    types[1] = pi.ptype;
    string[] memory hints = new string[](2);
    hints[0] = "Name of the parameter";
    hints[1] = "New value for the parameter";

    return rlib.Revision({
      name: string(abi.encodePacked("ChangeConfig:", pi.name)),
      description: pi.description,
      paramNames: names,
      paramTypes: types,
      paramHints: hints,
      rules: rules
    });
  }
}
