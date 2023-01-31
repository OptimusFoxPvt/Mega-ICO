import React, { useState } from 'react';
import { withRouter } from 'react-router';
import withAuthLayout from '../../HOC/withAuthLayout';
import { resetPasswordFunction } from '../../../Redux/actions/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ResetPassword = ({ match, history }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const { password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Password donot match');
    }
    let data = {
      password: formData.password,
      token: match.params.id || 0,
    };
  };

  return (
    <div className='page-ath-form'>
      <h2 className='page-ath-heading'>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <div className='input-item'>
          <input
            type='password'
            placeholder='New Password'
            className='input-bordered'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-item'>
          <input
            type='password'
            placeholder='Confirm Password'
            className='input-bordered'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button className='btn btn-primary btn-block' type='submit'>
          Confirm
        </button>
      </form>
      <div className='sap-text'></div>
      <div className='gaps-2x'></div>
      <div className='gaps-2x'></div>
    </div>
  );
};

export default withAuthLayout(withRouter(ResetPassword));
