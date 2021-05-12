import React from 'react';
import { Card } from '@material-ui/core';
import AskLayout from '../common/layouts/AskLayout';
import EditQuestion from '../common/components/Post/EditQuestion';
import { ADD_QUESTION, UPDATE_QUESTION } from '../API/mutations';

const Ask = () => {
  return (
    <Card>
      <EditQuestion updatePost={UPDATE_QUESTION} postType={ADD_QUESTION} />
    </Card>
  );
};

Ask.getLayout = (page) => <AskLayout>{page}</AskLayout>;
export default Ask;
