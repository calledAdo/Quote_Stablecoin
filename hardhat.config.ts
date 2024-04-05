import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const MNEMONIC = vars.get("MNEMONIC");
const SEPOLIA_URL = vars.get("SEPOLIA_URL");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ETHsepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/2sp6Bmjb4ES43w79-eMV2vrIHfFQOjjT",
      accounts: {
        mnemonic:
          "satoshi cry weird easily flame educate tail accident siren open flush cause",
      },
    },
    Opsepolia: {
      url: "https://opt-sepolia.g.alchemy.com/v2/yeqRzYLLtD_2PvgkyQbms0GmhPvVzaxM",
      accounts: {
        mnemonic:
          "satoshi cry weird easily flame educate tail accident siren open flush cause",
      },
    },
  },
};

export default config;
