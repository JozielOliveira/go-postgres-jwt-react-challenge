import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FixMeLate } from 'types';

type NavTabs = {
  tabs: {
    label: string;
    component: React.ReactNode;
  }[];
};

export const NavTabs = ({ tabs }: NavTabs) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: FixMeLate, newValue: FixMeLate) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabs.map((tab, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, i) => (
        <TabPanel value={value} index={i}>
          {tab.component}
        </TabPanel>
      ))}
    </>
  );
};

function TabPanel(props: FixMeLate) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Tabs;
