import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { getStrings } from '../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: theme.spacing(10, 5, 5, 5),
    marginTop: theme.spacing(20),
  },
}));

const getFooterText = (text) => {
  return (
    <Typography color="textPrimary" style={{ fontSize: 13, textAlign: 'initial', marginBottom: '5px' }}>
      {text}
    </Typography>
  );
};
const getFooterTitle = (text) => {
  return (
    <Typography color="textSecondary" style={{ fontSize: 20, textAlign: 'initial', marginBottom: '15px' }}>
      {text}
    </Typography>
  );
};

export default function Footer(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid direction="row" justify={'center'} container spacing={2}>
        <Grid item md={2} display={{ xs: 'none' }}></Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().FOOTER_TITLE)}
          {getFooterText(getStrings().FOOTER_LINK1)}
          {getFooterText(getStrings().FOOTER_LINK2)}
          {getFooterText(getStrings().FOOTER_LINK3)}
          {getFooterText(getStrings().FOOTER_LINK4)}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().FOOTER_TITLE)}
          {getFooterText(getStrings().FOOTER_LINK1)}
          {getFooterText(getStrings().FOOTER_LINK2)}
          {getFooterText(getStrings().FOOTER_LINK3)}
          {getFooterText(getStrings().FOOTER_LINK4)}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().FOOTER_TITLE)}
          {getFooterText(getStrings().FOOTER_LINK1)}
          {getFooterText(getStrings().FOOTER_LINK2)}
          {getFooterText(getStrings().FOOTER_LINK3)}
          {getFooterText(getStrings().FOOTER_LINK4)}
        </Grid>
        <Grid item md={2} xs={7}>
          {getFooterTitle(getStrings().FOOTER_TITLE)}
          {getFooterText(getStrings().FOOTER_LINK1)}
          {getFooterText(getStrings().FOOTER_LINK2)}
          {getFooterText(getStrings().FOOTER_LINK3)}
          {getFooterText(getStrings().FOOTER_LINK4)}
        </Grid>
        <Grid item md={2} display={{ xs: 'none' }}></Grid>
      </Grid>
      <Typography color="textPrimary" style={{ fontSize: 13, textAlign: 'center', marginTop: '50px' }}>
        {getStrings().FOOTER_LOVE}
      </Typography>
    </Paper>
  );
}
