import { JSCProposableTest } from "../../typechain-types"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect, use as chaiuse } from "chai"

import { solidity } from "ethereum-waffle";
import { defaultAbiCoder } from "ethers/lib/utils"
chaiuse(solidity);

describe("JSCProposableTest", async () => {
  let proposable: JSCProposableTest

  beforeEach(async () => {
    await deployments.fixture(["all"])
    proposable = await ethers.getContract("JSCProposableTest")
  })

  it("iterates revisions", async () => {
    let i = await proposable.iterateRevisions()
    await expect((await proposable.revisionIteratorGet(i)).name).to.be.equal("first")
    i = await proposable.nextRevision(i)
    await expect((await proposable.revisionIteratorGet(i)).name).to.be.equal("second")
    i = await proposable.nextRevision(i)
    await expect((await proposable.revisionIteratorGet(i)).name).to.be.equal("third")
    i = await proposable.nextRevision(i)
    await expect(proposable.revisionIteratorGet(i)).to.be.revertedWith("Invalid iterator")
  })

  it("reverts on duplicate revision", async () => {
    await expect(proposable.addDuplicate()).to.be.revertedWith("Revision with same name already exists")
  })

  it("removes revisions", async () => {
    await expect((await proposable.first()).name).to.be.equal("first")
    let tresponse = proposable.remove("first");
    await expect(tresponse).to.not.be.reverted;
    await expect(tresponse).to.emit(proposable, "RevisionRemoved").withArgs("first");
    await expect((await proposable.first()).name).to.be.equal("second")
  })

  it("executes string revision", async () => {
    await expect((await proposable.rev())).to.be.equal("none");
    let tresponse = proposable.executeRevision("first", defaultAbiCoder.encode(["string"],["rev1"]));
    await expect(tresponse).to.emit(proposable, "RevisionExecuted").withArgs("first");
    await expect((await proposable.rev())).to.be.equal("rev1")
  })

  it("executes number revision", async () => {
    await expect((await proposable.rev())).to.be.equal("none");
    let tresponse = proposable.executeRevision("second", defaultAbiCoder.encode(["uint"],[1]));
    await expect(tresponse).to.emit(proposable, "RevisionExecuted").withArgs("second");
    await expect((await proposable.rev())).to.be.equal("1")
  })

  it("executes address revision", async () => {
    await expect((await proposable.rev())).to.be.equal("none");
    let tresponse = proposable.executeRevision("third", defaultAbiCoder.encode(["address"],["0x111122223333444455556666777788889999aaaa"]));
    await expect(tresponse).to.emit(proposable, "RevisionExecuted").withArgs("third");
    await expect((await proposable.rev())).to.be.equal("0x111122223333444455556666777788889999aaaa")
  })
})
