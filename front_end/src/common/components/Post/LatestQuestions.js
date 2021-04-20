import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NewIcon from '@material-ui/icons/FiberNew';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewsIcon from '@material-ui/icons/Visibility';
import HelpIcon from '@material-ui/icons/Help';
import { isMobile } from 'react-device-detect';
import Box from '@material-ui/core/Box';
import { useStore } from 'react-redux';
import QuestionItemPreview from './QuestionItemPreview';
import AskAndTitleSection from '../AskAndTitleSection';
import { getStrings } from '../../utlities/languageUtilities';
import Pagination from '../Pagination';
import { getItemsWithOffsetAndDispatch, getPageCount } from '../../utlities/generalUtilities';
import {
  LATEST_QUESTIONS_DATA,
  MOST_VIEWS_QUESTIONS_DATA,
  NO_ANSWERS_QUESTIONS_DATA,
  POPULAR_QUESTIONS_DATA,
} from '../../constants';

const styles = {
  root: {
    textAlign: 'center',
  },
  askAndTitleSection: {
    margin: (theme) => theme.spacing(6),
  },
  appBar: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    margin: (theme) => theme.spacing(3, '5%', 1, '5%'),
    width: 'auto',
    textAlign: 'center',
  },
};

const panelStyle = {
  root: {
    padding: (theme) => theme.spacing(3),
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box sx={panelStyle.root} role="tabpanel" hidden={value !== index} {...other}>
      {children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const getQuestionsList = (questions) => {
  if (!questions) return <div />;
  return questions.map((question) => {
    return <QuestionItemPreview key={question.id} {...question} />;
  });
};

const LatestQuestions = ({ tag, questions, statistics }) => {
  const store = useStore();
  const [currentTab, setCurrentTab] = React.useState(0);
  const handleCurrentTabChange = (_, tabIndex) => {
    setCurrentTab(tabIndex);
  };

  const { latestQuestions, popularQuestions, mostViewsQuestions, noAnswersQuestions } = questions;

  const getTitle = () => {
    const titles = getStrings().SITE_MAIN_PAGE_TAB_HEADERS;
    let title = titles[currentTab];
    if (tag && !isMobile) {
      title += ` ${getStrings().IN} [${tag}]`;
    }
    return title;
  };

  const handlePageChange = (data) => async (page) => {
    return getItemsWithOffsetAndDispatch(page, data, store, tag ? { tag } : {}, 2);
  };

  return (
    <Box sx={styles.root}>
      <AskAndTitleSection sx={styles.askAndTitleSection} title={getTitle()} />
      <AppBar position="static" color="default" sx={styles.appBar}>
        <Tabs
          value={currentTab}
          onChange={handleCurrentTabChange}
          variant="scrollable"
          scrollButtons={true}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={getStrings().SITE_MAIN_PAGE_TAB_HEADERS[0]} icon={<NewIcon />} />
          <Tab label={getStrings().SITE_MAIN_PAGE_TAB_HEADERS[1]} icon={<FavoriteIcon />} />
          <Tab label={getStrings().SITE_MAIN_PAGE_TAB_HEADERS[2]} icon={<ViewsIcon />} />
          <Tab label={getStrings().SITE_MAIN_PAGE_TAB_HEADERS[3]} icon={<HelpIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        {getQuestionsList(latestQuestions)}
        {statistics && (
          <Pagination
            pageCount={getPageCount(statistics.allQuestionsCount, 2)}
            onChange={handlePageChange(LATEST_QUESTIONS_DATA)}
          />
        )}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {getQuestionsList(popularQuestions)}
        {statistics && (
          <Pagination
            pageCount={getPageCount(statistics.allQuestionsCount, 2)}
            onChange={handlePageChange(POPULAR_QUESTIONS_DATA)}
          />
        )}
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        {getQuestionsList(mostViewsQuestions)}
        {statistics && (
          <Pagination
            pageCount={getPageCount(statistics.allQuestionsCount, 2)}
            onChange={handlePageChange(MOST_VIEWS_QUESTIONS_DATA)}
          />
        )}
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        {getQuestionsList(noAnswersQuestions)}
        {statistics && (
          <Pagination
            pageCount={getPageCount(statistics.allQuestionsCount, 2)}
            onChange={handlePageChange(NO_ANSWERS_QUESTIONS_DATA)}
          />
        )}
      </TabPanel>
    </Box>
  );
};

LatestQuestions.propTypes = {
  tag: PropTypes.string,
  questions: PropTypes.object.isRequired,
  statistics: PropTypes.object,
};
export default LatestQuestions;
