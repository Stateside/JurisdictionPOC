// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCConfigurableLib as clib } from "libraries/JSCConfigurableLib.sol";
import "./IJSCFreezable.sol";

/**
  This is the interface for all smart contracts that contain configurable parameters that must be
  made available for update using the revisions mechanism. Supported parameter types are: address, bool, uint, and string.

  This interface provides access to a list of parameters, their current values, and provides functionality to allow the 
  governor to modify the values of the parameters using the Jurisdictions governance protocol.
 */
interface IJSCConfigurable is IJSCFreezable {
  event AddressParameterAdded(string name, address value);
  event BoolParameterAdded(string name, bool value);
  event NumberParameterAdded(string name, uint value);
  event StringParameterAdded(string name, string value);

  event AddressParameterUpdated(string name, address value);
  event BoolParameterUpdated(string name, bool value);
  event NumberParameterUpdated(string name, uint value);
  event StringParameterUpdated(string name, string value);

  event AddressParameterRemoved(string name, address value);

  /** Returns the address value stored in the given paramater */
  function getAddressParameter(string memory name) external view returns (address);

  /** Returns the bool value stored in the given paramater */
  function getBoolParameter(string memory name) external view returns (bool);

  /** Returns the uint value stored in the given paramater */
  function getNumberParameter(string memory name) external view returns (uint);

  /** Returns the string value stored in the given paramater */
  function getStringParameter(string memory name) external view returns (string memory);

  /** Returns the number of parameters in this contract */
  function parameterCount() external view returns (uint);

  /** Returns an iterator for retrieving all parameters in this contract */
  function iterateParameters() external view returns (clib.Iterator);

  /** Indicates if the given iterator points to a valid parameter */
  function isValidParameterIterator(clib.Iterator i) external view returns (bool);

  /** Returns a new iterator value that points to the next parameter (or is invalid) */
  function nextParameter(clib.Iterator i) external view returns (clib.Iterator);

  /** Retrieves details about the parameter pointed to by the given iterator */
  function parameterIteratorGet(clib.Iterator i) external view returns (clib.ParameterInfo memory);
}
