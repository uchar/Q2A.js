import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { BrowserView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Footer from './Footer';
import JssStylesProvider from './JssStylesProvider';
import TagsList from '../components/Tag/TagsList';
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
const BlogLayout = (props) => {
  const classes = useStyles();

  const tags = useSelector((state) => state.tags);
  return (
    <JssStylesProvider>
      <div className={classes.layoutStyle}>
        <Header />
        <Box className={classes.contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={2} xs={12}>
              {<Navigation></Navigation>}
            </Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} display={{ xs: 'none' }}>
              <div>
                <Box className={classes.tagBox} boxShadow={2}>
                  <Grid container>
                    <BrowserView>
                      <TagsList tags={tags} />
                    </BrowserView>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </JssStylesProvider>
  );
};
BlogLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default BlogLayout;
