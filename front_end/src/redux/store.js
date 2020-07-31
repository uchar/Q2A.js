import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { CLIENT_SIDE_THEME_ACTION, SERVER_SIDE_TAGS_ACTION } from './constants';

// create your reducer
const reducer = (state = { client: { themeType: 'light' }, server: { tags: [] } }, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload.server,
        },
      };
    case CLIENT_SIDE_THEME_ACTION:
      return {
        ...state,
        client: {
          ...state.client,
          themeType: action.payload,
        },
      };
    case SERVER_SIDE_TAGS_ACTION:
      return {
        ...state,
        server: {
          ...state.client,
          tags: action.payload,
        },
      };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
