import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

import { vars } from "hardhat/config";

const MNEMONIC = vars.get("MNEMONIC");
const SCROLL_API = vars.get("SCROLL_API");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    arbitrumSepolia: {
      url: "https://arb-sepolia.g.alchemy.com/v2/0xEQ1Ty8X1FuJ1_MykwccXp_FfyPjatq",
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    ETHsepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/2sp6Bmjb4ES43w79-eMV2vrIHfFQOjjT",
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    Opsepolia: {
      url: "https://opt-sepolia.g.alchemy.com/v2/zsoQaUYmxYoVt54fgM39Ai1gKBtpQh6b",
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  //npx hardhat verify --network <network> DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
  etherscan: {
    apiKey: {
      scrollSepolia: SCROLL_API,
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
