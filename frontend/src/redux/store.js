import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
  ALL_BLOG_POSTS_ACTION,
  ALL_QUESTIONS_ACTION,
  ALL_TAGS_ACTION,
  CURRENT_TAG_ACTION,
  CURRENT_USER_ACTION,
  LATEST_QUESTIONS_ACTION,
  MOST_VIEWS_QUESTIONS_ACTION,
  NO_ANSWERS_QUESTIONS_ACTION,
  POPULAR_QUESTIONS_ACTION,
  SELECTED_BLOG_POST_ACTION,
  SELECTED_QUESTION_ACTION,
  SELECTED_USER_ACTION,
  STATISTICS_ACTION,
  THEME_ACTION,
  EDIT_TAG_ACTION,
  ADD_TAG_ACTION,
  INACTIVE_TAG_ACTION,
  ALERT_DIALOG_ACTION,
  ALERT_OPTIONAL_DIALOG_ACTION,
} from './constants';
import { LANGUAGES } from '../common/utlities/languageUtilities';

const reducer = (
  state = {
    currentUser: { language: LANGUAGES.ENGLISH, theme: 'light' },
    tags: [],
    questions: {},
    currentTag: '',
    blogPosts: [],
    operationMode: '',
    alertError: { showError: false, title: '', content: '' },
    optionalDialog: { showError: false, title: '', content: '' },
  },
  action
) => {
  let stateCopy = {};
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
        tags: action.payload.map((item) => {
          return {
            ...item,
            isTagEditMode: false,
          };
        }),
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
    case LATEST_QUESTIONS_ACTION:
      return {
        ...state,
        questions: { ...state.questions, ...{ latestQuestions: action.payload } },
      };
    case POPULAR_QUESTIONS_ACTION:
      return {
        ...state,
        questions: { ...state.questions, ...{ popularQuestions: action.payload } },
      };
    case MOST_VIEWS_QUESTIONS_ACTION:
      return {
        ...state,
        questions: { ...state.questions, ...{ mostViewsQuestions: action.payload } },
      };
    case NO_ANSWERS_QUESTIONS_ACTION:
      return {
        ...state,
        questions: { ...state.questions, ...{ noAnswersQuestions: action.payload } },
      };
    case ALL_BLOG_POSTS_ACTION:
      return {
        ...state,
        blogPosts: action.payload,
      };
    case SELECTED_BLOG_POST_ACTION:
      return {
        ...state,
        selectedBlogPost: action.payload,
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
    case SELECTED_QUESTION_ACTION:
      return {
        ...state,
        selectedQuestion: action.payload,
      };
    case STATISTICS_ACTION:
      return {
        ...state,
        statistics: action.payload,
      };
    case EDIT_TAG_ACTION:
      stateCopy = { ...state };
      for (let i = 0; i < stateCopy.tags.length; i++) {
        if (stateCopy.tags[i].id === action.payload.id) {
          stateCopy.tags[i].operationMode = action.payload.operationMode;
        }
      }
      return stateCopy;
    case ADD_TAG_ACTION:
      stateCopy = { ...state };
      if (action.payload.operationMode !== 'none') {
        stateCopy.tags.unshift({
          id: '0',
          title: '',
          content: '',
          operationMode: action.payload.operationMode,
        });
      }
      return stateCopy;
    case INACTIVE_TAG_ACTION:
      stateCopy = { ...state };
      for (let i = 0; i < stateCopy.tags.length; i++) {
        if (stateCopy.tags[i].id === action.payload.id) {
          stateCopy.tags[i].operationMode = action.payload.operationMode;
        }
      }
      console.log('stateCopy:::', stateCopy);
      return stateCopy;
    case ALERT_DIALOG_ACTION:
      return {
        ...state,
        alertError: action.payload,
      };
    case ALERT_OPTIONAL_DIALOG_ACTION:
      return {
        ...state,
        optionalDialog: action.payload,
      };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
