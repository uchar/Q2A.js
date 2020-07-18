import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/react-hooks';
import { ALL_QUESTIONS } from '../../API/queries';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 600,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  texts: { fontSize: 18, marginTop: theme.spacing(1), fontWeight: '100' },
}));

export default function ProfileTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { loading, error, data } = useQuery(ALL_QUESTIONS, { variables: { tag } });

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Informations" {...a11yProps(0)} />
        <Tab label="Eductions" {...a11yProps(1)} />
        <Tab label="Projects" {...a11yProps(2)} />
        <Tab label="Skills" {...a11yProps(3)} />
        <Tab label="Achivments" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography className={classes.texts} variant={'h6'}>
          {`Birthday : 1999/3/3`}
        </Typography>
        <Typography className={classes.texts} variant={'h6'}>
          {`Sex : Male`}
        </Typography>
        <Typography className={classes.texts} variant={'h6'}>
          {`Location : Denmark`}
        </Typography>
        <Typography className={classes.texts} variant={'h6'}>
          {`Email : aaa@gmail.com`}
        </Typography>
        <Typography className={classes.texts} variant={'h6'}>
          {`Phone : +12345123`}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
