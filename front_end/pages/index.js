import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import QuestionItem from '../common/components/QuestionItem';
import Layout from '../common/components/Layout/Layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  },
}));

export default function MainPage() {
  const classes = useStyles();
  return (
    <Layout>
      <Box className={classes.paper}>
        <QuestionItem />
        <QuestionItem />
        <QuestionItem style={{ marginTop: 15 }} />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
      </Box>
    </Layout>
  );
}
