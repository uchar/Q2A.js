import * as React from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BlogItem from '../../common/components/LandingPage/BlogItem';
import Q2aButton from '../../common/components/Q2aButton';

const data = [
  {
    id: 0,
    title: 'Q2A.js V1.0.1 Released',
    description:
      'This security and maintenance release features 26 bug fixes in addition to two security fixes.' +
      ' Because this is a security release, it is recommended that you update your sites immediately.',
    link: '',
  },
  {
    id: 1,
    title: 'Q2A.js V1.0.1 Released',
    description:
      'This security and maintenance release features 26 bug fixes in addition to two security fixes.' +
      ' Because this is a security release, it is recommended that you update your sites immediately.',
    link: '',
  },
  {
    id: 2,
    title: 'Q2A.js V1.0.1 Released',
    description:
      'This security and maintenance release features 26 bug fixes in addition to two security fixes.' +
      ' Because this is a security release, it is recommended that you update your sites immediately.',
    link: '',
  },
  {
    id: 3,
    title: 'Q2A.js V1.0.1 Released',
    description:
      'This security and maintenance release features 26 bug fixes in addition to two security fixes.' +
      ' Because this is a security release, it is recommended that you update your sites immediately.',
    link: '',
  },
  {
    id: 4,
    title: 'Q2A.js V1.0.1 Released',
    description:
      'This security and maintenance release features 26 bug fixes in addition to two security fixes.' +
      ' Because this is a security release, it is recommended that you update your sites immediately.',
    link: '',
  },
  {
    id: 5,
    title: 'Q2A.js V1.0.1 Released',
    description:
      'This security and maintenance release features 26 bug fixes in addition to two security fixes.' +
      ' Because this is a security release, it is recommended that you update your sites immediately.',
    link: '',
  },
];

const styles = {
  root: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: (theme) => theme.spacing(0, 0, 25, 0),
  },
  grid: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: (theme) => theme.spacing(10, 0),
    fontFamily: 'headingSerif',
    fontWeight: 600,
    color: '#000000',
  },
  buttons: {
    fontSize: '18px',
    margin: (theme) => theme.spacing(5, 0, 1, 0),
    padding: (theme) => theme.spacing(1, 6),
  },
};
export default function Blog(props) {
  return (
    <Box sx={{ ...styles.root, ...props.sx }} id="blog">
      <Typography style={{ fontSize: 30 }} sx={styles.title} variant="h1">
        Latest Posts On Blog
      </Typography>
      <Grid spacing={2} sx={styles.grid} container>
        {data?.map((item) => (
          <Grid item key={item.id} md={4} xs={12}>
            <BlogItem key={item.id} data={item} />
          </Grid>
        ))}
      </Grid>
      <Q2aButton
        sx={styles.buttons}
        url={'/blog'}
        shouldShowLoading={false}
        text={'See All'}
        backgroundColor={'secondary'}
      />
    </Box>
  );
}
