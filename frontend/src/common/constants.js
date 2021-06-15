import {
  ALL_BLOG_POSTS_ACTION,
  ALL_QUESTIONS_ACTION,
  ALL_TAGS_ACTION,
  LATEST_QUESTIONS_ACTION,
  MOST_VIEWS_QUESTIONS_ACTION,
  NO_ANSWERS_QUESTIONS_ACTION,
  POPULAR_QUESTIONS_ACTION,
  SELECTED_BLOG_POST_ACTION,
  SELECTED_QUESTION_ACTION,
  SELECTED_USER_ACTION,
  STATISTICS_ACTION,
  SEO_TAG_ACTION,
} from '../redux/constants';
import {
  ALL_BLOG_POSTS,
  ALL_TAGS,
  GET_ALL_QUESTIONS,
  GET_BLOG_POST,
  GET_LATEST_QUESTIONS,
  GET_MOST_VIEW_QUESTIONS,
  GET_NO_ANSWERS_QUESTIONS,
  GET_POPULAR_QUESTIONS,
  GET_QUESTION,
  GET_STATISTICS,
  GET_USER,
  GET_SEO_TAG,
} from '../API/queries';

export const GET_ALL_TAGS_DATA = {
  gql: ALL_TAGS,
  reduxAction: ALL_TAGS_ACTION,
  responseName: 'getTags',
};

export const GET_ALL_BLOG_POSTS_DATA = {
  gql: ALL_BLOG_POSTS,
  reduxAction: ALL_BLOG_POSTS_ACTION,
  responseName: 'getBlogPosts',
};

export const GET_STATISTICS_DATA = {
  gql: GET_STATISTICS,
  reduxAction: STATISTICS_ACTION,
  responseName: 'getStatistics',
};
export const ALL_BLOG_POSTS_DATA = {
  gql: ALL_BLOG_POSTS,
  reduxAction: ALL_BLOG_POSTS_ACTION,
  responseName: 'getBlogPosts',
};
export const SELECTED_BLOG_POST_DATA = {
  gql: GET_BLOG_POST,
  reduxAction: SELECTED_BLOG_POST_ACTION,
  responseName: 'getBlogPost',
};
export const ALL_QUESTIONS_DATA = {
  gql: GET_ALL_QUESTIONS,
  reduxAction: ALL_QUESTIONS_ACTION,
  responseName: null,
};

export const LATEST_QUESTIONS_DATA = {
  gql: GET_LATEST_QUESTIONS,
  reduxAction: LATEST_QUESTIONS_ACTION,
  responseName: 'latestQuestions',
};
export const MOST_VIEWS_QUESTIONS_DATA = {
  gql: GET_MOST_VIEW_QUESTIONS,
  reduxAction: MOST_VIEWS_QUESTIONS_ACTION,
  responseName: 'mostViewsQuestions',
};
export const POPULAR_QUESTIONS_DATA = {
  gql: GET_POPULAR_QUESTIONS,
  reduxAction: POPULAR_QUESTIONS_ACTION,
  responseName: 'popularQuestions',
};
export const NO_ANSWERS_QUESTIONS_DATA = {
  gql: GET_NO_ANSWERS_QUESTIONS,
  reduxAction: NO_ANSWERS_QUESTIONS_ACTION,
  responseName: 'noAnswersQuestions',
};

export const SELECTED_QUESTION_QUESTIONS_DATA = {
  gql: GET_QUESTION,
  reduxAction: SELECTED_QUESTION_ACTION,
  responseName: 'getQuestion',
};
export const GET_USER_DATA = {
  gql: GET_USER,
  reduxAction: SELECTED_USER_ACTION,
  responseName: 'getUser',
};

export const GET_SEO_TAG_DATA = {
  gql: GET_SEO_TAG,
  reduxAction: SEO_TAG_ACTION,
  responseName: 'getSeoTag',
};
