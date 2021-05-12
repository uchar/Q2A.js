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

const styles = {
  root: {
    flexGrow: 1,
  },
  grid: { justifyContent: 'center', alignItems: 'center' },
  paper: {
    padding: (theme) => theme.spacing(0, 5),
    textAlign: 'center',
    color: (theme) => theme.palette.text.primary,
  },
  a: {
    textDecoration: 'none',
  },
  gitIcon: {
    margin: (theme) => theme.spacing(0, 5, 0, 0),
  },
  headerParent: { flex: 1 },
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
    color: trigger ? 'secondary' : 'background',
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  ow: PropTypes.func,
};

const Header = ({ listData }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container direction="row" sx={styles.grid}>
                {listData?.map((item) => (
                  <Link key={item.id} href={item.path}>
                    <a style={styles.a}>
                      <Typography sx={styles.paper}>{item.label}</Typography>
                    </a>
                  </Link>
                ))}
              </Grid>
            </Box>
            <Link href="https://github.com/uchar/Q2A.js">
              <a style={styles.a}>
                <GitHubIcon sx={styles.gitIcon} />
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
};
export default Header;
