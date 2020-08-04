import React, { useEffect } from 'react';
import { Box, Button, Divider, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import Link from 'next/link';
import Tag from './Tag';
import { legacyParseContent } from '../parsers/legacyParser';
import { parseContent } from '../parsers/parser';
import CommentItem from './CommentItem';
import ProfileImage from './ProfileImage';
import { getLanguage, getStrings } from '../utlities/languageUtilities';
import { timeAgo } from '../utlities/generalUtilities';
import EditQuestion from './EditQuestion';
import { doGraphQLMutation, getCurrentUserId } from '../../API/utilities';
import NotificationsBox from '../layouts/Header/NotificationsBox';
import ShareDialog from './ShareDialog';
import CKEditor from './Editor/CKEditor';
import { ADD_ANSWER, ADD_COMMENT } from '../../API/mutations';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ProfileImageWithName from './ProfileImageWithName';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px 0px 25px 0px',
    paddingBottom: '15px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    marginRight: '5px',
    cursor: 'pointer',
  },
  title: {
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
}));

const checkTagAndAppend = (tags, newTag) => {
  if (newTag) tags.push(newTag);
  return tags;
};

const QuestionItem = ({
  id,
  title,
  content,
  user,
  createdAt,
  prefetch,
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
  const [shareAnchor, setShareAnchor] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isCommentMode, setIsCommentMode] = React.useState(false);
  const [commentData, setCommentData] = React.useState('');
  const [APIError, setAPIError] = React.useState(null);
  const { publicName, profileImage } = user;
  const userWhoAskedId = user.id;
  let tags = [];
  tags = checkTagAndAppend(tags, tag1);
  tags = checkTagAndAppend(tags, tag2);
  tags = checkTagAndAppend(tags, tag3);
  tags = checkTagAndAppend(tags, tag4);
  tags = checkTagAndAppend(tags, tag5);

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
      <ShareDialog
        shareTitle={`${title} - هفت خط کد`}
        shareBody={content}
        anchor={shareAnchor}
        handleClose={() => {
          setShareAnchor(null);
        }}
      />
      <Grid container direction="row" justify="space-between" alignItems="center">
        <ProfileImageWithName
          href={`/user/[id]`}
          as={`/user/${publicName}`}
          profileImage={profileImage}
          createdAt={createdAt}
          publicName={publicName}
        />
        <Box>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <div style={{ marginLeft: 10 }}>
              <IconButton aria-label="add to favorites">
                <ViewIcon />
              </IconButton>
              <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                {votesCount}
              </Typography>
            </div>
            <div style={{ marginLeft: 10 }}>
              <IconButton aria-label="add to favorites">
                <UpVoteIcon />
              </IconButton>
              <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                {viewsCount}
              </Typography>
            </div>
            <div style={{ marginLeft: 10 }}>
              <IconButton aria-label="add to favorites">
                <AnswerIcon />
              </IconButton>
              <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
                {answersCount}
              </Typography>
            </div>
          </Grid>
        </Box>
      </Grid>

      {!isEditMode ? (
        <div style={{ margin: '25px 15px 0px 10px' }}>
          <Link href={`/${id}/${title}`}>
            <Typography
              variant="body2"
              color="textPrimary"
              style={{
                fontSize: 21,
                textAlign: 'initial ',
                cursor: 'pointer',
                marginBottom: '15px',
              }}
              className={classes.title}
              component="p"
            >
              {title}
            </Typography>
          </Link>
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

      <Grid container style={{ margin: '5px 15px 0px 8px' }} spacing={1} direction="row" justify="flex-start">
        {tags.map((tag) => (
          <Grid item key={tag}>
            <Tag tag={tag} />
          </Grid>
        ))}
      </Grid>

      {comments &&
        comments.map((comment) => {
          return (
            <div style={{ marginTop: '20px' }} key={comment.id}>
              <Divider />
              <CommentItem {...comment} />
            </div>
          );
        })}

      <Grid
        container
        style={{ padding: '15px 0px 3px 20px', flex: 1 }}
        spacing={1}
        direction="row"
        justify="flex-end"
      >
        <Typography
          color="textSecondary"
          style={{
            textDecorationLine: 'underline',
            fontSize: '13px',
            cursor: 'pointer',
          }}
          onClick={(event) => {
            setShareAnchor(event.currentTarget);
          }}
        >
          اشتراک
        </Typography>
        {userWhoAskedId === currentUserId && (
          <Typography
            color="textSecondary"
            style={{
              textDecorationLine: 'underline',
              fontSize: '13px',
              marginRight: '8px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            ویرایش
          </Typography>
        )}

        <Typography
          color="textSecondary"
          style={{
            textDecorationLine: 'underline',
            fontSize: '13px',
            marginRight: '8px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsCommentMode(!isCommentMode);
          }}
        >
          کامنت
        </Typography>
      </Grid>

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
    </Box>
  );
};

export default QuestionItem;
