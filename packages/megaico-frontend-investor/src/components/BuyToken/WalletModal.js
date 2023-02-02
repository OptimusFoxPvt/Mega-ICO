import { toast } from 'react-toastify';
import { useState } from 'react';
import { tokenSymbol } from '../TokenInfo';
const Modal = ({ walletData, setWalletData, res, AddWallet }) => {
  const [valid, setValid] = useState(false);
  const validate = (wallet) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(wallet.wallet_address)) {
      toast.error('not a valid address');
      setValid(true);
      return false;
    } else if (
      /^(0x)?[0-9a-f]{40}$/.test(wallet.wallet_address) ||
      /^(0x)?[0-9A-F]{40}$/.test(wallet.wallet_address)
    ) {
      setValid(false);
      AddWallet();
      return true;
    }
  };
  return (
    <div>
      <div class='modal-dialog modal-dialog-md modal-dialog-centered'>
        <div class='modal-content'>
          <a
            href='#'
            class='modal-close'
            data-dismiss='modal'
            aria-label='Close'
            id='closeWalletAddModel'
          >
            <em class='ti ti-close'></em>
          </a>
          <div class='popup-body'>
            <h4 class='popup-title'>Wallet Address</h4>
            <p>
              In order to receive your{' '}
              <a href='#'>
                <strong>{tokenSymbol} Tokens</strong>
              </a>
              , please select your wallet address and you have to put the
              address below input box.{' '}
              <strong>
                You will receive {tokenSymbol} tokens to this address after the
                Token Sale end.
              </strong>
            </p>
            <form action='#'>
              <div class='row'>
                <div class='col-md-6'>
                  <div class='input-item input-with-label'>
                    <label for='swalllet' class='input-item-label'>
                      Select Wallet{' '}
                    </label>
                    <select
                      onChange={(e) =>
                        setWalletData({
                          wallet: e.target.value,
                          wallet_address: '',
                        })
                      }
                      class='select-bordered select-block'
                      name='swalllet'
                      id='swalllet'
                    >
                      <option disabled selected></option>
                      <option value='Ethereum'>Ethereum</option>
                      <option value='DashCoin'>DashCoin</option>
                      <option value='BitCoin'>BitCoin</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class='input-item input-with-label'>
                <label for='token-address' class='input-item-label'>
                  Your Address for tokens:
                </label>
                <input
                  onChange={(e) => {
                    if (e.target.value.length <= 42) {
                      setWalletData({
                        ...walletData,
                        wallet_address: e.target.value,
                      });
                    }
                  }}
                  class='input-bordered'
                  type='text'
                  id='token-address'
                  name='token-address'
                  value={walletData.wallet_address}
                />
                {valid && (
                  <span class='input-note note note-danger'>
                    Note: Address should be ERC20-compliant.
                  </span>
                )}
              </div>
              <div class='note note-plane note-danger'>
                <em class='fas fa-info-circle'></em>
                <p>
                  DO NOT USE your exchange wallet address such as Kraken,
                  Bitfinex, Bithumb, Binance etc. You can use MetaMask,
                  MayEtherWallet, Mist wallets etc. Do not use the address if
                  you don’t have a private key of the your address. You WILL NOT
                  receive {tokenSymbol} Tokens and WILL LOSE YOUR FUNDS if you
                  do.
                </p>
              </div>
              <div class='gaps-3x'></div>
              <div class='d-sm-flex justify-content-between align-items-center'>
                {walletData.wallet_address && walletData.wallet ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      validate(walletData);
                    }}
                    class='btn btn-primary'
                  >
                    Add Wallet
                  </button>
                ) : (
                  <button disabled class='btn btn-primary'>
                    Add Wallet
                  </button>
                )}
                <div class='gaps-2x d-sm-none'></div>
                {res && (
                  <span class='text-success'>
                    <em class='ti ti-check-box'></em> Added wallet address
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
