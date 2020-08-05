import React, { useEffect } from 'react';
import { Button, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRouter } from 'next/router';
import { getStrings } from '../../utlities/languageUtilities';
import { doGraphQLMutation, doGraphQLQuery } from '../../../API/utilities';
import { ADD_QUESTION, UPDATE_QUESTION } from '../../../API/mutations';
import ErrorMessage from '../ErrorMessage';
import CKEditor from '../Editor/CKEditor';
import { ALL_TAGS } from '../../../API/queries';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 26,
    textAlign: 'left',
  },
  margin: {
    margin: '25px 15px 0px 25px',
  },
  button: {
    margin: '0px 52px 30px 20px',
    padding: '10px 80px 10px 80px',
  },
}));

const EditQuestion = ({ editMode, editId, editTitle, editTags, editContent, onEditFinished }) => {
  const classes = useStyles();
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

  console.log('EDIT TAGS : ', editTags);
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
          const mutation = editMode ? ADD_QUESTION : UPDATE_QUESTION;
          const resultObject = await doGraphQLMutation(mutation, params);
          const result = editMode ? resultObject.updateQuestion : resultObject.addQuestion;
          if (result.statusCode !== 'SUCCESS') {
            throw new Error(result.message);
          }
          return router.replace(`${result.message}`);
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
              <div style={{ margin: '0px 15px 0px 25px' }}>
                <Typography className={classes.title} gutterBottom style={{ marginRight: '20px' }}>
                  {getStrings().ASK_TITLE}
                </Typography>
                <Typography variant="body2" component="p" style={{ marginRight: '20px', textAlign: 'right' }}>
                  {getStrings().ASK_SUBTITLE}
                </Typography>
                <div>
                  <TextField
                    style={{ marginLeft: '15px', textAlign: 'left' }}
                    className={classes.margin}
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
              <div style={{ margin: '30px 15px 0px 25px' }}>
                <Typography className={classes.title} gutterBottom style={{ marginRight: '10px' }}>
                  {getStrings().ASK_DESCRIPTION_TITLE}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ marginRight: '10px', marginBottom: '15px', textAlign: 'right' }}
                >
                  {getStrings().ASK_DESCRIPTION_SUBTITLE}
                </Typography>
                <CKEditor
                  className={classes.margin}
                  data={values.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log('DATA : ', data);
                    setValues({ ...values, content: data });
                  }}
                />
                {errors.content && (
                  <ErrorMessage style={{ margin: '10px 15px 0px 0px' }} text={errors.content} />
                )}
              </div>
              <div style={{ margin: '30px 10px 30px 25px' }}>
                <Typography variant="body2" component="p" style={{ marginRight: '15px', textAlign: 'right' }}>
                  {getStrings().ASK_TAGS}
                </Typography>
                <Autocomplete
                  fullWidth
                  className={classes.margin}
                  options={tags}
                  value={values.tags}
                  style={{ paddingLeft: '15px' }}
                  multiple
                  id="tags-outlined"
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  onChange={(_, selectedTags) => {
                    setValues({ ...values, tags: selectedTags });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label={getStrings().ASK_TAG_LABEL} />
                  )}
                />
                {errors.tags && <ErrorMessage style={{ margin: '10px 15px 0px 0px' }} text={errors.tags} />}
              </div>
            </CardContent>
            {
              <div style={{ flex: 1, flexDirection: 'row' }}>
                <Button
                  type="submit"
                  onSubmit={handleSubmit}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  loading={isSubmitting}
                  shouldShowLoading={!(errors.title && errors.content && errors.tags)}
                >
                  {editMode ? 'تایید' : getStrings().ASK_BUTTON_SENDING}
                </Button>
                {editMode && (
                  <Button
                    onClick={onEditFinished}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    loading={isSubmitting}
                    shouldShowLoading={!(errors.title && errors.content && errors.tags)}
                  >
                    {'لغو'}
                  </Button>
                )}
              </div>
            }

            {errors.api && <ErrorMessage style={{ margin: '-10px 15px 20px 0px' }} text={errors.api} />}
          </form>
        );
      }}
    </Formik>
  );
};
EditQuestion.defaultProps = {
  editMode: false,
};

export default EditQuestion;
