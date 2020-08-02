import React, { useEffect } from 'react';
import { Box, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
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
import { getCurrentUserId } from '../../API/utilities';

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
  isMainPage,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  isLegacyContent,
}) => {
  const classes = useStyles();
  const [currentUserId, setCurrentUserId] = React.useState('');
  const { publicName, profileImage } = user;
  const userWhoAskedId = user.id;
  const [isEditMode, setIsEditMode] = React.useState(false);
  let tags = [];
  tags = checkTagAndAppend(tags, tag1);
  tags = checkTagAndAppend(tags, tag2);
  tags = checkTagAndAppend(tags, tag3);
  tags = checkTagAndAppend(tags, tag4);
  tags = checkTagAndAppend(tags, tag5);

  const parsedContent = isLegacyContent
    ? legacyParseContent(content, isMainPage ? 'textSecondary' : 'textPrimary')
    : parseContent(content);
  useEffect(() => {
    const getUser = async () => {
      const currentUserId = await getCurrentUserId();
      setCurrentUserId(currentUserId);
    };
    getUser();
  }, []);

  return (
    <Box boxShadow={2} className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Box>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Link prefetch={false} href={`/user/[id]`} as={`/user/${publicName}`}>
              <ProfileImage profileImage={profileImage} />
            </Link>
            <Link prefetch={false} href={`/user/[id]`} as={`/user/${publicName}`}>
              <div>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    fontSize: 17,
                    textAlign: 'right',
                    marginRight: '5px',
                  }}
                  component="p"
                >
                  {publicName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: 12, flex: 1, textAlign: 'right', marginRight: '5px' }}
                  component="p"
                >
                  {timeAgo(createdAt, getLanguage())}
                  {getStrings().DEMO_TIME_AGO_QUESTION}
                </Typography>
              </div>
            </Link>
          </Grid>
        </Box>
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
          onEditFinished={(shouldRefresh) => {
            if (shouldRefresh) window.location.reload(true);
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
      <Grid
        container
        style={{ padding: '15px 0px 3px 20px', flex: 1 }}
        spacing={1}
        direction="row"
        justify="flex-end"
      >
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
            console.log('Click');
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
              console.log('Click');
            }}
          >
            غیرفعال
          </Typography>
        )}
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
    </Box>
  );
};

export default QuestionItem;
