import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Tab, Tabs, AppBar, Typography, Box, Avatar, CircularProgress } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import StatsIcon from '@material-ui/icons/BarChart';
import QuestionsIcon from '@material-ui/icons/ContactSupport';
import { useRouter } from 'next/router';
import EditIcon from '@material-ui/icons/Edit';
import Layout from '../../common/layouts/Layout';
import QuestionItemPreview from '../../common/components/QuestionItemPreview';
import AnswerItem from '../../common/components/AnswerItem';
import { doGraphQLMutation, doGraphQLQuery, uploadFile } from '../../API/utilities';
import { ALL_TAGS, GET_USER } from '../../API/queries';
import Loading from '../../common/components/Loading';
import { getFullUrl } from '../../common/utlities/generalUtilities';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import { UPDATE_USER } from '../../API/mutations';
import CKEditor from '../../common/components/Editor/CKEditor';
import { parseContent } from '../../common/parsers/parser';

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
    marginTop: '40px',
  },
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  button: {
    padding: '5px 30px 5px 30px',
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

const User = ({ user, tags }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [uploadError, setUploadError] = React.useState(undefined);
  const [profileImage, setProfileImage] = React.useState(user ? user.profileImage : undefined);
  const [loadingNewImage, setLoadingNewImage] = React.useState(false);
  const [isDescriptionEditMode, setDescriptionEditMode] = React.useState(false);
  const [apiError, setAPIError] = React.useState(undefined);
  let aboutEditData = false;
  const handleChange = (event, newValue) => {
    setCurrentTabIndex(newValue);
  };
  const router = useRouter();
  const { id } = router.query;
  if (!user) return <Loading />;
  const { answers, questions, clapItems, about } = user;
  if (!profileImage) setProfileImage(user.profileImage);
  if (!aboutEditData) aboutEditData = user.about;

  return (
    <Layout tags={tags}>
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
                    setProfileImage(URL.createObjectURL(img));
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
                آپلود عکس
              </Button>
            </label>
            {uploadError && <ErrorMessage style={{ margin: '-30px 0px 25px 0px' }} text={uploadError} />}
          </div>

          {!isDescriptionEditMode && <div className={classes.title}>{parseContent(about)}</div>}
          {isDescriptionEditMode && (
            <div style={{ margin: '65px 0px 0px 15px', flex: 1 }}>
              <CKEditor
                data={about}
                onChange={(event, editor) => {
                  aboutEditData = editor.getData();
                }}
                toolbar={['bold', 'italic', 'code', 'link']}
              ></CKEditor>

              <div
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Button
                  onClick={async () => {
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
                      window.location.reload();
                    } catch (error) {
                      setAPIError(error.toString());
                    }
                  }}
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '20px' }}
                  className={classes.button}
                >
                  {'ذخیره'}
                </Button>
                <Button
                  onClick={() => {
                    setDescriptionEditMode(false);
                  }}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  {'لغو'}
                </Button>
              </div>
              <ErrorMessage style={{ marginTop: '10px' }} text={apiError} />
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
              console.log('??');
              setDescriptionEditMode(!isDescriptionEditMode);
            }}
          />
        </div>

        <AppBar position="static" color="default">
          <Tabs
            value={currentTabIndex}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="سوال ها" icon={<PersonIcon />} {...a11yProps(0)} />
            <Tab label="جواب ها" icon={<StatsIcon />} {...a11yProps(1)} />
            <Tab label="تشویق ها" icon={<QuestionsIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={currentTabIndex} index={0}>
          <div dir="rtl">
            {questions.map((question) => {
              const alteredQuestion = { ...question };
              alteredQuestion.user = {};
              alteredQuestion.user.publicName = id;
              alteredQuestion.user.profileImage = profileImage;
              return <QuestionItemPreview mainPage key={alteredQuestion.id} {...alteredQuestion} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value={currentTabIndex} index={1} dir={theme.direction}>
          <div dir="rtl">
            {answers.map((answer) => {
              const alteredAnswer = { ...answer };
              alteredAnswer.user = {};
              alteredAnswer.user.publicName = id;
              alteredAnswer.user.profileImage = profileImage;
              return <AnswerItem key={answer.id} {...alteredAnswer}></AnswerItem>;
            })}
          </div>
        </TabPanel>
        <TabPanel value={currentTabIndex} index={2}>
          <div dir="rtl">
            {clapItems.map((item) => {
              if (item.type === 'QUESTION') {
                const { ...question } = { item };
                question.user = {};
                question.user.publicName = id;
                question.user.profileImage = profileImage;
                return <QuestionItemPreview mainPage key={question.id} {...question} />;
              }
              if (item.type === 'ANSWER') {
                const { ...answer } = { item };
                answer.user = {};
                answer.user.publicName = id;
                answer.user.profileImage = profileImage;
                return <AnswerItem key={answer.id} {...answer}></AnswerItem>;
              }
            })}
          </div>
        </TabPanel>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const userData = await doGraphQLQuery(GET_USER, { id: params.id });
  const tagsResponse = await doGraphQLQuery(ALL_TAGS);
  return {
    props: {
      user: userData.getUser,
      tags: tagsResponse.getTags,
    },
    revalidate: 20,
  };
};
export default User;
