import React from 'react';
import logo from '../../assets/images/logo.png';
import ath from '../../assets/images/ath-gfx.png';
import { tokenNameF } from '../TokenInfo';

const withAuthLayout = (WrappedComponent) => {
  const WithAuth = (props) => {
    return (
      <div className='page-ath-wrap'>
        <div className='page-ath-content'>
          <div class='page-ath-header'>
            <a href='./' class='page-ath-logo'>
              <img
                src={logo}
                // srcset='images/logo2x.png 2x'
                alt='logo'
              />
            </a>
          </div>
          {/* ------------------------------------------ */}
          <WrappedComponent {...props} />
          {/* ------------------------------------------ */}
          <div class='page-ath-footer'>
            <ul class='footer-links'>
              <li>
                <a href='regular-page.html'>Privacy Policy</a>
              </li>
              <li>
                <a href='regular-page.html'>Terms</a>
              </li>
              <li>&copy; 2018 TokenWiz.</li>
            </ul>
          </div>
        </div>
        <div class='page-ath-gfx'>
          <div class='w-100 d-flex justify-content-center'>
            <div class='col-md-8 col-xl-5'>
              <img src={ath} alt='image' />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return WithAuth;
};

export default withAuthLayout;
