import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '../../common/components/Layout/Layout';
import { withApollo } from '../../libs/apollo';
import CardButton from '../../common/components/CardButton/CardButton';
import { getStrings } from '../../common/utilities';
import LatestQuestion from '../../common/components/LatestQuestions';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage() {
  const classes = useStyles();
  const router = useRouter();
  const { tag } = router.query;
  return (
    <Layout>
      <Box className={classes.paper}>
        <LatestQuestion tag={tag} />
      </Box>
    </Layout>
  );
}

export default withApollo({ ssr: true })(MainPage);
