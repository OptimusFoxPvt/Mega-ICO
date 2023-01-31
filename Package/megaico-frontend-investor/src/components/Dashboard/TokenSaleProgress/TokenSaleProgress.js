import Countdown from './countdown';
import { tokenSymbol } from '../../TokenInfo';
import { useSelector } from 'react-redux';
const TokenSaleProgress = () => {
  const tokenData = useSelector((state) => state.auth.tokenData);
  console.log('tokenn', tokenData);
  const countDownDate = Number(tokenData?.postIcoClosingTime + '000');
  const data = {
    // softCap: 400000,
    // hardCap: 1400000,
    // raised: 275800,
    // total: 1500000,
    softCap: tokenData?.softCap,
    hardCap: tokenData?.hardCap,
    raised: tokenData?.tokenRaised,
    total: tokenData?.totalSupply,
  };
  const { softCap, hardCap, raised, total } = data;

  console.log('dddddddddddddddddd', countDownDate);
  return (
    <div className='card-innr'>
      <div className='card-head'>
        <h4 className='card-title card-title-sm'>Token Sales Progress</h4>
      </div>
      {data.softCap && (
        <>
          {' '}
          <ul className='progress-info'>
            <li>
              <span>Raised</span> {raised} {tokenSymbol}
            </li>
            <li className='text-right'>
              <span>TOTAL</span> {total} {tokenSymbol}
            </li>
          </ul>
          <div
            style={{ backgroundColor: '#8299d3', overflow: 'inherit' }}
            className='progress-bar'
          >
            <div
              className='progress-hcap'
              // data-percent="40"
              style={{
                width: `${(hardCap / total) * 100}%`,
              }}
            >
              <div>
                <span>Hard cap</span> <span>{hardCap}</span>
              </div>
            </div>
            <div
              className='progress-scap'
              data-percent='30'
              style={{
                width: `${(softCap / total) * 100}%`,
              }}
            >
              <div>
                <span>Soft cap</span> <span>{softCap}</span>
              </div>
            </div>
            <div
              className='progress-percent'
              data-percent='20'
              style={{
                width: `${(raised / total) * 100}%`,
                backgroundColor: '#2c80ff',
              }}
            ></div>
          </div>
        </>
      )}

      <span className='card-sub-title mgb-0-5x'>Sales End In</span>
      <Countdown countDownDate={countDownDate} />
      {/* {countDownDate ? (
      ) : (
        'LOADING....'
      )} */}
    </div>
  );
};

export default TokenSaleProgress;
