import React from 'react';
import MaterialTable from 'material-table';
import { Avatar } from '@material-ui/core';
import imageSrc from '../../assets/images/user-a.jpg';

const RequestedBounty = ({ history }) => {
  //Its value will come from database

  const columns = [
    { title: 'Bounty Name', field: 'name' },
    {
      title: 'Link',
      field: 'link',
      render: (rowData) => (
        <a href='https://www.facebook.com/goalcast/video'>
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

  return (
    <section className='content'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <MaterialTable
                title='Requested Bounty'
                columns={columns}
                style={{ color: '#888' }}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestedBounty;
