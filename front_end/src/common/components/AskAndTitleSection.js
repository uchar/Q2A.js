import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Q2aButton from './Q2aButton';
import { getStrings } from '../utlities/languageUtilities';
import { DeepMemo } from '../utlities/generalUtilities';

const styles = {
  root: {
    display: 'flex',
    flex: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: (theme) => theme.spacing(6),
    fontSize: '22px',
    fontWeight: '700',
  },
};

const AskAndTitleSection = DeepMemo(function AskAndTitleSection({ sx, title }) {
  return (
    <Box sx={{ ...sx, ...styles.root }}>
      <Typography sx={styles.title} variant="h1">
        {title}
      </Typography>
      <Q2aButton url={'/ask'} shouldShowLoading={false} text={getStrings().ASK_QUESTION_BUTTON} />
    </Box>
  );
});
AskAndTitleSection.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default AskAndTitleSection;
