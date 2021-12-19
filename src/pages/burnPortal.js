import './burn.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import * as web3 from "@solana/web3.js";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token
} from "@solana/spl-token";
import { Col, Modal, Row } from 'react-bootstrap';
import {
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
} from "../candy-machine";
import { useEffect, useState } from 'react';

import { ReactComponent as CloseLogo } from "../assets/close.svg"
import { ReactComponent as FireLogo } from "../assets/fire.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";
import NFTs from '@primenums/solana-nft-tools';
import { Provider } from "@project-serum/anchor";
import SelectCard from '../components/selectCard/selectCard'
import allMints from '../mint.json'
import axios from "axios"
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

let count = [];
let noises = [];
let cardInfo = [];

const CustomLoader = ({ close, marginTop, paddingTop = 0 }) => (
  <div className="load" style={close ? { display: "none" } : { display: "block", marginTop, paddingTop }}>
    <Loader
      type="Oval"
      color="#000"
      height={80}
      width={80}
      className="loader"
    />
    <p className='loader-desc'>This might take few seconds. Please wait...</p>
  </div>
)

const ModalSuccessContent = ({ setFinal }) => (
  <div className='final-success-modal'>
    <h1 className="title">Congratulations! You’ve burned 6 Noises </h1>
    <div className='logo-container'>
      <FireLogo />
      <FireLogo />
      <FireLogo />
      <FireLogo />
      <FireLogo />
      <FireLogo />
    </div>
    <p className='desc'>
      NOISE PASS <span style={{ color: "#050505", opacity: "0.7" }}>airdrops will start from</span> 21st DEC
    </p>
    <CloseLogo onClick={() => setFinal(false)} className='success-modal-close-icon' />
  </div>
)

