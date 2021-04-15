/** @jsxRuntime classic */
/** @jsx jsx */
import { IoMdMenu } from 'react-icons/io';
import React, { useContext } from 'react';
import { jsx, Box } from 'theme-ui';
import { Link } from 'react-scroll';
import { DrawerContext } from '../contexts/drawer/drawer-context';
// import close from 'assets/images/icons/close.png';
import Drawer from '../drawerWrapper';
// import Logo from 'components/logo';
import menuItems from './header.data';

const DrawerNav = () => {
  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE',
    });
  }, [dispatch]);
  const styles = {
    handler: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      width: '26px',
      cursor: 'pointer',
      '@media screen and (min-width: 1024px)': {
        display: 'none',
      },
    },
    drawer: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      outline: 0,
    },
    mask: {
      opacity: 0.2,
    },
    close: {
      position: 'absolute',
      top: 35,
      right: 30,
      zIndex: '1',
    },
    closeButton: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 0,
      cursor: 'pointer',
      display: 'flex',
      p: 0,
    },
    wrapper: {
      height: '100%',
      paddingTop: 30,
      width: '100%',
    },
    logo: {
      ml: 30,
      mb: 45,
    },
    navbar: {
      listStyle: 'none',
      m: 0,
      p: 0,
      'li > a': {
        backgroundColor: 'transparent',
        color: 'heading',
        display: 'flex',
        alignItems: 'center',
        minHeight: 44,
        paddingLeft: 30,
        position: 'relative',
        transition: 'all 0.3s ease-in-out 0s',
        '::before': {
          backgroundColor: 'transparent',
          content: `''`,
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          width: 2,
          transition: 'all 0.3s ease-in-out 0s',
        },
      },
      '.active': {
        backgroundColor: '#F8F8F8',
        '::before': {
          backgroundColor: 'primary',
        },
      },
    },
  };

  return (
    <Drawer
      width="340px"
      placement="right"
      drawerHandler={
        <Box sx={styles.handler}>
          <IoMdMenu size="26px" />
        </Box>
      }
      open={state?.isOpen}
      toggleHandler={toggleHandler}
      closeButton={<button sx={styles.closeButton}>{/* <Image src={close} alt="close" /> */}</button>}
      maskStyle={styles.mask}
      drawerStyle={styles.drawer}
      closeBtnStyle={styles.close}
    >
      <Box sx={styles.wrapper}>
        {/* <Logo sx={styles.logo} /> */}
        <Box as="ul" sx={styles.navbar}>
          {menuItems.map(({ path, label }, i) => (
            <Box as="li" key={i}>
              <Link activeClass="active" to={path} spy={true} smooth={true} offset={-70} duration={500}>
                {label}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};
export default DrawerNav;
