import React from 'react';
import clsx from 'clsx';
import { Box, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseContent } from '../../parsers/parser';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import HorizontalTagsBlock from '../Tag/HorizontalTagsBlock';
import { DeepMemo, getTagsArray } from '../../utlities/generalUtilities';
import { getLanguage } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 2, 0),
    paddingBottom: theme.spacing(3),
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
    marginTop: theme.spacing(4),
  },
  tagsSection: {
    margin: theme.spacing(0, 2, 0, 2),
  },
  expand: {
    width: '1em',
    height: '1em',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    paddingBottom: theme.spacing(1),
  },
  title: {
    paddingTop: theme.spacing(1.5),
    textAlign: 'initial ',
    wordWrap: 'break-word',
    color: '#3f51b5',
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
    return <div />;
  }
  const { publicName, profileImage, score } = user;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let parsedContent = <div />;

  if (expanded) {
    parsedContent = parseContent(content, getLanguage());
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
        <div className={classes.titleSection}>
          <Link href={`/${id}/${encodeURIComponent(title)}`}>
            <Typography color="textPrimary" variant="h1" className={classes.title}>
              {title}
            </Typography>
          </Link>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardContent>
      <div className={classes.content}>{parsedContent}</div>
      <HorizontalTagsBlock className={classes.tagsSection} tags={tags} />
    </Box>
  );
});
QuestionItemPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  viewsCount: PropTypes.number.isRequired,
  votesCount: PropTypes.number.isRequired,
  answersCount: PropTypes.number.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  tag3: PropTypes.string,
  tag4: PropTypes.string,
  tag5: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
};
export default QuestionItemPreview;
