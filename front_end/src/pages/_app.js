import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import { wrapper } from '../redux/store';
import { darkTheme, lightTheme } from '../common/theme';
import '../common/globalStyles.css';
import { updateLanguageBaseOnUrl, getStrings } from '../common/utlities/languageUtilities';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export function reportWebVitals(metric) {
  console.log(metric);
}

const Q2aApp = (props) => {
  const { Component, pageProps } = props;
  const themeType = useSelector((state) => state.currentUser.theme);
  const router = useRouter();
  updateLanguageBaseOnUrl(router.locale);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <React.Fragment>
      <Head>
        <title>{getStrings().SITE_TITLE}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={themeType === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </React.Fragment>
  );
};

Q2aApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(Q2aApp);
