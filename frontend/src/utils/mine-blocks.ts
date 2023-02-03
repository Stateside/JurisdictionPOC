import { ethers } from "ethers";

export const mineBlocks = async (amount: number) => {
  if (amount === 0)
    return;

  const chainUrl = process.env.NEXT_PUBLIC_CHAIN_RPC_URL||""
  if (chainUrl)
    for (let index = 0; index < amount; index++)
      await (new ethers.providers.JsonRpcProvider(chainUrl)).send("evm_mine", [])
}
