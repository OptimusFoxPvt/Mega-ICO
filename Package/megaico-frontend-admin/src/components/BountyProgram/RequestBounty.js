import React, { useState } from 'react';
import { Modal, Container } from 'react-bootstrap';
import { checkMimeType, checkFileSize } from './uploadValidations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestBounty = ({ show, handleClose, setApply }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    desp: '',
    link: '',
  });
  const { desp, link } = formData;

  const onSubmit = (e) => {
    e.preventDefault();

    handleClose();
    setApply(true);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //On File Adding
  const onChangeHandler = (event) => {
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
      // if return true allow to setState
      setSelectedFile(file);
      toast.success('upload success');
    }
  };

  return (
    show && (
      <>
        <Modal show={show} onHide={handleClose} style={{ opacity: 1 }} centered>
          <Modal.Header closeButton>
            <Modal.Title>Request Bounty</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: '16px', textAlign: 'center' }}>
              Please enter the details of the bounty
            </p>
            <Container>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='desp'>Bounty Description</label>
                  <input
                    type='text'
                    className='form-control'
                    id='desp'
                    placeholder='Enter Bounty Description'
                    name='desp'
                    value={desp}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='link'>Link</label>
                  <input
                    type='url'
                    pattern='/^http(s*)://(www.)*facebook.com/[a-zA-Z0-9.]+$/'
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
                  style={{ border: '1px dotted #C0C0C0' }}
                  class='form-group files'
                >
                  <input
                    style={{ opacity: '0' }}
                    type='file'
                    class='form-control'
                    name='file'
                    onChange={onChangeHandler}
                  />
                </div>

                <div className='form-group'>
                  <button
                    className='form-control btn btn-primary'
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
                <ToastContainer />
              </form>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    )
  );
};

export default RequestBounty;
