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
import AnswersIcon from '@material-ui/icons/QuestionAnswer';
import Avatar from '@material-ui/core/Avatar';
import Layout from '../common/components/Layout/Layout';
import ProfileTab from '../common/components/ProfileTab';
import ChartTab from '../common/components/ChartTab';
import QuestionItem from '../common/components/QuestionItem';


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
    fontSize: 19,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.topSection}>
          <Avatar className={classes.avatar} alt="Remy Sharp" src="/images/sample_profile3.jpg" />
          <Typography className={classes.title} variant="h6" paragraph>
            {`بیارنه استراس تروپ (به دانمارکی: Bjarne Stroustrup) (زاده ۳۰ دسامبر ۱۹۵۰ در دانمارک) دانشمند علوم کامپیوتر، بیشتر به‌خاطر ایجاد و توسعه زبان سی‌پلاس‌پلاس به‌شهرت رسید. وی در حال حاضر پروفسور دانشگاه A&M تگزاس است. استراس‌تروپ توسعه سی‌پلاس‌پلاس (که سی باکلاس نامیده می‌شد) را در سال ۱۹۷۹ شروع کرد.

وی همچنین کتاب استانداردی برای زبان سی پلاس پلاس تحت عنوان The C++ Programming Language نوشت، که هم‌اکنون در ویرایش ۴ به سر می‌برد. متن کتاب ۲ بار ویرایش شده و بازتاب‌دهنده تحولات زبان و کارهای کمیته استانداردسازی زبان است.`}
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
            <Tab label="پروفایل" icon={<PersonIcon />} {...a11yProps(0)} />
            <Tab label="آمارها" icon={<StatsIcon />} {...a11yProps(1)} />
            <Tab label="سوالات" icon={<QuestionsIcon />} {...a11yProps(2)} />
            <Tab label="جواب ها" icon={<AnswersIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <ProfileTab />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ChartTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div style={{}} dir={'rtl'}>
              <QuestionItem />
              <QuestionItem />
              <QuestionItem />
              <QuestionItem />
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div style={{}} dir={'rtl'}>
              <QuestionItem />
              <QuestionItem />
              <QuestionItem />
              <QuestionItem />
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
    </Layout>
  );
}
