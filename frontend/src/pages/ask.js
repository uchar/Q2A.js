import React from 'react';
import { Card } from '@material-ui/core';
import AskLayout from '../common/layouts/AskLayout';
import EditContent from '../common/components/Contents/EditContent';
import { ADD_QUESTION, UPDATE_QUESTION } from '../API/mutations';
import { GET_QUESTION } from '../API/queries';
import { SELECTED_QUESTION_ACTION } from '../redux/constants';

const Ask = () => {
  return (
    <Card>
      <EditContent
        updateMutation={UPDATE_QUESTION}
        addMutation={ADD_QUESTION}
        refreshQuery={GET_QUESTION}
        reduxRefreshAction={SELECTED_QUESTION_ACTION}
      />
    </Card>
  );
};

Ask.getLayout = (page) => <AskLayout>{page}</AskLayout>;
export default Ask;
