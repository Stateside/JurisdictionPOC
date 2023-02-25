# Jurisdiction Smart Contracts
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

To create database entries for the sample proposals used in development and the local webserver, run the following command:

```
yarn hardhat save-proposals --network localhost
```

On the staging server this command looks like this:

```
node node_modules/hardhat/internal/cli/cli.js save-proposals --network localhost --config hardhat.config.staging.ts
```

You can change the webserver and the prefix for the contracts that are used to create the proposals as follows:

```
yarn hardhat save-proposals --website https://jurisdictions.stateside.agency --prefix development --network localhost
```

# How to prepopulate the staging Blockchain network (an instance of Geth running in dev mode) with the develpment contracts and sample data

1. Deploy the contracts to Geth using the following command. This will deploy new instances of the contrats and initialize them with a sample jurisdiction and data:
```bash
yarn hardhat deploy --network staging --tags development
```
2. Save the deployed contracts to the database using the following command:
```bash
yarn hardhat save-contracts --network staging
```
3. Save the sample proposals to the database using the following command:
```bash
yarn hardhat save-proposals --network staging --prefix development
```
4. Save the recent activity related to th sample data
```bash
yarn hardhat save-recent-activity --network staging --prefix development --frontend staging
```

# Tasks

- Create UUPSUpgradeable
- Who pays for everything?
  - Proposals and Voting? Can we allow members to vote using transactions paid for by the jurisdiction?
    - For example, can the jurisdiction operate even if members have no ETH?
    - We can do something similar to EIP-2612. The members sign their vote and give it to a web application hosted by the property registry who submits the vote for them and pays the gas fees. The vote is signed and so there is no possibility of fraud
    - There is sample code here: @openzeppelin\contracts\governance\Governor.sol:castVoteBySig()

# TO DO

- Calculate quorum from number of members in cabinet - currently hardcoded to 3
- Add a page that shows all of my properties in all jurisdictions
- Some buttons do not have a hover or click style
- SpecialSelect should include the address field beside it always
  - changing alias dropdown should update the address field
  - editing the alias dropdown should do one of the following
    - if the alias is not known, save it as an alias in the DB for the address in the address field once the containing form is submitted
    - if the alias is known, update the address field with the known address
  - editing the address field should do one of the following
    - if the address has an alias then auto select it in the dropdown
    - if the address is new and an alias is specified, save it as an alias in the DB for the address in the address field once the containing form is submitted
- Add Token ID as a type to revisions
- Cache the suggested properties and proposals that are shown at the bottom of the home page inside the appropriate zustand state 
- Add Unit Tests for different voting rules
- Add a boolean to the individual tokens to enable NFT support
- Reformat comments to follow the NatSpec format...https://docs.soliditylang.org/en/v0.8.15/natspec-format.html
- Add tests for contracts when the governor is the owner
- Test frozen jurisdiction, cabinet, and governor contracts
- Test pages with jurisdiciton address that is not in the database
- Switch RevisionMap implementation in JSCRevisioned to use OpenZeppelins EnumerableSet
- Switch TokenIdList and OfferList implementations in JSCTitleTokens to use OpenZeppelins EnumerableSet
- Analyze contracts with some vulnerability scanners like Mythril, Slither, and Securify
- Add mechanism to contracts to allow the registry to pay for operations performed by members
  - This can be done by the member signing a request to perform some operation and sending the request to 
    the registry front end that then performs the operation on the member´s behalf. This can be done
    using the EIP-712 standard. An example is implemented in @openzeppelin\contracts\governance\Governor.sol
- add jurisdiction to titletoken and cabinet and make sure this is is validated properly inside contracts
- add function to validate jurisdictions (make sure they are properly initialized and secured)
- Add support for parameter types: token id
- Add button to jump forward in time to the next voting period for Geth
Payments
1. Pay registry fees
2. Pay maintainer fees
3. revisions to withdraw or deposit 
4. add initializer modifier
