import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";
import ABI from "../abi/Minter.json";
import { parseEther } from "ethers/lib/utils";
export const scrolltoHash = function (element_id: string) {
  const element = document.getElementById(element_id);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

export const isWalletConnected = async (
  provider: ethers.providers.Web3Provider
) => {
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};

export function openLink(url: string) {
  window.open(url, "_blank");
}

export const checkConnectedWallet = async (
  setCurrentAccount: Dispatch<SetStateAction<any>>,
  setConnected: Dispatch<SetStateAction<boolean>>
) => {
  //@ts-ignore
  if (window.ethereum) {
    //@ts-ignore
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      setCurrentAccount(accounts[0]);
      setConnected(true);
    }
  }
};

export async function MintLETH(account: any, amount: string) {
  //@ts-ignore
  if (window.ethereum) {
    // 1️⃣ Request Wallet Connection from Metamask
    // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
    // const accounts = YOUR CODE

    // setConnected(accounts[0]);
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const a = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner(account);
    const contractAddress = "0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a";

    let contract = new ethers.Contract(contractAddress, ABI.abi, signer);

    try {
      //@ts-ignore
      //c console.log("FUNCTIONS", contract.interface.forEachFunction((f)=>console.log(f)))
      await contract.mintLETH({ value: parseEther(amount) });
      // await provider.getBalance(contractAddress)
      // const balance = await provider.getBalance()

      // 4️⃣ call the contract createTweet method in order to crete the actual TWEET
      // HINT: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
      // use the "await" feature to wait for the function to finish execution
      // what is await? https://javascript.info/async-await
      // 7️⃣ Uncomment the displayTweets function! PRETTY EASY 🔥
      // GOAL: reload tweets after creating a new tweet
      // displayTweets(accounts[0]);
    } catch (error) {
      console.error("User rejected request:", error);
    }
    // console.log(a);
  } else {
    // alert("No web3 provider detected");
    // setShowWallets(true)
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}

export async function GetBalance(){
    //@ts-ignore
    if (window.ethereum) {
      // 1️⃣ Request Wallet Connection from Metamask
      // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
      // const accounts = YOUR CODE
  
      // setConnected(accounts[0]);
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const a = await provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner(account);
      const contractAddress = "0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a";
  
      // let contract = new ethers.Contract(contractAddress, ABI.abi, signer);
  
      try {
        //@ts-ignore
        //c console.log("FUNCTIONS", contract.interface.forEachFunction((f)=>console.log(f)))
        // await contract.mintQUOTE({ value: parseEther(amount) });
        console.log((await provider.getBalance(contractAddress)).toString()) 
        // const balance = await provider.getBalance()
        // return balance

      } catch (error) {
        console.error("User rejected request:", error);
      }
      // console.log(a);
    } else {
      // alert("No web3 provider detected");
      // setShowWallets(true)
      //@ts-ignore
      document.getElementById("connectMessage").innerText =
        "No web3 provider detected. Please install MetaMask.";
        return null
    }
}
export async function RequestOPNetwork() {
  //@ts-ignore
  if (window.ethereum) {
    // 1️⃣ Request Wallet Connection from Metamask
    // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
    // const accounts = YOUR CODE

    // setConnected(accounts[0]);
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const a = await provider.send("eth_requestAccounts", []);

    // let contract = new ethers.Contract(contractAddress, ABI.abi, signer);

    try {
      //@ts-ignore
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0xA",
            rpcUrls: ["https://mainnet.optimism.io/"],
            chainName: "OP Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://explorer.optimism.io"]
        }]
    });
    } catch (error) {
      console.error("User rejected request:", error);
    }
    // console.log(a);
  } else {
    // alert("No web3 provider detected");
    // setShowWallets(true)
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}

export async function RequestETHNetwork() {
  //@ts-ignore
  if (window.ethereum) {
    // 1️⃣ Request Wallet Connection from Metamask
    // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
    // const accounts = YOUR CODE

    // setConnected(accounts[0]);
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const a = await provider.send("eth_requestAccounts", []);

    // let contract = new ethers.Contract(contractAddress, ABI.abi, signer);

    try {
      //@ts-ignore
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x1",
            rpcUrls: ["https://eth.drpc.org"],
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://etherscan.io"]
        }]
    });
    } catch (error) {
      console.error("User rejected request:", error);
    }
    // console.log(a);
  } else {
    // alert("No web3 provider detected");
    // setShowWallets(true)
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}

export async function MintToken(account: any, amount: string) {
  //@ts-ignore
  if (window.ethereum) {
    // 1️⃣ Request Wallet Connection from Metamask
    // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
    // const accounts = YOUR CODE

    // setConnected(accounts[0]);
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const a = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner(account);
    const contractAddress = "0x031fe35d4798d92b2a6F6b4Fa1Ff22b0C6cC4F4a";

    let contract = new ethers.Contract(contractAddress, ABI.abi, signer);

    try {
      //@ts-ignore
      //c console.log("FUNCTIONS", contract.interface.forEachFunction((f)=>console.log(f)))
      await contract.mintQUOTE({ value: parseEther(amount) });
      // await provider.getBalance(contractAddress)
      // const balance = await provider.getBalance()

      // 4️⃣ call the contract createTweet method in order to crete the actual TWEET
      // HINT: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
      // use the "await" feature to wait for the function to finish execution
      // what is await? https://javascript.info/async-await
      // 7️⃣ Uncomment the displayTweets function! PRETTY EASY 🔥
      // GOAL: reload tweets after creating a new tweet
      // displayTweets(accounts[0]);
    } catch (error) {
      console.error("User rejected request:", error);
    }
    // console.log(a);
  } else {
    // alert("No web3 provider detected");
    // setShowWallets(true)
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}

export async function walletConnection(
  // url: string,
  setConnected: Dispatch<SetStateAction<boolean>>
) {
  try {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await isWalletConnected(provider).then((connected) => {
      if (connected) {
        console.log("Wallet is connected");
        setConnected(true);
        // metamask is connected
      } else {
        console.log("Wallet is not connected");
        setConnected(false);
        // metamask is not connected
      }
    });
    console.log("Wallet provider detected");
  } catch (error) {
    // window.open(url, "_blank");
    console.log("Wallet provider not detected or error: ");
  }
}

export async function connectWallet(
  account: any,
  setAccount: Dispatch<SetStateAction<any>>,
  setConnected: Dispatch<SetStateAction<boolean>>,
  setShowWallets: Dispatch<SetStateAction<boolean>>
) {
  //@ts-ignore
  if (window.ethereum) {
    // 1️⃣ Request Wallet Connection from Metamask
    // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
    // const accounts = YOUR CODE

    // setConnected(accounts[0]);
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const a = await provider.send("eth_requestAccounts", []);
    setAccount(a[0]);
    setConnected(true);
    RequestOPNetwork()
    console.log(account);
  } else {
    // alert("No web3 provider detected");
    setShowWallets(true);
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}
