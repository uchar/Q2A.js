import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Typography, Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewIcon from '@material-ui/icons/FiberNew';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewsIcon from '@material-ui/icons/Visibility';
import HelpIcon from '@material-ui/icons/Help';
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

function LatestQuestions({ tag }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { loading, error, data } = useQuery(ALL_QUESTIONS, { variables: { tag } });
  if (error) {
    console.error(error);
    return <h1> error </h1>;
  }
  if (loading) return <Loading />;
  const { latestQuestions, popularQuestions, mostViewsQuestions, noAnswersQuestions } = data;

  const getQueustionsList = (questions) => {
    return questions.map((question) => {
      return <QuestionItem isMainPage={true} key={question.id} {...question} />;
    });
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        style={{
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
          margin: '50px 12% 5px 50px',
          width: '75%',
          textAlign: 'center',
        }}
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
          <Tab label="جدیدترین ها" icon={<NewIcon />} {...a11yProps(0)} />
          <Tab label="محبوب ترین ها" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="پربازدیدترین ها" icon={<ViewsIcon />} {...a11yProps(2)} />
          <Tab label="بدون جواب ها" icon={<HelpIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {getQueustionsList(latestQuestions)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getQueustionsList(popularQuestions)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {getQueustionsList(mostViewsQuestions)}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {getQueustionsList(noAnswersQuestions)}
      </TabPanel>
    </div>
  );
}

export default withApollo({ ssr: true })(LatestQuestions);
