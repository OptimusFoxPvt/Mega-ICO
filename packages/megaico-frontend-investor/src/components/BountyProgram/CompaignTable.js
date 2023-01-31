import React, { Fragment, useState } from 'react';
import MaterialTable from 'material-table';
import { bountyProgram } from './Languages/en';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import browserRoute from '../../Routes/browserRoutes';
import Loader from '../Loader/Loader';

import { Button } from 'react-bootstrap';
import RequestBounty from './RequestBounty';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const CompaignTable = () => {
  const KYCstatus = useSelector((state) => state.auth.kycStatus);
  const airdrop = useSelector((state) => state.auth.walletData);
  const twitterButton = (
    <TwitterShareButton
      id='twitter'
      title={`Requesting faucet funds into ${
        airdrop.wallet_address ? airdrop.wallet_address : ''
      } on the #Rinkeby #Ethereum test network`}
      url='https://admin-mega-ico.herokuapp.com/'
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  );
  const facebookButton = (
    <FacebookShareButton
      id='facebook'
      quote={`Requesting faucet funds into ${
        airdrop.wallet_address ? airdrop.wallet_address : ''
      } on the #Rinkeby #Ethereum test network`}
      description={'aiueo'}
      url='google.com'
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
  );

  const [show, setShow] = useState(true);
  const [apply, setApply] = useState(false);

  const columns = [
    {
      title: 'Bounty Name',
      field: 'name',
      render: (rowData) => {
        return (
          <span>
            {rowData.name}{' '}
            {rowData.name === 'Twitter Campaign'
              ? twitterButton
              : facebookButton}
          </span>
        );
      },
    },
    { title: 'Starting Period', field: 'startingPeriod' },
    { title: 'Ending Period', field: 'endingPeriod' },
    {
      title: 'Remaining Coins',
      field: 'remainingCoins',
    },
    {
      title: 'Total Coins',
      field: 'totalCoins',
    },

    {
      title: 'Action',
      field: 'url',
      headerStyle: { textAlign: 'center' },
      render: (rowData) => (
        <Fragment>
          <span
            className='dt-status-md badge badge-outline badge-success badge-md b-button-hovereffect'
            onClick={() => handleShow(rowData)}
          >
            Post
          </span>
          <span
            className='dt-status-md badge badge-outline b-button-userlist badge-success badge-md'
            onClick={() => handleShows(rowData)}
          >
            {rowData.applied === false ? 'Apply' : 'Applied'}
          </span>
        </Fragment>
      ),
    },
  ];
  const data = [
    {
      name: `Twitter Campaign`,
      startingPeriod: '25-08-2020',
      endingPeriod: '25-09-2020',
      remainingCoins: 500,
      totalCoins: 500,
      applied: false,
      action: 'Twitter Campaign',
    },
    {
      name: 'Facebook Campaign',
      startingPeriod: '25-08-2020',
      endingPeriod: '25-09-2020',
      remainingCoins: 500,
      totalCoins: 500,
      applied: false,
    },
  ];

  let [rowData, setData] = useState({});

  const handleShow = (d) => {
    setData(d);
    d.action === 'Twitter Campaign'
      ? document.getElementById('twitter').click()
      : document.getElementById('facebook').click();
  };
  const handleShows = (d) => {
    setData(d);
    setShow(false);
  };
  const handleClose = () => {
    setShow(true);
  };

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
                  title={bountyProgram.tableTitle}
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
            </div>
          </div>
          <RequestBounty
            rowData={rowData}
            show={show}
            handleClose={handleClose}
            setApply={setApply}
          />
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

export default CompaignTable;
