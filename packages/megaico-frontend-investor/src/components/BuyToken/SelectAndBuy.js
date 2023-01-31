import React, { useState } from 'react';
import UsdPayModal from './Modals/UsdPayModal';
import AddressPaymentModal from './Modals/AddressPaymentModal';
import FiatPaymentModal from './Modals/FiatPaymentModal';
import CryptoPaymentModal from './Modals/CryptoPaymentModal';
import CurrencyChoose from './CurrencyChoose';
import { useSelector } from 'react-redux';
import { tokenSymbol } from '../TokenInfo';
const SelectAndBuy = () => {
  const auth = useSelector((state) => state.auth);
  const tokenData = auth.tokenData;
  const minContribution = tokenData?.investorMinCap
    ? tokenData?.investorMinCap
    : 99;
  const tokenValue = auth.tokenValue;

  const [coin, setCoins] = useState('ETH');
  const [coins, setCoin] = useState('ETH');
  const [contribute, setContribute] = useState(0);
  const tokens = {
    ETH: (tokenValue.ethprice / tokenValue.ethprice).toFixed(3),

    USD: (
      (tokenValue.usdprice / tokenValue.ethprice) *
      tokenValue?.number_tokens
    ).toFixed(2),
    BTC: (tokenValue.btcprice / tokenValue.ethprice).toFixed(7),
    LTC: (tokenValue.ltcprice / tokenValue.ethprice).toFixed(7),
  };

  return (
    <div className='content-area card'>
      <div className='card-innr'>
        <div className='card-head'>
          <span className='card-sub-title text-primary font-mid'>Step 1</span>
          <h4 className='card-title'>Amount of contribute</h4>
        </div>
        <div className='card-text'>
          <p>
            Enter your amount, you would like to contribute and calculate the
            amount of token you will received. The calculator helps to convert
            required currency to tokens.
          </p>
        </div>
        <div className='token-contribute'>
          <div className='token-calc'>
            <div className='token-pay-amount'>
              <input
                onChange={(e) => setContribute(e.target.value)}
                className='input-bordered '
                type='number'
                min='0'
                value={contribute}
              />

              <div className='token-pay-currency'>
                <span className='input-hint input-hint-sap'>{coin}</span>
              </div>
            </div>
            <div className='token-received'>
              <div className='token-eq-sign'>=</div>
              <div className='token-received-amount'>
                <h5 className='token-amount'>{10}</h5>

                <div className='token-symbol'>{tokenSymbol}</div>
              </div>
            </div>
          </div>
          <div className='token-calc-note note note-plane'>
            <em
              className={`fas fa-circle text-${
                contribute / tokens[coin] >= minContribution
                  ? 'success'
                  : 'danger'
              }`}
            ></em>
            <span className='note-text text-dark'>
              {minContribution} {tokenSymbol} minimum contribution require.
            </span>
          </div>
        </div>

        <div className='token-bonus-ui'>
          <div className='bonus-bar'>
            <div
              className='bonus-base'
              style={{
                width: '100%',
                backgroundColor: contribute > 0 ? 'blue' : 'grey',
              }}
            >
              <span className='bonus-base-title'>Bonus</span>
              <span className='bonus-base-amount'>On Sale</span>
              <span className='bonus-base-percent'>20%</span>
            </div>
          </div>
        </div>
        <div className='token-overview-wrap'>
          <div className='token-overview'>
            <div className='row'>
              <div className='col-md-4 col-sm-6'>
                <div className='token-bonus token-bonus-sale'>
                  <span className='token-overview-title'>+ 20% Sale Bonus</span>
                  <span className='token-overview-value bonus-on-sale'>
                    {5000}
                  </span>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='token-total'>
                  <span className='token-overview-title font-bold'>
                    Total {tokenSymbol}
                  </span>
                  <span className='token-overview-value token-total-amount text-primary'>
                    1000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='note note-plane note-danger note-sm pdt-1x pl-0'>
            <p>
              Your Contribution will be calculated based on exchange rate at the
              moment your transaction is confirm.
            </p>
          </div>
        </div>
        <div className='card-head'>
          <span className='card-sub-title text-primary font-mid'>Step 2</span>
          <h4 className='card-title'>Make a payment</h4>
        </div>
        <div className='card-text'>
          <p>
            To get tokens please make a payment. You can send payment directly
            to our address or you may pay online. Once you paid, you will
            receive an email about the successfull deposit.{' '}
          </p>
        </div>
        <UsdPayModal contribute={contribute} tokens={tokens} coin={coin} />
        <AddressPaymentModal
          contribute={contribute}
          tokens={tokens}
          coin={coin}
        />
        <CryptoPaymentModal />
        <FiatPaymentModal />
        <div className='pay-buttons'>
          <div className='pay-button'>
            <a
              href='#'
              data-toggle='modal'
              data-target='#get-pay-address'
              className='btn btn-dark -alt btn-between w-100'
            >
              Get Address for Payment <em className='ti ti-wallet'></em>
            </a>
          </div>
          {/* // )} */}
        </div>
        <div className='pay-notes'>
          <div className='note note-plane note-light note-md font-italic'>
            <em className='fas fa-info-circle'></em>
            <p>
              Tokens will appear in your account after payment successfully made
              and approved by our team. <br className='d-none d-lg-block' />{' '}
              Please note that, {tokenSymbol} tokens will distributed end of ICO
              Token Sales.{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAndBuy;
