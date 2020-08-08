import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { diffString, diff } from 'json-diff';
import {
  THEME_ACTION,
  ALL_TAGS_ACTION,
  ALL_QUESTIONS_ACTION,
  CURRENT_TAG_ACTION,
  SELECTED_USER_ACTION,
  CURRENT_USER_ACTION,
  SELECTED_QUESTION,
} from './constants';

const reducer = (state = { themeType: 'light', tags: [], questions: [], currentTag: '' }, action) => {
  console.log('Start reducer : ', action, state);
  switch (action.type) {
    case HYDRATE:
      //  console.log('DIFFERENT : ', diff(action.payload, state));
      return {
        ...action.payload,
      };
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
