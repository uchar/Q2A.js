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
    margin: theme.spacing(3, '5%', 1, '5%'),
    width: 'auto',
    textAlign: 'center',
  },
}));

const usePanelStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const LatestQuestions = ({}) => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

export default LatestQuestions;
