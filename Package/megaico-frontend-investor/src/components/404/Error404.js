import React from 'react';
import { useHistory } from 'react-router';
import browserRoute from '../../Routes/browserRoutes';

export default function Error404() {
  const history = useHistory();

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className='vh100 d-flex align-items-center'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-7 col-xl-6 text-center'>
            <div className='error-content'>
              <span className='error-text-large'>404</span>
              <h4 className='text-dark'>Opps! Why you’re here?</h4>
              <p>
                We are very sorry for inconvenience. It looks like you’re try to
                access a page that either has been deleted or never existed.
              </p>
              <button className='btn btn-primary' onClick={goBack}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
