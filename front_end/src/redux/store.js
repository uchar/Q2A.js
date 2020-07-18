import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// create your reducer
const reducer = (state = { client: { themeType: 'dark' } }, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload.server,
        },
      };
    case 'CLIENT_SIDE_THEME_TYPE':
      return {
        ...state,
        client: {
          ...state.client,
          themeType: action.payload,
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