const BurnPortal = ({ connection }) => {
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState(false);
  const [close, setClose] = useState(false);
  const [connect, SetConnect] = useState(false);
  const [nftInfo, SetNftInfo] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const wallet = useWallet();
  const history = useHistory();

  const discordAPI = "https://mint.pricklypetesplatoon.army/noise/burn"

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const handleClick = () => setLoading(true);
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {

      });
    }
  }, [isLoading]);

  const countfunc = (product, isSelected) => {
    if (isSelected) {
      const filteredPeople = count.filter((item) => item !== product);
      count = filteredPeople;
    } else {
      count.push(product);
    }

    console.log(count);

  }

  //GET details of the Noise NFTs a wallet holds
  useEffect(() => {
    (async () => {
      if (wallet.disconnecting == true) {
        history.push("/");
        // window.location.reload(false);
      }
      if (wallet?.publicKey) {
        console.log("public key", wallet.publicKey.toString());
        console.log("wallet", wallet);
        SetConnect(true);
        console.log("wallet connected here");
        // Create connection
        try {
          // Get all mint tokens (NFTs) from your wallet
          const walletAddr = wallet.publicKey.toString();

          let mints = await NFTs.getMintTokensByOwner(connection, walletAddr);
          console.log('mints', mints);

          noises = [];
          let card = [];
          //CHECK WITH ALL NFT ADDRESS FROM AN ARRAY & PUT IT IN THE ARRAY
          for (let i = 0; i < mints.length; i++) {
            let mint = mints[i];
            // console.log("cardInfo", cardInfo,i);
            if (allMints.includes(mint)) {
              console.log('mint', mint);

              console.log("mint supply", new web3.PublicKey(mint));
              let tokenSupply = await connection.getTokenSupply(new web3.PublicKey(mint));
              console.log("supply", tokenSupply.value.uiAmount);

              //supply should not be zero
              if (tokenSupply.value.uiAmount > 0) {
                let cardObj = {};

                //check nft owner
                fetch('https://api.theblockchainapi.com/v1/solana/nft/mainnet-beta/' + mint + "/owner", {
                  headers: {
                    'Content-Type': 'application/json',
                    'APIKeyID': '2GRBPe5hXqHJlDr', // TODO: need to change with the paid version
                    'APISecretKey': '2SOw9vpqVlTQBGa' // TODO: need to change with the paid version
                  }
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log("nft owner", data.nft_owner);

                    if (data.nft_owner == walletAddr) {
                      fetch('https://api.theblockchainapi.com/v1/solana/nft/mainnet-beta/' + mint, {
                        headers: {
                          'Content-Type': 'application/json',
                          'APIKeyID': '2GRBPe5hXqHJlDr', // TODO: need to change with the paid version
                          'APISecretKey': '2SOw9vpqVlTQBGa' // TODO: need to change with the paid version
                        }
                      }) //mainnet api
                        // fetch('https://api.solscan.io/account?address=' + mint) //mainnet api
                        // fetch('https://api-devnet.solscan.io/account?address=' + mint) //devnet api
                        .then(response => response.json())
                        .then(data => {
                          // name of the noise
                          console.log("metadata", data);

                          noises.push(mint);
                          if (data.data != null && data.data.uri != null) {
                            fetch(data.data.uri)
                              .then(response => response.json())
                              .then(data => {
                                // image url for the noise
                                // console.log("uri ", data);

                                cardObj = {
                                  "code": data.name,
                                  "mint": mint,
                                  "owner": "",
                                  "src": data.image,
                                  "traits": data.attributes
                                }
                                // console.log("cardInfo", cardInfo);
                                card.push(cardObj);
                              });
                          }
                          // }
                        });
                    }

                  });
              }
            }
          }

          // cardInfo=card;
          SetNftInfo(card);
          console.log('noise', card);
          // SetNoise(SetNftInfo.length); 
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [wallet, connection, history]);

  useEffect(() => {
    SetNftInfo(cardInfo);
  }, []);
  //burn the NFTs
  const onBurn = async () => {
    console.log("burn");
    if (!isLoading) {
      handleClick();
    }
    try {
      if (wallet.connected && wallet.publicKey) {

        let opts = {
          preflightCommitment: 'recent',
          commitment: 'recent',
        };

        let provider = new Provider(connection, wallet, opts);

        let txnWithSigs = [];
        let creatorIdoToken = "";
        let transaction = "";

        console.log("noises in burn", count, wallet.publicKey.toString());

        for (let i = 0; i < count.length; i++) {
          let mint = new web3.PublicKey(count[i].mint);

          creatorIdoToken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            wallet.publicKey
          );

          transaction = new web3.Transaction().add(
            Token.createBurnInstruction(
              TOKEN_PROGRAM_ID,
              mint,
              creatorIdoToken,
              wallet.publicKey,
              [],
              1,
            ),
          );

          txnWithSigs.push({
            tx: transaction,
            signers: [provider.wallet.payer]
          })
        }

        console.log(txnWithSigs);
        let txSigs = await provider.sendAll(txnWithSigs);
        console.log("burn: ", txSigs);

        //set loading to true
        setModalLoader(true)
        setFinal(true);

        //call the api
        const embeds = []
        count.forEach(card => {
          const embed = {
            "number": card.code,
            "wallet": wallet.publicKey.toString(),
            "remaining": 120,
            "image": card.src
          }

          embeds.push(embed)
        })

        await axios.post(discordAPI, embeds)

        //loading will be false here
        setModalLoader(false)

        //MINT CODE
        /*
        const anchorWallet = {
          publicKey: wallet.publicKey,
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        };

        const { candyMachine } =
          await getCandyMachineState(
            anchorWallet,
            "Bnmh7NM1yB2wQDKVW6Tu7fLuEgtc1RkjXqKgk6HrzZHY", //candy machine id
            connection
          );

        //Mint token
        const [mintTxId, mint] = await mintOneToken(
          candyMachine,
          new web3.PublicKey("7zLdLg6vPUp8ANz2ZfJNDDWpjTujRZcKQHG26XsfB2E8"), //config id
          wallet.publicKey,
          new web3.PublicKey("BTBBtGNKUMooqoxi4mMxLAQ7EjHbvVzPSubHXKj9jEGX") //Treasury wallet address
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          "30000",
          connection,
          "singleGossip",
          false
        );

        console.log("mintTxId: ", mintTxId);
        console.log("mint: ", mint);
        console.log(status)

        */
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true)
    }, 11000);
    return () => clearTimeout(timer);
  }, []);

  function refreshPage() {
    history.push("/");
    window.location.reload(false);

  }

  return (
    <>
      <div className='section-2new' style={{ marginBottom: "76px", paddingTop: "5%" }}>
        <Row className='px-3 py-0'>
          <Col lg={3} className='p-0'></Col>
          <Col lg={6} className='p-0'>
            <div>
              <h2>Steps to Burn:</h2>
              <ol type="1">
                <li style={{ color: "#050505", opacity: "0.7", paddingTop: "7px", paddingBottom: "2px" }}>Select 6 noises which you want to burn.</li>
                <li style={{ color: "#050505", opacity: "0.7", paddingTop: "7px", paddingBottom: "2px" }}>BURN!!!</li>
                <li style={{ color: "#050505", opacity: "0.7", paddingTop: "7px", paddingBottom: "2px" }}>
                  Pass airdrops will start from 21st Dec
                </li>
              </ol>
              <p style={{ marginBottom: 0 }}> NOTE:
                <span style={{ color: "#050505", opacity: "0.7" }}>
                  If you don’t have enough noises - <a href="https://magiceden.io/marketplace/project_noise">buy here</a>
                </span>
              </p>
              <p style={{ marginBottom: "6%" }}>
                CAUTION: <span style={{ color: "#050505", opacity: "0.7" }}>
                  Keep atleast 0.1 sol in your wallet for the gas. Ofcourse, it will be much less but just to be on the safer side!! :P
                </span>
              </p>
            </div>
            <div style={{ minHeight: "50vh" }}>
              <div style={{ borderBottom: "solid 2px black", marginBottom: "2%" }}>
                <p>My Noises</p>
              </div>
              <div>
                {connect ?
                  <Row className='mr-0' style={{ position: "relative" }}>
                    <CustomLoader close={close} marginTop={"4%"} />
                    {nftInfo.length > 0 ? (
                      <>
                        {nftInfo.map((product, i) => (

                          <Col key={i} sm={12} lg={4} style={{ padding: '5px', display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => {
                            setShow(!show);
                          }}>
                            <SelectCard product={product} onSelect={countfunc} shouldSelect={count.length} />
                          </Col>

                        ))}
                      </>
                    ) : (

                      <div className="no-noises">
                        <div className="icon-container">
                          <CloseLogo />
                        </div>
                        <p>No noise found.</p>
                      </div>
                    )}
                  </Row>
                  //3 secs
                  :
                  null
                }

              </div>

            </div>

          </Col>
          <Col lg={3} className='p-0'>

          </Col>
        </Row>

      </div>

      <div className='section-8 sticky px-3'>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6} className='footer pt-1'>
            {connect ?
              <div style={{ display: "inline-block", width: "100%", padding: "10px 0 20px 0" }}>
                <p style={{ float: "left", color: "black", marginTop: "10px" }}>{count.length} Noise(s) selected</p>
                <div style={{ float: "right" }}>
                  <button
                    disabled={(count.length < 6 || count.length > 6) || isLoading}
                    onClick={onBurn}
                    style={isLoading || count.length < 6 || count.length > 6 ? { background: "linear-gradient(90deg, rgb(14 255 183 / 40%), rgb(255 19 13 / 40%), rgb(255 255 0 / 40%))", marginRight: "10px", padding: "10px", border: "0" } : { backgroundImage: "linear-gradient(90deg, #0EFFB7, #FF130D, #FFFF00)", marginRight: "10px", padding: "10px", border: "0" }}
                  >

                    <FontAwesomeIcon
                      icon={faFire}
                      style={{ width: "1rem", margin: "0 0.5rem 0 0" }}
                    />
                    {isLoading ? 'Burning...' : 'Burn Now!'}</button>
                </div>
              </div>
              :
              <div></div>}
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
      <Modal show={final} fullscreen='true'
        onHide={() => {
          setFinal(false);
          refreshPage()
        }}>
        <Modal.Body className='modal-body'>
          {modalLoader ? (
            <CustomLoader paddingTop={"16%"} />
          ) : (<ModalSuccessContent setFinal={setFinal} />)
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BurnPortal;