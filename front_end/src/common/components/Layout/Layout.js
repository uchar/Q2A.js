import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';
import Header from './Header';
import Footer from './Footer';
import TagsList from '../TagsList';
import RTL from './RTL';
import News from '../News';
import { ALL_QUESTIONS, ALL_TAGS } from '../../../API/queries';
import { withApollo } from '../../../libs/apollo';

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
  const { loading, error, data } = useQuery(ALL_TAGS);
  if (error) {
    console.error(error);
    return <h1>Error</h1>;
  }
  if (loading) return <h1>Loading...</h1>;
  const { tags } = data;
  return (
    <RTL>
      <div className="Layout" style={layoutStyle} dir="rtl">
        <Header />
        <Box className="Content" style={contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={2} xs={12}>
              <News />
            </Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} xs={12}>
              <Box style={{ marginTop: '25px' }} boxShadow={2}>
                <Grid container>
                  <TagsList tags={tags} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </RTL>
  );
};

export default withApollo({ ssr: true })(Layout);
