import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CompaignTable from './CompaignTable';
import RequestedBounty from './RequestedBounty';
import withMainLayout from './../HOC/withMainLayout';
import { Box, Typography } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className='mt-2'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Index = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value);
  return (
    <div class='page-content'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          style={{ border: 'none' }}
        >
          <Tab
            label='Bounty Compaign'
            {...a11yProps(0)}
            style={{
              color: value != 0 ? '#000000' : '',
              border: 'none',
              outline: 'none',
            }}
          />
          <Tab
            label='Requested Bounties'
            {...a11yProps(1)}
            style={{
              color: value != 1 ? '#000000' : '',
              border: 'none',
              outline: 'none',
            }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CompaignTable />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <RequestedBounty />
        </TabPanel>
      </Box>
    </div>
  );
};

export default withMainLayout(Index);
