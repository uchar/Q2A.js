import React from 'react';
import { Box } from '@material-ui/core';
import Layout from '../LandingPage/Layout/Layout';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux } from '../common/utlities/generalUtilities';
import Banner from '../LandingPage/Section/Banner';
import Services from '../LandingPage/Section/Services';
import UltimateFeatures from '../LandingPage/Section/UltimateFeatures';
import Download from '../LandingPage/Section/Download';

const styles = {
  root: {
    margin: (theme) => theme.spacing(10, 15, 0, 15),
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
      <Banner sx={styles.section} />
      <Services sx={styles.section} />
      <Download sx={styles.section} />
      <UltimateFeatures sx={styles.section} />
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
