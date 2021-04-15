import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Tab, Tabs, AppBar, Typography, Box, Avatar, CircularProgress } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import StatsIcon from '@material-ui/icons/BarChart';
import QuestionsIcon from '@material-ui/icons/ContactSupport';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../common/layouts/Layout';
import QuestionItemPreview from '../../common/components/Post/QuestionItemPreview';
import AnswerItem from '../../common/components/Post/AnswerItem';
import { doGraphQLMutation, doGraphQLQuery, getCurrentUserId, uploadFile } from '../../API/utilities';
import { ALL_BLOG_POSTS, ALL_TAGS, GET_USER } from '../../API/queries';
import Loading from '../../common/components/Loading';
import { addRevalidateAndRedux, getFullUrl } from '../../common/utlities/generalUtilities';
import ErrorMessage from '../../common/components/ErrorMessage';
import { UPDATE_USER } from '../../API/mutations';
import CKEditor from '../../common/components/Editor/CKEditor';
import { parseContent } from '../../common/parsers/parser';
import SaveCancelButtons from '../../common/components/SaveCancelButtons';
import { wrapper } from '../../redux/store';
import {
  ALL_BLOG_POSTS_ACTION,
  ALL_TAGS_ACTION,
  CURRENT_USER_ACTION,
  SELECTED_USER_ACTION,
} from '../../redux/constants';
import { getStrings } from '../../common/utlities/languageUtilities';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
  },
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    padding: theme.spacing(1, 6, 1, 6),
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(4),
    fontSize: 19,
    whiteSpace: 'pre-line',
  },
}));

