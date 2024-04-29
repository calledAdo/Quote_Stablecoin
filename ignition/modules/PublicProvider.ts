import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
//quote : 0xee34967433c3c631d81b337ee14113440736d09c
//scroll :0xe91AD4a4ec8112D9323cDAFf5c6F97B1e13502F7
const PublicProviderModule = buildModule("PublicProviderModule", (m) => {
  const priceFeed_ = m.getParameter(
    "priceFeed_",
    "0xfd3548C0b15c3B12EaF689c520d0381E7ef0c501"
  );

  const globalState_ = m.getParameter(
    "globalState_",
    "0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a"
  );

  const quote_token_ = m.getParameter(
    "quote_token_",
    "0xee34967433c3c631d81b337ee14113440736d09c"
  );
  const PublicProvider = m.contract("PublicProvider", [
    priceFeed_,
    globalState_,
    quote_token_,
  ]);

  return { PublicProvider };
});

export default PublicProviderModule;
