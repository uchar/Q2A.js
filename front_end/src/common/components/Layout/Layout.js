import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Footer from './Footer';
import TagsList from '../TagsList';
import QuestionItem from '../QuestionItem';

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const Layout = (props) => (
  <div className="Layout" style={layoutStyle}>
    <Header />
    <Box className="Content" style={contentStyle}>
      <Grid direction="row" container>
        <Grid item md={2} xs={12}>
          <Box style={{ marginTop: '25px' }} boxShadow={2}>
            <Grid container>
              <TagsList />
            </Grid>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          {props.children}
        </Grid>
        <Grid item md={2} xs={12}>
          <Box
            boxShadow={2}
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              minHeight: '300px',
              marginTop: '25px',
            }}
          >
            <Typography style={{ fontSize: '17px', paddingTop: '10px' }}>Latest post on blog</Typography>
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '15px',
                paddingBottom: '10px',
              }}
            >
              7khatcode with new UI is here
            </Typography>
            <Divider style={{ padding: '0px 12px 0px 12px' }} />
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              How to traing a capsule network?
            </Typography>
            <Divider />
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              Choose the right framework for your..
            </Typography>
            <Divider />
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              New version of unity is here{' '}
            </Typography>
            <Divider />
          </Box>
          <Box
            boxShadow={2}
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              minHeight: '300px',
              marginTop: '25px',
            }}
          >
            <Typography style={{ fontSize: '17px', paddingTop: '10px' }}>Job Opportunities</Typography>
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '15px',
                paddingBottom: '10px',
              }}
            >
              Senior C++ Developer at Farapardaz
            </Typography>
            <Divider style={{ padding: '0px 12px 0px 12px' }} />
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              Junior Java developer
            </Typography>
            <Divider />
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              Full stack developer
            </Typography>
            <Divider />
            <Typography
              style={{
                textDecorationLine: 'underline',
                fontSize: '12px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              Technical Advisor at fbsaz
            </Typography>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </Box>
    <Footer />
  </div>
);

export default Layout;
