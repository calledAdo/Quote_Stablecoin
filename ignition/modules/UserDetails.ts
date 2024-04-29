import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { defaultAccounts } from "ethereum-waffle";

//scroll :0x318184E7fE747646c13C4D879E7bC04152aC03bB
const UserDetails = buildModule("UserDetails", (m) => {
  const UserDetailsFetcher = m.contract("UserDetailsFetcher", []);
  return { UserDetailsFetcher };
});

export default UserDetails;
