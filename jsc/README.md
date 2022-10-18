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
- Create JSCTitleTokens
- Create JSCGovernor
- Create JSCCabinet
- Create UUPSUpgradeable

Contracts have parameters that affect their operation
For example Contract A has votingPeriod for each revision
Changing that parameter can be done using revisions too
Revisions for changing parameters all use the same rules defined at the level of the contract

Governance Notes
- Do we need the ERC20 implementation for voting rights? 
  - Only if different members have different voting power
  - Or we want to allow members to delegate their vote
  - No, not in the PoC
- Do we need the checkpoints?
  - No because votes cannot be delegated
- Do we need the timelock code?
  - No unless we need to separate logic if the governor contract is too big
- Who pays for everything?
  - Proposals and Voting? Can we allow members to vote using transactions paid for by the jurisdiction?
    - For example, can the jurisdiction operate even if members have no ETH?
    - We can do something similar to EIP-2612. The members sign their vote and give it to a web application hosted by the property registry who submits the vote for them and pays the gas fees. The vote is signed and so there is no possibility of fraud
    - There is sample code here: @openzeppelin\contracts\governance\Governor.sol:castVoteBySig()

  - Transfer ownership? Owner + buyer (two transactions)
    - In this case the EIP-2612 mechanism might be useful too
    - It would allow the member to sign a message that let's the website submit vote for them and pay the gas fees

