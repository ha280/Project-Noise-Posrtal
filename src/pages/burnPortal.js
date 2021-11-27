import React, { useState, useRef } from 'react';
import { Modal, Button, Row, Col, Overlay,Nav } from 'react-bootstrap';
import SelectCard from '../components/selectCard/selectCard'
// import LogoWeb from '../assets/Landingweb
import './burn.css'
import web_hero_gif from '../content/Untitled.png';
let count = [];
const cardInfo = [
  {
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
  },
  {
      "code": "#2154",
      "owner": "G22JKaE5nPLT5b613QvjN6SdqpEK6c8noVtGPS99gq3C",
      "src": "https://arweave.net/jEsrUkwT0_5H4fvCbSVUW-9X-QSMXg4piYVBGUA5slU",
      "traits": [
          {
              "trait_type": "Color",
              "value": "White"
          },
          {
              "trait_type": "Type",
              "value": "Wave Two"
          }
      ]
  },
  {
      "code": "#1253",
      "owner": "G22JKaE5nPLT5b613QvjN6SdqpEK6c8noVtGPS99gq3C",
      "src": "https://arweave.net/jEsrUkwT0_5H4fvCbSVUW-9X-QSMXg4piYVBGUA5slU",
      "traits": [
          {
              "trait_type": "Color",
              "value": "White"
          },
          {
              "trait_type": "Type",
              "value": "Wave Two"
          }
      ]
  },
  {
    "code": "#1241",
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
},
{
    "code": "#254",
    "owner": "G22JKaE5nPLT5b613QvjN6SdqpEK6c8noVtGPS99gq3C",
    "src": "https://arweave.net/jEsrUkwT0_5H4fvCbSVUW-9X-QSMXg4piYVBGUA5slU",
    "traits": [
        {
            "trait_type": "Color",
            "value": "White"
        },
        {
            "trait_type": "Type",
            "value": "Wave Two"
        }
    ]
},
{
    "code": "#1254",
    "owner": "G22JKaE5nPLT5b613QvjN6SdqpEK6c8noVtGPS99gq3C",
    "src": "https://arweave.net/jEsrUkwT0_5H4fvCbSVUW-9X-QSMXg4piYVBGUA5slU",
    "traits": [
        {
            "trait_type": "Color",
            "value": "White"
        },
        {
            "trait_type": "Type",
            "value": "Wave Two"
        }
    ]
},
];
const BurnPortal = () => {
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState(false);
    const [noise,SetNoise] = useState('-');
    const [connect,SetConnect] = useState(true);
    
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
    
  return (
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
                    <button className="burnbutton" style={{marginTop:"43px",border:"0"}}>Connect Wallet</button>}
                    
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
                          <button  disabled={count.length<6} 
                          onClick={()=>{setFinal(true);}}
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
  );
};

export default BurnPortal;