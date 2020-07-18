import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Layout from '../common/components/Layout/Layout';
import { withApollo } from '../libs/apollo';
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
