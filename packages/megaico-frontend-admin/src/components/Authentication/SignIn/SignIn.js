import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import browserRoute from '../../../Routes/browserRoutes';
import withAuthLayout from '../../HOC/withAuthLayout';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/actions/actions';
import { verifyGoogleAuthCode } from '../../../Redux/actions/actions';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { tokenName } from '../../TokenInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(5),
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
  });

  const [verificationPage, setVerificationPage] = useState({
    googlePage: false,
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ formData, history, setVerificationPage, setLoading }));
  };
  const onSubmitAuthenticator = (e) => {
    e.preventDefault();
    console.log('id------>>', auth.authentication.id);
    let user = auth.authentication.id;

    console.log(formData.authenticator);
    dispatch(
      verifyGoogleAuthCode({
        user: auth.authentication.id,
        setVerificationPage,
        verificationCode: formData.authenticator,
        history,
        setLoading,
      })
    );
  };

  return (
    <>
      {verificationPage.googlePage ? (
        <>
          <div className='page-ath-form'>
            <h2 className='page-ath-heading'>
              Google Authentication <small>with your {tokenName} Account</small>
            </h2>
            <form onSubmit={onSubmitAuthenticator}>
              <div className='input-item'>
                <input
                  type='text'
                  placeholder='Authenticator Code'
                  className='input-bordered'
                  name='authenticator'
                  value={formData.authenticator}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className='d-flex justify-content-between align-items-center'></div>
              <button
                className='btn button-color b-button-hovereffect'
                type='submit'
              >
                Submit
                {loading ? (
                  <>
                    <i
                      className='spinner-border text-light ml-3'
                      style={{ width: '20px', height: '20px' }}
                      role='status'
                    >
                      <span className='sr-only'></span>
                    </i>
                  </>
                ) : null}
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className='page-ath-form'>
          <h2 className='page-ath-heading'>
            Sign in <small>with your TokenWiz Account</small>
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
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <Link to={browserRoute.FORGOT_PASSWORD}>Forgot password?</Link>
                <div className='gaps-2x'></div>
              </div>
            </div>
            <button className='btn btn-primary btn-block' type='submit'>
              Sign In{' '}
              {loading ? (
                <>
                  <i
                    className='spinner-border text-light ml-3'
                    style={{ width: '20px', height: '20px' }}
                    role='status'
                  >
                    <span className='sr-only'></span>
                  </i>
                </>
              ) : null}
            </button>
          </form>
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
              <a
                href='#'
                className='btn btn-outline btn-dark btn-google btn-block'
              >
                <em className='fab fa-google'></em>
                <span>Google</span>
              </a>
            </li>
          </ul>
          <div className='gaps-2x'></div>
          <div className='gaps-2x'></div>
        </div>
      )}
    </>
  );
};
export default withAuthLayout(SignIn);
