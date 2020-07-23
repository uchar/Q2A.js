import React from 'react';
import PropTypes from 'prop-types';
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
import Layout from '../../common/components/Layout/Layout';
import QuestionItem from '../../common/components/QuestionItem';
import AnswerItem from '../../common/components/AnswerItem';
import { getProfileImage } from '../../common/utilities';
import { wrapper } from '../../redux/store';
import { doGraphQLQuery } from '../../API/utilities';
import { ALL_QUESTIONS, ALL_TAGS, GET_USER } from '../../API/queries';
import { SERVER_SIDE_TAGS_ACTION } from '../../redux/constants';
import Loading from '../../common/components/Loading';

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
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(4),
    fontSize: 19,
    whiteSpace: 'pre-line',
  },
}));

const User = ({ user, tags }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { id } = router.query;

  if (!user) return <Loading />;
  const { answers, questions, clapItems, profileImage, about } = user;
  return (
    <Layout tags={tags}>
      <div className={classes.root}>
        <div className={classes.topSection}>
          <Avatar aria-label="recipe" className={classes.avatar} src={getProfileImage(profileImage)}>
            <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
          </Avatar>
          <Typography className={classes.title} variant="h6" paragraph>
            {`${about || ''}`}
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
              const alteredQuestion = { ...question };
              alteredQuestion.user = {};
              alteredQuestion.user.publicName = id;
              alteredQuestion.user.profileImage = profileImage;
              return <QuestionItem isMainPage={true} key={alteredQuestion.id} {...alteredQuestion} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div dir="rtl">
            {answers.map((answer) => {
              const alteredAnswer = { ...answer };
              alteredAnswer.user = {};
              alteredAnswer.user.publicName = id;
              alteredAnswer.user.profileImage = profileImage;
              return <AnswerItem key={answer.id} {...alteredAnswer}></AnswerItem>;
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div dir="rtl">
            {clapItems.map((item) => {
              if (item.type === 'QUESTION') {
                const { ...question } = { item };
                question.user = {};
                question.user.publicName = id;
                question.user.profileImage = profileImage;
                return <QuestionItem isMainPage={true} key={question.id} {...question} />;
              }
              if (item.type === 'ANSWER') {
                const { ...answer } = { item };
                answer.user = {};
                answer.user.publicName = id;
                answer.user.profileImage = profileImage;
                return <AnswerItem key={answer.id} {...answer}></AnswerItem>;
              }
            })}
          </div>
        </TabPanel>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const userData = await doGraphQLQuery(GET_USER, { id: params.id });
  const tagsResponse = await doGraphQLQuery(ALL_TAGS);
  return {
    props: {
      user: userData.getUser,
      tags: tagsResponse.getTags,
    },
  };
};
export default User;
