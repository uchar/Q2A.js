import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Typography, Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Loading from './Loading';
import { ALL_QUESTIONS } from '../../API/queries';
import { withApollo } from '../../libs/apollo';
import QuestionItem from './QuestionItem';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

function TabPanel(props) {
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
}

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

function LatestQuestion() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { loading, error, data } = useQuery(ALL_QUESTIONS);
  if (error) {
    console.error(error);
    return <h1> error </h1>;
  }
  if (loading) return <Loading />;
  const { questions } = data;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        fullWidth
        color="default"
        style={{ margin: '20px 50px 5px 0px', width: '870px', textAlign: 'center' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="جدیدترین ها" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="محبوب ترین ها" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="پربازدیدترین ها" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab label="بدون جواب ها" icon={<HelpIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {questions &&
          questions.map((question) => {
            return <QuestionItem key={question.id} {...question} />;
          })}
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
    </div>
  );
}

export default withApollo({ ssr: true })(LatestQuestion);
