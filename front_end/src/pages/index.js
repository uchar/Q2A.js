import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Layout from '../common/layouts/Layout';
import LatestQuestion from '../common/components/Post/LatestQuestions';
import { ALL_QUESTIONS, ALL_TAGS } from '../API/queries';
import { doGraphQLQuery } from '../API/utilities';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage({ questions, tags }) {
  const classes = useStyles();
  return (
    <Layout tags={tags}>
      <Box className={classes.root}>
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
    revalidate: 50,
  };
};
export default MainPage;
