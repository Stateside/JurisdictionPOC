// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { JSCRevisionsLib as rlib } from "../libraries/JSCRevisionsLib.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
  This is the base class that all smart contracts that want to take part in Jurisdiction governance should inherit from.
  This base class provides a way for smart contracts to register "revisions" and have them executed by the jurisdiciton's
  governor contract.

  Most applications use the form of governance supported by Compound and implemented by OpenZeppelin. 
  See https://docs.openzeppelin.com/contracts/4.x/governance.

  An OpenZeppelin proposal consists of a set of target smart contracts, functions that will be called in those contracts, 
  and the parameters that will be sent to those functions. The proposals are arbitrary and any set of external function 
  calls can be proposed with any parameters. The proposals that stakeholders vote on contain a description that is 
  arbitrary and is written by the proposer.

  As an alternative, our contract takes the view that proposals must be built into the smart contracts that want to 
  support them. Every smart contract will define a set of parameterized “revisions” that they accept. A revision describes
  a predefined change that the smart contract understands and can execute on demand. These revisions are transparent, 
  easy to read, easy to understand, high-level, and, by definition, restricted in scope. 

  The description is part of the revision - not the proposal - so the description is guaranteed to reflect 
  the true purpose of the proposed updates. However, we will allow proposals to have summaries.

  To use this base class do the following:

  1. In your constructor, add appropriate revisions that indicate operations that your smart contract will permit the
  jurisdiction members to propose and vote on. These revisions represent significant state changes that should only
  be made to the smart contract after an appropriate voting period. Every revision has a name, a description,
  and optional parameter names that it accepts.

  2. In your constructor, add handlers that implement the revisions. A handler is a private (local) function that 
  accepts a "bytes memory" parameter which contains the ABI encoded parameters for the revision.

  3. Make the governor contract the owner of this contract so that only the governor can execute revisions
 */
abstract contract JSCBaseProposable is Ownable {
  using rlib for rlib.RevisionMap;

  rlib.RevisionMap private _revisions;
  mapping(string => rlib.RevisionHandler) private _handlers;

  event RevisionAdded(string name);
  event RevisionRemoved(string name);
  event RevisionExecuted(string name);

  function _addRevision(rlib.Revision memory r) internal {
    _revisions.insert(r);
    emit RevisionAdded(r.name);
  }

  function revisionCount() public view returns (uint) {
    return _revisions.size;
  }

  function _removeRevision(string memory name) internal {
    _revisions.remove(name);
    emit RevisionRemoved(name);
  }

  function iterateRevisions() public view returns (rlib.Iterator) {
    return _revisions.iterateStart();
  }

  function isValidRevisionIterator(rlib.Iterator i) public view returns (bool) {
    return _revisions.iterateValid(i);
  }

  function nextRevision(rlib.Iterator i) public view returns (rlib.Iterator) {
    return _revisions.iterateNext(i);
  }

  function revisionIteratorGet(rlib.Iterator i) public view returns (rlib.Revision memory value) {
    (,value) = _revisions.iterateGet(i);
  }

  /** 
    Verifies that the given revision exists and executes it with the given ABI encoded parameter data.
    Derived contracts do not need to worry about this normally as long as they register appropriate handlers.

    This function will fail if the given revision does not exist or a handler has not been registered for the revision.
  */
  function executeRevision(string memory name, bytes memory pdata) external virtual onlyOwner {
    require(_revisions.contains(name) && _handlers[name].exists);
    _handlers[name].handle(pdata);
    emit RevisionExecuted(name);
  }

  /**
    Registers the given handler function to be executed when the governor requests the execution of a revision with
    the same name
  */
  function _addHandler(string memory name, function (bytes memory) f) internal {
    _handlers[name] = rlib.RevisionHandler(f, true);
  }
}
