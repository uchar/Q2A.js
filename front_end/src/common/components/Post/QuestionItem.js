import React, { useEffect } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { parseContent } from '../../parsers/parser';
import { DeepMemo, getTagsArray } from '../../utlities/generalUtilities';
import EditQuestion from './EditQuestion';
import ProfileImageWithName from '../ProfileImageWithName';
import PostStatistics from './PostStatistics';
import HorizontalTagsBlock from '../Tag/HorizontalTagsBlock';
import PostToolbar from './PostToolbar';
import CommentsSection from './CommentsSection';
import AddComment from './AddComment';
import { getCurrentUserId } from '../../../API/utilities';
import { getLanguage } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 1, 5, 1),
    padding: theme.spacing(1, 1.5, 1, 1.5),
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
    wordWrap: 'break-word',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
  titleSection: {
    margin: theme.spacing(5, 2, 0, 3),
  },
  contentDiv: {
    marginTop: theme.spacing(2),
  },
}));

const QuestionItem = DeepMemo(function QuestionItem({
  id,
  title,
  content,
  user,
  createdAt,
  viewsCount,
  votesCount,
  answersCount,
  comments,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
}) {
  const classes = useStyles();
  const [currentUserId, setCurrentUserId] = React.useState('');
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isCommentMode, setIsCommentMode] = React.useState(false);
  const { publicName, profileImage, score } = user;
  const userWhoAskedId = user.id;
  const tags = getTagsArray(tag1, tag2, tag3, tag4, tag5);

  const parsedContent = parseContent(content, getLanguage());

  useEffect(() => {
    const getUserId = async () => {
      const userId = await getCurrentUserId();
      setCurrentUserId(userId);
    };
    getUserId();
  }, []);

  const handleEditFinished = () => {
    setIsEditMode(false);
  };

  return (
    <Box boxShadow={2} className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <ProfileImageWithName
          href={`/user/${publicName}`}
          profileImage={profileImage}
          createdAt={createdAt}
          publicName={publicName}
          score={score}
        />
        <PostStatistics votesCount={votesCount} viewsCount={viewsCount} answersCount={answersCount} />
      </Grid>

      {!isEditMode ? (
        <div className={classes.titleSection}>
          <Typography color="textPrimary" variant="h1" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.contentDiv}> {parsedContent}</div>
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
          onEditFinished={handleEditFinished}
        />
      )}
      <HorizontalTagsBlock className={classes.tagsSection} tags={tags} />
      <PostToolbar
        showShare
        shareTitle={`${title} - هفت خط کد`}
        shareBody={content}
        showEdit={currentUserId === userWhoAskedId}
        showDisable={currentUserId === userWhoAskedId}
        editCallBack={() => {
          setIsEditMode(true);
        }}
        showComment
        commentCallback={() => {
          setIsCommentMode(!isCommentMode);
        }}
        disableCallback={() => {}}
      />

      <AddComment
        postId={id}
        rootId={id}
        enable={isCommentMode}
        onClose={() => {
          setIsCommentMode(false);
        }}
      />
      <CommentsSection comments={comments} />
    </Box>
  );
});

QuestionItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  viewsCount: PropTypes.number.isRequired,
  votesCount: PropTypes.number.isRequired,
  answersCount: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  tag3: PropTypes.string,
  tag4: PropTypes.string,
  tag5: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};
export default QuestionItem;
