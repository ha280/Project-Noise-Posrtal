import './selectCard.css';

import React, { useState } from 'react'

import { ReactComponent as CheckLogo } from "../../assets/check.svg"
import { Modal } from 'react-bootstrap'

const SelectCard = ({ product, onSelect, shouldSelect }) => {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className={show ? 'clickedgallryCard' : 'gallerycard'} onClick={() => {

        if (shouldSelect + 1 < 7 || show == true) {
          onSelect(product.mint, show);
          setShow(!show);
        } else {
          setClicked(true);
        }
      }}>
        {show && (
          <CheckLogo className='check-logo' />
          // <label className="container">
          //   <input type="checkbox" checked={show} />
          //   <span className="checkmark"></span>
          // </label>
        )}
        <div className='card-image' style={{ paddingTop: "0" }}>
          <img src={product.src} alt='galleryimage' />
        </div>
        <div className='image-code' style={{ paddingTop: "5px" }}>
          {product.code}
        </div>
      </div>
      <Modal className='modal-1' show={clicked} onHide={() => setClicked(false)}>
        <Modal.Header closeButton className=''>
          <Modal.Title className=''></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body-1'>
          <h4 className='primary-text' style={{ textAlign: "center", fontSize: "15px !important" }}>Cannot Select More than 6 cards</h4>

        </Modal.Body>
      </Modal>
    </>

  )
}

export default SelectCard
