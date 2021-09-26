import { useState } from "react";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Token from "../artifacts/contracts/Token.sol/Token.json";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Home: NextPage = () => {
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(0);

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const getBalance = async () => {
    if (typeof window.ethereum === "undefined") return;
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    const balance = await contract.balanceOf(account);

    console.log("TOKEN Balance: ", balance.toString());
  };

  const sendCoins = async () => {
    if (typeof window.ethereum === "undefined") return;

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
    const transaction = await contract.transfer(userAccount, amount);
    await transaction.wait();
    console.log("Transfer sucessful, amount sent: ", amount);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>React DApp Testing</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to DApp</h1>
        <p className={styles.description}>🚀🚀🚀🚀🚀 To The Moon!</p>

        <p>
          <button onClick={() => getBalance()}>Get Token Balance</button> <br />
          <input
            type="number"
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="Set Transfer Amount"
          />
          <br />
          <input
            type="text"
            onChange={(e) => setUserAccount(e.target.value)}
            placeholder="Set Transfer Address"
          />
          <br />
          <button onClick={sendCoins}>Get Send Tokens</button> <br />
        </p>
      </main>

      <footer className={styles.footer}>Powered by Coffee</footer>
    </div>
  );
};

export default Home;
