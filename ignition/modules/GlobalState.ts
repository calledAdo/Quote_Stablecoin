import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
//Arbitrum address:0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a
const GlobalStateModule = buildModule("GlobalStateModule", (m) => {
  const GlobalState = m.contract("GlobalState", []);

  return { GlobalState };
});

export default GlobalStateModule;

//ganache address  0x184E148E03e3301cA84F0E52a0bB700D3D218bae
//scroll 0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a
