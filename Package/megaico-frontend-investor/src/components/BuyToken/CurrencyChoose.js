const CurrencyChoose = ({ setCoin, tokens }) => {
  return (
    <div className='token-currency-choose'>
      <form onChange={(e) => setCoin(e.target.id)}>
        <div className='row guttar-15px'>
          <div className='col-6'>
            <div className='pay-option'>
              <input
                className='pay-option-check'
                type='radio'
                id='ETH'
                name='payOption'
              />
              <label className='pay-option-label' for='ETH'>
                <span className='pay-title'>
                  <em className='pay-icon cf cf-eth'></em>
                  <span className='pay-cur'>ETH</span>
                </span>
                <span className='pay-amount'>
                  {tokens.ETH ? tokens.ETH : 0.0001}
                </span>
              </label>
            </div>
          </div>
          <div className='col-6'>
            <div className='pay-option'>
              <input
                className='pay-option-check'
                type='radio'
                id='LTC'
                name='payOption'
              />
              <label className='pay-option-label' for='LTC'>
                <span className='pay-title'>
                  <em className='pay-icon cf cf-ltc'></em>
                  <span className='pay-cur'>LTC</span>
                </span>
                <span className='pay-amount'>
                  {tokens.LTC ? tokens.LTC : 0.02}
                </span>
              </label>
            </div>
          </div>
          <div className='col-6'>
            <div className='pay-option'>
              <input
                className='pay-option-check'
                type='radio'
                id='BTC'
                name='payOption'
              />
              <label className='pay-option-label' for='BTC'>
                <span className='pay-title'>
                  <em className='pay-icon cf cf-btc'></em>
                  <span className='pay-cur'>BTC</span>
                </span>
                <span className='pay-amount'>
                  {tokens.BTC ? tokens.BTC : 0.00001}
                </span>
              </label>
            </div>
          </div>
          <div className='col-6'>
            <div className='pay-option'>
              <input
                className='pay-option-check'
                type='radio'
                id='USD'
                name='payOption'
              />
              <label className='pay-option-label' for='USD'>
                <span className='pay-title'>
                  <em className='pay-icon fas fa-dollar-sign'></em>
                  <span className='pay-cur'>USD</span>
                </span>
                <span className='pay-amount'>
                  {tokens.USD ? tokens.USD : 1}
                </span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CurrencyChoose;
