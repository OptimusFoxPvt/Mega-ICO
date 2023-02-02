import { tokenSymbol } from '../TokenInfo';
import { getHoursMinutes } from '../Dashboard/RecentUsers';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const Notifications = () => {
  const [tranxType, setTranxType] = useState(false);
  const getTranx = useSelector((state) => state.auth.transactionLists);
  const recentNotify = getTranx;
  if (recentNotify.transaction_type === 'purchase') {
    setTranxType(true);
  }
  return (
    <div className='col-xl-4 col-lg-5'>
      <div className='token-sales card card-full-height'>
        <div className='card-innr'>
          <div className='card-head'>
            <div
              className='card-head'
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <h4 className='card-title'>Notification</h4>
              <a href='#'></a>
            </div>
          </div>
          <div className='d-flex justify-content-between '>
            <div className='b-border-left'>
              <div className='b-paddinglast-section'>
                <p>Commercial Invoice Submitted</p>
                <p className='b-font-date'>11 JUL 8:10 PM</p>
              </div>
            </div>
            <div className='lastsection-button'>
              <a href=''>Purchase</a>
            </div>
          </div>{' '}
          <div className='d-flex justify-content-between '>
            <div className='b-border-left'>
              <div className='b-paddinglast-section'>
                <p>Commercial Invoice Submitted</p>
                <p className='b-font-date'>11 JUL 8:10 PM</p>
              </div>
            </div>
            <div className='lastsection-button'>
              <a href=''>Purchase</a>
            </div>
          </div>{' '}
          <div className='d-flex justify-content-between '>
            <div className='b-border-left'>
              <div className='b-paddinglast-section'>
                <p>Commercial Invoice Submitted</p>
                <p className='b-font-date'>11 JUL 8:10 PM</p>
              </div>
            </div>
            <div className='lastsection-button'>
              <a href=''>Purchase</a>
            </div>
          </div>{' '}
          <div className='d-flex justify-content-between '>
            <div className='b-border-left'>
              <div className='b-paddinglast-section'>
                <p>Commercial Invoice Submitted</p>
                <p className='b-font-date'>11 JUL 8:10 PM</p>
              </div>
            </div>
            <div className='lastsection-button'>
              <a href=''>Purchase</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
