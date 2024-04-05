import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("PriceFeed", function () {
  async function deployPriceFeed() {
    const aggregatorAddress = "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7";
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const priceFeed = await hre.ethers.getContractFactory("PriceFeed");
    const PriceFeed = await priceFeed.deploy(aggregatorAddress);
    return PriceFeed;
  }

  describe("Deployement", function () {
    it("it should return dummy price", async function () {
      const PriceFeed = await loadFixture(deployPriceFeed);

      expect((await PriceFeed.getPrice(true)).answer).to.equal(
        BigInt(4000 * 10 ** 8)
      );
    });
    it("it should return the right decimals", async function () {
      const PriceFeed = await loadFixture(deployPriceFeed);

      expect((await PriceFeed.getPrice(true)).decimal).to.equal(8n);
    });
  });
});
