import React, { useEffect } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { legacyParseContent } from '../../parsers/legacyParser';
import { parseContent } from '../../parsers/parser';
import { getTagsArray } from '../../utlities/generalUtilities';
import EditQuestion from './EditQuestion';
import { doGraphQLMutation, getCurrentUserId } from '../../../API/utilities';
import CKEditor from '../Editor/CKEditor';
import { ADD_COMMENT } from '../../../API/mutations';
import ErrorMessage from '../ErrorMessage';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import HorizontalTagsBlock from '../Tag/HorizontalTagsBlock';
import PostToolbar from './PostToolbar';
import CommentsSection from './CommentsSection';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0, 5, 0),
    paddingBottom: theme.spacing(3),
  },
  tagsSection: {
    margin: theme.spacing(4, 0, 1, 2),
  },
  title: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    textAlign: 'initial ',
    cursor: 'pointer',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
}));

const QuestionItem = ({
  id,
  title,
  content,
  user,
  createdAt,
  viewsCount,
  votesCount,
  answersCount,
  comments,
  mainPage,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  isLegacyContent,
}) => {
  const classes = useStyles();
  const [currentUserId, setCurrentUserId] = React.useState('');
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isCommentMode, setIsCommentMode] = React.useState(false);
  const [commentData, setCommentData] = React.useState('');
  const [APIError, setAPIError] = React.useState(null);
  const { publicName, profileImage } = user;
  const userWhoAskedId = user.id;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  const parsedContent = isLegacyContent
    ? legacyParseContent(content, mainPage ? 'textSecondary' : 'textPrimary')
    : parseContent(content);
  useEffect(() => {
    const getUser = async () => {
      const userId = await getCurrentUserId();
      setCurrentUserId(userId);
    };
    getUser();
  }, []);

  const submitComment = async () => {
    try {
      if (commentData.length < 15) {
        setAPIError('حداقل تعداد کاراکتر برای پاسخ 15 است');
        return;
      }
      setAPIError(null);
      const resultObject = await doGraphQLMutation(ADD_COMMENT, {
        postId: id,
        content: commentData,
      });
      const result = resultObject.addComment;
      if (result.statusCode !== 'SUCCESS') {
        throw new Error(result.message);
      }
      window.location.reload();
    } catch (error) {
      setAPIError(error.toString());
    }
  };

  return (
    <Box boxShadow={2} className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <ProfileImageWithName
          href={`/user/[id]`}
          as={`/user/${publicName}`}
          profileImage={profileImage}
          createdAt={createdAt}
          publicName={publicName}
        />
        <PostStatistics votesCount={votesCount} viewsCount={viewsCount} answersCount={answersCount} />
      </Grid>

      {!isEditMode ? (
        <div style={{ margin: '25px 15px 0px 10px' }}>
          <Typography color="textPrimary" variant="h1" className={classes.title}>
            {title}
          </Typography>
          <div
            style={{
              flex: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0px 0px 0px 5px',
            }}
          >
            {parsedContent}
          </div>
        </div>
      ) : (
        <EditQuestion
          editMode
          editTitle={title}
          editTags={tags.map((tag) => {
            return {
              title: tag,
            };
          })}
          editContent={content}
          editId={id}
          onEditFinished={() => {
            setIsEditMode(false);
          }}
        />
      )}
      <HorizontalTagsBlock className={classes.tagsSection} tags={tags} />
      <PostToolbar
        showShare
        shareTitle={`${title} - هفت خط کد`}
        shareBody={content}
        showEdit={currentUserId === userWhoAskedId}
        editCallBack={() => {
          setIsEditMode(true);
        }}
        showComment
        commentCallback={() => {
          setIsCommentMode(!isCommentMode);
        }}
      />

      {isCommentMode && (
        <div style={{ flex: 1, padding: '35px 25px 0px 25px', justifyContent: 'left' }}>
          <div style={{}}>
            <CKEditor
              onChange={(event, editor) => {
                const data = editor.getData();
                setCommentData(data);
              }}
              toolbar={['bold', 'italic', 'code', 'link']}
            />
          </div>
          <div style={{ padding: '15px 25px 15px 10px', flex: 1, textAlign: 'left' }}>
            <Button
              onClick={submitComment}
              variant="contained"
              color="primary"
              style={{ padding: '10px 35px 10px 35px', fontSize: '15px' }}
              loading={false}
              shouldShowLoading={false}
            >
              {'ارسال'}
            </Button>
            {APIError && <ErrorMessage style={{ marginTop: '10px' }} text={APIError} />}
          </div>
        </div>
      )}
      <CommentsSection comments={comments} />
    </Box>
  );
};

export default QuestionItem;
