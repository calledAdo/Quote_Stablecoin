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
      url: "https://opt-sepolia.g.alchemy.com/v2/zsoQaUYmxYoVt54fgM39Ai1gKBtpQh6b",
      accounts: {
        mnemonic:
          "satoshi cry weird easily flame educate tail accident siren open flush cause",
      },
    },
  },
  //npx hardhat verify --network <network> DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
  etherscan: {
    apiKey: {
      Opsepolia: "6b15508c-3e4c-402c-8c66-a07c6e880e37",
    },
    customChains: [
      {
        network: "Opsepolia",
        chainId: 11155420,
        urls: {
          apiURL:
            "https://optimism-sepolia.blockscout.com/6b15508c-3e4c-402c-8c66-a07c6e880e37",
          browserURL: "https://optimism-sepolia.blockscout.com/",
        },
      },
    ],
  },
};

export default config;
