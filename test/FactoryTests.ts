// import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { expect } from "chai";
// import hre from "hardhat";

// describe("Factory", function () {
//   //State 0 :Deploying contract
//   async function deployFactory() {
//     const aggregatorAddress = "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7";
//     const [owner, otherAccount] = await hre.ethers.getSigners();
//     const priceFeed = await hre.ethers.getContractFactory("PriceFeed");
//     //deploy priceFeed
//     const PriceFeed = await priceFeed.deploy(aggregatorAddress);

//     //get price feed address to pass to Factory
//     const priceFeedAddress = await PriceFeed.getAddress();
//     const minter = await hre.ethers.getContractFactory("Factory", owner);

//     //deploy Factory
//     const Factory = await minter.deploy(priceFeedAddress, true);
//     await Factory.waitForDeployment();
//     const factoryAddress = await Factory.getAddress();
//     const LETH_TOKEN = await hre.ethers.getContractAt(
//       "ERC20",
//       await Factory.LETH_TOKEN(),
//       owner
//     );
//     const QUOTE_TOKEN = await hre.ethers.getContractAt(
//       "ERC20",
//       await Factory.QUOTE_TOKEN(),
//       owner
//     );
//     return {
//       Factory,
//       owner,
//       otherAccount,
//       LETH_TOKEN,
//       QUOTE_TOKEN,
//       factoryAddress,
//     };
//   }

//   //State 1:Minting LETH initially
//   async function MintedLETH() {
//     const { Factory, owner } = await loadFixture(deployFactory);
//     const amountToSend = hre.ethers.parseEther("1");
//     await Factory.connect(owner).mintLETH({ value: amountToSend });
//     return {
//       Factory,
//       owner,
//     };
//   }

//   //State 2:Minting QUOTE initailly
//   async function mintedQUOTE() {
//     const { Factory, owner } = await loadFixture(MintedLETH);
//     const amountIn = hre.ethers.parseEther("0.1");
//     await Factory.connect(owner).mintQUOTE({ value: amountIn });
//     return { Factory, owner };
//   }
//   describe("Minting and Burning QUOTE", function () {
//     it("Should mint QUOTE successfully  above lower collateral cap", async function () {
//       const { factoryAddress } = await loadFixture(deployFactory);
//       //starts at State 1 sanpshot
//       const { Factory } = await loadFixture(mintedQUOTE);
//       const amountIn = hre.ethers.parseEther("0.1");
//       expect(await Factory.mintQUOTE({ value: amountIn })).not.to.be.reverted;
//     });
//     it("Should fail to mint QUOTE above upper collateral cap", async function () {
//       //starts at State 1 snapshot
//       //Tests:that minting isn't allowed when above
//       const { Factory } = await loadFixture(MintedLETH);
//       const amountIn = hre.ethers.parseEther("0.3");
//       expect(
//         await Factory.mintQUOTE({ value: amountIn })
//       ).to.be.revertedWithCustomError(Factory, "BelowMinCollateralMultiplier");
//     });
//     it("Should burn all QUOTE at any time", async function () {
//       const { QUOTE_TOKEN } = await loadFixture(deployFactory);
//       const { Factory, owner } = await loadFixture(mintedQUOTE);
//       const userbalance = await QUOTE_TOKEN.balanceOf(owner.address);
//       expect(await Factory.burnQUOTE(userbalance)).not.to.be.reverted;
//     });
//   });
//   describe("Burning and Minting LETH", function () {
//     it("Should mint LETH without restriction when quote total Supply is zero", async function () {
//       const { LETH_TOKEN, otherAccount } = await loadFixture(deployFactory);
//       const { Factory, owner } = await loadFixture(MintedLETH);
//       const ownerBalance = await LETH_TOKEN.balanceOf(owner.address);
//       const amountIn = hre.ethers.parseEther("1");
//       await Factory.connect(otherAccount).mintLETH({
//         value: amountIn,
//       });
//       const otherAccountBalance = await LETH_TOKEN.balanceOf(
//         otherAccount.address
//       );
//       expect(otherAccountBalance).to.be.equal(ownerBalance);
//     });
//     it("Should fail to mint LETH when it leads to overcollateralization", async function () {
//       const { Factory, owner } = await loadFixture(mintedQUOTE);
//       const amountIn = hre.ethers.parseEther("1");
//       await expect(
//         Factory.mintLETH({ value: amountIn })
//       ).to.be.revertedWithCustomError(Factory, "AboveMaxCollateralMultiplier");
//     });
//     it("Should fail to burn LETH if it leads to undercollateralization", async function () {
//       const { LETH_TOKEN } = await loadFixture(deployFactory);
//       const { Factory, owner } = await loadFixture(mintedQUOTE);
//       const ownerBalance = await LETH_TOKEN.balanceOf(owner.address);
//       await expect(
//         Factory.burnLETH(ownerBalance)
//       ).to.be.revertedWithCustomError(Factory, "BelowMinCollateralMultiplier");
//     });
//   });
// });
