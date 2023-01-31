import React, { useState } from 'react';
import { Modal, Container } from 'react-bootstrap';
import { checkMimeType, checkFileSize } from './uploadValidations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { submitBountyLink } from '../../Services/profileServices';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const RequestBounty = ({ show, handleClose, setApply, rowData }) => {
  const airdrop = useSelector((state) => state.auth.walletData);
  const postedLink = useSelector((state) => state.auth.bountyLink);
  console.log(postedLink);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    link: '',
    file: '',
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const twitterButton = (
    <TwitterShareButton
      id='twitter'
      title={`Requesting faucet funds into ${
        airdrop.wallet_address ? airdrop.wallet_address : null
      } on the #Rinkeby #Ethereum test network`}
      url='https://admin-mega-ico.herokuapp.com/'
    >
      <TwitterIcon size={32} round />
      Tweet
    </TwitterShareButton>
  );
  const facebookButton = (
    <FacebookShareButton
      quote={`Requesting faucet funds into ${
        airdrop.wallet_address ? airdrop.wallet_address : null
      } on the #Rinkeby #Ethereum test network`}
      description={'bounty'}
      url='google.com'
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
  );

  const { link, file } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(rowData);
    e.preventDefault();

    const data1 = {
      link: link,
      file: file,
    };
    const body = new FormData();
    body.append('link', link);

    dispatch(submitBountyLink(body));
    handleClose();
    setApply(true);
  };

  //On File Adding
  const onChangeHandler = (event) => {
    console.log('event is', event);
    var file = event.target.files[0];
    var fileTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    var fileSize = 10000000; // Max File Size 10mb
    if (checkFileSize(event, fileSize) && checkMimeType(event, fileTypes)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const files = file;
        const base64data = reader.result;
        console.log(files);
        setFormData({ ...formData, file: files });
        setSelectedFile(base64data);
      };
      toast.success('upload success');
    }
  };

  return (
    !show && (
      <Modal
        id='modalBounty'
        show={!show}
        onHide={handleClose}
        style={{ opacity: 1 }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Request Bounty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <form onSubmit={onSubmit}>
              <div className='form-group'></div>

              <div className='form-group'>
                <label htmlFor='link'>Link</label>
                <input
                  type='url'
                  className='form-control'
                  id='link'
                  placeholder='Add Link'
                  name='link'
                  value={link}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div style={{ fontSize: '16px', textAlign: 'center' }}>OR</div>
              <label>Upload Your File </label>
              <div
                style={{
                  height: '300px',
                  border: '1px dotted #C0C0C0',
                  textAlign: 'center',
                }}
                class='form-group files'
              >
                {selectedFile !== null && (
                  <img style={{ width: '300px' }} src={selectedFile} />
                )}
                <input
                  style={{ opacity: '0' }}
                  type='file'
                  class='form-control'
                  name='file'
                  onChange={onChangeHandler}
                />
              </div>
              <div className='form-group'>
                <button className='form-control btn btn-primary' type='submit'>
                  Submit
                </button>
              </div>
              <ToastContainer />
            </form>
          </Container>
        </Modal.Body>
      </Modal>
    )
  );
};
export default RequestBounty;