const User = () => {
  const user = useSelector((state) => state.selectedUser);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [uploadError, setUploadError] = React.useState(undefined);
  const [loadingNewImage, setLoadingNewImage] = React.useState(false);
  const [isDescriptionEditMode, setDescriptionEditMode] = React.useState(false);
  const [apiError, setAPIError] = React.useState(undefined);
  let aboutEditData = false;

  const handleCurrentTabChanged = (event, newValue) => {
    setCurrentTabIndex(newValue);
  };

  if (!user) return <Loading />;
  const { publicName } = user;
  const { answers, questions, clapItems, about, profileImage, language } = user;
  if (!aboutEditData) aboutEditData = user.about;

  const refreshSelectedUser = async () => {
    const userData = await doGraphQLQuery(GET_USER, { id: publicName });
    const currentUserId = await getCurrentUserId();
    if (user.id === currentUserId) dispatch({ type: CURRENT_USER_ACTION, payload: userData.getUser });
    dispatch({ type: SELECTED_USER_ACTION, payload: userData.getUser });
  };

  return (
    <div className={classes.root}>
      <div style={{ position: 'relative' }} className={classes.topSection}>
        <div style={{ textAlign: 'center' }}>
          {loadingNewImage ? (
            <div className={classes.avatar}>
              <CircularProgress color="secondary" style={{ marginTop: '35%' }} />
              <Typography> در حال بارگذاری</Typography>
            </div>
          ) : (
            <Avatar
              type="file"
              name="myImage"
              onChange={() => {}}
              aria-label="recipe"
              className={classes.avatar}
              src={getFullUrl(profileImage)}
            >
              <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
            </Avatar>
          )}
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={async (event) => {
              if (event.target.files && event.target.files[0]) {
                const img = event.target.files[0];
                setLoadingNewImage(true);
                if (uploadError) setUploadError(undefined);
                const uploadResult = await uploadFile(img);
                try {
                  const resultObject = await doGraphQLMutation(UPDATE_USER, {
                    input: {
                      profileImage: uploadResult.uploadFile.filename,
                    },
                  });
                  const result = resultObject.updateUser;
                  if (result.statusCode !== 'SUCCESS') {
                    throw new Error(result.message);
                  }
                  await refreshSelectedUser();
                } catch (error) {
                  setUploadError(error.toString());
                }
                setLoadingNewImage(false);
              }
            }}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              disabled={loadingNewImage}
              style={{ justifySelf: 'center', margin: '-25px 0px 45px 0px' }}
            >
              {getStrings().PROFILE_IMAGE_UPLOAD}
            </Button>
          </label>
          {uploadError && <ErrorMessage style={{ margin: '-30px 0px 25px 0px' }} text={uploadError} />}
        </div>

        {!isDescriptionEditMode && <div className={classes.title}>{parseContent(about, language)}</div>}
        {isDescriptionEditMode && (
          <div style={{ margin: '65px 0px 0px 15px', flex: 1 }}>
            <CKEditor
              data={about}
              onChange={(event, editor) => {
                aboutEditData = editor.getData();
              }}
              toolbar={['bold', 'italic', 'code', 'link']}
            ></CKEditor>

            <SaveCancelButtons
              error={apiError}
              onSave={async () => {
                try {
                  const resultObject = await doGraphQLMutation(UPDATE_USER, {
                    input: {
                      about: aboutEditData,
                    },
                  });
                  const result = resultObject.updateUser;
                  if (result.statusCode !== 'SUCCESS') {
                    throw new Error(result.message);
                  }
                  setDescriptionEditMode(false);
                  await refreshSelectedUser();
                } catch (error) {
                  setAPIError(error.toString());
                }
              }}
              onCancel={() => {
                setDescriptionEditMode(false);
              }}
            />
          </div>
        )}
        <EditIcon
          color="primary"
          style={{
            position: 'absolute',
            left: '15',
            top: '15',
            cursor: 'pointer',
          }}
          onClick={() => {
            setDescriptionEditMode(!isDescriptionEditMode);
          }}
        />
      </div>

      <AppBar position="static" color="default">
        <Tabs
          value={currentTabIndex}
          onChange={handleCurrentTabChanged}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={getStrings().PROFILE_QUESTIONS} icon={<PersonIcon />} {...a11yProps(0)} />
          <Tab label={getStrings().PROFILE_ANSWERS} icon={<StatsIcon />} {...a11yProps(1)} />
          <Tab label={getStrings().PROFILE_CLAPPED} icon={<QuestionsIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={currentTabIndex} index={0}>
        <div>
          {questions &&
            questions.map((question) => {
              const alteredQuestion = { ...question };
              alteredQuestion.user = {};
              alteredQuestion.user.publicName = publicName;
              alteredQuestion.user.profileImage = profileImage;
              return <QuestionItemPreview key={alteredQuestion.id} {...alteredQuestion} />;
            })}
        </div>
      </TabPanel>
      <TabPanel value={currentTabIndex} index={1} dir={theme.direction}>
        <div>
          {answers &&
            answers.map((answer) => {
              const alteredAnswer = { ...answer };
              alteredAnswer.user = {};
              alteredAnswer.user.publicName = publicName;
              alteredAnswer.user.profileImage = profileImage;
              return <AnswerItem key={answer.id} {...alteredAnswer}></AnswerItem>;
            })}
        </div>
      </TabPanel>
      <TabPanel value={currentTabIndex} index={2}>
        <div>
          {clapItems &&
            clapItems.map((item) => {
              if (item.type === 'QUESTION') {
                const { ...question } = { item };
                question.user = {};
                question.user.publicName = publicName;
                question.user.profileImage = profileImage;
                return <QuestionItemPreview key={question.id} {...question} />;
              }
              if (item.type === 'ANSWER') {
                const { ...answer } = { item };
                answer.user = {};
                answer.user.publicName = publicName;
                answer.user.profileImage = profileImage;
                return <AnswerItem key={answer.id} {...answer}></AnswerItem>;
              }
            })}
        </div>
      </TabPanel>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      const { id } = props.params;
      const userData = await doGraphQLQuery(GET_USER, { id });
      const blogPostsResponse = await doGraphQLQuery(ALL_BLOG_POSTS, { limit: 5, offset: 0 });
      const tagsResponse = await doGraphQLQuery(ALL_TAGS, { limit: 50, offset: 0 });
      store.dispatch({ type: ALL_TAGS_ACTION, payload: tagsResponse.getTags });
      store.dispatch({ type: SELECTED_USER_ACTION, payload: userData.getUser });
      store.dispatch({ type: ALL_BLOG_POSTS_ACTION, payload: blogPostsResponse.getBlogPosts });
    })
  );

User.getLayout = (page) => <Layout>{page}</Layout>;

export default User;
