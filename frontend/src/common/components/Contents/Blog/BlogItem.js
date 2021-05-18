import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStore } from 'react-redux';
import { parseContent } from '../../../parsers/parser';
import {
  DeepMemo,
  getItemsAndDispatch,
  getTagsArray,
  isInClientBrowser,
} from '../../../utlities/generalUtilities';
import EditContent from '../EditContent';
import ProfileImageWithName from '../../ProfileImageWithName';
import StatisticsSection from '../StatisticsSection';
import HorizontalTagsBlock from '../../Tag/HorizontalTagsBlock';
import ToolbarSection from '../ToolbarSection';
import CommentsSection from '../CommentsSection';
import AddComment from '../AddComment';
import { doGraphQLMutation, isAccessLevelEnough, USER_ACTIONS } from '../../../../API/utility';
import { getLanguage } from '../../../utlities/languageUtilities';
import {
  ADD_BLOG_POST_COMMENT,
  increaseViewCount,
  togglePostActiveStatus,
  UPDATE_BLOG_POST,
} from '../../../../API/mutations';
import { SELECTED_BLOG_POST_DATA } from '../../../constants';
import { GET_BLOG_POST } from '../../../../API/queries';
import { SELECTED_BLOG_POST_ACTION } from '../../../../redux/constants';

const styles = {
  root: {
    margin: (theme) => theme.spacing(5, 1, 5, 1),
    padding: (theme) => theme.spacing(1, 1.5, 1, 1.5),
    paddingBottom: (theme) => theme.spacing(3),
  },
  tagsSection: {
    margin: (theme) => theme.spacing(4, 0, 1, 2),
  },
  title: {
    marginTop: (theme) => theme.spacing(6),
    marginBottom: (theme) => theme.spacing(2),
    textAlign: 'initial ',
    cursor: 'pointer',
    wordWrap: 'break-word',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
  titleSection: {
    margin: (theme) => theme.spacing(5, 2, 0, 3),
  },
  contentDiv: {
    marginTop: (theme) => theme.spacing(2),
  },
};

const BlogItem = DeepMemo(function BlogItem({
  id,
  title,
  content,
  user,
  createdAt,
  viewsCount,
  votesCount,
  comments,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  active,
}) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isCommentMode, setIsCommentMode] = React.useState(false);
  const [isAccessEnough, setIsAccessEnough] = React.useState(false);
  const { publicName, profileImage, score } = user;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);
  const parsedContent = parseContent(content, getLanguage());

  const store = useStore();
  useEffect(() => {
    const getUserId = async () => {
      const isEnough = await isAccessLevelEnough(USER_ACTIONS.EDIT_POST);
      setIsAccessEnough(isEnough);
    };
    const incrViewCount = async () => {
      if (isInClientBrowser()) {
        await doGraphQLMutation(increaseViewCount, { id });
      }
    };
    getUserId();
    incrViewCount();
  }, []);

  const handleEditFinished = () => {
    setIsEditMode(false);
  };

  const handleDisable = async () => {
    await doGraphQLMutation(togglePostActiveStatus, { id });
    return getItemsAndDispatch(SELECTED_BLOG_POST_DATA, { id }, store);
  };

  return (
    <Box bgcolor={active ? 'default' : 'text.disabled'} boxShadow={2} sx={styles.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <ProfileImageWithName
          href={`/user/${publicName}`}
          profileImage={profileImage}
          createdAt={createdAt}
          publicName={publicName}
          score={score}
        />
        <StatisticsSection votesCount={votesCount} viewsCount={viewsCount}  />
      </Grid>

      {!isEditMode ? (
        <div sx={styles.titleSection}>
          <Typography color="textPrimary" variant="h1" sx={styles.title}>
            {title}
          </Typography>
          <div sx={styles.contentDiv}> {parsedContent}</div>
        </div>
      ) : (
        <EditContent
          editMode
          editTitle={title}
          editTags={tags.map((tag) => {
            return {
              title: tag,
            };
          })}
          editContent={content}
          editId={id}
          onEditFinished={handleEditFinished}
          updateMutation={UPDATE_BLOG_POST}
          refreshQuery={GET_BLOG_POST}
          reduxRefreshAction={SELECTED_BLOG_POST_ACTION}
        />
      )}
      <HorizontalTagsBlock sx={styles.tagsSection} tags={tags} />
      <ToolbarSection
        showShare
        shareTitle={`${title} - q2a`}
        shareBody={content}
        showEdit={isAccessEnough}
        showDisable={isAccessEnough}
        editCallBack={() => {
          setIsEditMode(true);
        }}
        active={active}
        showComment
        commentCallback={() => {
          setIsCommentMode(!isCommentMode);
        }}
        disableCallback={handleDisable}
      />

      <AddComment
        postId={id}
        rootId={id}
        enable={isCommentMode}
        onClose={() => {
          setIsCommentMode(false);
        }}
        refreshQuery={GET_BLOG_POST}
        reduxRefreshAction={SELECTED_BLOG_POST_ACTION}
        addCommentMutation={ADD_BLOG_POST_COMMENT}
      />
      <CommentsSection comments={comments} />
    </Box>
  );
});

BlogItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  viewsCount: PropTypes.number.isRequired,
  votesCount: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  tag3: PropTypes.string,
  tag4: PropTypes.string,
  tag5: PropTypes.string,
  active: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
};
export default BlogItem;
