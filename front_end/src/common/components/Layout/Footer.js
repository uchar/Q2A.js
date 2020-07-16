import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';

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

export default function Footer(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      style={{
        marginTop: '100px',
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
      <Typography color="textPrimary" style={{ fontSize: 13, textAlign: 'center', marginTop: '50px' }}>
        {'ساخته شده با عشق توسط فرم ساز اختصاصی هفت خط کد'}
      </Typography>
    </Paper>
  );
}
