import './selectCard.css';

import React, { useState } from 'react'

import { ReactComponent as CheckLogo } from "../../assets/check.svg"
import { ReactComponent as CloseLogo } from "../../assets/close.svg"
import { Modal } from 'react-bootstrap'

const SelectCard = ({ product, onSelect, shouldSelect }) => {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div
        style={{ width: "fit-content" }}
        className={show ? 'clickedgallryCard' : 'gallerycard'}
        onClick={() => {

          if (shouldSelect + 1 < 7 || show == true) {
            onSelect(product, show);
            setShow(!show);
          } else {
            setClicked(true);
          }
        }}>
        {show && (
          <CheckLogo className='check-logo' />
        )}
        <div className='card-image' style={{ paddingTop: "0" }}>
          <img src={product.src} alt='galleryimage' />
        </div>
        <div className='image-code' style={{ paddingTop: "5px" }}>
          {product.code}
        </div>
      </div>
      <div className='select-modal'>
        <Modal className='modal-1' show={clicked} onHide={() => setClicked(false)}>
          <h4 className='primary-text' style={{ textAlign: "center", fontSize: "15px !important" }}>Cannot Select More than 6 cards</h4>
          <CloseLogo onClick={() => setClicked(false)} className='close-modal-icon' />
        </Modal>
      </div>
    </>

  )
}

export default SelectCard
