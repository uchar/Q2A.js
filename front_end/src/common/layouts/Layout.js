import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header/Header';
import Footer from './Footer';
import TagsList from '../components/Tag/TagsList';
import JssStylesProvider from './JssStylesProvider';
import News from '../components/MainPageColumns/News';
import Loading from '../components/Loading';
import Navigation from '../components/MainPageColumns/Navigation';

const useStyles = makeStyles((theme) => ({
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
    padding: '0px 2% 0px 0.5%',
  },
  tagBox: {
    marginTop: theme.spacing(3),
  },
  newsBox: {},
}));

const Layout = (props) => {
  const classes = useStyles();

  const tags = useSelector((state) => state.tags);
  const blogPosts = useSelector((state) => state.blogPosts);
  const { noSideBar } = props;
  if (!tags && !noSideBar) return <Loading />;
  return (
    <JssStylesProvider>
      <div className={classes.layoutStyle}>
        <Header />
        <Box className={classes.contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={2} xs={12}>
              {!noSideBar && <Navigation></Navigation>}
            </Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} xs={12}>
              {!noSideBar && (
                <div>
                  <News className={classes.newsBox} blogPosts={blogPosts} />
                  <Box className={classes.tagBox} boxShadow={2}>
                    <Grid container>
                      <BrowserView>
                        <TagsList tags={tags} />
                      </BrowserView>
                    </Grid>
                  </Box>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </JssStylesProvider>
  );
};

Layout.defaultProps = {
  noSideBar: false,
};

export default Layout;
