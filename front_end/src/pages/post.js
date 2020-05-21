import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import QuestionItem from '../common/components/QuestionItem';
import Layout from '../common/components/Layout/Layout';
import TextEditor from '../common/components/TextEditor';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Post() {
  const classes = useStyles();
  return (
    <Layout>
      <Box className={classes.paper}>
        <QuestionItem />

        <div style={{ margin: '0px 25px 0px 25px', minHeight: '500px' }}>
          <TextEditor
            data=""
            minHeight={'400px'}
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
