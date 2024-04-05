import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

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
    console.log(account);
  } else {
    
    // alert("No web3 provider detected");
    setShowWallets(true)
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}
