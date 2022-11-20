# Jurisdiciton Smart Contracts
See [Docs](https://docs.google.com/document/d/1alcg28Ip54dXeU0KLeHTLtxxGtojkLuvdxDac-giKKg) for details

In this proof of concept we will have 4 smart contracts

- JSCJurisdiction is the top level container for all other smart contracts
- JSCCabinet maintains the list of cabinet members and their roles
- JSCGovernor accepts proposals and allows cabinet members to vote on them
- JSCTitleTokens maintains a collection of all issued title tokens

We will also have several abstract contracts that act as base classes

- JSCConfigurable which gives them the ability to have configurable settings that can be changed using revisions and proposals
- JSCRevisioned which provides functionality for registering Revisions and executing them.
- UUPSUpgradeable (or something similar) to allow the smart contract to be upgradeable. 

# Development

To insall all dependencies run 
```
yarn
```

To compile all smart contracts and update the typechain-types run
```
yarn hardhat compile
```

To run smart contract unit tests run
```
yarn hardhat test
```

To run an instance of the hardhat blockchain simulation (Starts a JSON-RPC server on top of Hardhat EVM)
```
yarn hardhat node
```

To deploy contracts to the localhost blockchain run
```
yarn hardhat deploy
```

For other commands run
```
yarn hardhat --help
```

# Tasks

- Create UUPSUpgradeable
- Who pays for everything?
  - Proposals and Voting? Can we allow members to vote using transactions paid for by the jurisdiction?
    - For example, can the jurisdiction operate even if members have no ETH?
    - We can do something similar to EIP-2612. The members sign their vote and give it to a web application hosted by the property registry who submits the vote for them and pays the gas fees. The vote is signed and so there is no possibility of fraud
    - There is sample code here: @openzeppelin\contracts\governance\Governor.sol:castVoteBySig()

  - Transfer ownership? Owner + buyer (two transactions)
    - In this case the EIP-2612 mechanism might be useful too
    - It would allow the member to sign a message that let's the website submit vote for them and pay the gas fees

# TO DO

- Add payments to the offer transactions in JSCTitleToken
- Add a parameter to JSVTitleToken to indicate how much ownership transfers cost
- Make sure operators and approvers do not have more permissins than required
- Add a parameter to the title token to disable NFT support
- Add a boolean to the individual tokens to enable NFT support
- Reformat comments to follow the NatSpec format...https://docs.soliditylang.org/en/v0.8.15/natspec-format.html
- Add tests for contracts when the gover is the owner
- Test frozen jurisdiciton, and governor contracts
- Switch RevisionMap implementation in JSCRevisioned to use OpenZeppelins EnumerableSet
- Switch TokenIdList and OfferList implementations in JSCTitleTokens to use OpenZeppelins EnumerableSet
- Analyze contracts with some vulnerabulity scanners like Mythril, Slither, and Securify