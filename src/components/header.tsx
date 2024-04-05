import React, { useEffect, useState } from "react";
import { HeaderProps } from "@lib/interfaces";
import { Icon } from "@iconify/react";
import { HeaderItems, AppHeaderItems } from "@constants";
import { motion } from "framer-motion";
import { checkConnectedWallet, connectWallet, isWalletConnected, scrolltoHash } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

export const Header: React.FC<HeaderProps> = ({
  className,
  route,
  setRoute,
  ...props
}) => {
  const [initialBorderWidth, setInitialBorderWidth] = useState(0);
  const [borderWidth, setBorderWidth] = useState(1);
  const navigate = useNavigate();
  const animateBorder = () => {
    setBorderWidth(0);
    setInitialBorderWidth(1);
    setTimeout(() => {
      setBorderWidth(1);
      setInitialBorderWidth(0);
    }, 300);
  };
  return (
    <header
      className={`flex flex-row fixed w-screen backdrop-blur h-22 items-center justify-between bg-background px-24 z-50 py-4 bg-opacity-5 ${className}`}
      {...props}
    >
      <img src="./quote_coin.svg" className="object-contain w-12 h-12" />

      <section className="flex flex-row items-center justify-center gap-x-20 ml-32">
        {HeaderItems.map((item) => (
          <button
            className="flex flex-col items-center text-black hover:text-primary font-satoshi-medium transition-all"
            onClick={() => {
              setRoute(item.route);
              animateBorder();
              scrolltoHash(item.hashId);
            }}
          >
            <motion.hr
              className={`${
                route === item.route ? "bg-primary" : "bg-transparent"
              } w-20 h-2 absolute top-0 rounded-b-xl border-0`}
              initial={{ scaleX: initialBorderWidth }}
              animate={{ scaleX: borderWidth }}
            />
            <p className="text-base mt-4">{item.route}</p>
          </button>
        ))}
      </section>

      <button
        className="bg-primary hover:bg-pink-600 hover:scale-90 w-52 px-5 h-14 text-white rounded-full transition-all"
        onClick={() => {
          navigate("/app");
        }}
      >
        Launch App
      </button>
    </header>
  );
};

export const AppHeader: React.FC<HeaderProps> = ({
  className,
  route,
  setRoute,
  ...props
}) => {
  const [connected, setConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [account, setAccount] = useState();
  const [initialBorderWidth, setInitialBorderWidth] = useState(0);
  const [borderWidth, setBorderWidth] = useState(1);

  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner(account);


  const limit = 14
  const displayedCurrentAccountText = currentAccount.length > limit ? currentAccount.substring(0, limit) + "..." : currentAccount;

  const animateBorder = () => {
    setBorderWidth(0);
    setInitialBorderWidth(1);
    setTimeout(() => {
      setBorderWidth(1);
      setInitialBorderWidth(0);
    }, 300);
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
    <header
      className={`flex flex-row fixed w-screen backdrop-blur h-22 items-center justify-between bg-background px-24 z-50 py-4 bg-opacity-5 ${className}`}
      {...props}
    >
      <section className="flex flex-row items-center justify-center gap-x-20">
        <img src="./quote_coin.svg" className="object-contain w-12 h-12" />
        {AppHeaderItems.map((item) => (
          <button
            className="flex flex-col items-center text-black hover:text-primary font-satoshi-medium transition-all"
            onClick={() => {
              setRoute(item.route);
              animateBorder();
              scrolltoHash(item.hashId);
            }}
          >
            <motion.hr
              className={`${
                route === item.route ? "bg-primary" : "bg-transparent"
              } w-20 h-2 absolute top-0 rounded-b-xl border-0`}
              initial={{ scaleX: initialBorderWidth }}
              animate={{ scaleX: borderWidth }}
            />
            <p className="text-base mt-4">{item.route}</p>
          </button>
        ))}
      </section>
      <button className={`${connected ? "border-primary border text-black" : "bg-primary text-white hover:bg-pink-600"} flex flex-row items-center text-ellipsis overflow-hidden  hover:scale-90 w-52 px-5 h-14 rounded-full transition-all gap-x-1`} onClick={()=>{connectWallet(provider, account, setAccount, setConnected)}}>
        <Icon icon={"solar:wallet-bold"} className="w-4 h-4 text-primary"/>
       <p className="font-satoshi-medium"> {`${connected ? displayedCurrentAccountText : "Connect Wallet"}`}</p>
      </button>
    </header>
  );
};
