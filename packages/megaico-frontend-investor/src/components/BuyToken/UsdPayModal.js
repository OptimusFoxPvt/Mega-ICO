import React, { useState } from 'react';
import pay_a from '../../assets/images/pay-a.png';
import pay_b from '../../assets/images/pay-b.png';
import pay_c from '../../assets/images/pay-c.png';
import { tokenSymbol } from '../TokenInfo';
const UsdPayModal = ({ contribute, tokens, coin }) => {
  const [purchaseAgreement, setPurchaseAgreement] = useState(false);

  return (
    <div class='modal fade' id='pay-online' tabIndex='-1'>
      <div class='modal-dialog modal-dialog-md modal-dialog-centered'>
        <div class='modal-content pb-0'>
          <div class='popup-body'>
            <h4 class='popup-title'>Buy Tokens and Payment</h4>
            <p class='lead'>
              To receiving <strong>20,000 TWZ</strong> tokens including bonus{' '}
              <strong>4,000 TWZ</strong> require payment amount of{' '}
              <strong>50,000 USD</strong>.
            </p>
            <p>
              You can choose any of following payment method to make your
              payment. The tokens balance will appear in your account after
              successfull payment.
            </p>
            <h5 class='mgt-1-5x font-mid'>Select payment method:</h5>
            <ul class='pay-list guttar-20px'>
              <li class='pay-item'>
                <input
                  type='radio'
                  class='pay-check'
                  name='pay-option'
                  id='pay-coin'
                />
                <label class='pay-check-label' for='pay-coin'>
                  <img src={pay_a} alt='pay-logo' />
                </label>
              </li>
              <li class='pay-item'>
                <input
                  type='radio'
                  class='pay-check'
                  name='pay-option'
                  id='pay-coinpay'
                />
                <label class='pay-check-label' for='pay-coinpay'>
                  <img src={pay_b} alt='pay-logo' />
                </label>
              </li>
              <li class='pay-item'>
                <input
                  type='radio'
                  class='pay-check'
                  name='pay-option'
                  id='pay-paypal'
                />
                <label class='pay-check-label' for='pay-paypal'>
                  <img src={pay_c} alt='pay-logo' />
                </label>
              </li>
            </ul>
            <span class='text-light font-italic mgb-2x'>
              <small>
                * Payment gateway company may charge you a processing fees.
              </small>
            </span>
            <div class='pdb-2-5x pdt-1-5x'>
              <input
                onChange={() => setPurchaseAgreement(!purchaseAgreement)}
                type='checkbox'
                class='input-checkbox input-checkbox-md'
                id='agree-term-3'
              />
              <label for='agree-term-3'>
                I hereby agree to the{' '}
                <strong>token purchase aggrement &amp; token sale term</strong>.
              </label>
            </div>

            <ul class='d-flex flex-wrap align-items-center guttar-30px'>
              <li>
                <a
                  href='#'
                  data-dismiss='modal'
                  data-toggle='modal'
                  data-target='#pay-review'
                  className={`${
                    purchaseAgreement
                      ? 'btn btn-primary'
                      : 'btn btn-primary disabled'
                  }`}
                >
                  Buy Tokens &amp; Process to Pay{' '}
                  <em class='ti ti-arrow-right mgl-2x'></em>
                </a>
              </li>
              <li class='pdt-1x pdb-1x'>
                <a
                  href='#'
                  data-dismiss='modal'
                  data-toggle='modal'
                  data-target='#get-pay-address'
                  class='link link-primary'
                >
                  Make Manual Payment
                </a>
              </li>
            </ul>
            <div class='gaps-2x'></div>
            <div class='gaps-1x d-none d-sm-block'></div>
            <div class='note note-plane note-light mgb-1x'>
              <em class='fas fa-info-circle'></em>
              <p class='text-light'>
                You will automatically redirect for payment after your order
                placing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsdPayModal;
