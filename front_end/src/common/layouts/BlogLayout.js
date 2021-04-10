import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { BrowserView, MobileView } from 'react-device-detect';
import Header from './Header/Header';
import Footer from './Footer';
import JssStylesProvider from './JssStylesProvider';
import Expansion from '../components/Expansion';
import TagsList from '../components/Tag/TagsList';
import News from '../components/News';
import {useSelector} from "react-redux";

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 2% 0px 2%',
};

const BlogLayout = (props) => {
  const tags = useSelector((state) => state.tags);
  return (
    <JssStylesProvider>
      <div style={layoutStyle}>
        <Header />
        <Box style={contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={10} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} display={{ xs: 'none' }} style={{ marginTop: '25px' }}>
              <div>
                <Box style={{ marginTop: '25px' }} boxShadow={2}>
                  <Grid container>
                    <BrowserView>
                      <TagsList tags={tags} />
                    </BrowserView>
                  </Grid>
                </Box>
                <MobileView>
                  <News />
                </MobileView>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </JssStylesProvider>
  );
};

export default BlogLayout;
