import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Layout from '../../../common/layouts/Layout';
import LatestQuestion from '../../../common/components/Post/LatestQuestions';
import { doGraphQLQuery } from '../../../API/utilities';
import { ALL_QUESTIONS, ALL_TAGS, GET_USER } from '../../../API/queries';
import { wrapper } from '../../../redux/store';
import {
  ALL_QUESTIONS_ACTION,
  ALL_TAGS_ACTION,
  CURRENT_TAG_ACTION,
  SELECTED_USER_ACTION,
} from '../../../redux/constants';
import { addRevalidateAndRedux } from '../../../common/utlities/generalUtilities';
import MainPage from '../../index';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Tag = () => {
  const classes = useStyles();
  const tag = useSelector((state) => state.currentTag);
  const questions = useSelector((state) => state.questions);
  return (
    <Box className={classes.paper}>
      <LatestQuestion questions={questions} tag={tag} />
    </Box>
  );
};
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      const { tag } = props.params;
      const questionsResponse = await doGraphQLQuery(ALL_QUESTIONS, { tag });
      const tagsResponse = await doGraphQLQuery(ALL_TAGS, { limit: 50, offset: 0 });
      store.dispatch({ type: ALL_QUESTIONS_ACTION, payload: questionsResponse });
      store.dispatch({ type: ALL_TAGS_ACTION, payload: tagsResponse.getTags });
      store.dispatch({ type: CURRENT_TAG_ACTION, payload: tag });
    })
  );

Tag.getLayout = (page) => <Layout>{page}</Layout>;

export default Tag;
