import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import Layout from '../common/components/Layout/Layout';
import { withApollo } from '../libs/apollo';
import CardButton from '../common/components/CardButton/CardButton';
import { getStrings } from '../common/utilities';
import LatestQuestion from '../common/components/LatestQuestions';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage() {
  const classes = useStyles();
  return (
    <Layout>
      <Box className={classes.paper}>
        <LatestQuestion />
      </Box>
    </Layout>
  );
}

export default withApollo({ ssr: true })(MainPage);
