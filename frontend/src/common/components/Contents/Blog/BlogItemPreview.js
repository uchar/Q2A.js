import React from 'react';
import { Box, CardContent, IconButton, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseContent } from '../../../parsers/parser';
import ProfileImageWithName from '../../ProfileImageWithName';
import StatisticsSection from '../StatisticsSection';
import HorizontalTagsBlock from '../../Tag/HorizontalTagsBlock';
import { DeepMemo, getTagsArray } from '../../../utlities/generalUtilities';
import { getLanguage } from '../../../utlities/languageUtilities';

const styles = {
  root: {
    margin: (theme) => theme.spacing(1, 0, 2, 0),
    paddingBottom: (theme) => theme.spacing(3),
    textAlign: 'center',
  },
  topSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleSection: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: (theme) => theme.spacing(4),
  },
  tagsSection: {
    margin: (theme) => theme.spacing(0, 2, 0, 2),
  },
  expand: {
    width: '1em',
    height: '1em',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: (theme) =>
      theme.transitions.create('transform', {
        duration: 100,
      }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    paddingBottom: (theme) => theme.spacing(1),
  },
  title: {
    paddingTop: (theme) => theme.spacing(1.5),
    textAlign: 'initial ',
    wordWrap: 'break-word',
    cursor: 'pointer',
    // color: theme.palette.questionTitles,
    '&:hover': {
      color: '#2d4bbe',
      textDecorationLine: 'underline',
    },
  },
};

const BlogItemPreview = DeepMemo(function ({
  id,
  title,
  content,
  user,
  createdAt,
  viewsCount,
  votesCount,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  active,
}) {
  if (user === null) {
    return <div />;
  }
  const { publicName, profileImage, score } = user;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  const parsedContent = parseContent(content, getLanguage());
  return (
    <Box bgcolor={active ? 'default' : 'text.disabled'} boxShadow={2} sx={styles.root}>
      <CardContent>
        <Box sx={styles.topSection}>
          <ProfileImageWithName
            href={`/user/${publicName}`}
            profileImage={profileImage}
            createdAt={createdAt}
            publicName={publicName}
            score={score}
          />
          <StatisticsSection votesCount={votesCount} viewsCount={viewsCount} />
        </Box>
        <Box sx={styles.titleSection}>
          <Link href={`/blog/${id}/${encodeURIComponent(title)}`}>
            <Typography color="textPrimary" variant="h1" sx={styles.title}>
              {title}
            </Typography>
          </Link>
        </Box>
      </CardContent>
      <Box sx={styles.content}>{parsedContent}</Box>
      <HorizontalTagsBlock sx={styles.tagsSection} tags={tags} />
    </Box>
  );
});
BlogItemPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  viewsCount: PropTypes.number.isRequired,
  votesCount: PropTypes.number.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  tag3: PropTypes.string,
  tag4: PropTypes.string,
  tag5: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
export default BlogItemPreview;
