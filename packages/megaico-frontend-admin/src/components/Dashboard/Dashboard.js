import React, { useState, useEffect } from 'react';
import withMainLayout from './../HOC/withMainLayout';
import RecentUsers from './RecentUsers';
import { useDispatch } from 'react-redux';
import { GetRecentUsers } from '../../Redux/actions/actions';
import Notifications from './Notifications';
import SaleGraph from './TokenSaleGraph';
import TokenBalance from '../IcoDistribution/TokenBalance';
import PriceWhitepaper from './PriceWhitepaper';
import Transactions from './Transaction';
const Dashboard = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    dispatch(GetRecentUsers(setUsers));
  }, []);

  return (
    <div class='page-content'>
      <div class='container-fluid'>
        <h2
          class='b-card-headpadding'
          style={{ color: '#252726', fontWeight: '600' }}
        >
          Overview
        </h2>
        <div className='row'>
          <div class='col-lg-3'>
            <TokenBalance />
          </div>
          <PriceWhitepaper />

          <Transactions />
          <RecentUsers users={users} />
        </div>
        <div className='row'>
          <SaleGraph />
          <div className='col-xl-4 col-lg-5'>
            <div className='token-sales card card-full-height'>
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withMainLayout(Dashboard);
