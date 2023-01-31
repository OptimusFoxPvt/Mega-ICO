import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { bountyProgram } from './Languages/en';
import DetailModal from './detailModal';
import {
  BountyList,
  BountyApproval,
  BountySending,
} from '../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BtnLoading } from '../Loader/BtnLoading';
const CompaignTable = () => {
  const [loading, setLoading] = useState(false);
  const bountyList = useSelector((state) => state.auth.bountyList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BountyList());
  }, []);
  const approve = (data) => {
    setLoading(true);
    dispatch(
      BountySending(
        data.user,
        data.WalletAddress,
        data.id,
        'approved',
        setLoading
      )
    );
  };
  const reject = (id) => {
    dispatch(BountyApproval(id, 'rejected'));
  };
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const approvebtnText = approved ? 'Approved' : 'Approve';
  const rejectbtnText = rejected ? 'Rejected' : 'Reject';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  const columns = [
    {
      title: 'Sr No.',
      field: 'SrNO',
    },
    { title: 'Username', field: 'username' },
    { title: 'Wallet Address', field: 'WalletAddress' },
    {
      title: 'Compaign Name',
      field: 'CompaignName',
    },
    {
      title: 'Bounty Reward',
      field: 'BountyReward',
    },
    {
      title: 'Action',
      field: 'url',
      headerStyle: { textAlign: 'center' },
      render: (rowData) => (
        <div>
          <span
            className='dt-status-md badge badge-outline badge-success badge-md b-button-hovereffect'
            onClick={() => approve(rowData)}
          >
            {approvebtnText}
          </span>
          <span
            className='dt-status-md badge badge-outline b-button-userlist badge-success badge-md'
            onClick={() => reject(rowData.id)}
          >
            {loading ? '...loading' : rejectbtnText}
          </span>
          {!loading && (
            <span>
              <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id='long-menu'
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem>
                  <span
                    data-toggle='modal'
                    data-target='#requested-details'
                    onClick={() => {
                      setData(rowData);
                      handleClose();
                    }}
                  >
                    <RemoveRedEyeIcon /> {` View Details`}
                  </span>
                </MenuItem>
              </Menu>
            </span>
          )}
        </div>
      ),
    },
  ];
  const data2 = bountyList.map((d, index) => {
    return {
      screenshot: d.bounty_ss,
      user: d.user,
      id: d._id,
      bountyLink: d.bounty_link,
      SrNO: ++index,
      username: d.email,
      WalletAddress: d.wallet_address,
      BountyReward: `5`,
      CompaignName: `${d.bounty_type + ' Compaign'}`,
      Action: { approve: 'Approve', reject: 'Reject' },
    };
  });

  return (
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
              data={data2}
            />
          </div>
        </div>
      </div>

      <DetailModal data={data} />
    </section>
  );
};

export default CompaignTable;
