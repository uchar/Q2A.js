import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../LandingPage/Layout/Layout';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux } from '../common/utlities/generalUtilities';
import Banner from '../LandingPage/Section/Banner';
import Services from '../LandingPage/Section/Services';
import UltimateFeatures from '../LandingPage/Section/UltimateFeatures';

const useStyles = makeStyles((theme) => ({
  root: {
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
    // backgroundColor: '#ffffff',
    // height: '2000px',
    paddingTop: '80px',
    margin: theme.spacing(0, 15, 0, 15),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 10, 0, 10),
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 5, 0, 5),
    },
  },
}));

function MainPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Banner style={{ marginBottom: '200px', marginTop: '80px' }} />
      <Services />
      <UltimateFeatures style={{ marginTop: '200px' }} />
    </div>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {})
  );

MainPage.getLayout = (page) => <Layout>{page}</Layout>;

export default MainPage;
