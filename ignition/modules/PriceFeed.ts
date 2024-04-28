import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
//
//scroll_sepolia = 0xfd3548C0b15c3B12EaF689c520d0381E7ef0c501
const PriceFeedModule = buildModule("PriceFeedModule", (m) => {
  const priceFeed = m.getParameter(
    "priceFeed",
    "0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41"
  );

  const PriceFeed = m.contract("PriceFeed", [priceFeed]);

  return { PriceFeed };
});

export default PriceFeedModule;

//ganache address 0xb5954EFfAe20aa146Ed70ab0853786e2958d0D5E
