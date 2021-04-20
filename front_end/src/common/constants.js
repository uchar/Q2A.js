import { ALL_BLOG_POSTS_ACTION, ALL_TAGS_ACTION, STATISTICS_ACTION } from '../redux/constants';
import { ALL_BLOG_POSTS, ALL_TAGS, GET_STATISTICS } from '../API/queries';

export const GET_ALL_TAG_DATA = {
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
