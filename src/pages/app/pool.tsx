import { useState, useEffect } from "react";
import { Button, DropDownView } from "@components";
import { checkConnectedWallet, walletConnection } from "../../lib/utils";
import { Icon } from "@iconify/react";

export default function Pool() {
  const [isOpen, setIsOpen] = useState(false);
  //   const [isWithdrawal, setWithdrawal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [switchMode, setSwitchMode] = useState(false);
  const [connected, setConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  //   const [account] = useState();
  const [selectedWithdrawalOption, setSelectedWithdrawalOption] = useState("");
  const [selectedWithdrawalmage, setSelectedWithdrawalImage] = useState("");

  //@ts-ignore
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner(account);
  const options = [{ coin: "ETH", image: "./eth.svg" }];
  const mintOptions = [{ coin: "LETH", image: "./leth.svg" }];
  const [ethInput, setEthInput] = useState("");

  const toggling = () => setIsOpen(!isOpen);
  const switchCoins = () => setSwitchMode(!switchMode);

  const onOptionClicked = (value: any, image: any) => {
    setSelectedOption(value);
    setSelectedImage(image);
    setIsOpen(false);
    console.log("ss", selectedOption);
  };
  const mintToggling = () => setWithdrawalOpen(!withdrawalOpen);

  const onMintOptionClicked = (value: any, image: any) => {
    setSelectedWithdrawalOption(value);
    setSelectedWithdrawalImage(image);
    setWithdrawalOpen(false);
    console.log("mss", selectedWithdrawalOption);
  };

  useEffect(() => {
    walletConnection(setConnected);
    checkConnectedWallet(setCurrentAccount, setConnected);
  }, [currentAccount, connected]);

  return (
    <main className="flex flex-col items-center justify-center pt-40 px-24">
      <body className="bg-background-500 shadow-lg w-[50%] p-5 rounded-lg flex flex-col gap-y-4 items-center">
        <section className="bg-neutral-800 bg-opacity-5 p-5 rounded-xl flex flex-row items-center justify-between">
          <div>
            <p className="font-satoshi-medium">Deposit</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              type="number"
              placeholder="0"
              min={0}
              value={ethInput}
              onChange={(e) => {
                setEthInput(e.target.value);
              }}
            />
             <p className="text-neutral-500">1 ETH = 1 LETH</p>
          </div>

          {!switchMode ? (
            <DropDownView
              className=""
              defaultImage="./eth.svg"
              defaultOption="ETH"
              toggling={toggling}
              options={options}
              selectedOption={selectedOption}
              selectedImage={selectedImage}
              isOpen={isOpen}
              onOptionClicked={onOptionClicked}
            />
          ) : (
            <DropDownView
              className=""
              defaultImage="./leth.svg"
              defaultOption="LETH"
              toggling={mintToggling}
              options={mintOptions}
              selectedOption={selectedWithdrawalOption}
              selectedImage={selectedWithdrawalmage}
              isOpen={withdrawalOpen}
              onOptionClicked={onMintOptionClicked}
            />
          )}
        </section>
        <button
          className="w-fit h-fit p-3 rounded-full bg-neutral-800 bg-opacity-5 "
          onClick={switchCoins}
        >
          <Icon icon={"fluent:arrow-sort-24-regular"} className="w-10 h-10" />
        </button>
        <section className="bg-neutral-800 bg-opacity-5 p-5 rounded-xl flex flex-row items-center justify-between">
          <div>
            <p className="font-satoshi-medium">Withdraw</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              type="number"
              placeholder="0"
              min={0}
              value={ethInput}
              onChange={(e) => {
                setEthInput(e.target.value);
              }}
            />
            <p className="text-neutral-500">1 LETH = 1 ETH</p>
          </div>

          {!switchMode ? (
            <DropDownView
              className=""
              defaultImage="./leth.svg"
              defaultOption="LETH"
              toggling={mintToggling}
              options={mintOptions}
              selectedOption={selectedWithdrawalOption}
              selectedImage={selectedWithdrawalmage}
              isOpen={withdrawalOpen}
              onOptionClicked={onMintOptionClicked}
            />
          ) : (
            <DropDownView
              className=""
              defaultImage="./eth.svg"
              defaultOption="ETH"
              toggling={toggling}
              options={options}
              selectedOption={selectedOption}
              selectedImage={selectedImage}
              isOpen={isOpen}
              onOptionClicked={onOptionClicked}
            />
          )}
        </section>

        <Button
          className="w-full"
          text={`${connected ? "Deposit" : "Connect Wallet"}`}
        />
      </body>
    </main>
  );
}
