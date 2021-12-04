import React, { useState, useRef } from 'react'
import { Modal, Button, Row, Col, Overlay } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import './selectCard.css';

const SelectCard = ({ product,onSelect,shouldSelect }) => {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  if (clicked) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  }
  return (
    <>
      <div className={show  ? 'clickedgallryCard':'gallerycard'} onClick={() => {
        
        if(shouldSelect+1<2 || show== true){
          onSelect(product.mint,show);
          setShow(!show);
        }else{
          setClicked(true);
        }
      }}>
        <label class="container">
          <input type="checkbox" checked={show}/>
          <span class="checkmark"></span>
        </label>
        <div className='card-image' style={{paddingTop:"0"}}>
          <img src={product.src} alt='galleryimage' />
        </div>
        <div className='image-code' style={{paddingTop:"5px"}}>
          {product.code}
        </div>
      </div>
      
</>
      
  )
}

export default SelectCard
