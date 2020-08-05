import React, { useEffect } from 'react';
import { Box, CardContent, Grid, makeStyles } from '@material-ui/core';
import { legacyParseContent } from '../../parsers/legacyParser';
import { parseContent } from '../../parsers/parser';
import CommentsSection from './CommentsSection';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import PostToolbar from './PostToolbar';
import { doGraphQLMutation, getCurrentUserId } from '../../../API/utilities';
import CKEditor from '../Editor/CKEditor';
import SaveCancelButtons from '../SaveCancelButtons';
import { ADD_QUESTION, UPDATE_ANSWER, UPDATE_QUESTION, UPDATE_USER } from '../../../API/mutations';
import AddComment from './AddComment';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function AnswerItem({ id, content, user, createdAt, votesCount, comments, isLegacyContent }) {
  const classes = useStyles();
  const { publicName, profileImage } = user;
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
  const parsedContent = isLegacyContent ? legacyParseContent(content) : parseContent(content);
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
          />
          <PostStatistics votesCount={votesCount} />
        </Grid>
      </CardContent>
      {isEditMode ? (
        <div>
          <CKEditor
            className={classes.margin}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditData(data);
            }}
          />
          <SaveCancelButtons
            error={apiError}
            onSave={async () => {
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
                window.location.reload();
              } catch (error) {
                setAPIError(error.toString());
              }
            }}
            onCancel={() => {
              setEditMode(false);
            }}
          />
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
        editCallBack={() => {
          setEditMode(true);
        }}
        showComment
        commentCallback={() => {
          setIsCommentMode(!isCommentMode);
        }}
      />
      <AddComment
        postId={id}
        enable={isCommentMode}
        onCancel={() => {
          setIsCommentMode(false);
        }}
      />
      <CommentsSection comments={comments} />
    </Box>
  );
}
