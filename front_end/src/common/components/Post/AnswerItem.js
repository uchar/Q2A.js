import React, { useEffect } from 'react';
import { Box, CardContent, Grid } from '@material-ui/core';
import { useDispatch, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { parseContent } from '../../parsers/parser';
import CommentsSection from './CommentsSection';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import PostToolbar from './PostToolbar';
import { doGraphQLMutation, doGraphQLQuery, isAccessLevelEnough, USER_ACTIONS } from '../../../API/utilities';
import CKEditor from '../Editor/CKEditor';
import SaveCancelButtons from '../SaveCancelButtons';
import { togglePostActiveStatus, UPDATE_ANSWER } from '../../../API/mutations';
import AddComment from './AddComment';
import { DeepMemo, getItemsAndDispatch } from '../../utlities/generalUtilities';
import { GET_QUESTION } from '../../../API/queries';
import { SELECTED_QUESTION_ACTION } from '../../../redux/constants';
import { getLanguage } from '../../utlities/languageUtilities';
import { SELECTED_QUESTION_QUESTIONS_DATA } from '../../constants';

const styles = {
  root: {
    margin: (theme) => theme.spacing(5),
    paddingBottom: (theme) => theme.spacing(2),
    textAlign: 'center',
  },
};

const AnswerItem = DeepMemo(function AnswerItem({
  id,
  content,
  user,
  createdAt,
  votesCount,
  comments,
  rootId,
  active,
}) {
  const dispatch = useDispatch();
  const { publicName, profileImage, score } = user;
  const [isAccessEnough, setIsAccessEnough] = React.useState(false);
  const [isEditMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  const [isCommentMode, setIsCommentMode] = React.useState(false);
  const [apiError, setAPIError] = React.useState(undefined);
  const store = useStore();
  useEffect(() => {
    const getUser = async () => {
      const isEnough = await isAccessLevelEnough(USER_ACTIONS.EDIT_POST);
      setIsAccessEnough(isEnough);
    };
    getUser();
  }, []);
  const parsedContent = parseContent(content, getLanguage());

  const handleEditDataChanged = (event, editor) => {
    const data = editor.getData();
    setEditData(data);
  };

  const refreshQuestion = async () => {
    const questionData = await doGraphQLQuery(GET_QUESTION, { id: rootId });
    dispatch({ type: SELECTED_QUESTION_ACTION, payload: questionData.getQuestion });
  };

  const handleEditSave = async () => {
    try {
      setAPIError(undefined);
      const resultObject = await doGraphQLMutation(UPDATE_ANSWER, {
        id,
        content: editData,
      });
      const result = resultObject.updateAnswer;
      if (result.statusCode !== 'SUCCESS') {
        throw new Error(result.message);
      }
      await refreshQuestion();
      setEditMode(false);
    } catch (error) {
      setAPIError(error.toString());
    }
  };
  const handleEditCancel = () => {
    setEditMode(false);
  };

  const handleEditCallback = () => {
    setEditMode(true);
  };

  const handleCommentCallback = () => {
    setIsCommentMode(!isCommentMode);
  };

  const handleAddCommentCancel = () => {
    setIsCommentMode(false);
  };

  const handleDisable = async () => {
    await doGraphQLMutation(togglePostActiveStatus, { id });
    return getItemsAndDispatch(SELECTED_QUESTION_QUESTIONS_DATA, { id: rootId }, store);
  };

  return (
    <Box bgcolor={active ? 'default' : 'text.disabled'} boxShadow={4} sx={styles.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <ProfileImageWithName
            href={`/user/${publicName}`}
            profileImage={profileImage}
            createdAt={createdAt}
            publicName={publicName}
            score={score}
          />
          <PostStatistics votesCount={votesCount} />
        </Grid>
      </CardContent>
      {isEditMode ? (
        <div>
          <CKEditor sx={styles.margin} data={content} onChange={handleEditDataChanged} />
          <SaveCancelButtons error={apiError} onSave={handleEditSave} onCancel={handleEditCancel} />
        </div>
      ) : (
        parsedContent
      )}
      <PostToolbar
        showShare
        shareTitle={`پاسخ در هفت خط کد`}
        shareBody={content}
        showEdit={isAccessEnough}
        showDisable={isAccessEnough}
        editCallBack={handleEditCallback}
        disableCallback={handleDisable}
        active={active}
        showComment
        commentCallback={handleCommentCallback}
      />
      <AddComment rootId={rootId} postId={id} enable={isCommentMode} onClose={handleAddCommentCancel} />
      <CommentsSection comments={comments} />
    </Box>
  );
});
AnswerItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  rootId: PropTypes.string,
  user: PropTypes.object.isRequired,
  votesCount: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};
export default AnswerItem;
