import { useState } from 'react';
import Chart from './Chart';
const SaleGraph = () => {
  const [days, setDays] = useState(7);
  const [showDropdown, setShowDropdown] = useState({
    profile: false,
    calculator: false,
    language: false,
    time: false,
  });
  return (
    <div className='col-xl-8 col-lg-7'>
      <div className='token-sale-graph card card-full-height'>
        <div className='card-innr'>
          <div className='card-head has-aside'>
            <h4 className='card-title'>Tokens Sale Graph</h4>
            <div className='card-opt' style={{ display: 'flex', gap: '25px' }}>
              <div className='b2-roundbg'>
                <a
                  className='active1'
                  onClick={() => {
                    setShowDropdown({
                      time: !showDropdown.time,
                    });
                    setDays(7);
                  }}
                >
                  1W
                </a>
              </div>
              <div className='b2-roundbg '>
                <a
                  className='active1'
                  onClick={() => {
                    setShowDropdown({
                      time: !showDropdown.time,
                    });
                    setDays(30);
                  }}
                >
                  1M
                </a>
              </div>
              <div className='b2-roundbg '>
                <a
                  className='active1'
                  onClick={() => {
                    setShowDropdown({
                      time: !showDropdown.time,
                    });
                    setDays(12);
                  }}
                >
                  1Y
                </a>
              </div>
            </div>
          </div>

          <div
            className='chart-tokensale'
            style={{
              height: '100%',
            }}
          >
            <Chart d={days} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleGraph;
