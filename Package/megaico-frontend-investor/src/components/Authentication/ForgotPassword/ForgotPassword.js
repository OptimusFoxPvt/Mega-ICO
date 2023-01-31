import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import browserRoute from '../../../Routes/browserRoutes';
import withAuthLayout from '../../HOC/withAuthLayout';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../../../Redux/actions/actions';

const ForgotPassword = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='page-ath-form'>
      <h2 className='page-ath-heading'>
        Reset password{' '}
        <span>
          If you forgot your password, well, then we’ll email you instructions
          to reset your password.
        </span>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='input-item'>
          <input
            type='text'
            placeholder='Your Email'
            className='input-bordered'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <button className='btn btn-primary btn-block'>
              Send Reset Link
            </button>
          </div>
          <div>
            <Link to={browserRoute.SIGNIN}>Return to login</Link>
          </div>
        </div>
        <div className='gaps-2x'></div>
      </form>
    </div>
  );
};

export default withAuthLayout(ForgotPassword);
