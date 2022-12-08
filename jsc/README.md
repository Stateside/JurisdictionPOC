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

To install all dependencies, type:
```
yarn
```

---
To compile all smart contracts and update the jsc/typechain-types folder, type:
```
yarn hardhat compile
```

---
To execute all the smart contract unit tests, type:
```
yarn hardhat test
```

---
To run an instance of the hardhat blockchain simulation (Starts a JSON-RPC server on top of Hardhat EVM), type:
```
yarn hardhat node --tags development
```
This will run the "localhost" blockchain with only the "development" contracts deployed.

---
To deploy updated contracts to the running localhost blockchain for testing the frontend, type:
```
yarn hardhat deploy --reset --network localhost --tags development
```
This will remove all old deployments (--reset), deploy them to the "localhost" blockchain (rather than the "hardhat" one used for unit testing), and deploy only the development contracts.

---
To see the addresses of deployed development contracts perform the following series of steps, type:
```
yarn hardhat deploy --reset --network localhost --tags development
cd ../frontend
yarn dev
```
Then open your browser and vist the URL http://localhost:3000/api/getContracts

---
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

- Register offers to sell I have received
- Add a parameters to JSCTitleToken to indicate how much ownership transfers cost (pay fee to registry + pay fee to a maintainer)
- Add a parameter to the title token to disable NFT support
- Add a boolean to the individual tokens to enable NFT support
- Reformat comments to follow the NatSpec format...https://docs.soliditylang.org/en/v0.8.15/natspec-format.html
- Add tests for contracts when the governor is the owner
- Test frozen jurisdiction, cabinet, and governor contracts
- Switch RevisionMap implementation in JSCRevisioned to use OpenZeppelins EnumerableSet
- Switch TokenIdList and OfferList implementations in JSCTitleTokens to use OpenZeppelins EnumerableSet
- Analyze contracts with some vulnerability scanners like Mythril, Slither, and Securify
- Add parameters to contracts to control voting rules for revisions
- Add mechanism to contracts to allow the registry to pay for operations performed by members
  - This can be done by the member signing a request to perform some operation and sending the request to 
    the registry front end that then performs the operation on the member´s behalf. This can be done
    using the EIP-712 standard. An example is implemented in @openzeppelin\contracts\governance\Governor.sol

Deployments
cfn to 
  create server
  create pipeline
  
set up 

Payments
1. Pay registry fees
2. Pay maintainer fees
3. revisions to withdraw or deposit 
4. add initializer modifier
