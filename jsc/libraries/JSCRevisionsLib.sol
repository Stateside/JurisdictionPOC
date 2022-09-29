// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
  This library contains code for use by the JSCBaseProposable smart contract. It's purpose is primarily to reduce the size of 
  smart contracts that use this contract as a base class and centralize the type and functionality definitions.
 */
library JSCRevisionsLib {
  enum ParamType { t_address, t_number, t_string }
  struct VotingRules {
    /** How long voting lasts in number of blocks */
    uint16 votingPeriod;
    /** 
      How many approvals needed (0-65535). Yes votes count as approvals.
      If approvals is zero and majority is greater than zero then the majority setting is used.
      If approvals is greater than zero and majority is zero then the approvals setting is used.
      If both are zero then the proposal is executed immediately.
    */
    uint16 approvals;
    /** 
      Percentage of cabinet response needed for containing proposal to be considered valid (0-100). 
      Must be non zero if majority is greater than zero 
    */
    uint8 quorumPercentage;
    /** 
      Percentage of votes needed for revision to proceed (0-100) 
      If approvals is zero and majority is greater than zero then the majority setting is used.
      If approvals is greater than zero and majority is zero then the approvals setting is used.
      If both are zero then the proposal is executed immediately.
    */
    uint8 majority;

    /** 
      What roles may execute propose revision 
    */
    string[] roles;
  }
  struct Revision {
    /** Name of this revision */
    string name;
    /** Description of this revision */
    string description;
    /** Names of parameters required by revision */
    string[] paramNames;
    /** Types of parameters required by revision */
    ParamType[] paramTypes;
    /** UI Hints for parameters required by revision */
    string[] paramHints;
    /** Rules for voting on this revision */
    VotingRules rules;
  }

  /** Iterable implementation */
  struct IndexValue { uint keyIndex; Revision value; }
  struct KeyFlag { string key; bool deleted; }
  struct RevisionMap {
    mapping(string => IndexValue) data;
    KeyFlag[] keys;
    uint size;
  }
  type Iterator is uint;
  struct RevisionHandler {
    function (bytes memory) handle;
    bool exists;
  }

  function checkVotingRules(VotingRules calldata r) public pure {
    require(
      r.approvals == 0 || r.majority == 0, 
      "Voting rules must not specify both a majority and approvals");
    require(
      r.majority == 0 || r.quorumPercentage > 0, 
      "VotingRules contains majority but no quorum");
    require(
      r.votingPeriod > 0 || (r.approvals == 0 || r.majority == 0), 
      "VotingPeriod must be non-zero");
  }

  /** Adds the given revision. Fails if another revision with the same name already exists. */
  function insert(RevisionMap storage self, Revision calldata r) public {
    require(bytes(r.name).length > 0, "Missing revision name");
    require(self.data[r.name].keyIndex == 0, "Revision with same name already exists");
    require(r.paramNames.length == r.paramTypes.length, "Inconsistent parameter data");
    require(r.paramNames.length == r.paramHints.length, "Inconsistent parameter data");
    checkVotingRules(r.rules);

    string memory key = r.name;
    self.data[key].value = r;
    uint keyIndex = self.keys.length;
    self.keys.push();
    self.data[key].keyIndex = keyIndex + 1;
    self.keys[keyIndex].key = key;
    self.size++;
  }

  /** Removes the revision with the given name. Fails if the revision does not exist. */
  function remove(RevisionMap storage self, string calldata name) public {
    require(self.data[name].keyIndex > 0, "Trying to remove non-existant revision");

    uint keyIndex = self.data[name].keyIndex;
    delete self.data[name];
    self.keys[keyIndex - 1].deleted = true;
    self.size--;
  }

  function get(RevisionMap storage self, string calldata name) public view returns (Revision storage value) {
    require(self.data[name].keyIndex > 0, "Trying to access non-existant revision");
    return self.data[name].value;
  }

  /** Determines if a revision with the given name already exists. */
  function contains(RevisionMap storage self, string calldata key) public view returns (bool) {
    return self.data[key].keyIndex > 0;
  }

  function iterateStart(RevisionMap storage self) public view returns (Iterator) {
    return iteratorSkipDeleted(self, 0);
  }

  function iterateValid(RevisionMap storage self, Iterator iterator) public view returns (bool) {
    return Iterator.unwrap(iterator) < self.keys.length;
  }

  function iterateNext(RevisionMap storage self, Iterator iterator) public view returns (Iterator) {
    require(iterateValid(self, iterator), "Invalid iterator");
    return iteratorSkipDeleted(self, Iterator.unwrap(iterator) + 1);
  }

  function iterateGet(RevisionMap storage self, Iterator iterator) public view returns (string memory key, Revision storage value) {
    require(iterateValid(self, iterator), "Invalid iterator");
    uint keyIndex = Iterator.unwrap(iterator);
    key = self.keys[keyIndex].key;
    value = self.data[key].value;
  }

  function iteratorSkipDeleted(RevisionMap storage self, uint keyIndex) private view returns (Iterator) {
      while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
          keyIndex++;
      return Iterator.wrap(keyIndex);
  }
}
