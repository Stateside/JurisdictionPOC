// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/production/JSCBaseConfigurable.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";
import { JSCConfigurableLib as clib } from "libraries/JSCConfigurableLib.sol";

/**
  This contract is for testing the JSCBaseConfigurable abstract contract.
 */
contract JSCConfigurableTest is JSCBaseConfigurable {
  using rlib for rlib.RevisionMap;

  constructor() {
    _addMyParameters();
    _addParameterRevisions();
  }

  function _addMyParameters() private { 
    _addAddressParameter(clib.AddressParameter({
        name: "JSCConfigurableTest.address",
        value: 0x111122223333444455556666777788889999aAaa,
        description: "address param"
      }));
    _addBoolParameter(clib.BoolParameter({
        name: "JSCConfigurableTest.bool",
        value: false,
        description: "bool param"
      }));
    _addNumberParameter(clib.NumberParameter({
        name: "JSCConfigurableTest.number",
        value: 1234,
        description: "number param"
      }));
    _addStringParameter(clib.StringParameter({
        name: "JSCConfigurableTest.string",
        value: "string value",
        description: "string param"
      }));
  }
}
