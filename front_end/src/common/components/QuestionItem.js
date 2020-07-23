import React from 'react';
import clsx from 'clsx';
import {
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Grid,
  makeStyles,
  Divider,
} from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import Tag from './Tag';
import { getStrings, parseContent, replacePTagWithTypoGraphy } from '../utilities';
import CommentItem from './CommentItem';
import ProfileImage from './ProfileImage';
import Layout from './Layout/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px 0px 25px 0px',
    paddingBottom: '15px',
    textAlign: 'center',
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
  avatar: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    marginRight: '5px',
    cursor: 'pointer',
  },
}));

const checkTagAndAppend = (tags, newTag) => {
  if (newTag) tags.push(newTag);
  return tags;
};

const QuestionItem = ({
  id,
  title,
  content,
  user,
  createdAt,
  prefetch,
  viewsCount,
  votesCount,
  answersCount,
  comments,
  isExpanded,
  isMainPage,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
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

  return (
    <Box boxShadow={2} className={classes.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Box>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Link prefetch={false} href={`/user/[id]`} as={`/user/${publicName}`}>
                <ProfileImage profileImage={profileImage} />
              </Link>
              <Link prefetch={false} href={`/user/[id]`} as={`/user/${publicName}`}>
                <div>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    style={{ cursor: 'pointer', fontSize: 17, textAlign: 'right', marginRight: '15px' }}
                    component="p"
                  >
                    {publicName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ fontSize: 12, marginRight: '12px' }}
                    component="p"
                  >
                    {getStrings().DEMO_TIME_AGO}
                  </Typography>
                </div>
              </Link>
            </Grid>
          </Box>
          <Box>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <ViewIcon />
                </IconButton>
                <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                  {votesCount}
                </Typography>
              </div>
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <UpVoteIcon />
                </IconButton>
                <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                  {viewsCount}
                </Typography>
              </div>
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <AnswerIcon />
                </IconButton>
                <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                  {answersCount}
                </Typography>
              </div>
            </Grid>
          </Box>
        </Grid>

        <Link href={`/${id}/${title}`}>
          <Typography
            variant="body2"
            color="textPrimary"
            style={{
              fontSize: 21,
              marginTop: '30px',
              marginBottom: '-15px',
              textAlign: 'initial ',
              cursor: 'pointer',
            }}
            component="p"
          >
            {title}
          </Typography>
        </Link>
      </CardContent>
      <div
        style={{
          flex: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0px 15px 0px 5px',
        }}
      >
        {(expanded || content.length < 400) &&
          parseContent(content, isMainPage ? 'textSecondary' : 'textPrimary')}

        {!expanded && content.length >= 400 && (
          <div style={{ marginTop: '25px' }}>
            {replacePTagWithTypoGraphy(
              `${content.substring(0, 400)}...`,
              isMainPage ? 'textSecondary' : 'textPrimary'
            )}
          </div>
        )}
        {isMainPage && (
          <CardActions disableSpacing>
            {content.length >= 400 && (
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            )}
          </CardActions>
        )}
      </div>

      <Grid container style={{ margin: '12px 5px 0px 8px' }} spacing={1} direction="row" justify="flex-start">
        {tags.map((tag) => (
          <Grid item key={tag}>
            <Tag tag={tag} />
          </Grid>
        ))}
      </Grid>
      {comments &&
        comments.map((comment) => {
          return (
            <div style={{ marginTop: '20px' }} key={comment.id}>
              <Divider />
              <CommentItem {...comment} />
            </div>
          );
        })}
    </Box>
  );
};

export default QuestionItem;
