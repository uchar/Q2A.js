import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#ffffff',
    padding: '10px 28px 10px 28px',
    fontSize: isMobile ? 15 : 18,
  },
  wrapper: {
    margin: theme.spacing(1),
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
}));
const SButton = (props) => {
  const classes = useStyles();

  const timer = React.useRef();
  const { text, shouldShowLoading, type, onClick, fullWidth, loading, style, className } = props;
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
    shouldShowLoading && loading ? (
      <CircularProgress size={24} className={classes.buttonProgress} />
    ) : (
      <div />
    );
  return (
    <div className={classes.wrapper}>
      <Button
        type={type}
        variant="contained"
        color={'primary'}
        component="span"
        className={clsx(classes.button, className)}
        style={style}
        disabled={shouldShowLoading && loading ? loading : false}
        onClick={shouldShowLoading ? handleButtonClick : onClick}
      >
        {buttonText}
      </Button>
      {loadingComponent}
    </div>
  );
};

// eslint-disable-next-line complexity
const Q2aButton = (props) => {
  const router = useRouter();
  const { text, url, onSubmit, type, fullWidth, shouldShowLoading, loading, style, className } = props;
  return (
    <div>
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
          className={className}
        ></SButton>
      ) : (
        <SButton
          onClick={onSubmit}
          text={text}
          style={style}
          shouldShowLoading={shouldShowLoading}
          loading={loading}
          type={type || ''}
          fullWidth={fullWidth}
          className={className}
        />
      )}
    </div>
  );
};

export default Q2aButton;
