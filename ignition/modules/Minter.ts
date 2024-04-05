import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

//ETH_PRICEFEED = 0x1e98245dC34032610016c0810ab1fD9b43fAeF87
//OP_PRICEFEED = 0xfd3548C0b15c3B12EaF689c520d0381E7ef0c501
const MinterModule = buildModule("MinterModule", (m) => {
  const priceFeed = m.getParameter(
    "priceFeed",
    "0xfd3548C0b15c3B12EaF689c520d0381E7ef0c501"
  );
  const validity = m.getParameter("isdummy", false);

  const Minter = m.contract("Minter", [priceFeed, validity]);
  return { Minter };
});

export default MinterModule;
