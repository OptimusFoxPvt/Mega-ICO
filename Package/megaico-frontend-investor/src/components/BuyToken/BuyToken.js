import React, { useEffect, useState } from 'react';
import withMainLayout from './../HOC/withMainLayout';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import TokenBalance from '../Dashboard/TokenBalance';
import { Redirect } from 'react-router';
import browserRoute from '../../Routes/browserRoutes';
import TokenSaleProgress from '../Dashboard/TokenSaleProgress/TokenSaleProgress';
import PreSaleTokens from '../IcoDistribution/PreSaleTokens';
import WalletModal from './Modals/WalletModal';
import SelectAndBuy from './SelectAndBuy';
import UsdPayModal from './UsdPayModal';
const BuyToken = () => {
  const auth = useSelector((state) => state.auth);
  const kycStatus = auth.kycStatus;
  const wallet = auth.walletData;

  return (
    <>
      <div className='modal fade' id='add-wallet'>
        <WalletModal />
      </div>

      <div className='page-content '>
        <div className='container-fluid'>
          <div className='card-head b-card-headpadding'>
            <h4 className='card-title'> Buy Token</h4>
          </div>
          <div className='row'>
            <div className='main-content col-lg-8 '>
              <div className='d-lg-none'>
                <a
                  href='#'
                  data-toggle='modal'
                  data-target='#add-wallet'
                  className='btn btn-danger btn-xl btn-between w-100 mgb-1-5x'
                >
                  Add your wallet address before buy{' '}
                  <em className='ti ti-arrow-right'></em>
                </a>
                <div className='gaps-1x mgb-0-5x d-lg-none d-none d-sm-block'></div>
              </div>
              <SelectAndBuy />
            </div>
            <div className='aside sidebar-right col-lg-4'>
              <div className='d-none d-lg-block'>
                <a
                  href='#'
                  data-toggle='modal'
                  data-target='#add-wallet'
                  className='btn btn-danger btn-xl btn-between w-100'
                >
                  Add your wallet address before buy{' '}
                  <em className='ti ti-arrow-right'></em>
                </a>
                <div className='gaps-3x'></div>
              </div>
              <TokenBalance />
              <div className='token-sales card'>
                <PreSaleTokens />
                <div className='sap'></div>
                <TokenSaleProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withMainLayout(BuyToken);
