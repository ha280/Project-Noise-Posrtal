import React from 'react';
import { Row, Col, Nav,Button } from 'react-bootstrap';
import link_arrow from '../assets/link_arrow.png';
import { ReactComponent as LogoSvg } from '../assets/logo.svg';
import { ReactComponent as Logo2Svg } from '../assets/logo2.svg';
// import LogoWeb from '../assets/Landingweb
import web_hero_gif from '../content/Untitled.png';




import './home.css'

const newHome = () => {
  return (
    <>
      <div className='section-1 dark-bg'>
        <Row className='px-3 m-0'>
          <Col lg={2}></Col>

          <Col lg={10}>
            <div className='main-section'>
              <div className='mint-sectionnew'>
                <div className='mint-container'>
                  <h1 >Join the Noise Club!</h1>
                  <p>
                  To claim the Noise pass you need to burn 6 noise
                  </p>
                  {/* <Button variant='secondary' className='btn-primary2 m-0 btn-block'> SOLD OUT ! </Button> */}
                  <div className='outline-divnew'>Status - 21/100 Claimed</div>
                    <Button href="/burnportal" className='text-center cardDivLarge text-white p-2' style = {{ width:"20rem"}}>Go to Burn Portal -> </Button>
                </div>
              </div>
              <div className='gifWeb' style={{marginLeft: "2rem"}}>
                <img src={web_hero_gif} />
              </div>
            </div>
          </Col>
          {/* <Col lg={6} className='mobile-section m-0 p-0'>
            <div className='mobileGifComponent'>
              <img src={mobile_hero_gif} alt='gif' className='gifMobile' />
            </div>
            <div className='mobileMintComponent p-0'>
              <Soldout2 />
            </div>
          </Col> */}

          <Col lg={3}></Col>
        </Row>
      </div>

      <div className='section-2new'>
        <Row className='px-3 py-0'>
          <Col lg={3} className='p-0'></Col>
          <Col lg={6} className='p-0'>
            <h1 >Why Burn?</h1>
            <ul type="disc">
              <li>be mindful while burning - this will impact the rarity of the collection -eg if majority burns yellow and red then it will become the rarest/</li>
              <li>till? what date?<br/>Next collection etc</li>
            </ul>
            <h5>Noise Pass</h5>
            <ol type="1">
              <li style={{color: "rgba(0, 0, 0, 0.6)",paddingTop:"7px",paddingBottom:"2px"}}>Free airdrops for all future collections</li>
              <li style={{color: "rgba(0, 0, 0, 0.6)",paddingTop:"0px"}}>Whitelisting for all future collections</li>
            </ol>
            <h1 style={{paddingTop:"1rem",paddingBottom:"2rem"}}>What if I dont burn?</h1>
            <h5>Hold 3 Noises</h5>
            <ol type="1">
              <li style={{color: "rgba(0, 0, 0, 0.6)",paddingTop:"7px",paddingBottom:"2px"}}>Give-away raffle </li>
              <li style={{color: "rgba(0, 0, 0, 0.6)",paddingTop:"0px"}}>Whitelisting for all future collections</li>
            </ol>
            <h5 >Hold 1 Noises</h5>
            <ol type="1">
              <li style={{color: "rgba(0, 0, 0, 0.6)",paddingTop:"7px",paddingBottom:"2px"}}>Exclusive discord channel to hang with the community</li>
              <li style={{color: "rgba(0, 0, 0, 0.6)",paddingTop:"0px"}}>Whitelist for all future collections</li>
            </ol>
          </Col>
          <Col lg={3} className='p-0'>
          
          </Col>
        </Row>

      </div>

      <div className='section-8 dark-bg px-3'>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6} className='footer pt-1'>
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
          <Col lg={3}></Col>
        </Row>
      </div>

    </>
  );
};

export default newHome;