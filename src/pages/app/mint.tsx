import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, DropDownView } from "@components";
import { checkConnectedWallet, connectWallet, isWalletConnected } from "../../lib/utils";
import { ethers } from "ethers";


export default function Mint() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isMintOpen, setMintIsOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [account] = useState();
  const [selectedMintOption, setSelectedMintOption] = useState("");
  const [selectedMintImage, setSelectedMintImage] = useState("");

  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);
  const options = [{ coin: "ETH", image: "./eth.svg" }];
  const mintOptions = [{ coin: "QUOTE", image: "./quote_coin.svg" }];

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any, image:any) => {
    setSelectedOption(value);
    setSelectedImage(image);
    setIsOpen(false);
    console.log("ss",selectedOption);
  };
  const mintToggling = () => setMintIsOpen(!isMintOpen);

  const onMintOptionClicked = (value: any, image:any) => {
    setSelectedMintOption(value);
    setSelectedMintImage(image);
    setMintIsOpen(false);
    console.log("mss",selectedMintOption);
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
            <p className="font-satoshi-medium">Mint</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              placeholder="0"
            />
          </div>

          <DropDownView className="" defaultImage="./quote_coin.svg" defaultOption="QUOTE" toggling={mintToggling} options={mintOptions} selectedOption={selectedMintOption} selectedImage={selectedMintImage} isOpen={isMintOpen} onOptionClicked={onMintOptionClicked}/>
        </section>

        <Button className="" text= {`${connected ? "Mint" : "Connect Wallet"}`}/>
      </body>
    </main>
  );
}
