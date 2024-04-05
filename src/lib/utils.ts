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

export async function connectWallet(
  provider: ethers.providers.Web3Provider,
  account: any,
  setAccount: Dispatch<SetStateAction<any>>,
  setConnected: Dispatch<SetStateAction<boolean>>
) {
  //@ts-ignore
  if (window.ethereum) {
    // 1️⃣ Request Wallet Connection from Metamask
    // ANSWER can be found here: https://docs.metamask.io/wallet/get-started/set-up-dev-environment/
    // const accounts = YOUR CODE

    // setConnected(accounts[0]);
    const a = await provider.send("eth_requestAccounts", []);
    setAccount(a[0]);
    setConnected(true);
    console.log(account);
  } else {
    console.error("No web3 provider detected");
    //@ts-ignore
    document.getElementById("connectMessage").innerText =
      "No web3 provider detected. Please install MetaMask.";
  }
}
