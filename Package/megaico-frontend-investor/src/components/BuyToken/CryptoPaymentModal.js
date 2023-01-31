import React from 'react';
import { tokenSymbol } from '../TokenInfo';
const CryptoPaymentModal = () => {
  return (
    <div class='modal fade' id='pay-confirm' tabIndex='-1'>
      <div class='modal-dialog modal-dialog-md modal-dialog-centered'>
        <div class='modal-content'>
          <div class='popup-body'>
            <h4 class='popup-title'>Confirmation Your Payment</h4>
            <p class='lead text-primary'>
              Your Order no. <strong>TNX93KR8N0</strong> has been placed
              successfully.{' '}
            </p>
            <p>
              The tokens balance will appear in your account only after you
              transaction gets 6 confirmations and approved our team.
            </p>
            <p>
              To <strong>speed up verifcation</strong> proccesing please enter{' '}
              <strong>your wallet address</strong> from where you’ll
              transferring your ethereum to our address.
            </p>
            <div class='input-item input-with-label'>
              <label for='token-address' class='input-item-label'>
                Enter your wallet address
              </label>
              <input
                class='input-bordered'
                type='text'
                value='0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
              />
            </div>
            <ul class='d-flex flex-wrap align-items-center guttar-30px'>
              <li>
                <a
                  href='#'
                  data-dismiss='modal'
                  data-toggle='modal'
                  class='btn btn-primary'
                >
                  Confirm Payment
                </a>
              </li>
              <li class='pdt-1x pdb-1x'>
                <a
                  href='#'
                  data-dismiss='modal'
                  data-toggle='modal'
                  data-target='#pay-online'
                  class='link link-primary'
                >
                  Make Online Payment
                </a>
              </li>
            </ul>
            <div class='gaps-2x'></div>
            <div class='gaps-1x d-none d-sm-block'></div>
            <div class='note note-plane note-light mgb-1x'>
              <em class='fas fa-info-circle'></em>
              <p>
                Do not make payment through exchange (Kraken, Bitfinex). You can
                use MayEtherWallet, MetaMask, Mist wallets etc.
              </p>
            </div>
            <div class='note note-plane note-danger'>
              <em class='fas fa-info-circle'></em>
              <p>
                In case you send a different amount, number of {tokenSymbol}{' '}
                tokens will update accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentModal;
