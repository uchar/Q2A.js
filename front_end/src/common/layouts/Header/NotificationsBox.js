import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from '@material-ui/core/Paper';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    minWidth: '500px',
  },
  boxNotification: {
    cursor: 'pointer',
    padding: '10px',
    minWidth: '400px',
    margin: theme.spacing(1, 2, 2, 2),
  },
  boxNotificationNameDate: {
    fontSize: '13px',
  },
  boxNotificationName: {
    margin: theme.spacing(1, 0, 0, 0),
    fontSize: '10px',
  },
  boxNotificationTitle: {
    wordWrap: 'wordBreak',
    textAlign: 'right',
  },
  boxNotificationSubTitle: {
    wordWrap: 'wordBreak',
    textAlign: 'right',
    fontSize: '12px',
  },
}));

const NotificationsBox = ({ notificationAnchor, handleClose }) => {
  const classes = useStyles();

  const [notificationText, setNotificationText] = React.useState([
    {
      id: 1,
      name: 'یک نفر شما را تشویق کرد',
      date: '25 شهریور 1399',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'به شما پاسخی داده شد',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'یک نفر شما را تشویق کرد',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'یک نفر شما را تشویق کرد',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'یک نفر شما را تشویق کرد',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'یک نفر شما را تشویق کرد',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'یک نفر شما را تشویق کرد',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
  ]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setNotificationText(notificationText.concat(notificationText));
    }, 3000);
  };

  return (
    <Menu
      className={classes.root}
      id="long-menu"
      anchorEl={notificationAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      keepMounted
      open={Boolean(notificationAnchor)}
      onClose={handleClose}
      dir="rtl"
    >
      <InfiniteScroll
        height="500px"
        dataLength={notificationText.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <Loading
            browserSize={45}
            mobileSize={45}
            type={'circle'}
            style={{ textAlign: 'center', margin: '15px 0px 15px 0px' }}
          />
        }
      >
        {notificationText.map((row) => (
          <Paper key={row} dir={'rtl'} boxShadow={3} className={classes.boxNotification}>
            <div
              style={{
                justifyContent: 'space-between',
                display: 'flex',
              }}
            >
              <Typography color={'textSecondary'} className={classes.boxNotificationNameDate}>
                {row.date}
              </Typography>

              <Typography color={'textSecondary'} className={classes.boxNotificationName}>
                {row.name}
              </Typography>
            </div>

            <Typography color={'textPrimary'} className={classes.boxNotificationTitle}>
              {row.question}
            </Typography>
            <Typography color={'textSecondary'} className={classes.boxNotificationSubTitle}>
              {row.answer}
            </Typography>
          </Paper>
        ))}
      </InfiniteScroll>
    </Menu>
  );
};
export default NotificationsBox;
