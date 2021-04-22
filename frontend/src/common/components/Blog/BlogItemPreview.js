import React from 'react';
import { Box, CardContent, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { parseContent } from '../../parsers/parser';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from '../Post/PostStatistics';
import HorizontalTagsBlock from '../Tag/HorizontalTagsBlock';
import { DeepMemo, getTagsArray } from '../../utlities/generalUtilities';
import { getLanguage } from '../../utlities/languageUtilities';

const styles = {
  root: {
    margin: (theme) => theme.spacing(5, 0, 5, 0),
    paddingBottom: (theme) => theme.spacing(3),
    textAlign: 'center',
  },
  topSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailSection: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    margin: (theme) => theme.spacing(0, 1, 0, 3),
  },
  tagsSection: {
    margin: (theme) => theme.spacing(1.5, 2, 0.5, 2),
  },
  title: {
    marginTop: (theme)=>theme.spacing(3),
    marginBottom:(theme)=> theme.spacing(0),
    textAlign: 'initial ',
    wordWrap: 'break-word',
    cursor: 'pointer',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
};

const BlogItemPreview = DeepMemo(function ({
  id,
  title,
  content,
  user,
  viewsCount,
  votesCount,
  commentsCount,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  createdAt,
  updatedAt,
}) {
  if (user === null) {
    return <div />;
  }
  const { publicName, profileImage, score } = user;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  let parsedContent = <div />;

  parsedContent = parseContent(content, getLanguage());

  return (
    <Box boxShadow={2} sx={styles.root}>
      <CardContent>
        <Box sx={styles.topSection}>
          <ProfileImageWithName
            href={`/user/${publicName}`}
            profileImage={profileImage}
            createdAt={createdAt}
            publicName={publicName}
            score={score}
          />
          <PostStatistics votesCount={votesCount} viewsCount={viewsCount} answersCount={commentsCount} />
        </Box>
        <Typography color="textPrimary" variant="h1" sx={styles.title}>
          {title}
        </Typography>
      </CardContent>
      <Box sx={styles.detailSection}>{parsedContent}</Box>
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
  commentsCount: PropTypes.number.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  tag3: PropTypes.string,
  tag4: PropTypes.string,
  tag5: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
export default BlogItemPreview;
