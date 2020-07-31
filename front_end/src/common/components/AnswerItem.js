import React from 'react';
import { Box, CardContent, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import { legacyParseContent } from '../parsers/legacyParser';
import CommentItem from './CommentItem';
import ProfileImage from './ProfileImage';
import { getStrings } from '../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
    paddingBottom: '10px',
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
  },
}));

export default function AnswerItem({ id, content, user, createdAt, votesCount, isExpanded, comments }) {
  const classes = useStyles();
  const { publicName, profileImage } = user;
  const [expanded, setExpanded] = React.useState(isExpanded === true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box boxShadow={4} className={classes.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Box>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <ProfileImage profileImage={profileImage} />
              <div>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  style={{ fontSize: 17, textAlign: 'right', marginRight: '15px' }}
                  component="p"
                >
                  {publicName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 13, marginRight: '12px' }}
                  component="p"
                >
                  {getStrings().DEMO_TIME_AGO}
                </Typography>
              </div>
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
            </Grid>
          </Box>
        </Grid>
      </CardContent>
      {legacyParseContent(content)}
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
}
