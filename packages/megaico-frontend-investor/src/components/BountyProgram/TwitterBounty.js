import React, { useState } from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { InstapaperShareButton, InstapaperIcon } from 'react-share';
import { Modal, Container } from 'react-bootstrap';

const TwitterBounty = ({ show, handleClose, setApply }) => {
  return (
    <Modal show={show} onHide={handleClose} style={{ opacity: 1 }} centered>
      <Modal.Header closeButton></Modal.Header>
      <TwitterShareButton
        title='Requesting faucet funds into 0x8Ff6Ac8E51BAb11170DcF005672e459d6f459554 on the #Rinkeby #Ethereum test network'
        url='https://admin-mega-ico.herokuapp.com/'
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </Modal>
  );
};

export default TwitterBounty;
