import React, { useEffect } from 'react';
import { CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { getStrings } from '../../utlities/languageUtilities';
import { doGraphQLMutation, doGraphQLQuery } from '../../../API/utilities';
import { ADD_QUESTION, UPDATE_QUESTION } from '../../../API/mutations';
import ErrorMessage from '../ErrorMessage';
import CKEditor from '../Editor/CKEditor';
import { ALL_TAGS, GET_QUESTION } from '../../../API/queries';
import { SELECTED_QUESTION } from '../../../redux/constants';
import Q2aButton from '../Q2aButton';

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(0, 1, 0, 1),
  },
  title: {
    fontSize: 26,
    textAlign: 'initial',
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  subtitle: { marginRight: theme.spacing(2), marginBottom: theme.spacing(2), textAlign: 'initial' },
  tagTitle: { margin: theme.spacing(6, 0, 0, 0) },
  titleInput: { margin: theme.spacing(0, 1, 2, 1), textAlign: 'initial' },
  autoComplete: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  button: {
    margin: theme.spacing(2, 0, 6, 4),
    padding: theme.spacing(2, 12, 2, 12),
  },
  error: {
    margin: theme.spacing(2, 0, 0, 3),
  },
  submitButtonsParent: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
}));

const EditQuestion = ({ editMode, editId, editTitle, editTags, editContent, onEditFinished }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [tags, setTags] = React.useState([
    { title: 'c' },
    { title: 'c++' },
    { title: 'c#' },
    { title: 'java' },
  ]);

  useEffect(() => {
    const getAllTags = async () => {
      const tagsResponse = await doGraphQLQuery(ALL_TAGS);
      setTags(tagsResponse.getTags);
    };
    getAllTags();
  }, []);

  const refreshQuestion = async () => {
    const questionData = await doGraphQLQuery(GET_QUESTION, { id: editId });
    dispatch({ type: SELECTED_QUESTION, payload: questionData.getQuestion });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: editMode ? editTitle : '',
        content: editMode ? editContent : '',
        tags: editMode ? editTags : [],
      }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const tagsToSend = [];
          values.tags.forEach((tag) => tagsToSend.push(tag.title));
          const params = {
            title: values.title,
            content: values.content,
            tags: tagsToSend,
          };
          if (editMode) params.id = editId;
          const mutation = editMode ? UPDATE_QUESTION : ADD_QUESTION;
          const resultObject = await doGraphQLMutation(mutation, params);
          const result = editMode ? resultObject.updateQuestion : resultObject.addQuestion;
          if (result.statusCode !== 'SUCCESS') {
            throw new Error(result.message);
          }
          if (editMode) {
            await refreshQuestion();
            onEditFinished();
          } else {
            return router.push(`${result.id}/${values.title}`);
          }
        } catch (error) {
          setErrors({ api: error.toString() });
        }
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Required').min(10),
        content: Yup.string().required('Required').min(25),
        tags: Yup.array().required('Required').min(2).max(5),
      })}
    >
      {(props) => {
        const { values, setValues, errors, handleChange, handleSubmit, isSubmitting } = props;

        return (
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className={classes.section}>
                <Typography className={classes.title} gutterBottom>
                  {getStrings().ASK_TITLE}
                </Typography>
                <Typography variant="body2" className={classes.subtitle}>
                  {getStrings().ASK_SUBTITLE}
                </Typography>
                <div>
                  <TextField
                    className={classes.titleInput}
                    fullWidth
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    label={getStrings().ASK_INPUT_LABEL}
                    variant="outlined"
                  />
                  {errors.title && (
                    <ErrorMessage style={{ margin: '10px 15px 0px 0px' }} text={errors.title} />
                  )}
                </div>
              </div>
              <div className={classes.section}>
                <Typography className={classes.title} gutterBottom>
                  {getStrings().ASK_DESCRIPTION_TITLE}
                </Typography>
                <Typography variant="body2" className={classes.subtitle}>
                  {getStrings().ASK_DESCRIPTION_SUBTITLE}
                </Typography>
                <CKEditor
                  data={values.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setValues({ ...values, content: data });
                  }}
                />
                {errors.content && <ErrorMessage className={classes.error} text={errors.content} />}
              </div>
              <div className={classes.section}>
                <Typography variant="body2" className={classes.tagTitle}>
                  {getStrings().ASK_TAGS}
                </Typography>
                <Autocomplete
                  fullWidth
                  className={classes.autoComplete}
                  options={tags}
                  value={values.tags}
                  multiple
                  id="tags-outlined"
                  getOptionLabel={(option) => option.title}
                  getOptionSelected={(o1, o2) => o1.title === o2.title}
                  filterSelectedOptions
                  onChange={(_, selectedTags) => {
                    setValues({ ...values, tags: selectedTags });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label={getStrings().ASK_TAG_LABEL} />
                  )}
                />
                {errors.tags && <ErrorMessage className={classes.error} text={errors.tags} />}
              </div>
            </CardContent>
            {
              <div className={classes.submitButtonsParent}>
                <Q2aButton
                  type="submit"
                  onSubmit={handleSubmit}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  loading={isSubmitting}
                  shouldShowLoading={!(errors.title && errors.content && errors.tags)}
                  text={editMode ? getStrings().ASK_BUTTON_EDIT_SUBMIT : getStrings().ASK_BUTTON_SEND_SUBMIT}
                />
                {editMode && (
                  <Q2aButton
                    onSubmit={onEditFinished}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    loading={isSubmitting}
                    shouldShowLoading={!(errors.title && errors.content && errors.tags)}
                    text={getStrings().ASK_BUTTON_CANCEL}
                  />
                )}
              </div>
            }

            {errors.api && <ErrorMessage className={classes.error} text={errors.api} />}
          </form>
        );
      }}
    </Formik>
  );
};
EditQuestion.defaultProps = {
  editMode: false,
};
EditQuestion.propTypes = {
  editMode: PropTypes.bool.isRequired,
  editId: requiredIf(PropTypes.string, (props) => props.editMode),
  editTitle: requiredIf(PropTypes.string, (props) => props.editMode),
  editTags: requiredIf(PropTypes.array, (props) => props.editMode),
  editContent: requiredIf(PropTypes.string, (props) => props.editMode),
  onEditFinished: requiredIf(PropTypes.func, (props) => props.editMode),
};
export default EditQuestion;
