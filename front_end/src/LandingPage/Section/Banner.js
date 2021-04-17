import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';

const useStyles = makeStyles(() => ({
  media: {
    width: '80%',
  },
}));

const Banner = (props) => {
  const classes = useStyles();
  return (
    <div {...props}>
      <Grid container>
        <Grid item xs={12} sm={6} style={{ marginTop: '30px' }}>
          <Typography
            variant="h1"
            style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center', margin: '20px 0px 20px 0px' }}
          >
            Build your audience &amp;
            <br /> grow your business online smarter
          </Typography>
          <Typography variant="h3" style={{ paddingRight: '50px', paddingLeft: '150px' }}>
            Get your blood tests delivered at let home collect sample from the victory of the managements that
            supplies best design system guidelines ever. Email
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} direction="row" alignItems="center">
          <img
            src="/images/banner.png"
            alt="Picture of the author"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
