import { useEffect, useState, useMemo } from 'react';
import { Modal, Button, Row, Col, Overlay,Nav } from 'react-bootstrap';
import SelectCard from '../components/selectCard/selectCard'
// import LogoWeb from '../assets/Landingweb
import './burn.css'
import allMints from '../mint.json'
import { useWallet } from '@solana/wallet-adapter-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire,faTimes } from "@fortawesome/free-solid-svg-icons";
import NFTs from '@primenums/solana-nft-tools';
import * as web3 from "@solana/web3.js";
import { Program, Provider } from "@project-serum/anchor";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import {
  TOKEN_PROGRAM_ID,
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,  
} from "../candy-machine";

import web_hero_gif from '../assets/animationtest_2.gif';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

let count = [];
let noises = [];
let cardInfo = [];
const BurnPortal = ({connection}) => {
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState(false);
  const [close, setClose] = useState(false);
    const [noise,SetNoise] = useState('-');
    const [connect,SetConnect] = useState(false);
    const [nftInfo, SetNftInfo] = useState(false);

    const [isLoading, setLoading] = useState(false);
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

    

    const countfunc = (product,isSelected) => {
      console.log("count",product);
    //   console.log(isSelected);
      // console.log(count);
      if(isSelected){
        const filteredPeople = count.filter((item) => item !== product);
        count = filteredPeople;
      }else{
        count.push(product);
      }

      console.log(count);
      
    }


  const wallet = useWallet();
  const [value, setValue] = useState({});
  const [check, setCheck] = useState(false);
  // const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  //GET details of the Noise NFTs a wallet holds
  useEffect(() => {    
    (async () => {   
      if(wallet.disconnecting==true){
        history.push("/");
    // window.location.reload(false);
      }   
      if (wallet?.publicKey) {
        console.log("public key", wallet.publicKey.toString());
        console.log("wallet", wallet);
        SetConnect(true);
        console.log("wallet connected here");
        // Create connection
        try{
          // Get all mint tokens (NFTs) from your wallet
          const walletAddr = wallet.publicKey.toString();
          
          let mints = await NFTs.getMintTokensByOwner(connection, walletAddr);
          console.log('mints', mints);          

          noises = [];
          let card = [];
          //CHECK WITH ALL NFT ADDRESS FROM AN ARRAY & PUT IT IN THE ARRAY
          for(let i=0;i<mints.length;i++){
            let mint = mints[i];
            // console.log("cardInfo", cardInfo,i);
            if(allMints.includes(mint)){           
              console.log('mint', mint);

              const tokenAddress = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                new web3.PublicKey(mint),
                wallet.publicKey
              );
              console.log(tokenAddress.toString());
              // let tokenAddressBalance = await connection.getTokenAccountBalance(tokenAddress);
              // console.log(tokenAddressBalance.value.amount);
              
              //CHECK IF the user is the current nft owner
              // if(tokenAddressBalance.value.amount > 0){
                // console.log("public key", wallet.publicKey.toString());
                // console.log("public nft owner", myNFT.owner);
                let cardObj = {};
                // console.log("new mint", mint);                              
                fetch('https://api.solscan.io/account?address=' + mint) //mainnet api
                // fetch('https://api-devnet.solscan.io/account?address=' + mint) //devnet api
                .then(response => response.json())
                .then(data => {                                         
                    // name of the noise
                    console.log("metadata", data.data.metadata);

                    //supply should not be zero
                    if(data.data.tokenInfo.supply > 0){                    
                      noises.push(mint);
                      fetch(data.data.metadata.data.uri)
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
                });
              // }
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
  }, [wallet]);

  useEffect(() => {   
      SetNftInfo(cardInfo);
   },[]);
  //burn the NFTs
  const onBurn = async () => {
    console.log("burn");
    if(!isLoading){
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
      
        console.log("noises in burn", count);

        //TODO: HARSH : change i=0 when your dynamic card display is resolved
        for(let i=0;i<count.length;i++){
          let mint = new web3.PublicKey(count[i]);  

          // console.log("wallet.publicKey", wallet.publicKey.toString());
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

        const anchorWallet = {
          publicKey: wallet.publicKey,
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        };
  
        const { candyMachine, goLiveDate, itemsRemaining, itemsAvailable, itemsRedeemed } =
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
        setFinal(true);
        setLoading(status);
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
  const history = useHistory();

  function refreshPage() {
    history.push("/");
    window.location.reload(false);

  }

  return (
    // <ConnectionProvider endpoint={endpoint}>
    //   <WalletProvider wallets={wallets} autoConnect>
    //     <WalletModalProvider >
    <>
      <div className='section-2new' style={{marginBottom: "76px"}}>
        <Row className='px-3 py-0'>
          <Col lg={3} className='p-0'></Col>
          <Col lg={6} className='p-0'>
            <div>
                <h2>Burning mechanism to claim Noise Pass!</h2>
                <ol type="1">
                    <li style={{color: "#050505",opacity:"0.7",paddingTop:"7px",paddingBottom:"2px"}}>Select 6 noises which you want to burn.</li>
                    <li style={{color: "#050505",opacity:"0.7",paddingTop:"7px",paddingBottom:"2px"}}>Burn & claim</li>
                </ol>
                <p style={{marginBottom: "43px"}}> NOTE: If you don’t have enough noises - <a href="https://magiceden.io/marketplace/project_noise">buy here</a> </p>
            </div>
            <div style={{minHeight:"50vh"}}>
                <div style={{borderBottom: "solid 2px black"}}>
                {/* <Loader type="Oval" color="#00BFFF" height={80} width={80} /> */}
                    <p>My Noises 
                      {/* ({cardInfo.length}) */}
                      </p>
                </div>
                <div>
                    { connect ?
                    
                    <Row className='mr-0' style={{position:"relative"}}>
                      <div className="load" style={close ?{display:"none"}:{display:"block"}}>
                        <Loader
                           type="Oval" 
                           color="#000"
                            height={80}
                             width={80} 
                             className="loader"
                             />
                      </div>
                          
                        {nftInfo.map((product, i) => (
                          
                            <Col key={i} sm={12} lg={4 } style={{ padding: '5px' }} onClick={() => {
                              setShow(!show);
                            }}>
                              <SelectCard product={product} onSelect={countfunc} shouldSelect={count.length} />
                            </Col>
                          
                        ))}
                      </Row>
                     //3 secs
                    
                    :
                    ""
                    // <ConnectButton className="burnbutton">Connect Wallet</ConnectButton>
                    // <button className="burnbutton" style={{marginTop:"43px",border:"0"}}>Connect Wallet</button>
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
          { connect ?
                      <div style={{display: "inline-block", width:"100%", padding:"10px 0 20px 0"}}>
                        <p style={{float: "left",color:"black",marginTop:"10px"}}>{count.length} Noises selected</p>
                        <div style={{float: "right"}}>
                          <button  disabled={(count.length < 6 || count.length > 6) || isLoading}
                          // onClick={()=>{setFinal(true);}}
                          onClick={onBurn}
                          style={isLoading || count.length < 6 || count.length > 6 ? {background: "linear-gradient(90deg, rgb(14 255 183 / 40%), rgb(255 19 13 / 40%), rgb(255 255 0 / 40%))",marginRight: "10px",padding:"10px",border:"0"} : {backgroundImage: "linear-gradient(90deg, #0EFFB7, #FF130D, #FFFF00)",marginRight: "10px",padding:"10px",border:"0"}} 
                          >
                          
                            <FontAwesomeIcon
                                icon={faFire}
                                style={{ width: "1rem",  margin: "0 0.5rem 0 0"  }}
                            />
                        {isLoading ? 'Burning...' : 'Burn to Claim Pass!'}</button>
                          {/* <button style={{padding:"10px",border:"0",}} onClick={()=>{
                            // setClose(true);
                            count=[];
                            }}>
                          <FontAwesomeIcon
                                icon={faTimes}
                                style={{ width: "1rem",  margin: "0 0.5rem 0 0",opacity:"0.4" }}
                            />
                            <span style={{opacity:"0.4"}}>Cancel</span>
                            </button> */}
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
        refreshPage()}}>
        <Modal.Header closeButton className='custom'>
          <Modal.Title className='modal-title'></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <Row >
            <Col lg={3}></Col>
            <Col lg={6} className='px-3'>
              <h1 className='primary-text' style={{textAlign:"center",fontSize:"28px !important"}}>Congratulations! <br/>
On joining the club!</h1>
              <div className='gifWeb' style={{width:"459px",height:"459px",margin:"20px 120px"}}>
                <img src={web_hero_gif} />
              </div>
            <p style={{color:"black",textAlign:"center"}}>Thanks for participating!<br/>See you on the other side   </p>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
    // </WalletModalProvider>
    //   </WalletProvider>
    // </ConnectionProvider>
  );
};

export default BurnPortal;