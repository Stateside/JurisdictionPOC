import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect } from "chai"
import * as helpers from "@nomicfoundation/hardhat-network-helpers";
import { defaultAbiCoder } from "ethers/lib/utils"
import * as iid from "../../utils/getInterfaceId"
import accounts from "../../utils/accounts"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

/**
 * Runs a collection of tests to ensure that the JSCTitleToken contract behaves as expected.
 * Includes tests for ERC-721 compliance.
 */
describe("JSCTitleTokenNoNFT", async () => {
  let tokenReceiver: tc.JSCTitleTokenReceiverTest
  let jurisdiction: tc.IJSCJurisdiction
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any
  let titleTokenLib: tc.JSCTitleTokenLib

  let owner, bob, jane, sara, bryan, otherAccounts;

  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const badTokenId1 = 12345;
  const titleId1 = "title-1";
  const titleId2 = "title-2";
  const titleId3 = "title-3";

  const ONE_MINUTE = 60;

  const retrieveLastBlock = async (verbose?:any):Promise<any> => {
    let bn = await ethers.provider.getBlockNumber();
    let block:any = await ethers.provider.getBlock(bn);
    if (verbose)
      console.log(bn + ": ", block.timestamp);
    return block;
  }

  const deployTitleTokenNoNFT = async () => {
    await deployments.fixture(["unittests"]);
    tokenReceiver = await ethers.getContract("unittests_JSCTitleTokenReceiverTest");
    jurisdiction = await ethers.getContract("unittests_JSCJurisdiction");
    revisionsLib = await ethers.getContract("unittests_JSCRevisionsLib");
    configurableLib = await ethers.getContract("unittests_JSCConfigurableLib");
    titleTokenLib = await ethers.getContract("unittests_JSCTitleTokenLib");
    
    const contract = await ethers.getContractFactory("JSCTitleToken", {
      libraries: {
        JSCRevisionsLib: revisionsLib.address,
        JSCConfigurableLib: configurableLib.address,
        JSCTitleTokenLib: titleTokenLib.address
      },
    });
    const titleTokenNoNFT = await contract.deploy() as tc.IJSCTitleToken;
    await titleTokenNoNFT.init(
      "Development Tokens",
      "DEV",
      "http://localhost:3000/tokens/",
      jurisdiction.address,
      zeroAddress,
      0,
      zeroAddress,
      0,
      false,
      zeroAddress
    )  

    return { titleTokenNoNFT };
  }

  beforeEach(async () => {
    [owner, bob, sara, jane, bryan, ...otherAccounts] = await ethers.getSigners();
  });

  it('(ERC721) correctly mints an NFT', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    expect(await titleTokenNoNFT.mint(bob.address, titleId1)).to.emit(titleTokenNoNFT, 'Transfer').withArgs(zeroAddress, bob.address, await titleTokenNoNFT.titleToTokenId(titleId1));
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(1);
  });

  it('(ERC721) returns correct balanceOf', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(1);
    await titleTokenNoNFT.mint(bob.address, titleId2);
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(2);
  });

  it('(ERC721) throws when trying to get count of NFTs owned by 0x0 address', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await expect(titleTokenNoNFT.balanceOf(zeroAddress)).to.be.revertedWith('address zero is not a valid owner');
  });

  it('(ERC721) throws when trying to mint 2 NFTs with the same ids', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    await expect(titleTokenNoNFT.mint(bob.address, titleId1)).to.be.revertedWith('token already minted');
  });

  it('(ERC721) throws when trying to mint NFT to 0x0 address', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await expect(titleTokenNoNFT.mint(zeroAddress, titleId1)).to.be.revertedWith('mint to the zero address');
  });

  it('(ERC721) finds the correct owner of titleTokenNoNFT id', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    expect(await titleTokenNoNFT.ownerOf(await titleTokenNoNFT.titleToTokenId(titleId1))).to.equal(bob.address);
  });

  it('(ERC721) throws when trying to find owner of non-existing NFT id', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await expect(titleTokenNoNFT.ownerOf(badTokenId1)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) throws when trying to approve or cancel accounts', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.connect(bob).approve(sara.address, tokenId)).to.be.revertedWith("NFT support disabled");
    await expect(titleTokenNoNFT.connect(sara).approve(jane.address, tokenId)).to.be.revertedWith("NFT support disabled");
    expect(await titleTokenNoNFT.getApproved(tokenId)).to.equal(zeroAddress);
    await expect(titleTokenNoNFT.connect(bob).approve(zeroAddress, tokenId)).to.be.revertedWith("NFT support disabled");
    expect(await titleTokenNoNFT.getApproved(tokenId)).to.equal(zeroAddress);
  });

  it('(ERC721) throws when trying to get approval of non-existing NFT id', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await expect(titleTokenNoNFT.getApproved(badTokenId1)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) throws when trying to approve NFT ID from a third party', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.connect(sara).approve(sara.address, tokenId)).to.be.revertedWith("NFT support disabled");
  });

  it('(ERC721) throws when setting or cancelling an operator', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    await expect(titleTokenNoNFT.connect(bob).setApprovalForAll(sara.address, true)).to.be.revertedWith("NFT support disabled");
    expect(await titleTokenNoNFT.isApprovedForAll(bob.address, sara.address)).to.equal(false);
    await expect(titleTokenNoNFT.connect(bob).setApprovalForAll(sara.address, false)).to.be.revertedWith("NFT support disabled");
    expect(await titleTokenNoNFT.isApprovedForAll(bob.address, sara.address)).to.equal(false);
  });

  it('(ERC721) correctly transfers NFT from owner', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    
    await titleTokenNoNFT.connect(bob).transferFrom(bob.address, sara.address, tokenId);
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(0);
    expect(await titleTokenNoNFT.balanceOf(sara.address)).to.equal(1);
    expect(await titleTokenNoNFT.ownerOf(tokenId)).to.equal(sara.address);
  });

  it('(ERC721) throws when trying to transfer NFT as an address that is not owner, approved, or operator', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);

    await expect(titleTokenNoNFT.connect(sara).transferFrom(bob.address, jane.address, tokenId)).to.be.revertedWith('caller is not token owner nor approved');
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(1);
  });

  it('(ERC721) throws when trying to transfer NFT to a zero address', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.connect(bob).transferFrom(bob.address, zeroAddress, tokenId)).to.be.revertedWith('transfer to the zero address');
  });

  it('(ERC721) throws when trying to transfer an invalid NFT', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await expect(titleTokenNoNFT.connect(bob).transferFrom(bob.address, sara.address, badTokenId1)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) throws when safe transferring NFT from owner', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);

    await expect(titleTokenNoNFT.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, sara.address, tokenId)).to.be.revertedWith('NFT support disabled');
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(1);
    expect(await titleTokenNoNFT.balanceOf(sara.address)).to.equal(0);
    expect(await titleTokenNoNFT.ownerOf(tokenId)).to.equal(bob.address);
  });

  it('(ERC721) throws when trying to safe transfers NFT from owner to a smart contract', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, titleTokenNoNFT.address, tokenId)).to.be.revertedWith('NFT support disabled');
  });

  it('(ERC721) throws when safe transferring NFT from owner to smart contract that can receive NFTs', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, tokenReceiver.address, tokenId)).to.be.revertedWith('NFT support disabled');
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(1);
    expect(await titleTokenNoNFT.balanceOf(tokenReceiver.address)).to.equal(0);
    expect(await titleTokenNoNFT.ownerOf(tokenId)).to.equal(bob.address);
  });

  it('(ERC721) throws safe transferring NFT from owner to smart contract that can receive NFTs with data', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.connect(bob)['safeTransferFrom(address,address,uint256,bytes)'](bob.address, tokenReceiver.address, tokenId, '0x01')).to.be.revertedWith('NFT support disabled')
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(1);
    expect(await titleTokenNoNFT.balanceOf(tokenReceiver.address)).to.equal(0);
    expect(await titleTokenNoNFT.ownerOf(tokenId)).to.equal(bob.address);
  });

  it('(ERC721) correctly burns an NFT', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    expect(await titleTokenNoNFT.burn(tokenId)).to.emit(titleTokenNoNFT, 'Transfer').withArgs(bob.address, zeroAddress, tokenId);
    expect(await titleTokenNoNFT.balanceOf(bob.address)).to.equal(0);
    await expect(titleTokenNoNFT.ownerOf(tokenId)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) throws when trying to burn non existent NFT', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    let tokenId = await titleTokenNoNFT.titleToTokenId(titleId1);
    await expect(titleTokenNoNFT.burn(tokenId)).to.be.revertedWith('invalid token ID');
  });

  const eth2WEI = (eth:number):ethers.BigNumber => ethers.utils.parseEther(eth.toString())
  const wei2ETH = (wei:number):ethers.BigNumber => ethers.utils.formatEther(wei)
  const payETH = (eth:number):ethers.PayableOverrides => ({ value: eth2WEI(eth) })

  it('receives and iterates offers to buy', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);
    
    let b1:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b1.timestamp + ONE_MINUTE);

    // Get sara's and contract's balances before transaction
    let buyerPreBalance = await ethers.provider.getBalance(sara.address);
    let contractPreBalance = await ethers.provider.getBalance(titleTokenNoNFT.address);

    // Send transaction
    let tx = await titleTokenNoNFT.connect(sara).offerToBuy(tokenId1, eth2WEI(1), payETH(1))
    await expect(tx).to.emit(titleTokenNoNFT, 'OfferToBuy').withArgs(tokenId1, sara.address, eth2WEI(1));

    // Get receipt, gas used, and sara's new balance
    let receipt = await tx.wait()
    let gas = receipt.gasUsed.mul(receipt.effectiveGasPrice)
    let buyerPostBalance = await ethers.provider.getBalance(sara.address);
    let contractPostBalance = await ethers.provider.getBalance(titleTokenNoNFT.address);

    // Check balances after transaction
    await expect(buyerPostBalance).to.equal(buyerPreBalance.sub(gas).sub(eth2WEI(1)))
    await expect(contractPostBalance).to.equal(contractPreBalance.add(eth2WEI(1)))
    let b2:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b2.timestamp + ONE_MINUTE);

    // Get jane's and contract's balances before transaction
    buyerPreBalance = await ethers.provider.getBalance(jane.address);
    contractPreBalance = await ethers.provider.getBalance(titleTokenNoNFT.address);

    // Send transaction
    tx = await titleTokenNoNFT.connect(jane).offerToBuy(tokenId1, eth2WEI(2), payETH(2))
    await expect(tx).to.emit(titleTokenNoNFT, 'OfferToBuy').withArgs(tokenId1, jane.address, eth2WEI(2));

    // Get receipt, gas used, and sara's new balance
    receipt = await tx.wait()
    gas = receipt.gasUsed.mul(receipt.effectiveGasPrice)
    buyerPostBalance = await ethers.provider.getBalance(jane.address);
    contractPostBalance = await ethers.provider.getBalance(titleTokenNoNFT.address);

    // Check balances after transaction
    await expect(buyerPostBalance).to.equal(buyerPreBalance.sub(gas).sub(eth2WEI(2)))
    await expect(contractPostBalance).to.equal(contractPreBalance.add(eth2WEI(2)))
    let b3:any = await retrieveLastBlock();

    await expect(await titleTokenNoNFT.connect(bob).countOffersToBuy(tokenId1)).to.equal(2);
    
    let o = await titleTokenNoNFT.connect(bob).offerToBuyAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(sara.address);
    await expect(o.amount).to.equal(eth2WEI(1));
    await expect(o.offeredOn).to.equal(b2.timestamp);

    o = await titleTokenNoNFT.connect(bob).offerToBuyAtIndex(tokenId1, 1);
    await expect(o.buyer).to.equal(jane.address);
    await expect(o.amount).to.equal(eth2WEI(2));
    await expect(o.offeredOn).to.equal(b3.timestamp);

    await expect(titleTokenNoNFT.connect(bob).offerToBuyAtIndex(tokenId1, 2), "offerToBuyAtIndex(2) did not revert").to.be.revertedWith('unknown offer to buy');
  });

  it('cancels offers to buy', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);

    // Get sara's and contract's balances before transaction
    let saraPreBalance = await ethers.provider.getBalance(sara.address);
    let contractPreBalance = await ethers.provider.getBalance(titleTokenNoNFT.address);
    
    let tx = await titleTokenNoNFT.connect(sara).offerToBuy(tokenId1, eth2WEI(1), payETH(1))
    let receipt = await tx.wait()
    let gasUsedBySara = receipt.gasUsed.mul(receipt.effectiveGasPrice)

    await expect(tx).not.to.be.reverted;
    await expect(titleTokenNoNFT.connect(jane).offerToBuy(tokenId1, eth2WEI(2), payETH(2))).not.to.be.reverted;
    await expect(await titleTokenNoNFT.connect(bob).countOffersToBuy(tokenId1)).to.equal(2);

    tx = await titleTokenNoNFT.connect(sara).cancelOfferToBuy(tokenId1)
    receipt = await tx.wait()
    gasUsedBySara = gasUsedBySara.add(receipt.gasUsed.mul(receipt.effectiveGasPrice))

    await expect(tx).to.emit(titleTokenNoNFT, 'OfferToBuyCancelled').withArgs(tokenId1, sara.address);
    await expect(await titleTokenNoNFT.connect(bob).countOffersToBuy(tokenId1)).to.equal(1);
    let o = await titleTokenNoNFT.connect(bob).offerToBuyAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(jane.address);

    let saraPostBalance = await ethers.provider.getBalance(sara.address);
    let contractPostBalance = await ethers.provider.getBalance(titleTokenNoNFT.address);
    await expect(saraPostBalance).to.equal(saraPreBalance.sub(gasUsedBySara))
    await expect(contractPostBalance).to.equal(contractPreBalance+eth2WEI(2)) // Includes just Jane's offer
  });

  it('accepts offers to buy', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);

    let saraPreBalance = await ethers.provider.getBalance(sara.address);
    let bobPreBalance = await ethers.provider.getBalance(bob.address);

    let tx = await titleTokenNoNFT.connect(sara).offerToBuy(tokenId1, eth2WEI(1), payETH(1))
    await expect(tx).not.to.be.reverted;
    let receipt = await tx.wait()
    let gasUsedBySara = receipt.gasUsed.mul(receipt.effectiveGasPrice)

    tx = await titleTokenNoNFT.connect(bob).acceptOfferToBuy(tokenId1, sara.address)
    await expect(tx).not.to.be.reverted;
    receipt = await tx.wait()
    let gasUsedByBob = receipt.gasUsed.mul(receipt.effectiveGasPrice)

    await expect(tx)
      .to.emit(titleTokenNoNFT, 'Transfer').withArgs(bob.address, sara.address, tokenId1)
      .to.not.emit(titleTokenNoNFT, 'OfferToBuyCancelled');

    expect(await titleTokenNoNFT.ownerOf(tokenId1)).to.equal(sara.address);
    await expect(await titleTokenNoNFT.connect(sara).countOffersToBuy(tokenId1)).to.equal(0);

    let saraPostBalance = await ethers.provider.getBalance(sara.address);
    let bobPostBalance = await ethers.provider.getBalance(bob.address);
    await expect(saraPostBalance, "sara's balance is off").to.equal(saraPreBalance.sub(gasUsedBySara).sub(eth2WEI(1)))
    await expect(bobPostBalance, "bob's balance is off").to.equal(bobPreBalance.sub(gasUsedByBob).add(eth2WEI(1)))
  });

  it('receives and iterates offers to sell', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);
    
    let b1:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b1.timestamp + ONE_MINUTE);
    await expect(await titleTokenNoNFT.connect(bob).offerToSell(tokenId1, sara.address, 1000)).to.emit(titleTokenNoNFT, 'OfferToSell').withArgs(tokenId1, sara.address, 1000);
    let b2:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b2.timestamp + ONE_MINUTE);
    await expect(await titleTokenNoNFT.connect(bob).offerToSell(tokenId1, jane.address, 2000)).to.emit(titleTokenNoNFT, 'OfferToSell').withArgs(tokenId1, jane.address, 2000);
    let b3:any = await retrieveLastBlock();

    await expect(await titleTokenNoNFT.connect(bob).countOffersToSell(tokenId1)).to.equal(2);
    
    let o = await titleTokenNoNFT.connect(bob).offerToSellAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(sara.address);
    await expect(o.amount).to.equal(1000);
    await expect(o.offeredOn).to.equal(b2.timestamp);

    o = await titleTokenNoNFT.connect(bob).offerToSellAtIndex(tokenId1, 1);
    await expect(o.buyer).to.equal(jane.address);
    await expect(o.amount).to.equal(2000);
    await expect(o.offeredOn).to.equal(b3.timestamp);

    await expect(titleTokenNoNFT.connect(bob).offerToSellAtIndex(tokenId1, 2), "offerToBuyAtIndex(2) did not revert").to.be.revertedWith('unknown offer to sell');
  });

  it('cancels offers to sell', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);
    
    await expect(titleTokenNoNFT.connect(bob).offerToSell(tokenId1, sara.address, 1000)).not.to.be.reverted;
    await expect(titleTokenNoNFT.connect(bob).offerToSell(tokenId1, jane.address, 2000)).not.to.be.reverted;
    await expect(await titleTokenNoNFT.connect(bob).countOffersToSell(tokenId1)).to.equal(2);

    await expect(await titleTokenNoNFT.connect(bob).cancelOfferToSell(tokenId1, sara.address)).to.emit(titleTokenNoNFT, 'OfferToSellCancelled').withArgs(tokenId1, sara.address);
    await expect(await titleTokenNoNFT.connect(bob).countOffersToSell(tokenId1)).to.equal(1);
    let o = await titleTokenNoNFT.connect(bob).offerToSellAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(jane.address);
  });

  it('accepts offers to sell', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);

    let saraPreBalance = await ethers.provider.getBalance(sara.address);
    let bobPreBalance = await ethers.provider.getBalance(bob.address);

    let tx = await titleTokenNoNFT.connect(bob).offerToSell(tokenId1, sara.address, eth2WEI(1))
    await expect(tx).not.to.be.reverted;
    let receipt = await tx.wait()
    let gasUsedByBob = receipt.gasUsed.mul(receipt.effectiveGasPrice)

    tx = await titleTokenNoNFT.connect(sara).acceptOfferToSell(tokenId1, payETH(1))
    await expect(tx).not.to.be.reverted;
    receipt = await tx.wait()
    let gasUsedBySara = receipt.gasUsed.mul(receipt.effectiveGasPrice)

    await expect(tx)
      .to.emit(titleTokenNoNFT, 'Transfer').withArgs(bob.address, sara.address, tokenId1)
      .to.not.emit(titleTokenNoNFT, 'OfferToSellCancelled');
    
    expect(await titleTokenNoNFT.ownerOf(tokenId1)).to.equal(sara.address);
    await expect(await titleTokenNoNFT.connect(sara).countOffersToSell(tokenId1)).to.equal(0);

    let saraPostBalance = await ethers.provider.getBalance(sara.address);
    let bobPostBalance = await ethers.provider.getBalance(bob.address);
    await expect(saraPostBalance, "sara's balance is off").to.equal(saraPreBalance.sub(gasUsedBySara).sub(eth2WEI(1)))
    await expect(bobPostBalance, "bob's balance is off").to.equal(bobPreBalance.sub(gasUsedByBob).add(eth2WEI(1)))
  });

  it('accepts revisions to freeze & unfreeze contract', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await expect(await titleTokenNoNFT.isFrozen()).to.equal(false);
    let revArgs = defaultAbiCoder.encode(["bool"],[true]);
    let tresponse = titleTokenNoNFT.executeRevision("FreezeContract", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("FreezeContract", revArgs)
      .to.emit(titleTokenNoNFT, "ContractFrozen").withArgs(titleTokenNoNFT.address, true);
    await expect(await titleTokenNoNFT.isFrozen()).to.equal(true);
    revArgs = defaultAbiCoder.encode(["bool"],[false]);
    tresponse = titleTokenNoNFT.executeRevision("FreezeContract", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("FreezeContract", revArgs)
      .to.emit(titleTokenNoNFT, "ContractFrozen").withArgs(titleTokenNoNFT.address, false);
    await expect(await titleTokenNoNFT.isFrozen()).to.equal(false);
  });

  it('accepts revisions to freeze & unfreeze token', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);

    await expect(await titleTokenNoNFT.isFrozenToken(tokenId1)).to.equal(false);
    let revArgs = defaultAbiCoder.encode(["uint", "bool"],[tokenId1, true]);
    let tresponse = titleTokenNoNFT.executeRevision("FreezeToken", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("FreezeToken", revArgs)
      .to.emit(titleTokenNoNFT, "TokenFrozen").withArgs(tokenId1, true);
    await expect(await titleTokenNoNFT.isFrozenToken(tokenId1)).to.equal(true);
    revArgs = defaultAbiCoder.encode(["uint", "bool"],[tokenId1, false]);
    tresponse = titleTokenNoNFT.executeRevision("FreezeToken", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("FreezeToken", revArgs)
      .to.emit(titleTokenNoNFT, "TokenFrozen").withArgs(tokenId1, false);
    await expect(await titleTokenNoNFT.isFrozenToken(tokenId1)).to.equal(false);
  });

  it('accepts revisions to freeze & unfreeze owner', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);

    await expect(await titleTokenNoNFT.isFrozenOwner(bob.address)).to.equal(false);
    let revArgs = defaultAbiCoder.encode(["address", "bool"],[bob.address, true]);
    let tresponse = titleTokenNoNFT.executeRevision("FreezeOwner", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("FreezeOwner", revArgs)
      .to.emit(titleTokenNoNFT, "OwnerFrozen").withArgs(bob.address, true);
    await expect(await titleTokenNoNFT.isFrozenOwner(bob.address)).to.equal(true);
    revArgs = defaultAbiCoder.encode(["address", "bool"],[bob.address, false]);
    tresponse = titleTokenNoNFT.executeRevision("FreezeOwner", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("FreezeOwner", revArgs)
      .to.emit(titleTokenNoNFT, "OwnerFrozen").withArgs(bob.address, false);
    await expect(await titleTokenNoNFT.isFrozenOwner(bob.address)).to.equal(false);
  });

  it('accepts revision to change owner', async function() {
    const { titleTokenNoNFT } = await loadFixture(deployTitleTokenNoNFT);
    await titleTokenNoNFT.mint(bob.address, titleId1);
    let tokenId1 = await titleTokenNoNFT.titleToTokenId(titleId1);

    await expect(await titleTokenNoNFT.ownerOf(tokenId1)).to.equal(bob.address);
    let revArgs = defaultAbiCoder.encode(["uint", "address"],[tokenId1, sara.address]);
    let tresponse = titleTokenNoNFT.executeRevision("ChangeOwner", revArgs);
    await expect(tresponse)
      .to.emit(titleTokenNoNFT, "RevisionExecuted").withArgs("ChangeOwner", revArgs)
      .to.emit(titleTokenNoNFT, "Transfer").withArgs(bob.address, sara.address, tokenId1);
    await expect(await titleTokenNoNFT.ownerOf(tokenId1)).to.equal(sara.address);
  });

})
