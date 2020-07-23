import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { BrowserView, MobileView } from 'react-device-detect';
import Header from './Header';
import Footer from './Footer';
import TagsList from '../TagsList';
import RTL from './RTL';
import News from '../News';
import Loading from '../Loading';

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

const Layout = (props) => {
  const { tags, noSideBar } = props;
  if (!tags && !noSideBar) return <Loading />;
  return (
    <RTL>
      <div className="Layout" style={layoutStyle} dir="rtl">
        <Header />
        <Box className="Content" style={contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={2} xs={12}>
              {!noSideBar && (
                <BrowserView>
                  <News />
                </BrowserView>
              )}
            </Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} xs={12}>
              {!noSideBar && (
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
              )}
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </RTL>
  );
};

Layout.defaultProps = {
  noSideBar: false,
};

export default Layout;
