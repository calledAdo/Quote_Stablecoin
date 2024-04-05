import { useState, useEffect } from "react";
import { Button, DropDownView } from "@components";
import { checkConnectedWallet, walletConnection } from "../../lib/utils";
import axios from "axios";

export default function Redeem() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isMintOpen, setMintIsOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  // const [account] = useState();
  const [selectedMintOption, setSelectedMintOption] = useState("");
  const [selectedMintImage, setSelectedMintImage] = useState("");

  const [ethValue, setEthValue] = useState("");
  const [ethInput, setEthInput] = useState("");
  const [quoteInput, setQuoteInput] = useState("");

  //@ts-ignore
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner(account);
  const options = [{ coin: "ETH", image: "./eth.svg" }];
  const mintOptions = [{ coin: "QUOTE", image: "./quote_coin.svg" }];

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any, image: any) => {
    setSelectedOption(value);
    setSelectedImage(image);
    setIsOpen(false);
    console.log("ss", selectedOption);
  };
  const mintToggling = () => setMintIsOpen(!isMintOpen);

  const onMintOptionClicked = (value: any, image: any) => {
    setSelectedMintOption(value);
    setSelectedMintImage(image);
    setMintIsOpen(false);
    console.log("mss", selectedMintOption);
  };

  const [isEthInputFocused, setEthInputFocused] = useState<boolean | null>(
    false
  );

  const handleFocus = () => {
    setEthInputFocused(true);
  };

  const handleBlur = () => {
    setEthInputFocused(false);
  };

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/ethereum")
      .then((res: any) => {
        console.log("eth usd", res.data.market_data.current_price.usd);
        setEthValue(res.data.market_data.current_price.usd);
      });
  });

  useEffect(() => {
    const convertValue = async () => {
      try {
        if (ethValue && isEthInputFocused) {
          setQuoteInput(
            (parseFloat(ethInput) * parseFloat(ethValue)).toString()
          );
        } else {
          throw new Error("Failed to retrieve Ethereum price data");
        }
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
        // Handle error gracefully, potentially using a default price or informing the user
        return null; // Or provide a default value here
      }
    };
    convertValue();
  }, [ethInput]);

  useEffect(() => {
    const convertValue = async () => {
      try {
        if (ethValue) {
          setEthInput(
            (parseFloat(quoteInput) / parseFloat(ethValue)).toString()
          );
        } else {
          throw new Error("Failed to retrieve Ethereum price data");
        }
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
        // Handle error gracefully, potentially using a default price or informing the user
        return null; // Or provide a default value here
      }
    };
    convertValue();
  }, [quoteInput]);

  useEffect(() => {
    walletConnection(setConnected);
    checkConnectedWallet(setCurrentAccount, setConnected);
  }, [currentAccount, connected]);

  return (
    <main className="flex flex-col items-center justify-center pt-40 px-24">
      <body className="bg-background-500 shadow-lg w-[50%] p-5 rounded-lg flex flex-col gap-y-4">
        <section className="bg-neutral-800 bg-opacity-5 p-5 rounded-xl flex flex-row items-center justify-between">
          <div>
            <p className="font-satoshi-medium">Burn</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              type="number"
              value={quoteInput}
              onChange={(e) => {
                setQuoteInput(e.target.value);
              }}
              placeholder="0"
              min={0}
            />
            <p className="text-neutral-500">1 QUOTE = 1 USD</p>
          </div>

          <DropDownView
            className=""
            defaultImage="./quote_coin.svg"
            defaultOption="QUOTE"
            toggling={mintToggling}
            options={mintOptions}
            selectedOption={selectedMintOption}
            selectedImage={selectedMintImage}
            isOpen={isMintOpen}
            onOptionClicked={onMintOptionClicked}
          />
        </section>
        <section className="bg-neutral-800 bg-opacity-5 p-5 rounded-xl flex flex-row items-center justify-between">
          <div>
            <p className="font-satoshi-medium">Redeem</p>
            <input
              className="bg-transparent focus:outline-none placeholder-neutral-500 font-satoshi-medium text-4xl"
              type="number"
              placeholder="0"
              value={ethInput}
              onChange={(e) => {
                setEthInput(e.target.value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              min={0}
            />
            <p className="text-neutral-500">1 ETH = ${ethValue}</p>
          </div>

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
        </section>

        <Button
            className=" disabled:bg-neutral-600 disabled:hover:scale-100"
            disabled={!connected}
          text={`${connected ? "Redeem" : "Connect Wallet"}`}
        />
      </body>
    </main>
  );
}