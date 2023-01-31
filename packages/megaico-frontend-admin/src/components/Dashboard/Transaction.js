import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionList } from '../../Redux/actions/actions';
import { getHoursMinutes } from '../Dashboard/RecentUsers';
import { Link } from 'react-router-dom';
import browserRoute from '../../Routes/browserRoutes';
import { tokenSymbol } from '../TokenInfo';

const Transactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(transactionList());
  }, []);
  const getTranx = useSelector((state) => state.auth.transactionLists);
  const time = (t) => {
    return new Date(t);
  };

  const recentTrans = getTranx
    .sort((a, b) => (time(b?.updated_at) > time(a?.updated_at) ? 1 : -1))
    .slice(0, 3);
  return (
    <div className='col-xl-8 col-lg-7'>
      <div className='token-transaction card card-full-height'>
        <div className='card-innr'>
          <div className='card-head has-aside'>
            <h4 className='card-title'>Transaction</h4>
            <div className='card-opt'>
              <Link to={browserRoute.TRANSACTIONS} className='link ucap'>
                View ALL <em className='fas fa-angle-right ml-2'></em>
              </Link>
            </div>
          </div>
          <table className='table tnx-table'>
            <thead>
              <tr style={{ borderBottom: '1px solid #C4C4C4' }}>
                <th>{tokenSymbol} Tokens</th>
                <th>Amount</th>
                <th className='d-none d-sm-table-cell tnx-date'>Date</th>
                <th className='tnx-type'>
                  <div className='tnx-type-text'></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class='d-flex align-items-center'>
                    <div class='data-state data-state-pending'></div>
                    <span class='lead'>18,750</span>
                  </div>
                </td>
                <td>
                  <span>
                    <span class='lead'>3.543</span>
                    <span class='sub'>
                      ETH{' '}
                      <em
                        class='fas fa-info-circle'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        data-original-title='1 ETH = 590.54 USD'
                      ></em>
                    </span>
                  </span>
                </td>
                <td class='d-none d-sm-table-cell tnx-date'>
                  <span class='sub sub-s2'>2018-08-24 10:20 PM</span>
                </td>
                <td class='tnx-type'>
                  <span class='tnx-type-md badge badge-outline b-badge-success badge-md b-button-hovereffect'>
                    Purchase
                  </span>
                  <span class='tnx-type-sm badge badge-sq badge-outline badge-success badge-md'>
                    Purchase
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div class='d-flex align-items-center'>
                    <div class='data-state data-state-progress'></div>
                    <span class='lead'>8,052</span>
                  </div>
                </td>
                <td>
                  <span>
                    <span class='lead'>0.165</span>
                    <span class='sub'>
                      BTC{' '}
                      <em
                        class='fas fa-info-circle'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        data-original-title='1 BTC = 5450.54 USD'
                      ></em>
                    </span>
                  </span>
                </td>
                <td class='d-none d-sm-table-cell tnx-date'>
                  <span class='sub sub-s2'>2018-08-24 10:20 PM</span>
                </td>
                <td class='tnx-type'>
                  <span class='tnx-type-md badge badge-outline b-badge-success badge-md b-button-hovereffect'>
                    Bonus
                  </span>
                  <span class='tnx-type-sm badge badge-sq badge-outline badge-warning badge-md'>
                    Bonus
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div class='d-flex align-items-center'>
                    <div class='data-state data-state-approved'></div>
                    <span class='lead'>19,000</span>
                  </div>
                </td>
                <td>
                  <span>
                    <span class='lead'>3.141</span>
                    <span class='sub'>
                      LTC{' '}
                      <em
                        class='fas fa-info-circle'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        data-original-title='1 LTC = 180.54 USD'
                      ></em>
                    </span>
                  </span>
                </td>
                <td class='d-none d-sm-table-cell tnx-date'>
                  <span class='sub sub-s2'>2018-08-24 10:20 PM</span>
                </td>
                <td class='tnx-type'>
                  <span class='tnx-type-md badge badge-outline b-badge-success badge-md b-button-hovereffect'>
                    Bonus
                  </span>
                  <span class='tnx-type-sm badge badge-sq badge-outline badge-warning badge-md'>
                    Bonus
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div class='d-flex align-items-center'>
                    <div class='data-state data-state-approved'></div>
                    <span class='lead'>19,000</span>
                  </div>
                </td>
                <td>
                  <span>
                    <span class='lead'>3.141</span>
                    <span class='sub'>
                      LTC{' '}
                      <em
                        class='fas fa-info-circle'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        data-original-title='1 LTC = 180.54 USD'
                      ></em>
                    </span>
                  </span>
                </td>
                <td class='d-none d-sm-table-cell tnx-date'>
                  <span class='sub sub-s2'>2018-08-24 10:20 PM</span>
                </td>
                <td class='tnx-type'>
                  <span class='tnx-type-md badge badge-outline b-badge-success badge-md b-button-hovereffect'>
                    Bonus
                  </span>
                  <span class='tnx-type-sm badge badge-sq badge-outline badge-warning badge-md'>
                    Bonus
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
