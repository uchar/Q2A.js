import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import QuestionItem from '../../common/components/QuestionItem';
import Layout from '../../common/components/Layout/Layout';
import CKEditor from '../../common/components/Editor/CKEditor';
import { ALL_TAGS, GET_QUESTION } from '../../API/queries';
import Loading from '../../common/components/Loading';
import AnswerItem from '../../common/components/AnswerItem';
import { doGraphQLQuery } from '../../API/utilities';
import { getStrings } from '../../common/utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: '0px 52px 30px 20px',
    padding: '10px 60px 10px 60px',
  },
}));

const Post = ({ questionData, tags }) => {
  const classes = useStyles();
  if (!questionData) return <Loading />;
  const { ...question } = questionData;
  question.isExpanded = true;
  return (
    <Layout tags={tags}>
      <Box className={classes.paper}>
        <QuestionItem isMainPage={false} {...question} />
        {question.answers.map((answer) => {
          return <AnswerItem style={{ width: '80%' }} key={answer.id} {...answer}></AnswerItem>;
        })}
        <div style={{ margin: '25px 25px 0px 25px', paddingTop: '20px' }}>
          <Typography style={{ fontSize: 22, textAlign: 'right', marginBottom: '20px' }}>
            {'پاسخ شما : '}
          </Typography>
          <CKEditor
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
        <div style={{ textAlign: 'left', marginTop: '25px' }}>
          <Button
            type="submit"
            onSubmit={() => {}}
            variant="contained"
            color="primary"
            className={classes.button}
            loading={false}
            shouldShowLoading={false}
          >
            {getStrings().ASK_BUTTON_SENDING}
          </Button>
        </div>
      </Box>
    </Layout>
  );
};
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const questionData = await doGraphQLQuery(GET_QUESTION, { id: params.id });
  const tagsResponse = await doGraphQLQuery(ALL_TAGS);
  return {
    props: {
      questionData: questionData.getQuestion,
      tags: tagsResponse.getTags,
    },
    revalidate: 20,
  };
};
export default Post;
