import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
//0x694AA1769357215DE4FAC081bf1f309aDC325306
const PriceFeedModule = buildModule("PriceFeedModule", (m) => {
  const priceFeed = m.getParameter(
    "priceFeed",
    "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7"
  );

  const PriceFeed = m.contract("PriceFeed", [priceFeed]);

  return { PriceFeed };
});

export default PriceFeedModule;
