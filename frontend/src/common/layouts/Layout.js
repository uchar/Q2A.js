import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { BrowserView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Footer from './Footer';
import TagsList from '../components/Tag/TagsList';
import JssStylesProvider from './JssStylesProvider';
import BlogBox from '../components/MainPageColumns/BlogBox';
import Loading from '../components/Loading';
import Navigation from '../components/MainPageColumns/Navigation';
import AlertDialog from '../components/AlertDialog';
import OptionalDialog from '../components/OptionalDialog';

const styles = {
  layoutStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
  contentStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // padding: '20px 2% 0px 0.5%',
    padding: (theme) => theme.spacing(15, 10, 0, 10),
    background: (theme) => theme.palette.background.main,
  },
  tagBox: {
    marginTop: (theme) => theme.spacing(3),
  },
  newsBox: {},
};

const Layout = (props) => {
  const tags = useSelector((state) => state.tags);
  const blogPosts = useSelector((state) => state.blogPosts);
  const alertError = useSelector((state) => state.alertError);
  const { noSideBar } = props;
  if (!tags && !noSideBar) return <Loading />;
  return (
    <JssStylesProvider>
      <Box sx={styles.layoutStyle}>
        <Header />
        <Box sx={styles.contentStyle}>
          {alertError.showError && <AlertDialog alertError={alertError} />}
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={2} xs={12}>
              {!noSideBar && <Navigation />}
            </Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} xs={12}>
              {!noSideBar && (
                <Box>
                  <BlogBox sx={styles.newsBox} blogPosts={blogPosts} />
                  <Box sx={styles.tagBox} boxShadow={2}>
                    <BrowserView>
                      <TagsList tags={tags} />
                    </BrowserView>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </JssStylesProvider>
  );
};

Layout.defaultProps = {
  noSideBar: false,
};
Layout.propTypes = {
  children: PropTypes.object.isRequired,
  noSideBar: PropTypes.bool.isRequired,
};
export default Layout;
