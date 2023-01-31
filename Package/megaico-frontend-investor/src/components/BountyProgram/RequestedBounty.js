import React from 'react';
import MaterialTable from 'material-table';
import { Avatar } from '@material-ui/core';
import { bountyProgram } from './Languages/en';

import imageSrc from '../../assets/images/user-a.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router';
import browserRoute from '../../Routes/browserRoutes';
import Loader from '../Loader/Loader';

import { getBountyStatus } from '../../Services/profileServices';

const RequestedBounty = ({ history }) => {
  const KYCstatus = useSelector((state) => state.auth.kycStatus);

  //Its value will come from database
  const bountyStatus = useSelector((state) => state.auth.bountyStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBountyStatus());
  }, []);

  const columns = [
    { title: 'Bounty Name', field: 'name' },
    {
      title: 'Link',
      field: 'link',
      render: (rowData) => (
        <a href='https://www.facebook.com/goalcast/video' target='_blank'>
          https://www.facebook.com/goalcast/video{' '}
        </a>
      ),
    },
    {
      title: 'Image',
      field: 'image',
      render: (rowData) => <Avatar src={imageSrc} />,
    },
    {
      title: 'Token Received',
      field: 'tokenReceived',
    },
    {
      title: 'Status',
      field: 'status',
    },
  ];
  const data = [
    {
      name: 'Facebook Compaign',
      tokenReceived: 'null',
      status: 'pending',
    },
    {
      name: 'Facebook Compaign',
      tokenReceived: 'null',
      status: 'pending',
    },
  ];

  return KYCstatus === 'loading' ? (
    <Loader />
  ) : (
    <>
      {KYCstatus === 'approved' ? (
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12' style={{ borderRadius: '15px' }}>
                <MaterialTable
                  style={{ borderRadius: '15px', padding: 10 }}
                  options={{
                    search: false,
                    showTitle: false,
                    headerStyle: {
                      color: '#1E375E',
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '16px',
                      borderRadius: '15px',
                      tableLayout: 'auto',
                    },
                    pageSize: 12,
                  }}
                  columns={columns}
                  data={data}
                />
              </div>
              {/* </div> */}
            </div>
          </div>
        </section>
      ) : (
        <>
          {' '}
          <Redirect
            to={{
              pathname: browserRoute.KYC_APPLICATION,
            }}
          />
        </>
      )}
    </>
  );
};

export default RequestedBounty;
