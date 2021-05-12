import React from 'react';
import { Card } from '@material-ui/core';
import CreatePost from '../../common/layouts/AskLayout';
import EditQuestion from '../../common/components/Post/EditQuestion';
import { ADD_BLOGPOST, UPDATE_BLOGPOST } from '../../API/mutations';

const Post = () => {
  return (
    <Card>
      <EditQuestion updatePost={UPDATE_BLOGPOST} postType={ADD_BLOGPOST} />
    </Card>
  );
};

Post.getLayout = (page) => <CreatePost>{page}</CreatePost>;
export default Post;
