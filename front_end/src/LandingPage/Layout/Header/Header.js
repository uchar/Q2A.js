import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: (theme) => theme.spacing(5),
    textAlign: 'center',
    color: (theme) => theme.palette.text.primary,
  },
  a: {
    textDecoration: 'none',
  },
};

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'secondary' : 'primary',
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  ow: PropTypes.func,
};

export default function Header() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container direction="row" sx={styles.grid}>
                <Link href="#home">
                  <a style={styles.a}>
                    <Typography sx={styles.paper}>Home</Typography>
                  </a>
                </Link>

                <Link href="#services">
                  <a style={styles.a}>
                    <Typography sx={styles.paper}>Services</Typography>
                  </a>
                </Link>

                <Link href="#features">
                  <a style={styles.a}>
                    <Typography sx={styles.paper}>Feature</Typography>
                  </a>
                </Link>
                <Link href="#download">
                  <a style={styles.a}>
                    <Typography sx={styles.paper}>Download</Typography>
                  </a>
                </Link>
                <Link href="#">
                  <a style={styles.a}>
                    <Typography sx={styles.paper}>Blog</Typography>
                  </a>
                </Link>
              </Grid>
            </Box>
            <Link href="https://github.com/uchar/Q2A.js">
              <a style={styles.a}>
                <GitHubIcon />
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
