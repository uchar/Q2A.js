import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Layout from '../common/components/Layout/Layout';
import LatestQuestion from '../common/components/LatestQuestions';
import { ALL_QUESTIONS, ALL_TAGS } from '../API/queries';
import { doGraphQLQuery } from '../API/utilities';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage({ questions, tags }) {
  const classes = useStyles();
  return (
    <Layout tags={tags}>
      <Box className={classes.paper}>
        <LatestQuestion questions={questions} />
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const questionsResponse = await doGraphQLQuery(ALL_QUESTIONS);
  const tagsResponse = await doGraphQLQuery(ALL_TAGS);
  return {
    props: {
      questions: questionsResponse,
      tags: tagsResponse.getTags,
    },
    unstable_revalidate: 40,
  };
};
export default MainPage;
