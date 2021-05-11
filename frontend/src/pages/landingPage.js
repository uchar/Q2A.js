import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Layout from '../LandingPage/Layout/Layout';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux } from '../common/utlities/generalUtilities';
import Home from '../LandingPage/Section/Home';
import Features from '../LandingPage/Section/Features';
import Blog from '../LandingPage/Section/Blog';
import Download from '../LandingPage/Section/Download';
import ForumCarousel from '../common/components/LandingPage/ForumCarousel';

const styles = {
  root: {
    backgroundColor: (theme) => theme.palette.background.main,
  },
  innerBox: {
    padding: (theme) => theme.spacing(5, 15, 0, 15),
    [(theme) => theme.breakpoints.down('md')]: {
      margin: (theme) => theme.spacing(0, 10, 0, 10),
    },
    [(theme) => theme.breakpoints.down('sm')]: {
      margin: (theme) => theme.spacing(0, 5, 0, 5),
    },
  },
  section: {
    margin: (theme) => theme.spacing(20, 0, 0, 0),
  },
};
// create theme.breakpoint
function MainPage() {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.innerBox}>
        <Home sx={styles.section} />
        <Features sx={styles.section} />
        <ForumCarousel sx={styles.section} />
        <Download sx={styles.section} />
        <Blog sx={styles.section} />
      </Box>
    </Box>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {})
  );

MainPage.getLayout = (page) => <Layout>{page}</Layout>;

export default MainPage;
