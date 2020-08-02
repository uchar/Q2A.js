import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewIcon from '@material-ui/icons/FiberNew';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewsIcon from '@material-ui/icons/Visibility';
import HelpIcon from '@material-ui/icons/Help';
import { isMobile } from 'react-device-detect';
import QuestionItemPreview from './QuestionItemPreview';
import { legacyParseContent } from '../parsers/legacyParser';
import CardButton from './CardButton/CardButton';
import { getStrings } from '../utlities/languageUtilities';

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

const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
};

const getQueustionsList = (questions) => {
  return questions.map((question) => {
    return <QuestionItemPreview isMainPage={true} key={question.id} {...question} />;
  });
};

const LatestQuestions = ({ tag, questions, tagRequest }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event, tabIndex) => {
    setCurrentTab(tabIndex);
  };

  // const { loading, error, data } = useQuery(ALL_QUESTIONS, { variables: { tag } });
  // const tagRequest = useQuery(GET_TAG, { variables: { tag } });

  const { latestQuestions, popularQuestions, mostViewsQuestions, noAnswersQuestions } = questions;

  const getTitle = () => {
    let title = '';
    if (currentTab === 0) {
      title = 'جدید ترین ها';
    } else if (currentTab === 1) {
      title = 'محبوبترین ها';
    } else if (currentTab === 2) {
      title = 'پربازدیدترین ها';
    } else if (currentTab === 3) {
      title = 'بدون پاسخ ها';
    }
    if (tag && !isMobile) {
      title += ` در [${tag}]`;
    }
    return title;
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          flex: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '50px 10px 0px 10px',
        }}
      >
        <Typography style={{ marginTop: 25, fontSize: isMobile ? 22 : 32 }}>{getTitle()}</Typography>
        <CardButton url={'/ask'} shouldShowLoading={false} text={getStrings().ASK_QUESTION_BUTTON} />
      </div>
      <div style={{ margin: '25px 10px 0px 10px', textAlign: 'right' }}>
        {tagRequest &&
          !tagRequest.loading &&
          !tagRequest.error &&
          !tagRequest.error &&
          tagRequest.data &&
          tagRequest.data.getTagDetail &&
          legacyParseContent(tagRequest.data.getTagDetail.content)}
      </div>

      <AppBar
        position="static"
        color="default"
        fullWidth={isMobile}
        style={{
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
          margin: isMobile ? '50px 0px 5px 0px' : '50px 13% 5px 13%',
          width: isMobile ? '100%' : 'auto',
          textAlign: 'center',
        }}
      >
        <Tabs
          value={currentTab}
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
      <TabPanel value={currentTab} index={0}>
        {getQueustionsList(latestQuestions)}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {getQueustionsList(popularQuestions)}
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        {getQueustionsList(mostViewsQuestions)}
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        {getQueustionsList(noAnswersQuestions)}
      </TabPanel>
    </div>
  );
};

export default LatestQuestions;
