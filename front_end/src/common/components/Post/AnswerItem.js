import React, { useEffect } from 'react';
import { Box, CardContent, Grid, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { legacyParseContent } from '../../parsers/legacyParser';
import { parseContent } from '../../parsers/parser';
import CommentsSection from './CommentsSection';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import PostToolbar from './PostToolbar';
import { doGraphQLMutation, doGraphQLQuery, getCurrentUserId } from '../../../API/utilities';
import CKEditor from '../Editor/CKEditor';
import SaveCancelButtons from '../SaveCancelButtons';
import { ADD_QUESTION, UPDATE_ANSWER, UPDATE_QUESTION, UPDATE_USER } from '../../../API/mutations';
import AddComment from './AddComment';
import { DeepMemo } from '../../utlities/generalUtilities';
import { GET_QUESTION } from '../../../API/queries';
import { SELECTED_QUESTION } from '../../../redux/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const AnswerItem = DeepMemo(function AnswerItem({
  id,
  content,
  user,
  createdAt,
  votesCount,
  comments,
  rootId,
  isLegacyContent,
  language,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { publicName, profileImage, score } = user;
  const [currentUserId, setCurrentUserId] = React.useState('');
  const [isEditMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  const [isCommentMode, setIsCommentMode] = React.useState(false);
  const [apiError, setAPIError] = React.useState(undefined);
  useEffect(() => {
    const getUser = async () => {
      const userId = await getCurrentUserId();
      setCurrentUserId(userId);
    };
    getUser();
  }, []);
  const userWhoAnsweredId = user.id;
  const parsedContent = isLegacyContent
    ? legacyParseContent(content)
    : parseContent(content, language);

  const handleEditDataChanged = (event, editor) => {
    const data = editor.getData();
    setEditData(data);
  };

  const refreshQuestion = async () => {
    const questionData = await doGraphQLQuery(GET_QUESTION, { id: rootId });
    dispatch({ type: SELECTED_QUESTION, payload: questionData.getQuestion });
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
  return (
    <Box boxShadow={4} className={classes.root}>
      <CardContent>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <ProfileImageWithName
            href={`/user/[id]`}
            as={`/user/${publicName}`}
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
          <CKEditor className={classes.margin} data={content} onChange={handleEditDataChanged} />
          <SaveCancelButtons error={apiError} onSave={handleEditSave} onCancel={handleEditCancel} />
        </div>
      ) : (
        parsedContent
      )}
      <PostToolbar
        showShare
        shareTitle={`پاسخ در هفت خط کد`}
        shareBody={content}
        showEdit={currentUserId === userWhoAnsweredId}
        showDisable={currentUserId === userWhoAnsweredId}
        editCallBack={handleEditCallback}
        showComment
        commentCallback={handleCommentCallback}
      />
      <AddComment rootId={rootId} postId={id} enable={isCommentMode} onClose={handleAddCommentCancel} />
      <CommentsSection comments={comments} />
    </Box>
  );
});
export default AnswerItem;
