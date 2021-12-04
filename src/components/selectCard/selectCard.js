import React, { useState, useRef } from 'react'
import { Modal, Button, Row, Col, Overlay } from 'react-bootstrap'

import './selectCard.css';

const SelectCard = ({ product,onSelect,shouldSelect }) => {
  const [show, setShow] = useState(false);
  
  return (
    <>
      <div className={show  ? 'clickedgallryCard':'gallerycard'} onClick={() => {
        
        if(shouldSelect+1<2 || show== true){
          onSelect(product.mint,show);
          setShow(!show);
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
