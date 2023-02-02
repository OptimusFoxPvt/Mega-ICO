import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import browserRoute from '../../../Routes/browserRoutes';
import withAuthLayout from '../../HOC/withAuthLayout';
import { useDispatch } from 'react-redux';
import { register } from '../../../Redux/actions/actions';
import { toast } from 'react-toastify';
import { tokenName } from '../../TokenInfo';
import SignInWith from '../SignInWith';
const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { first_name, last_name, email, password, password2 } = formData;
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error('Password donot match');
    }
    dispatch(register({ formData, history, setLoading }));
  };

  return (
    <div className='page-ath-form'>
      <h2 className='page-ath-heading'>
        Sign up <small>Create New {tokenName} Account</small>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='input-item'>
          <input
            type='text'
            placeholder='First Name'
            className='input-bordered'
            name='first_name'
            value={first_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-item'>
          <input
            type='text'
            placeholder='Your Last Name'
            className='input-bordered'
            name='last_name'
            value={last_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-item'>
          <input
            type='email'
            placeholder='Your Email'
            className='input-bordered'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-item'>
          <input
            type='password'
            placeholder='Password'
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
            placeholder='Repeat Password'
            className='input-bordered'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='input-item text-left'>
          <input
            className='input-checkbox input-checkbox-md'
            id='term-condition'
            type='checkbox'
            required
          />
          <label for='term-condition'>
            I agree to {tokenName}’s{' '}
            <Link to={browserRoute.TERMS}>Privacy Policy</Link> &amp;{' '}
            <Link to={browserRoute.TERMS}> Terms.</Link>
          </label>
        </div>
        <button className='btn btn-primary btn-block' type='submit'>
          Create Account
          {loading ? (
            <>
              <i
                class='spinner-border text-light ml-3'
                style={{ width: '20px', height: '20px' }}
                role='status'
              >
                <span class='sr-only'></span>
              </i>
            </>
          ) : null}
        </button>
      </form>
      <SignInWith />
      <div className='gaps-2x'></div>
      <div className='gaps-2x'></div>
      <div className='form-note'>
        Already have an account ?{' '}
        <Link to={browserRoute.SIGNIN}>
          {' '}
          <strong>Sign in instead</strong>
        </Link>
      </div>
    </div>
  );
};

export default withAuthLayout(SignUp);
