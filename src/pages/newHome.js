import './home.css'

import { Button, Col, Nav, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import {
  getCandyMachineState,
} from "../candy-machine";
import { useHistory } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import web_hero_gif from '../assets/animationtest_2.gif';

const NewHome = ({ connection }) => {

  const wallet = useWallet();
  const [itemsAvailable, setItemsAvailable] = useState();
  const [itemsRedeemed, setItemsRedeemed] = useState();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        console.log("public key", wallet.publicKey.toString());
        console.log("wallet", wallet);
        if (wallet.disconnecting == true) {
          history.push("/");
          // window.location.reload(false);
        }
        console.log("wallet connected here");

        const anchorWallet = {
          publicKey: wallet.publicKey,
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        };

        const { itemsRemaining, itemsAvailable, itemsRedeemed } =
          await getCandyMachineState(
            anchorWallet,
            "Bnmh7NM1yB2wQDKVW6Tu7fLuEgtc1RkjXqKgk6HrzZHY", //candy machine id
            connection
          );

        console.log("redeemed", itemsRedeemed);
        console.log("available", itemsAvailable);
        console.log("remaining", itemsRemaining);
        setItemsAvailable(itemsAvailable);
        setItemsRedeemed(itemsRedeemed);

      }
    })();
  }, [wallet, connection, history]);

  return (
    <>
      <div className='section-1 dark-bg'>
        <Row className='px-3 m-0'>
          <Col xs={0} sm={0} lg={2}></Col>

          <Col xs={12} sm={12} lg={8}>
            <div className='main-section'>
              <div className='mint-sectionnew'>
                <div className='mint-container'>
                  <h1>Your gateway to a Premium Membership!</h1>
                  <p>
                    Burn 6 Noises to claim the NOISE PASS! Pass airdrops will start from 21st Dec
                  </p>
                  {/* <Button variant='secondary' className='btn-primary2 m-0 btn-block'> SOLD OUT ! </Button> */}
                  {wallet.connected ? (<div className='outline-divnew'>Status - {itemsRedeemed}/{itemsAvailable} Passes Claimed!</div>) : (<div className='outline-divnew'>Status - connect wallet</div>)}
                  <Button href="/burnPortal" className='text-center cardDivLarge text-white p-2' style={{ width: "20rem" }}>Go to Burn Portal </Button>
                  {/* <button className='disabled-btn'>Go to Burn Potal {">"} </button> */}
                </div>
              </div>
              <div className='gifWeb'>
                <img src={web_hero_gif} alt="home" />
              </div>
            </div>
          </Col>

          <Col xs={0} sm={0} lg={2}></Col>
        </Row>
      </div>

      <div className='section-2new'>
        <Row className='px-3 py-0'>
          <Col lg={2} className='p-0'></Col>
          <Col lg={8} className='p-0'>
            <div className="burn-section">
              <h1 id="bold-title">Why Burn?</h1>
              <ul className='bold-list' type="disc">
                <li>With every 6 noises you burn, you will receive 1 Noise pass. </li>
                <li>Each Noise Pass will guarantee one free airdrop from all the future Project Noise curations.</li>
                <li> First airdrop will be from upcoming curation Strokes by John Lax.</li>
              </ul>
            </div>

            <div className='disclaimer'>
              <p>
                *This will also depend on the collection size. For example if the collection is extremely scarce and exclusive like 50-150 pieces then instead of airdrops, all Noise pass holders will get whitelisted, etc.
              </p>
            </div>

            <div className='note-section'>
              <h6 className='note'>Note :</h6>
              <ol>
                <li>The upcoming Project Noise curation is Strokes by John Lax. More details about this curation can be found on our Discord and Twitter.</li>
                <li>There is no limit per wallet for burning. </li>
                <li>Burning will be in multiples of 6. That means 6,12,24… and so on.</li>
                <li>The total number of passes are limited to 100 therefore it will be delivered on a first come first serve basis. Burning will freeze once all 100 passes are claimed.</li>
              </ol>
            </div>
            <div className="dont-burn-section">
              <h1 id="bold-title">What if I dont burn?</h1>

              <ul className='bold-list' type="disc">
                <li>Hold 3 - get eligible for giveaway raffles.</li>
                <li>Hold 1 - get whitelisted for future collections</li>
              </ul>
            </div>
            <div className='mechanics-section'>
              <h1 id="bold-title">MECHANICS</h1>
              <ul className='bold-list' type="disc">
                <li>Burning will only happen with the pieces of our Genesis Collection – REF1ECT </li>
                <li>The idea behind this is to further reduce the total supply of the whole collection.</li>

                <ul className='dash-list' type="-">
                  <li>&nbsp; Current supply – 2222 Noises</li>
                  <li>&nbsp;
                    Expected supply after all passes are claimed – 2222 – 600 = 1622
                  </li>
                </ul>
              </ul>
            </div>
            <div className='final-section'>
              <p>This will reduce the total supply by 27%</p>
              <p className='desc'>
                1. As the burning will take place, Rarity will automatically be induced. For example, if higher percentage of colored ones are burned than they will become rare and so on.
              </p>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>

      </div>

      <div className='section-8 dark-bg px-3'>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8} className='footer pt-1'>
            <Row className='pt-0 pb-2'>
              <Col lg={4} className='footer-brand pt-4 px-0'><p style={{ color: 'white' }}>Project Noise</p></Col>
              <Col lg={5}></Col>
              <Col lg={3} className='px-0'>
                <Row className='m-0 p-0'>
                  <Col lg={3}></Col>
                  <Col className='text-center p-0'>
                    <Nav.Link href='https://twitter.com/Prjctnoise' className='social-media-twitter'><div className='twitter' ></div></Nav.Link>
                  </Col>
                  <Col className='text-center p-0'>
                    <Nav.Link href='https://discord.gg/2AXCqUWX5J' className='social-media-discord'><div className='discord' ></div></Nav.Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </div>

    </>
  );
};

export default NewHome;