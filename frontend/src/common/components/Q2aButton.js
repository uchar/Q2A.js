import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';

const styles = {
  button: {
    color: '#ffffff',
    padding: '10px 28px 10px 28px',
    fontSize: isMobile ? 15 : 18,
  },
  wrapper: {
    margin: (theme) => theme.spacing(1),
    position: 'relative',
  },
  buttonSucecss: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};
// eslint-disable-next-line complexity
const SButton = ({ text, shouldShowLoading, type, onClick, loading, style, sx }) => {
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async () => {
    return onClick();
  };
  const buttonText = shouldShowLoading && loading ? 'Sending' : text;

  const loadingComponent =
    shouldShowLoading && loading ? <CircularProgress size={24} style={styles.buttonProgress} /> : <div />;
  return (
    <Box sx={styles.wrapper}>
      <Button
        type={type}
        variant="contained"
        color={'primary'}
        component="span"
        sx={{ ...styles.button, ...sx }}
        style={style}
        disabled={shouldShowLoading && loading ? loading : false}
        onClick={shouldShowLoading ? handleButtonClick : onClick}
      >
        {buttonText}
      </Button>
      {loadingComponent}
    </Box>
  );
};

// eslint-disable-next-line complexity
const Q2aButton = (props) => {
  const router = useRouter();
  const { text, url, onSubmit, type, fullWidth, shouldShowLoading, loading, style, sx } = props;
  return (
    <Box>
      {url && url.length > 0 ? (
        <SButton
          onClick={async () => {
            return router.push(url);
          }}
          style={style}
          text={text}
          shouldShowLoading={shouldShowLoading}
          loading={loading}
          fullWidth={fullWidth}
          sx={sx}
        />
      ) : (
        <SButton
          onClick={onSubmit}
          text={text}
          style={style}
          shouldShowLoading={shouldShowLoading}
          loading={loading}
          type={type || ''}
          fullWidth={fullWidth}
          sx={sx}
        />
      )}
    </Box>
  );
};

export default Q2aButton;
