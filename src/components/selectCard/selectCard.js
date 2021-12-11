import React, { useState } from 'react'
import { Modal, Button, Row, Col, Overlay } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import './selectCard.css';

const SelectCard = ({ product,onSelect,shouldSelect }) => {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  // if (clicked) {
  //   return (
  //     <Alert variant="danger" style={{position:"absolute",zIndex:"100"}} onClose={() => setClicked(false)} dismissible>
  //       <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
  //       <p>
  //         Change this and that and try again. Duis mollis, est non commodo
  //         luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
  //         Cras mattis consectetur purus sit amet fermentum.
  //       </p>
  //     </Alert>
  //   );
  // }
  return (
    <>
      <div className={show  ? 'clickedgallryCard':'gallerycard'} onClick={() => {
        
        if(shouldSelect+1<7 || show== true){
          onSelect(product.mint,show);
          setShow(!show);
        }else{
          setClicked(true);
        }
      }}>
        <label className="container">
          <input type="checkbox" checked={show}/>
          <span className="checkmark"></span>
        </label>
        <div className='card-image' style={{paddingTop:"0"}}>
          <img src={product.src} alt='galleryimage' />
        </div>
        <div className='image-code' style={{paddingTop:"5px"}}>
          {product.code}
        </div>
      </div>
      <Modal show={clicked}  onHide={() => setClicked(false)}>
        <Modal.Header closeButton className=''>
          <Modal.Title className=''></Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
              <h4 className='primary-text' style={{textAlign:"center",fontSize:"15px !important"}}>Cannot Select More than 6 cards</h4>
              
        </Modal.Body>
      </Modal>
</>
      
  )
}

export default SelectCard
