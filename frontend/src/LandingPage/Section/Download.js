import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InstallQ2AAccordion from '../../common/components/LandingPage/InstallQ2AAccordion';

const styles = {
  root: {
    padding: (theme) => theme.spacing(2),
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    maxWidth: 660,
    margin: '64px auto 10px',
    fontWeight: 600,
    fontSize: '40px',
    lineHeight: 1.33,
    color: '#000000',
  },
  description: {
    textAlign: 'center',
    margin: '0 auto',
    justifyContent: 'center',
    maxWidth: 990,
    fontSize: '20px',
    lineHeight: 1.87,
    color: '#000000',
  },
  accordion: {
    width: '80%',
    marginLeft: '10%',
  },
};
const headerDownloadSection = {
  title: 'How to use Q2A ?',
  description: 'You are only 5 mines away from your own question/answer site',
};

export default function Download(props) {
  return (
    <Box sx={{ ...styles.root, ...props.sx }} id="download">
      <Typography variant="h1" sx={styles.title}>
        {headerDownloadSection.title}
      </Typography>
      <Typography variant="h3" sx={styles.description}>
        {headerDownloadSection.description}
      </Typography>
      <InstallQ2AAccordion sx={styles.accordion} />
    </Box>
  );
}
