import React from 'react';
import { Box, CardContent, Grid, makeStyles } from '@material-ui/core';
import { legacyParseContent } from '../../parsers/legacyParser';
import { parseContent } from '../../parsers/parser';
import CommentsSection from './CommentsSection';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function AnswerItem({ id, content, user, createdAt, votesCount, comments, isLegacyContent }) {
  const classes = useStyles();
  const { publicName, profileImage } = user;

  return (
    <Box boxShadow={4} className={classes.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <ProfileImageWithName
            href={`/user/[id]`}
            as={`/user/${publicName}`}
            profileImage={profileImage}
            createdAt={createdAt}
            publicName={publicName}
          />
          <PostStatistics votesCount={votesCount} />
        </Grid>
      </CardContent>
      {isLegacyContent ? legacyParseContent(content) : parseContent(content)}
      <CommentsSection comments={comments} />
    </Box>
  );
}
