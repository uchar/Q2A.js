import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseContent } from '../../parsers/parser';
import { getLanguage } from '../../utlities/languageUtilities';

const styles = {
  root: {
    margin:(theme)=> theme.spacing(1, 2, 1, 0),
    flex: 1,
    textAlign: 'right',
    flexDirection: 'row',
    display: 'flex',
  },
  name: {
    textDecorationLine: 'underline',
    cursor: 'pointer',
    color: '#ff00ee',
    fontSize: '10px',
    margin: (theme)=>theme.spacing(2, 0, 2, 0),
  },
};

export default function CommentItem({ content, user }) {
  const { publicName } = user;

  const parsedContent = parseContent(content, getLanguage(), { fontSize: '12px' });
  return (
    <div sx={styles.root}>
      <div> {parsedContent}</div>
      <Link prefetch={false} href={`/user/${publicName}`}>
        <Typography variant="button" sx={styles.name}>
          {publicName}
        </Typography>
      </Link>
    </div>
  );
}
CommentItem.propTypes = {
  content: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};
