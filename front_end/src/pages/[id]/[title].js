import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import QuestionItem from '../../common/components/QuestionItem';
import Layout from '../../common/components/Layout/Layout';
import TextEditor from '../../common/components/TextEditor';
import { withApollo } from '../../libs/apollo';
import { GET_QUESTION } from '../../API/queries';
import Loading from '../../common/components/Loading';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Post() {
  const classes = useStyles();
  const router = useRouter();

  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_QUESTION, { variables: { id } });
  if (error) {
    console.error(error);
    return <h1> error </h1>;
  }
  if (loading) return <Loading />;
  const question = data.getQuestion;
  question.isExpanded = true;
  return (
    <Layout>
      <Box className={classes.paper}>
        <QuestionItem {...question} />

        <div style={{ margin: '25px 25px 0px 25px', paddingTop: '20px' }}>
          <Typography style={{ fontSize: 22, textAlign: 'right', marginBottom: '20px' }}>
            {'پاسخ شما : '}
          </Typography>
          <TextEditor
            data=""
            onInit={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
      </Box>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Post);
