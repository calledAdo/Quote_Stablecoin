import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

import { vars } from "hardhat/config";

const MNEMONIC = vars.get("MNEMONIC");
const SEPOLIA_URL = vars.get("SEPOLIA_URL");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: {
        mnemonic:
          "absurd helmet verb emerge sad grant another zoo medal jeans spider wing",
      },
    },
    arbitrumSepolia: {
      url: "https://arb-sepolia.g.alchemy.com/v2/0xEQ1Ty8X1FuJ1_MykwccXp_FfyPjatq",
      accounts: {
        mnemonic:
          "satoshi cry weird easily flame educate tail accident siren open flush cause",
      },
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: {
        mnemonic:
          "satoshi cry weird easily flame educate tail accident siren open flush cause",
      },
    },
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
      scrollSepolia: "K8HB2WTICYJMP5MGMCZZWUYHYFP1K1U6M4",
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://api-sepolia.scrollscan.com",
        },
      },
    ],
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true,
  },
};

export default config;
