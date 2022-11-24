// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
  @dev This library contains code for use by the JSCRevisioned smart contract. It's purpose is primarily to reduce the size of 
  smart contracts that use this contract as a base class and centralize the type and functionality definitions.
 */
library JSCRevisionsLib {
  enum ParamType { t_address, t_bool, t_number, t_string }
  uint16 public constant BlocksPerDay = 24 * 60 * 5; // Assuming a block every 12 seconds
  uint16 public constant BlocksPerWeek = BlocksPerDay * 7;
  struct VotingRules {
    /** 
      How long voting lasts in number of blocks 
    */
    uint16 votingPeriod;
    /** 
      How many approvals needed (0-65535). Yes votes count as approvals.
    */
    uint16 approvals;
    /** 
      Percentage of quorum that are yes votes needed for revision to pass (0-100) 
    */
    uint8 majority;
    /** 
      Percentage of cabinet response needed for vote to be considered valid (0-100). 
    */
    uint8 quorum;
    /** 
      What roles may execute this revision 
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
      r.majority >= 0 && r.majority <= 100, 
      "Invalid majority (0-100)");
    require(
      r.approvals >= 0 && r.approvals <= 100, 
      "Invalid approvals (0-100)");
    require(
      r.quorum >= 0 && r.quorum <= 100, 
      "Invalid quorum (0-100)");
    require(
      r.majority == 0 || r.quorum > 0,
      "VotingRules contains a majority but no quorum");
    require(
      r.majority > 0 || r.quorum == 0, 
      "VotingRules contains a quorum but no majority");
    require(
      r.votingPeriod > 0 || (r.approvals == 0 && r.majority == 0), 
      "VotingPeriod must be non-zero");
    require(
      r.votingPeriod == 0 || r.approvals > 0 || r.majority > 0, 
      "Invalid VotingPeriod");
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
