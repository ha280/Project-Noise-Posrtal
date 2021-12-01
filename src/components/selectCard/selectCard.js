import React, { useState, useRef } from 'react'
import { Modal, Button, Row, Col, Overlay } from 'react-bootstrap'

import './selectCard.css';

const SelectCard = ({ product,onSelect }) => {
  const [show, setShow] = useState(false);
  
  return (
    
      <div className={show ? 'clickedgallryCard':'gallerycard'} onClick={() => {
        onSelect(product.mint,show);
        setShow(!show);
        
      }}>
        <label class="container">
          <input type="checkbox" checked={show}/>
          <span class="checkmark"></span>
        </label>
        <div className='card-image'>
          <img src={product.src} alt='galleryimage' />
        </div>
        <div className='image-code'>
          {product.code}
        </div>
      </div>

      
  )
}

export default SelectCard
