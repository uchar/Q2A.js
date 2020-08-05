import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import AskAndTitleSection from '../AskAndTitleSection';
import { getStrings } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  askAndTitleSection: {
    margin: theme.spacing(6),
  },
  appBar: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(10, '5%', 3, '5%'),
    width: 'auto',
    textAlign: 'center',
  },
}));

const usePanelStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = usePanelStyle();

  return (
    <div className={classes.root} role="tabpanel" hidden={value !== index} {...other}>
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const getQuestionsList = (questions) => {
  return questions.map((question) => {
    return <QuestionItemPreview key={question.id} {...question} />;
  });
};

const LatestQuestions = ({ tag, questions, tagRequest }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleCurrentTabChange = (_, tabIndex) => {
    setCurrentTab(tabIndex);
  };

  const { latestQuestions, popularQuestions, mostViewsQuestions, noAnswersQuestions } = questions;

  const getTitle = () => {
    const titles = getStrings().SITE_MAIN_PAGE_TAB_HEADERS;
    let title = titles[currentTab];
    if (tag && !isMobile) {
      title += `${getStrings().IN} [${tag}]`;
    }
    return title;
  };

  return (
    <div className={classes.root}>
      <AskAndTitleSection className={classes.askAndTitleSection} title={getTitle()} />
      <AppBar position="static" color="default" fullWidth className={classes.appBar}>
        <Tabs
          value={currentTab}
          onChange={handleCurrentTabChange}
          variant="scrollable"
          scrollButtons="on"
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
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {getQuestionsList(popularQuestions)}
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        {getQuestionsList(mostViewsQuestions)}
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        {getQuestionsList(noAnswersQuestions)}
      </TabPanel>
    </div>
  );
};

export default LatestQuestions;
