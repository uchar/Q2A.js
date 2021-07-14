import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import rtlPlugin from 'stylis-plugin-rtl';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CacheProvider } from '@emotion/react';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import createCache from '@emotion/cache';
import { wrapper } from '../redux/store';
import { darkTheme, lightTheme } from '../common/theme';
import '../common/globalStyles.css';
import { getLanguage, getStrings, updateLanguageBaseOnUrl } from '../common/utlities/languageUtilities';
import 'nprogress/nprogress.css';

// import * as ga from '../analytics/index';
import * as gtag from '../libs/gtag';
import { isLanguageRtl } from '../common/utlities/generalUtilities';

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
const cache = createCache({ key: 'css' });

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
cache.compat = true;

const Q2aApp = (props) => {
  const { Component, pageProps } = props;
  const themeType = useSelector((state) => state.currentUser.theme);
  const router = useRouter();
  updateLanguageBaseOnUrl(router.locale);
  const isRTL = isLanguageRtl(getLanguage());

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <CacheProvider value={isRTL ? cacheRtl : cache}>
      <Head>
        <title>{getStrings().SITE_TITLE}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={themeType === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
};

Q2aApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(Q2aApp);
