import React from 'react';
import { Card } from '@material-ui/core';
import AskLayout from '../../common/layouts/AskLayout';
import EditQuestion from '../../common/components/Post/EditQuestion';

const Post = () => {
  return (
    <Card>
      <EditQuestion />
    </Card>
  );
};

Post.getLayout = (page) => <AskLayout>{page}</AskLayout>;
export default Post;
