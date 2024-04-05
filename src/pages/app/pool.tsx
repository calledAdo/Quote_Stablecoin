import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Button, DropDownView } from "@components";
import { checkConnectedWallet, connectWallet, isWalletConnected, scrolltoHash } from "../../lib/utils";
import { ethers } from "ethers";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

export default function Pool() {

  const [isOpen, setIsOpen] = useState(false);
  const [isWithdrawal, setWithdrawal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [account, setAccount] = useState();
  const [selectedWithdrawalOption, setSelectedWithdrawalOption] = useState("");
  const [selectedWithdrawalmage, setSelectedWithdrawalImage] = useState("");

  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);
  const options = [{ coin: "ETH", image: "./eth.svg" }];
  const mintOptions = [{ coin: "LETH", image: "./leth.svg" }];

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any, image:any) => {
    setSelectedOption(value);
    setSelectedImage(image);
    setIsOpen(false);
    console.log("ss",selectedOption);
  };
  const mintToggling = () => setWithdrawalOpen(!withdrawalOpen);

  const onMintOptionClicked = (value: any, image:any) => {
    setSelectedWithdrawalOption(value);
    setSelectedWithdrawalImage(image);
    setWithdrawalOpen(false);
    console.log("mss",selectedWithdrawalOption);
  };

  async function walletConnection() {
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
  }

  useEffect(() => {
    walletConnection();
    checkConnectedWallet(setCurrentAccount, setConnected);
  }, [currentAccount, connected]);

  return (
    <main className="flex flex-col items-center justify-center pt-24 px-24">
      <body className="bg-background-500 shadow-lg w-[50%] p-5 rounded-lg flex flex-col gap-y-4">
        <section className="bg-neutral-800 bg-opacity-5 p-5 rounded-xl flex flex-row items-center justify-between">
          <div>
            <p className="font-satoshi-medium">Deposit</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              placeholder="0"
            />
          </div>

          <DropDownView className="" defaultImage="./eth.svg" defaultOption="ETH" toggling={toggling} options={options} selectedOption={selectedOption} selectedImage={selectedImage} isOpen={isOpen} onOptionClicked={onOptionClicked}/>
        </section>

        <section className="bg-neutral-800 bg-opacity-5 p-5 rounded-xl flex flex-row items-center justify-between">
          <div>
            <p className="font-satoshi-medium">Withdraw</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              placeholder="0"
            />
          </div>

          <DropDownView className="" defaultImage="./leth.svg" defaultOption="LETH" toggling={mintToggling} options={mintOptions} selectedOption={selectedWithdrawalOption} selectedImage={selectedWithdrawalmage} isOpen={withdrawalOpen} onOptionClicked={onMintOptionClicked}/>
        </section>

        <Button className="" text= {`${connected ? "Deposit" : "Connect Wallet"}`}/>
      </body>
    </main>
  );
}