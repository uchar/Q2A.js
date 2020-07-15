import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: '50px 25px 25px 25px',
  },
}));

const getFooterText = (text) => {
  return (
    <Typography color="textPrimary" style={{ fontSize: 13, textAlign: 'right', marginBottom: '5px' }}>
      {text}
    </Typography>
  );
};
const getFooterTitle = (text) => {
  return (
    <Typography color="textSecondary" style={{ fontSize: 20, textAlign: 'right', marginBottom: '15px' }}>
      {text}
    </Typography>
  );
};

export default function Footer() {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const { themeType } = selector.client;
  return (
    <Box
      className={classes.root}
      style={{
        backgroundColor:
          themeType === 'dark' ? darkTheme.palette.background.default : lightTheme.palette.background.default,
      }}
    >
      <Grid direction="row" justify={'center'} container spacing={2}>
        <Grid item md={2} xs={0}></Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle('لینک های پر کاربرد')}
          {getFooterText('آخرین سوال ها')}
          {getFooterText('پرسیدن سوال')}
          {getFooterText('تگ ها')}
          {getFooterText('قوانین')}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle('لینک های پر کاربرد')}
          {getFooterText('آخرین سوال ها')}
          {getFooterText('پرسیدن سوال')}
          {getFooterText('تگ ها')}
          {getFooterText('قوانین')}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle('لینک های پر کاربرد')}
          {getFooterText('آخرین سوال ها')}
          {getFooterText('پرسیدن سوال')}
          {getFooterText('تگ ها')}
          {getFooterText('قوانین')}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle('لینک های پر کاربرد')}
          {getFooterText('آخرین سوال ها')}
          {getFooterText('پرسیدن سوال')}
          {getFooterText('تگ ها')}
          {getFooterText('قوانین')}
        </Grid>
        <Grid item md={2} xs={0}></Grid>
      </Grid>
      <Typography style={{ fontSize: 13, textAlign: 'center', color: 'white', marginTop: '50px' }}>
        {'ساخته شده با عشق توسط فرم سازی اختصاصی هفت خط کد'}
      </Typography>
    </Box>
  );
}
