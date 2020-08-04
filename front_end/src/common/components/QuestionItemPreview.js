import React from 'react';
import clsx from 'clsx';
import { Box, CardActions, CardContent, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import Tag from './Tag';
import { legacyParseContent, replacePTagWithTypoGraphy } from '../parsers/legacyParser';
import { parseContent } from '../parsers/parser';
import ProfileImage from './ProfileImage';
import { getLanguage, getStrings } from '../utlities/languageUtilities';
import { timeAgo } from '../utlities/generalUtilities';
import ProfileImageWithName from './ProfileImageWithName';
import QuestionStatistics from './QuestionStatistics';
import HorizontalTagsBlock from './HorizontalTagsBlock';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0, 5, 0),
    paddingBottom: '15px',
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
    margin: theme.spacing(4, 0, 1, 2),
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
    marginTop: theme.spacing(6),
    marginBottom: '-15px',
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
  const { publicName, profileImage } = user;
  let tags = [];
  tags = checkTagAndAppend(tags, tag1);
  tags = checkTagAndAppend(tags, tag2);
  tags = checkTagAndAppend(tags, tag3);
  tags = checkTagAndAppend(tags, tag4);
  tags = checkTagAndAppend(tags, tag5);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let parsedContent = <div />;

  if (expanded || content.length < 400) {
    parsedContent = isLegacyContent ? legacyParseContent(content, 'textSecondary') : parseContent(content);
  } else {
    parsedContent = (
      <div style={{ marginTop: '25px' }}>
        {replacePTagWithTypoGraphy(`${content.substring(0, 400)}...`, 'textSecondary')}
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
          />
          <QuestionStatistics votesCount={votesCount} viewsCount={viewsCount} answersCount={answersCount} />
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
