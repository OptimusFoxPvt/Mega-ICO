import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { BtnLoading } from '../../Loader/BtnLoading';
import { getAdminAddress, buyToken } from '../../../Redux/actions/actions';
import { tokenSymbol } from '../../TokenInfo';
const AddressPaymentModal = ({ contribute, tokens, coin }) => {
  const walletConnection = useSelector((state) => state.auth.walletConnection);
  const referralWallet = useSelector((state) => state.auth.referralWallet);
  const referralID = useSelector((state) => state.auth.referralID);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const [loading, setLoading] = useState(false);
  const [purchaseAgreement, setPurchaseAgreement] = useState(false);

  return (
    <div class='modal fade' id='get-pay-address' tabIndex='-1'>
      <div class='modal-dialog modal-dialog-md modal-dialog-centered'>
        <div class='modal-content'>
          <a
            href='#'
            class='modal-close'
            data-dismiss='modal'
            aria-label='Close'
          >
            <em class='ti ti-close'></em>
          </a>
          <div class='popup-body'>
            <h4 class='popup-title'>Payment Address for Deposit</h4>
            <p>
              Please make deposit amount of{' '}
              <strong>
                {contribute} {coin}
              </strong>{' '}
              to our address and receive <strong>1,000 TWZ</strong> tokens
              including bonus <strong>500 TWZ</strong> once we recevied payment.
            </p>
            <div class='gaps-1x'></div>
            <h6 class='font-bold'>Payment to the following Address</h6>
            <div class='copy-wrap mgb-0-5x'>
              <span class='copy-feedback'></span>
              <em class='fab fa-ethereum'></em>
              <input
                type='text'
                class='copy-address'
                value='0x4156d3342d5c385a87d264f90653733592000581'
                disabled=''
              />
              <button
                class='copy-trigger copy-clipboard'
                data-clipboard-text='0x4156d3342d5c385a87d264f90653733592000581'
              >
                <em class='ti ti-files'></em>
              </button>
            </div>
            <ul class='pay-info-list row'>
              <li class='col-sm-6'>
                <span>SET GAS LIMIT:</span> 120 000
              </li>
              <li class='col-sm-6'>
                <span>SET GAS PRICE:</span> 95 Gwei
              </li>
            </ul>
            <div class='pdb-2-5x pdt-1-5x'>
              <input
                onChange={() => setPurchaseAgreement(!purchaseAgreement)}
                type='checkbox'
                class='input-checkbox input-checkbox-md'
                id='agree-term'
              />
              <label for='agree-term'>
                I hereby agree to the{' '}
                <strong>token purchase aggrement &amp; token sale term</strong>.
              </label>
            </div>
            <button
              onClick={() => {
                walletConnection === 'Disconnected'
                  ? toast.error('Connect Wallet')
                  : dispatch(
                      buyToken(
                        contribute,
                        setLoading,
                        referralWallet,
                        referralID
                      )
                    );
              }}
              class='btn btn-primary'
              className={`${
                purchaseAgreement && !loading
                  ? 'btn btn-primary'
                  : 'btn btn-primary disabled'
              }`}
            >
              Buy Tokens Now {loading && <BtnLoading height={20} width={20} />}{' '}
              <em class='ti ti-arrow-right mgl-4-5x'></em>
            </button>
            <div class='gaps-3x'></div>
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

export default AddressPaymentModal;
