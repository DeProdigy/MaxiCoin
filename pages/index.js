import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import ProviderConnect from './providerConnect.js'

import {
  maxiCoinAddress,
  nftAddress,
  maxAddress
} from '../config'

import MaxiCoin from '../artifacts/contracts/MaxiCoin.sol/MaxiCoin.json'
import MaxiNFT from '../artifacts/contracts/MaxiNFT.sol/MaxiNFT.json'

export default function Home() {
  const [connection, setConnection] = useState();
  const [formInput, updateFormInput] = useState({ ethAddress: '', maxiCoinAmount: ''})
  const [hasCoins, setHasCoins] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  async function checkCoins() {
    if(connection === undefined) return;

    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    console.log('singer address: ', await signer.getAddress())

    let contract = new ethers.Contract(maxiCoinAddress, MaxiCoin.abi, signer)
    let balance = await contract.balanceOf(await signer.getAddress());

    setHasCoins(ethers.utils.formatEther(balance) > 0);
  }

  async function checkOwner() {
    if(connection === undefined) return;

    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    console.log('singer address: ', await signer.getAddress())

    let contract = new ethers.Contract(maxiCoinAddress, MaxiCoin.abi, signer)
    let owner = await contract.owner()

    setIsOwner(owner === await signer.getAddress());
  }

  async function sendMaxiCoin() {
    if (formInput.maxiCoinAmount === '') return;
    if (formInput.ethAddress === '') return;

    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const amount = ethers.utils.parseUnits(formInput.maxiCoinAmount, 'ether')
    let contract = new ethers.Contract(maxiCoinAddress, MaxiCoin.abi, signer)

    let transaction = await contract.mintToAccount(formInput.ethAddress, amount.toString())
    await transaction.wait()
  }

  async function mintNFT() {
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftAddress, MaxiNFT.abi, signer)
    let transaction = await contract.mintItem()
    await transaction.wait()
  }

  useEffect(() => {
    checkCoins();
    checkOwner();
  }, [connection]);

  return (
    <div className={styles.container}>
      <Head>
        <title>MaxiCoin and MaxiNFT</title>
        <meta name="description" content="For Max's birthday" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MaxiVerse
        </h1>

        <p className={styles.description}>
          To start, you need some MaxiCoins and only Max Elbert can mint those for you.
        </p>

        <ProviderConnect setConnection={setConnection} />

        <div className={styles.grid}>
          { isOwner && (
            <div className={styles.inputCard}>
              <h2 className={styles.description}>Hello Max! 🤘</h2>
              <p>Please enter the ETH address and the amount of MaxiCoin you would like to send to your friend</p>
              <form>
                <div>
                  <label htmlFor="ethAddress">ETH Address</label>
                  <input type="text" name="ethAddress" className="mt-6 ml-4 border rounded p-2" onChange={e => updateFormInput({ ...formInput, ethAddress: e.target.value })}/>
                </div>
                <div>
                  <label htmlFor="maxiCoinAmount">MaxiCoin Amount</label>
                  <input type="text" name="maxiCoinAmount" className="mt-6 ml-4 border rounded p-2" onChange={e => updateFormInput({ ...formInput, maxiCoinAmount: e.target.value })}/>
                </div>
                <button type="button" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendMaxiCoin}>Submit</button>
              </form>
            </div>
          )}

          { hasCoins && (
            <div className={styles.inputCard}>
              <h2 className={styles.description}>Mint Max NFT!</h2>
              <p>You have permission to mint an exclusive NFT because Max has sent you Maxicoins 🙌</p>
              <form>

                <button type="button" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={mintNFT}>Mint!</button>
              </form>
            </div>
          )}

          { !hasCoins && connection && !isOwner && (
            <div className={styles.card}>
              <h2 className={styles.description}>Unfortunately you do not have Maxicoins 😢</h2>
              <p>Ask Max to send you some!</p>
            </div>
          )}

          { !connection && (
            <div className={styles.card}>
              <h2 className={styles.description}>Please connect your wallet above ☝️</h2>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/hintology"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Created by{' '}</p>
          <span className={styles.card}>
            <Image src="/pfp.png" alt="Alex PFP" width={50} height={50} />
          </span>
        </a>
      </footer>
    </div>
  )
}
