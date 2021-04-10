import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
  THEME_ACTION,
  ALL_TAGS_ACTION,
  ALL_QUESTIONS_ACTION,
  CURRENT_TAG_ACTION,
  SELECTED_USER_ACTION,
  CURRENT_USER_ACTION,
  SELECTED_QUESTION,
  ALL_BLOG_POSTS_ACTION,
} from './constants';
import { LANGUAGES } from '../common/utlities/languageUtilities';

const reducer = (
  state = {
    currentUser: { language: LANGUAGES.ENGLISH, theme: 'light' },
    tags: [],
    questions: [],
    currentTag: '',
  },
  action
) => {
  switch (action.type) {
    // Merge state of server with client
    case HYDRATE:
      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...action.payload,
      };
      if (state.currentUser.id) {
        newState.currentUser = state.currentUser;
      } else {
        newState.currentUser = false;
      }

      return newState;
    case THEME_ACTION:
      return {
        ...state,
        themeType: action.payload,
      };
    case ALL_TAGS_ACTION:
      return {
        ...state,
        tags: action.payload,
      };
    case CURRENT_TAG_ACTION:
      return {
        ...state,
        currentTag: action.payload,
      };
    case ALL_QUESTIONS_ACTION:
      return {
        ...state,
        questions: action.payload,
      };
    case ALL_BLOG_POSTS_ACTION:
      return {
        ...state,
        blogPosts: action.payload,
      };
    case SELECTED_USER_ACTION:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case CURRENT_USER_ACTION:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: action.payload,
      };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
