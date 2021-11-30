import { useEffect, useState, useMemo } from 'react';
import { Modal, Button, Row, Col, Overlay,Nav } from 'react-bootstrap';
import SelectCard from '../components/selectCard/selectCard'
// import LogoWeb from '../assets/Landingweb
import './burn.css'
import allMints from '../mint-devnet.json'
import { useWallet } from '@solana/wallet-adapter-react';
import NFTs from '@primenums/solana-nft-tools';
import * as web3 from "@solana/web3.js";
import { Program, Provider } from "@project-serum/anchor";
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

import web_hero_gif from '../content/Untitled.png';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

let count = [];
let noises = [];
let cardInfo = [{
  "code": "#1240",
  "owner": "CM1CPAJPZ59VCMtFBP5pdN4LT3MaziYZoaxDSBPTvJ65",
  "src": "https://arweave.net/TFlPE0iN7DRzItMiGn97C53tMTE2gsg524hySCAi_So",
  "traits": [
      {
          "trait_type": "Color",
          "value": "Yellow"
      },
      {
          "trait_type": "Type",
          "value": "Ripple One"
      }
  ]
}];
const BurnPortal = ({connection}) => {
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState(false);
    const [noise,SetNoise] = useState('-');
    const [connect,SetConnect] = useState(false);
        
    
    const countfunc = (product,isSelected) => {
    //   console.log(product);
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
      if (wallet?.publicKey) {
        SetConnect(true);
        console.log("wallet connected here");
        // Create connection
        try{
          // Get all mint tokens (NFTs) from your wallet
          const walletAddr = wallet.publicKey.toString();
          
          console.log(walletAddr);
          console.log("connection", connection);
          let mints = await NFTs.getMintTokensByOwner(connection, walletAddr);
          console.log('mints', mints);

          noises = [];
          cardInfo = [];
          //CHECK WITH ALL NFT ADDRESS FROM AN ARRAY & PUT IT IN THE ARRAY
          mints.map((mint, i) => {
            if(allMints.includes(mint)){
              let cardObj = {};
              console.log("new mint", mint);              
              fetch('https://api-devnet.solscan.io/account?address=' + mint) 
              .then(response => response.json())
              .then(data => {                                         
                  // name of the noise
                  // console.log(data.data.metadata.data.name);

                  // console.log("supply",data.data.tokenInfo.supply);

                  //supply should not be zero
                  if(data.data.tokenInfo.supply > 0){
                    noises.push(mint);
                    fetch(data.data.metadata.data.uri)
                    .then(response => response.json())
                    .then(data => {                    
                      // image url for the noise
                      // console.log(data);

                      cardObj = {
                        "code": data.name,
                        "owner": "",
                        "src": data.image,
                        "traits": data.attributes
                      }
                      console.log("cardObj", cardObj);
                      cardInfo.push(cardObj);
                    });                  
                  }                  
              });
            }
          });
          
          console.log('noise', cardInfo);

        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [wallet]);

  //burn the NFTs
  const onBurn = async () => {
    console.log("burn");
    try {      
      if (wallet.connected && wallet.publicKey) {

          let opts = {
            preflightCommitment: 'recent',
            commitment: 'recent',
        };
        
        // let mint = new web3.PublicKey("64ZncPDFdEfSbydmDMHtXLmgDjNQ6T1cYz7BSFyMXhZS");

        let provider = new Provider(connection, wallet, opts);

        let txnWithSigs = [];
        let creatorIdoToken = "";
        let transaction = "";

        //TODO: replace noises with selected
        console.log("noises in burn", noises);
        for(let i=0;i<noises.length;i++){
          let mint = new web3.PublicKey(noises[i]);  

          console.log("wallet.publicKey", wallet.publicKey.toString());
          creatorIdoToken = await Token.getAssociatedTokenAddress(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              mint,
              wallet.publicKey
          );
                  
          console.log("creatorIdoToken", creatorIdoToken.toString());

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
        // let txSigs = await provider.sendAll(txnWithSigs);
        // console.log("burn: ", txSigs);

        const anchorWallet = {
          publicKey: wallet.publicKey,
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        };
  
        const { candyMachine, goLiveDate, itemsRemaining, itemsAvailable, itemsRedeemed } =
          await getCandyMachineState(
            anchorWallet,
            "G5BXXPsGfYVQHw3k4NZrmMC2UMFRdosyv6JtwciqC1A7",
            connection
          );

        //Mint token
        const [mintTxId, mint] = await mintOneToken(
          candyMachine,
          new web3.PublicKey("CuVXnd2GhJ55jDDfpKk1SSWuEyMVmYi5NJevaGEm2Fex"),
          wallet.publicKey,
          new web3.PublicKey("5NRKYY5xy7V7HcFXJAbJYbhh4oKixUJmqMq89ZJcdsH6")
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

        setFinal(true);
      }
    } catch (e) {
      console.log(e);      
    } finally {
      
    }
  }
    

  return (
    // <ConnectionProvider endpoint={endpoint}>
    //   <WalletProvider wallets={wallets} autoConnect>
    //     <WalletModalProvider >
    <>
      <div className='section-2new'>
        <Row className='px-3 py-0'>
          <Col lg={3} className='p-0'></Col>
          <Col lg={6} className='p-0'>
            <div>
                <h2>Burning mechanism to claim Noise Pass!</h2>
                <ol type="1">
                    <li style={{color: "#050505",opacity:"0.7",paddingTop:"7px",paddingBottom:"2px"}}>Select 6 noises which you want to burn.</li>
                    <li style={{color: "#050505",opacity:"0.7",paddingTop:"7px",paddingBottom:"2px"}}>Burn & claim</li>
                </ol>
                <p style={{marginBottom: "43px"}}> NOTE: If you don’t have enough noises -<a href="">buy here</a> </p>
            </div>
            <div style={{minHeight:"50vh"}}>
                <div style={{borderBottom: "solid 2px black"}}>
                    <p>My Noises ({noise})</p>
                </div>
                <div>
                    { connect ?
                    <Row className='mr-0'>
                        {cardInfo.map((product, i) => (
                          
                            <Col key={i} sm={12} lg={4 } style={{ padding: '5px' }} onClick={() => {
                              setShow(!show);
                              

                            }}>
                              <SelectCard product={product} onSelect={countfunc}/>
                            </Col>
                          
                        ))}
                      </Row>
                    :
                    ""
                    // <button className="burnbutton" style={{marginTop:"43px",border:"0"}}>Connect Wallet</button>
                    }
                    
                </div>
                
            </div>
            
          </Col>
          <Col lg={3} className='p-0'>
          
          </Col>
        </Row>

      </div>

      <div className='section-8 px-3'>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6} className='footer pt-1'>
          { connect ?
                      <div style={{display: "inline-block", width:"100%", padding:"30px 0 20px 0"}}>
                        <p style={{float: "left",color:"black"}}>{count.length} Noises selected</p>
                        <div style={{float: "right"}}>
                          <button  disabled={count.length<1} 
                          // onClick={()=>{setFinal(true);}}
                          onClick={onBurn}
                          style={{backgroundImage: "linear-gradient(90deg, #0EFFB7, #FF130D, #FFFF00)",marginRight: "10px",padding:"10px",border:"0"}} 
                          >Burn to Claim Pass!</button>
                          <button style={{padding:"10px",border:"0"}}>Cancel</button>
                        </div>
                      </div>  
                    :
                    <div></div>}
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
      <Modal show={final} fullscreen='true' onHide={() => setFinal(false)}>
        <Modal.Header closeButton className='custom'>
          <Modal.Title className='modal-title'></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <Row >
            <Col lg={3}></Col>
            <Col lg={6} className='px-3'>
              <h1 className='primary-text' style={{textAlign:"center",fontSize:"28px !important"}}>Congratulations! <br/>
On joining the club!</h1>
              <div className='gifWeb' style={{width:"459px",height:"459px",margin:"20px 140px"}}>
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