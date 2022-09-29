# Jurisdiciton Smart Contracts
See [Docs](https://docs.google.com/document/d/1alcg28Ip54dXeU0KLeHTLtxxGtojkLuvdxDac-giKKg) for details

In this proof of concept we will have 4 smart contracts

- JSCJurisdiction is the top level container for all other smart contracts
- JSCCabinet maintains the list of cabinet members and their roles
- JSCGovernor accepts proposals and allows cabinet members to vote on them
- JSCTitleTokens maintains a collection of all issued title tokens

We will also have several abstract contracts that act as base classes

- JSCBaseConfigurable which gives them the ability to have configurable settings that can be changed using revisions and proposals
- JSCBaseProposable which provides functionality for registering Revisions and executing them.
- UUPSUpgradeable (or something similar) to allow the smart contract to be upgradeable. 

Tasks

- Create JSCBaseProposable
- Create JSCBaseConfigurable
- Create JSCJurisdiction
- Create JSCCabinet
- Create JSCGovernor
- Create JSCTitleTokens
- Create UUPSUpgradeable

Contracts have parameters that affect their operation
For example Contract A has votingPeriod for each revision
Changing that parameter can be done using revisions too
Revisions for changing parameters all use the same rules defined at the level of the contract
