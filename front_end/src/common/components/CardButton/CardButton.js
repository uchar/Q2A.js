import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  viewCourseButton: {
    color: '#ffffff',
    padding: '12px 30px 12px 30px',
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
  const { text, shouldShowLoading, type, onClick, fullWidth, loading } = props;

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async () => {
    return onClick();
  };

  return (
    <div className={classes.wrapper}>
      <Button
        type={type}
        variant="contained"
        color="primary"
        component="span"
        className={classes.viewCourseButton}
        {...props}
        disabled={shouldShowLoading ? loading : ''}
        onClick={shouldShowLoading ? handleButtonClick : onClick}
        fullWidth={fullWidth}
      >
        {shouldShowLoading && loading ? 'Sending' : text}
      </Button>
      {shouldShowLoading ? loading && <CircularProgress size={24} className={classes.buttonProgress} /> : ''}
    </div>
  );
};

const CardButton = (props) => {
  const { text, url, onSubmit, type, fullWidth, shouldShowLoading, loading } = props;

  return (
    <div {...props}>
      {url && url.length > 0 ? (
        <Link href={url}>
          <SButton
            onClick={onSubmit}
            style={{ marginTop: props.buttonTopMargin ? props.buttonTopMargin : '0px' }}
            text={text}
            {...props}
            shouldShowLoading={shouldShowLoading}
            loading={loading}
            fullWidth={fullWidth}
          />
        </Link>
      ) : (
        <SButton
          onClick={onSubmit}
          style={{
            marginTop: props.buttonTopMargin ? props.buttonTopMargin : '0px',
          }}
          {...props}
          text={text}
          shouldShowLoading={shouldShowLoading}
          loading={loading}
          type={type || ''}
          fullWidth={fullWidth}
        />
      )}
    </div>
  );
};

export default CardButton;
