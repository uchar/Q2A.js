import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { getStrings } from '../utlities/languageUtilities';
import QuestionItemPreview from '../components/Post/QuestionItemPreview';

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
          {getFooterTitle(getStrings().Footer_Title)}
          {getFooterText(getStrings().Footer_Link1)}
          {getFooterText(getStrings().Footer_Link2)}
          {getFooterText(getStrings().Footer_Link3)}
          {getFooterText(getStrings().Footer_Link4)}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().Footer_Title)}
          {getFooterText(getStrings().Footer_Link1)}
          {getFooterText(getStrings().Footer_Link2)}
          {getFooterText(getStrings().Footer_Link3)}
          {getFooterText(getStrings().Footer_Link4)}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().Footer_Title)}
          {getFooterText(getStrings().Footer_Link1)}
          {getFooterText(getStrings().Footer_Link2)}
          {getFooterText(getStrings().Footer_Link3)}
          {getFooterText(getStrings().Footer_Link4)}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().Footer_Title)}
          {getFooterText(getStrings().Footer_Link1)}
          {getFooterText(getStrings().Footer_Link2)}
          {getFooterText(getStrings().Footer_Link3)}
          {getFooterText(getStrings().Footer_Link4)}
        </Grid>
        <Grid item md={2} xs={0}></Grid>
      </Grid>
      <Typography color="textPrimary" style={{ fontSize: 13, textAlign: 'center', marginTop: '50px' }}>
        {getStrings().Footer_Love}
      </Typography>
    </Paper>
  );
}
