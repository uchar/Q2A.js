import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import StatsIcon from '@material-ui/icons/BarChart';
import QuestionsIcon from '@material-ui/icons/ContactSupport';
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../../common/components/Layout/Layout';
import ProfileTab from '../../common/components/ProfileTab';
import ChartTab from '../../common/components/ChartTab';
import QuestionItem from '../../common/components/QuestionItem';
import { GET_USER } from '../../API/queries';
import Loading from '../../common/components/Loading';
import AnswerItem from '../../common/components/AnswerItem';
import { withApollo } from '../../libs/apollo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '40px',
  },
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    margin: theme.spacing(4),
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(4),
    fontSize: 19,
  },
}));

function User() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_USER, { variables: { id } });
  if (error) {
    console.error(error);
    return <h1> error </h1>;
  }
  if (loading) return <Loading />;
  const { answers, questions, clapItems, profileImage, about } = data.getUser;
  console.log('ANSWERS : ', answers);
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.topSection}>
          <Avatar aria-label="recipe" className={classes.avatar} src={profileImage}>
            <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
          </Avatar>
          <Typography className={classes.title} variant="h6" paragraph>
            {`${about}`}
          </Typography>
        </div>

        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="سوال ها" icon={<PersonIcon />} {...a11yProps(0)} />
            <Tab label="جواب ها" icon={<StatsIcon />} {...a11yProps(1)} />
            <Tab label="تشویق ها" icon={<QuestionsIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <div dir="rtl">
            {questions.map((question) => {
              return <QuestionItem isMainPage={true} key={question.id} {...question} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div dir="rtl">
            {answers.map((answer) => {
              return <AnswerItem key={answer.id} {...answer}></AnswerItem>;
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div dir="rtl">
            {clapItems.map((item) => {
              if (item.type === 'QUESTION') {
                const { question } = item;
                return <QuestionItem isMainPage={true} key={question.id} {...question} />;
              }
              if (item.type === 'ANSWER') {
                const { answer } = item;
                return <AnswerItem key={answer.id} {...answer}></AnswerItem>;
              }
            })}
          </div>
        </TabPanel>
      </div>
    </Layout>
  );
}
export default withApollo({ ssr: true })(User);
