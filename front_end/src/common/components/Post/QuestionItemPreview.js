import React from 'react';
import clsx from 'clsx';
import { Box, CardActions, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import { legacyParseContent, replacePTagWithTypoGraphy } from '../../parsers/legacyParser';
import { parseContent } from '../../parsers/parser';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import HorizontalTagsBlock from '../Tag/HorizontalTagsBlock';
import { getTagsArray } from '../../utlities/generalUtilities';

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
  answerSection: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 1, 0, 3),
  },
  tagsSection: {
    margin: theme.spacing(1.5, 0, 0.5, 2),
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
    cursor: 'pointer',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
}));

const checkTagAndAppend = (tags, newTag) => {
  if (newTag) tags.push(newTag);
  return tags;
};

const QuestionItemPreview = ({
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
  isLegacyContent,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(isExpanded === true);
  const { publicName, profileImage, score } = user;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let parsedContent = <div />;

  if (expanded || content.length < 600) {
    parsedContent = isLegacyContent ? legacyParseContent(content, 'textSecondary') : parseContent(content);
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
            href={`/user/[id]`}
            as={`/user/${publicName}`}
            profileImage={profileImage}
            createdAt={createdAt}
            publicName={publicName}
            score={score}
          />
          <PostStatistics votesCount={votesCount} viewsCount={viewsCount} answersCount={answersCount} />
        </div>
        <Link href={`/${id}/${title}`}>
          <Typography color="textPrimary" variant="h1" className={classes.title}>
            {title}
          </Typography>
        </Link>
      </CardContent>
      <div className={classes.answerSection}>
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
};

export default QuestionItemPreview;
