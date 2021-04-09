import React from 'react';
import clsx from 'clsx';
import { Box, CardActions, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import { parseContent, replacePTagWithTypoGraphy } from '../../parsers/parser';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import HorizontalTagsBlock from '../Tag/HorizontalTagsBlock';
import { DeepMemo, getTagsArray } from '../../utlities/generalUtilities';
import { getLanguage } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0, 5, 0),
    paddingBottom: theme.spacing(3),
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
    margin: theme.spacing(0, 1, 0, 3),
  },
  tagsSection: {
    margin: theme.spacing(1.5, 2, 0.5, 2),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    textAlign: 'initial ',
    wordWrap: 'break-word',
    cursor: 'pointer',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
}));

const QuestionItemPreview = DeepMemo(function ({
  id,
  title,
  content,
  user,
  createdAt,
  viewsCount,
  votesCount,
  answersCount,
  isExpanded,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(isExpanded === true);
  if (user === null) {
    return <div></div>;
  }
  const { publicName, profileImage, score } = user;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let parsedContent = <div />;

  if (expanded || content.length < 600) {
    parsedContent = parseContent(content, getLanguage());
  } else {
    parsedContent = (
      <div style={{ marginTop: '5px' }}>
        {replacePTagWithTypoGraphy(`${content.substring(0, 600)}...`, 'textSecondary')}
      </div>
    );
  }
  return (
    <Box boxShadow={2} className={classes.root}>
      <CardContent>
        <div className={classes.topSection}>
          <ProfileImageWithName
            href={`/user/${publicName}`}
            profileImage={profileImage}
            createdAt={createdAt}
            publicName={publicName}
            score={score}
          />
          <PostStatistics votesCount={votesCount} viewsCount={viewsCount} answersCount={answersCount} />
        </div>
        <Link href={`/${id}/${encodeURIComponent(title)}`}>
          <Typography color="textPrimary" variant="h1" className={classes.title}>
            {title}
          </Typography>
        </Link>
      </CardContent>
      <div className={classes.detailSection}>
        {parsedContent}
        <CardActions disableSpacing>
          {content.length >= 400 && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </CardActions>
      </div>

      <HorizontalTagsBlock className={classes.tagsSection} tags={tags} />
    </Box>
  );
});

export default QuestionItemPreview;
