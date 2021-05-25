import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalShipping from '@material-ui/icons/LocalShippingOutlined';
import NavigationIcon from '@material-ui/icons/NavigationOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Profile from './Profile';
import Shipping from './Shipping';
import MyOrders from './MyOrders';
import Settings from './Settings';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="secondary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Профайл" icon={<AccountCircle />} {...a11yProps(0)} />
          <Tab
            label="Хүргэлтийн мэдээлэл"
            icon={<LocalShipping />}
            {...a11yProps(1)}
          />
          <Tab
            label="Миний захиалгууд"
            icon={<NavigationIcon />}
            {...a11yProps(2)}
          />
          <Tab label="Тохиргоо" icon={<SettingsIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Shipping />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyOrders />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Settings />
      </TabPanel>
    </div>
  );
}
