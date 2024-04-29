import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
//scroll factory :0xc7078EF8707c029988fA1b863f400667DC8e0D45
const FactoryModule = buildModule("FactoryModule", (m) => {
  const globalState_ = m.getParameter(
    "globalState_",
    "0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a"
  );
  const priceFeed_ = m.getParameter(
    "priceFeed_",
    "0xfd3548C0b15c3B12EaF689c520d0381E7ef0c501"
  );
  const aaveGateway_ = m.getParameter(
    "aaveGateway_",
    "0x57ce905CfD7f986A929A26b006f797d181dB706e"
  );
  const aToken_ = m.getParameter(
    "aToken_",
    "0x9E8CEC4F2F4596141B62e88966D7167E9db555aD"
  );

  const Factory = m.contract("Factory", [
    globalState_,
    priceFeed_,
    aaveGateway_,
    aToken_,
  ]);
  return { Factory };
});

export default FactoryModule;
