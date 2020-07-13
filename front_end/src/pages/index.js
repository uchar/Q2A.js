import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Typography, Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import QuestionItem from '../common/components/QuestionItem';
import Layout from '../common/components/Layout/Layout';
import { withApollo } from '../libs/apollo';
import { ALL_QUESTIONS } from '../API/queries';

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

function MainPage() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(ALL_QUESTIONS);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
  const { questions } = data;
  return (
    <Layout>
      <Box className={classes.paper}>
        <div style={{flex:"row"}}>

        </div>
        <Typography style={{ marginTop: 25, fontSize: 25 }}>آخرین سوالات</Typography>
        {questions &&
          questions.map((question) => {
            return <QuestionItem key={question.id} {...question} />;
          })}
      </Box>
    </Layout>
  );
}

export default withApollo({ ssr: true })(MainPage);
