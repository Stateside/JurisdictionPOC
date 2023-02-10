// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../production/JSCRevisioned.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";

/**
  This contract is for testing the JSCRevisioned abstract contract.
 */
contract JSCRevisionedTest is JSCRevisioned {
  using rlib for rlib.RevisionMap;
  
  string public rev = "none";

  constructor() {
    // Adds some revisions that we can test
    _addMyRevisions();

    // Adds some handlers for executing the revisions
    _addMyHandlers();
  }

  function _addMyRevisions() private { 
    rlib.Revision[] memory revs = getRevisions();
    for (uint i = 0; i < revs.length; i++) {
      _addRevision(revs[i]);
    }
  }

  function _addMyHandlers() private { 
    _addHandler("first", executeFirst);
    _addHandler("second", executeSecond);
    _addHandler("third", executeThird);
  }

  /** Returns the first revision in this contract */
  function first() external view returns (rlib.Revision memory) {
    rlib.Iterator i = iterateRevisions();
    return revisionIteratorGet(i);
  }

  /** Adds the revisions again. Should cause the transation to revert */
  function addDuplicate() external {
    _addMyRevisions();
  }

  /** Removes the given revision. For testing only. Should never happen in production. */
  function remove(string memory name) external {
    _removeRevision(name);
  }

  /** Implements the revision: "first" */
  function executeFirst(bytes memory pdata) private {
      string memory s = abi.decode(pdata, (string));
      rev = s;
  }

  /** Implements the revision: "second" */
  function executeSecond(bytes memory pdata) private {
      uint i = abi.decode(pdata, (uint));
      rev = Strings.toString(i);
  }

  /** Implements the revision: "third" */
  function executeThird(bytes memory pdata) private {
      address a = abi.decode(pdata, (address));
      rev = Strings.toHexString(uint160(a), 20);
  }

  // If needed, the following code can be put in a library to keep the contract small
  // They are all pure functions that do not change the state of the contract

  function getRevisions() pure private returns (rlib.Revision[] memory result) {
    result = new rlib.Revision[](3);
    result[0] = getFirstRevision();
    result[1] = getSecondRevision();
    result[2] = getThirdRevision();
  }

  function getFirstRevision() pure private returns (rlib.Revision memory) {
    string[] memory names = new string[](1);
    names[0] = "myString";
    rlib.ParamType[] memory types = new rlib.ParamType[](1);
    types[0] = rlib.ParamType.t_string;
    string[] memory hints = new string[](1);
    hints[0] = "Any string";

    return rlib.Revision({
        name: "first",
        description: "first desc",
        paramNames: names,
        paramTypes: types,
        paramHints: hints
      });
  }

  function getSecondRevision() pure private returns (rlib.Revision memory) {
    string[] memory names = new string[](1);
    names[0] = "myInt";
    rlib.ParamType[] memory types = new rlib.ParamType[](1);
    types[0] = rlib.ParamType.t_number;
    string[] memory hints = new string[](1);
    hints[0] = "Any unsigned number";
  
    return rlib.Revision({
        name: "second",
        description: "second desc",
        paramNames: names,
        paramTypes: types,
        paramHints: hints
      });
  }

  function getThirdRevision() pure private returns (rlib.Revision memory) {
    string[] memory names = new string[](1);
    names[0] = "myAddress";
    rlib.ParamType[] memory types = new rlib.ParamType[](1);
    types[0] = rlib.ParamType.t_account;
    string[] memory hints = new string[](1);
    hints[0] = "Any address";

    return rlib.Revision({
        name: "third",
        description: "third desc",
        paramNames: names,
        paramTypes: types,
        paramHints: hints
      });
  }
}
