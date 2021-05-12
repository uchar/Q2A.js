import React from 'react';
import { Card } from '@material-ui/core';
import CreatePost from '../../common/layouts/AskLayout';
import EditQuestion from '../../common/components/Post/EditQuestion';

const Post = () => {
  return (
    <Card>
      <EditQuestion />
    </Card>
  );
};

Post.getLayout = (page) => <CreatePost>{page}</CreatePost>;
export default Post;
