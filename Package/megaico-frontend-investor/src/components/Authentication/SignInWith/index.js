import React from 'react';

const SignInWith = () => {
  return (
    <>
      <div className='sap-text'>
        <span>Or Sign In With</span>
      </div>
      <ul className='row guttar-20px guttar-vr-20px'>
        <li className='col'>
          <a
            href='#'
            className='btn btn-outline btn-dark btn-facebook btn-block'
          >
            <em className='fab fa-facebook-f'></em>
            <span>Facebook</span>
          </a>
        </li>
        <li className='col'>
          <a href='#' className='btn btn-outline btn-dark btn-google btn-block'>
            <em className='fab fa-google'></em>
            <span>Google</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default SignInWith;
