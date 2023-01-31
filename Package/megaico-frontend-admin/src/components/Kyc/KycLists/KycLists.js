import React from 'react';
import withMainLayout from '../../HOC/withMainLayout';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetKYCLists } from '../../../Redux/actions/actions';
import TableHead from './TableHead';
import TableBody from './TableBody';
const KycLists = () => {
  const list1 = useSelector((state) => state.auth.kycList);

  const dispatch = useDispatch();
  const time = (t) => {
    return new Date(t);
  };
  const list = list1?.data?.sort((a, b) =>
    time(b?.updated_at) > time(a?.updated_at) ? 1 : -1
  );

  useEffect(() => {
    dispatch(GetKYCLists());
  }, []);

  return (
    <>
      <div class='page-content'>
        <div class='container-fluid'>
          <div class='card-head'>
            <h4 class='card-title'>KYC List</h4>
          </div>
          <div class='content-area card'>
            <div className='card-innr'>
              <table className='data-table dt-init kyc-list'>
                <TableHead />

                <TableBody KYCList={list} />
              </table>
            </div>
            {/* <!-- .card-innr --> */}
          </div>
          {/* <!-- .card --> */}
        </div>
        {/* <!-- .container --> */}
      </div>
    </>
  );
};

export default withMainLayout(KycLists);
