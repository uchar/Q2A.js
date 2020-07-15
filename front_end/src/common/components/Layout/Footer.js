import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
  },
}));

const getFooterText = (text) => {
  return (
    <Typography style={{ fontSize: 13, textAlign: 'right', color: 'white', marginBottom: '5px' }}>
      {text}
    </Typography>
  );
};
const getFooterTitle = (text) => {
  return (
    <Typography style={{ fontSize: 20, textAlign: 'right', color: 'white', marginBottom: '15px' }}>
      {text}
    </Typography>
  );
};

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.root} style={{ backgroundColor: '#242729', padding: '50px 25px 25px 25px' }}>
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
