import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Layout from './Layout';

const paper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '7px 7px 0 0',
  justify: 'center',
};

const form = {
  width: '100%',
  marginTop: '1px',
  padding: '20px 50px 40px 50px',
};

const LoginLayout = (props) => (
  <Layout>
    <Grid container justify="center" alignItems={'center'} style={{ margin: '70px 0px 110px 0px' }}>
      <Grid item xs={0} sm={3} />
      <Grid item xs={12} sm={6}>
        <Box boxShadow={3} style={paper}>
          <div
            style={{
              backgroundColor: '#19B5FE',
              width: '100%',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              component="h4"
              variant="h4"
              style={{ color: '#ffffff', paddingBottom: '3.5rem', marginTop: '3.5rem' }}
            >
              {props.pageTitle}
            </Typography>
          </div>

          <div className="Content" style={form}>
            {props.children}
          </div>
        </Box>
      </Grid>
      <Grid item xs={0} sm={3} />
    </Grid>
  </Layout>
);
export default LoginLayout;
