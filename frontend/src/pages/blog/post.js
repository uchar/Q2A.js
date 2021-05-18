import React from 'react';
import { Card } from '@material-ui/core';
import CreatePost from '../../common/layouts/AskLayout';
import EditContent from '../../common/components/Contents/EditContent';
import { ADD_BLOG_POST, UPDATE_BLOG_POST } from '../../API/mutations';
import { GET_BLOG_POST } from '../../API/queries';
import { SELECTED_BLOG_POST_ACTION } from '../../redux/constants';

const Post = () => {
  return (
    <Card>
      <EditContent
        updateMutation={UPDATE_BLOG_POST}
        addMutation={ADD_BLOG_POST}
        refreshQuery={GET_BLOG_POST}
        reduxRefreshAction={SELECTED_BLOG_POST_ACTION}
      />
    </Card>
  );
};

Post.getLayout = (page) => <CreatePost>{page}</CreatePost>;
export default Post;
