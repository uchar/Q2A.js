import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Menu, Box } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from '@material-ui/core/Paper';
import Loading from '../../Loading';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  boxNotification: {
    cursor: 'pointer',
    padding: '10px',
    margin: '3px 10px 10px 10px',
  },
  boxNotificationName: {
    fontSize: '13px',
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

export default function Notifications({ notification, handleClose }) {
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
    console.log('fetchMoreData222222222222:::::::::::::::::::::', notificationText.length);
  };

  return (
    <Menu
      style={{ maxWidth: '500px' }}
      id="long-menu"
      anchorEl={notification}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={Boolean(notification)}
      onClose={handleClose}
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
              <Typography color={'textSecondary'} className={classes.boxNotificationName}>
                {row.date}
              </Typography>
              <div
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                }}
              >
                <Typography color={'textSecondary'} style={{ margin: '3px 0px 0px 0px', fontSize: '10px' }}>
                  {row.name}
                </Typography>
              </div>
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
}
export const getServerSideProps = () => {};
