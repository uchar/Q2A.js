import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import QuestionItem from '../../common/components/Post/QuestionItem';
import Layout from '../../common/layouts/Layout';
import CKEditor from '../../common/components/Editor/CKEditor';
import { ALL_TAGS, GET_QUESTION } from '../../API/queries';
import Loading from '../../common/components/Loading';
import AnswerItem from '../../common/components/Post/AnswerItem';
import { doGraphQLMutation, doGraphQLQuery } from '../../API/utilities';
import { getStrings } from '../../common/utlities/languageUtilities';
import { ADD_ANSWER, ADD_QUESTION, UPDATE_QUESTION } from '../../API/mutations';
import ErrorMessage from '../../common/components/ErrorMessage';

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

let answerData = '';
const Post = ({ questionData, tags }) => {
  const classes = useStyles();
  const [APIError, setAPIError] = React.useState(null);
  if (!questionData) return <Loading />;
  const { ...question } = questionData;
  question.isExpanded = true;

  const submitAnswer = async () => {
    try {
      if (answerData.length < 15) {
        setAPIError('حداقل تعداد کاراکتر برای پاسخ 15 است');
        return;
      }
      setAPIError(null);
      const resultObject = await doGraphQLMutation(ADD_ANSWER, {
        postId: question.id,
        content: answerData,
      });
      const result = resultObject.addAnswer;
      if (result.statusCode !== 'SUCCESS') {
        throw new Error(result.message);
      }
      window.location.reload();
    } catch (error) {
      setAPIError(error.toString());
    }
  };

  return (
    <Layout tags={tags}>
      <Box className={classes.paper}>
        <QuestionItem mainPage={false} {...question} />
        {question.answers.map((answer) => {
          return <AnswerItem style={{ width: '80%' }} key={answer.id} {...answer}></AnswerItem>;
        })}
        <div style={{ margin: '25px 25px 0px 25px', paddingTop: '20px' }}>
          <Typography style={{ fontSize: 22, textAlign: 'right', marginBottom: '20px' }}>
            {'پاسخ شما : '}
          </Typography>
          <CKEditor
            onChange={(event, editor) => {
              answerData = editor.getData();
            }}
          />
        </div>
        <div style={{ textAlign: 'left', marginTop: '25px' }}>
          <Button
            onClick={submitAnswer}
            variant="contained"
            color="primary"
            className={classes.button}
            loading={false}
            shouldShowLoading={false}
          >
            {getStrings().ASK_BUTTON_SENDING}
          </Button>
        </div>
        {APIError && <ErrorMessage text={APIError} />}
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
