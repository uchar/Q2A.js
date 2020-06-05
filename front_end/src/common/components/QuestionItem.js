import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tag from './Tag';
import { getStrings } from '../utilities';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
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
    backgroundColor: red[500],
    width: 70,
    height: 70,
    marginRight: '15px',
  },
}));

export default function QuestionItem(props) {
  const classes = useStyles();
  const { title, content } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box boxShadow={1} borderColor="#f2f2f2" border={1} className={classes.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Box>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src="/images/sample_profile.jpg"
              ></Avatar>
              <div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 22, color: 'black' }}
                  component="p"
                >
                  Farnoosh
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 15, color: 'black', marginRight: '12px' }}
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 12, color: 'black' }}
                  component="p"
                >
                  {getStrings().DEMO_UP_VOTE}
                </Typography>
              </div>
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <UpVoteIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 12, color: 'black' }}
                  component="p"
                >
                  {getStrings().DEMO_VIEWS}
                </Typography>
              </div>
              <div style={{ marginLeft: 10 }}>
                <IconButton aria-label="add to favorites">
                  <AnswerIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 12, color: 'black' }}
                  component="p"
                >
                  {getStrings().DEMO_ANSWERS}
                </Typography>
              </div>
            </Grid>
          </Box>
        </Grid>

        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            fontSize: 18,
            color: 'black',
            marginTop: '30px',
            marginBottom: '-15px',
            textAlign: 'initial ',
          }}
          component="p"
        >
          {title}
        </Typography>
      </CardContent>
      <Grid container style={{ margin: '12px 5px 0px 8px' }} spacing={1} direction="row" justify="flex-start">
        <Grid item>
          <Tag tag={'C++'} />
        </Grid>
        <Grid item>
          <Tag tag={'Algorithm'} />
        </Grid>
        <Grid item>
          <Tag tag={'AI'} />
        </Grid>
        <Grid item>
          <Tag tag={'Programming'} />
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography style={{ textAlign: 'initial ' }} paragraph>
            {content}
          </Typography>
        </CardContent>
      </Collapse>
    </Box>
  );
}
