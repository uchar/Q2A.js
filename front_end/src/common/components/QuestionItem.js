import React from 'react';
import clsx from 'clsx';
import {
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Box,
  Grid,
  makeStyles,
} from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import { execute } from 'graphql';
import Tag from './Tag';
import {getStrings, parseContent, replacePTagWithTypoGraphy} from '../utilities';
import CodeBlock from './CodeBlock';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
    paddingBottom: '15px',
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
    width: 70,
    height: 70,
    marginRight: '15px',
  },
}));

export default function QuestionItem({
  id,
  title,
  content,
  tags,
  profileImage,
  creator,
  createdAt,
  isExpanded,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(isExpanded === true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Box boxShadow={1} className={classes.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Box>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Avatar aria-label="recipe" className={classes.avatar} src={profileImage}>
                <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
              </Avatar>
              <div>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  style={{ fontSize: 22, textAlign: 'right', marginRight: '15px' }}
                  component="p"
                >
                  {creator}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 15, marginRight: '12px' }}
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
                  {getStrings().DEMO_UP_VOTE}
                </Typography>
              </div>
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <UpVoteIcon />
                </IconButton>
                <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                  {getStrings().DEMO_VIEWS}
                </Typography>
              </div>
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <AnswerIcon />
                </IconButton>
                <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                  {getStrings().DEMO_ANSWERS}
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
              fontSize: 18,
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
          margin: '0px 15px 0px 25px',
        }}
      >
        {/* <CodeBlock /> */}
        {(expanded || content.length < 250) && parseContent(content)}

        {!expanded && content.length >= 250 && replacePTagWithTypoGraphy(content.substring(0, 250))}
        {!expanded && content.length >= 250 ? ' ...' : ' '}
        <CardActions disableSpacing>
          {content.length >= 250 && (
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

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </div>

      <Grid container style={{ margin: '12px 5px 0px 8px' }} spacing={1} direction="row" justify="flex-start">
        {tags.map((tag) => (
          <Grid item key={tag.id}>
            <Tag tag={tag.title} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
