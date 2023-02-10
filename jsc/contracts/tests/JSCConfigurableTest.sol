// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../production/JSCConfigurable.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";
import { JSCConfigurableLib as clib } from "libraries/JSCConfigurableLib.sol";

/**
  This contract is for testing the JSCConfigurable abstract contract.
 */
contract JSCConfigurableTest is JSCConfigurable {
  using rlib for rlib.RevisionMap;
  using clib for clib.ParameterMap;

  constructor() {
    _addMyParameters();
    _addParameterRevisions();
  }

  function _addMyParameters() private { 
    _parameters.insertAccount(clib.AccountParameter({
        name: "JSCConfigurableTest.account",
        value: 0x111122223333444455556666777788889999aAaa,
        description: "account param"
      }));
    _parameters.insertBool(clib.BoolParameter({
        name: "JSCConfigurableTest.bool",
        value: false,
        description: "bool param"
      }));
    _parameters.insertContract(clib.ContractParameter({
        name: "JSCConfigurableTest.contract",
        value: 0x111122223333444455556666777788889999Bbbb,
        description: "contract param"
      }));
    _parameters.insertNumber(clib.NumberParameter({
        name: "JSCConfigurableTest.number",
        value: 1234,
        description: "number param"
      }));
    _parameters.insertRole(clib.RoleParameter({
        name: "JSCConfigurableTest.role",
        value: 0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000,
        description: "role param"
      }));
    _parameters.insertString(clib.StringParameter({
        name: "JSCConfigurableTest.string",
        value: "string value",
        description: "string param"
      }));
  }
}
