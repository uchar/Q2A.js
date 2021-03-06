import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { getStrings } from '../utlities/languageUtilities';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: (theme) => theme.spacing(5, 5, 5, 5),
    margin: (theme) => theme.spacing(5, 0, 0, 0),
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
};

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
  return (
    <Paper sx={{ ...props.sx, ...styles.root }}>
      {/* <Grid  sx={{  ...styles.grid }} container spacing={2}> */}
      {/*  <Grid item md={2} display={{ xs: 'none' }} /> */}
      {/*  <Grid item md={2} xs={7}> */}
      {/*    {getFooterTitle(getStrings().FOOTER_TITLE)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK1)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK2)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK3)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK4)} */}
      {/*  </Grid> */}
      {/*  <Grid item md={2} xs={7}> */}
      {/*    {getFooterTitle(getStrings().FOOTER_TITLE)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK1)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK2)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK3)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK4)} */}
      {/*  </Grid> */}
      {/*  <Grid item md={2} xs={7}> */}
      {/*    {getFooterTitle(getStrings().FOOTER_TITLE)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK1)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK2)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK3)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK4)} */}
      {/*  </Grid> */}
      {/*  <Grid item md={2} xs={7}> */}
      {/*    {getFooterTitle(getStrings().FOOTER_TITLE)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK1)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK2)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK3)} */}
      {/*    {getFooterText(getStrings().FOOTER_LINK4)} */}
      {/*  </Grid> */}
      {/*  <Grid item md={2} display={{ xs: 'none' }}></Grid> */}
      {/* </Grid> */}
      <Typography color="textPrimary" style={{ fontSize: 13, textAlign: 'center'}}>
        {getStrings().FOOTER_LOVE}
      </Typography>
    </Paper>
  );
}
