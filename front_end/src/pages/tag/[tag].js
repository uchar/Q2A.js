import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Layout from '../../common/components/Layout/Layout';
import LatestQuestion from '../../common/components/LatestQuestions';
import { doGraphQLQuery } from '../../API/utilities';
import { ALL_QUESTIONS, ALL_TAGS } from '../../API/queries';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Tag = ({ tags, tag, questions }) => {
  const classes = useStyles();
  return (
    <Layout tags={tags}>
      <Box className={classes.paper}>
        <LatestQuestion questions={questions} tag={tag} />
      </Box>
    </Layout>
  );
};
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const questions = await doGraphQLQuery(ALL_QUESTIONS, { tag: params.tag });
  const tagsResponse = await doGraphQLQuery(ALL_TAGS);
  return {
    props: {
      questions,
      tag: params.tag,
      tags: tagsResponse.getTags,
    },
    revalidate: 60,
  };
};
export default Tag;
