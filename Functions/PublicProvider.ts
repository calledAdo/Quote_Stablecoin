import { ethers } from "hardhat";

let publicProvider = "";

/**
 *
 * @param amount The amount in see(LETHTOETH)
 *
 * @param toQuote  true if converting from eth to quote and false if the reverse
 * @returns
 */
export const ETHTOQUOTE = async (
  amount: bigint,
  toQuote: boolean
): Promise<bigint> => {
  const provider = await ethers.getContractAt("PublicProvider", publicProvider);
  const value = await provider.quoteXweiConverter(amount, toQuote);
  return value;
};

/**
 * @param amount the amount going in eg'
 * if trying to convert 1 leth to ETH, the amount in is 1
 *
 * @param toLETH true if converting from ETH to LETH and false if the reverse(i.e converting from LETH to ETH)\
 */
export const LETHTOETH = async (
  amount: bigint,
  toLETH: boolean
): Promise<bigint> => {
  const provider = await ethers.getContractAt("PublicProvider", publicProvider);
  const value = await provider.lethXETHConverter(amount, toLETH);
  return value;
};

export const mintQUOTE = async (amount: bigint) => {
  const provider = await ethers.getContractAt("PublicProvider", publicProvider);
  await provider.mintQUOTE({ value: amount });
};

export const burnQUOTE = async (amount: bigint) => {
  const provider = await ethers.getContractAt("PublicProvider", publicProvider);
  await provider.burnQUOTE(amount);
};

export const mintLETH = async (amount: bigint) => {
  const provider = await ethers.getContractAt("PublicProvider", publicProvider);
  await provider.mintLETH({ value: amount });
};

export const burnLETH = async (amount: bigint) => {
  const provider = await ethers.getContractAt("PublicProvider", publicProvider);
  await provider.burnLETH(amount);
};
