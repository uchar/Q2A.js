import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../LandingPage/Layout/Layout';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux } from '../common/utlities/generalUtilities';
import Banner from '../LandingPage/Section/Banner';
import Services from '../LandingPage/Section/Services';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MainPage() {
  return (
    <div style={{ height: '2000px' }}>
      <Banner />
      <Services />
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
