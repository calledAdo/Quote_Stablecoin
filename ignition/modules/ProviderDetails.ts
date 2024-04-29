import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { defaultAccounts } from "ethereum-waffle";

//scroll :0x785fd27fed0b2AA387B4c014d3ec1Cce6b67c7AE
const ProviderDetails = buildModule("ProviderDetails", (m) => {
  const ProviderDetailsFetcher = m.contract("ProviderDetailsFetcher", []);
  return { ProviderDetailsFetcher };
});

export default ProviderDetails;
