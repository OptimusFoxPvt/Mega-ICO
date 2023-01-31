import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import withMainLayout from './../HOC/withMainLayout';
import { BtnLoading } from '../Loader/BtnLoading';
import { createToken } from '../../Redux/actions/actions';
import Loader from '../Loader/Loader';
const CreateToken = () => {
  const tokenDeployed = localStorage.getItem('isContractDeployed');
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [tokenCreated, setTokenCreated] = useState(tokenDeployed);
  const [data, setData] = useState({
    tokenName: '',
    tokenSymbol: '',
    tokenRate: '',
    initialTokens: '',
  });

  useEffect(() => {
    checkDisable();
  }, [data]);
  const { tokenName, tokenSymbol, tokenRate, initialTokens } = data;
  const checkDisable = () => {
    if (
      tokenName !== '' &&
      tokenSymbol !== '' &&
      tokenRate !== '' &&
      initialTokens !== ''
    ) {
      setDisabled(false);
    } else {
      if (disabled === false) {
        setDisabled(true);
      }
    }
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const create = () => {
    setLoading(true);
    setDisabled(true);
    dispatch(createToken(data, setLoading));
  };
  console.log(tokenCreated);
  return (
    <>
      {tokenCreated !== 'false' && (
        <div class='page-content'>
          <div class=''>
            <div className=' p-5 card content-area'>
              <h4 className='card-title'>Create Token</h4>

              <>
                <div>
                  <div>
                    <div className='d-flex justify-content-sm-center pt-2'>
                      <h4 className='card-title hedingscreentwthree'>
                        Token Details
                      </h4>
                    </div>
                    <div className='d-flex justify-content-sm-center pt-5'>
                      <div style={{ width: '80%' }} className='inputfromtoken'>
                        <div className='form-group'>
                          <div className='col-12'>
                            <div style={{ display: 'flex' }}>
                              <input
                                type='text'
                                className='form-control'
                                id='name'
                                placeholder='Token Name'
                                name='tokenName'
                                value={tokenName}
                                onChange={onChange}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  paddingLeft: '5px',
                                  fontWeight: '900',
                                }}
                              >
                                *
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='form-group'>
                          <div className='col-sm-12'>
                            <div style={{ display: 'flex' }}>
                              <input
                                type='text'
                                className='form-control'
                                id='symbol'
                                placeholder='Token Symbol'
                                value={tokenSymbol}
                                name='tokenSymbol'
                                onChange={onChange}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  paddingLeft: '5px',
                                  fontWeight: '900',
                                }}
                              >
                                *
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='form-group'>
                          <div className='col-sm-12'>
                            <div style={{ display: 'flex' }}>
                              <input
                                type='number'
                                className='form-control'
                                id='rate'
                                placeholder='Token Rate'
                                name='tokenRate'
                                min='0'
                                value={tokenRate}
                                onChange={onChange}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  paddingLeft: '5px',
                                  fontWeight: '900',
                                }}
                              >
                                *
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='form-group'>
                          <div className='col-sm-12'>
                            <div style={{ display: 'flex' }}>
                              <input
                                type='number'
                                className='form-control'
                                id='name'
                                placeholder='Initial Token Supply'
                                name='initialTokens'
                                min='0'
                                value={initialTokens}
                                onChange={onChange}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  paddingLeft: '5px',
                                  fontWeight: '900',
                                }}
                              >
                                *
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {disabled ? (
                      <p align='center' style={{ color: 'red' }}>
                        Enter Token Rate in ETH
                      </p>
                    ) : (
                      <></>
                    )}
                    <p align='center'>
                      <button
                        onClick={create}
                        align='center'
                        disabled={disabled}
                        className='mt-3 btn btn-primary'
                      >
                        Create and Deploy
                        {loading && <BtnLoading width='18px' height='18px' />}
                      </button>
                    </p>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withMainLayout(CreateToken);
