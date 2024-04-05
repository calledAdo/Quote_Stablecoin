import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const percentageDifference = (amount: bigint, perc: number): bigint => {
  const percentage = (amount * BigInt(perc)) / 100n;
  return amount - percentage;
};

const amount = hre.ethers.parseEther("1");

describe("Minter", function () {
  async function deployMinter() {
    const aggregatorAddress = "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7";
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const priceFeed = await hre.ethers.getContractFactory("PriceFeed");
    //deploy priceFeed
    const PriceFeed = await priceFeed.deploy(aggregatorAddress);

    //get price feed address to pass to Minter
    const priceFeedAddress = await PriceFeed.getAddress();
    const minter = await hre.ethers.getContractFactory("Minter");

    //deploy Minter
    const Minter = await minter.deploy(priceFeedAddress, true);

    return { Minter, owner, otherAccount };
  }
  describe("Deployment", function () {
    it("Checks that balance of pool is zero on  initialization", async function () {
      const { Minter } = await loadFixture(deployMinter);
      const MinterBalance = await hre.ethers.provider.getBalance(
        await Minter.getAddress()
      );
      expect(MinterBalance).to.equal(0n);
    });
  });
  // describe("Minting LETH ", function () {
  //   it("Checks that Initial Minting is not restricted by the overcollaterilzation until quote is minted ", async function () {
  //     const { Minter, owner } = await loadFixture(deployMinter);
  //     const tokenAddress = await Minter.LETH_TOKEN();
  //     const token = await hre.ethers.getContractAt(
  //       "OwnableERC20",
  //       tokenAddress,
  //       owner
  //     );
  //     //mints some LETH
  //     const mintTx = await Minter.mintLETH({ value: amount });

  //     await mintTx.wait();
  //     //checks the updated token balance
  //     const newTokenBalance = await token.balanceOf(owner);

  //     //new token balance should be the same as running equivalent
  //     expect(newTokenBalance).to.equal(percentageDifference(amount, 1));
  //   });

  //   it("Checks that minting of QUOTE  works well above max collteral ratio", async function () {
  //     const { Minter, owner } = await loadFixture(deployMinter);
  //     const quoteAddress = await Minter.QUOTE_TOKEN();
  //     const token = await hre.ethers.getContractAt(
  //       "OwnableERC20",
  //       quoteAddress,
  //       owner
  //     );
  //     const amountIn = hre.ethers.parseEther("0.20");
  //     const mintTX = await Minter.mintQUOTE({ value: amountIn });

  //     await mintTX.wait();

  //     const newTokenBalance = await token.balanceOf(owner);

  //     expect(newTokenBalance).to.equal(
  //       percentageDifference(4000n * amountIn, 1)
  //     );
  //   });
  // });

  // describe("Minting QUOTE", function () {
  //   it("Should fail if max collateral ratio has been exceeded", async function () {
  //     const { Minter, owner } = await loadFixture(deployMinter);
  //     const amountIn = hre.ethers.parseEther("0.30");
  //     expect(
  //       await Minter.mintQUOTE({ value: amountIn })
  //     ).to.be.revertedWithCustomError(Minter, "BelowMinCollateralRatio");
  //   });
  // });
  describe("Burning  QUOTE", function () {
    it("QUOTE can be burnt at anytime", async function () {
      const { Minter, owner } = await loadFixture(deployMinter);

      const amouuntForLETH = hre.ethers.parseEther("1");
      await Minter.mintLETH({ value: amouuntForLETH });
      const amountIn = hre.ethers.parseEther("0.3");
      const mintTx = await Minter.mintQUOTE({ value: amountIn });
      const amounttoBurn = hre.ethers.parseEther("10");
      expect(await Minter.burnQUOTE(amounttoBurn)).not.to.be.reverted;
    });
  });
});
