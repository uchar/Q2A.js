import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, TextField, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextEditor from '../common/components/TextEditor';
import { getStrings } from '../common/utilities';
import AskLayout from '../common/components/Layout/AskLayout';
import { ALL_TAGS } from '../API/queries';
import { doGraphQLQuery } from '../API/utilities';
import ErrorMessage from '../common/components/ErrorMessage/ErrorMessage';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 25,
    textAlign: 'right',
  },
  title: {
    fontSize: 26,
  },
  margin: {
    margin: '25px 15px 0px 25px',
  },
  button: {
    margin: '0px 52px 30px 20px',
    padding: '10px 80px 10px 80px',
  },
}));

const Ask = () => {
  const classes = useStyles();
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

  return (
    <AskLayout>
      <Card className={classes.root}>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            console.log('VALUES : ', values);
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
                    <Typography variant="body2" component="p" style={{ marginRight: '20px' }}>
                      {getStrings().ASK_SUBTITLE}
                    </Typography>
                    <div>
                      <TextField
                        style={{ marginLeft: '15px', textAlign: 'left' }}
                        className={classes.margin}
                        fullWidth
                        id="title"
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
                      style={{ marginRight: '10px', marginBottom: '15px' }}
                    >
                      {getStrings().ASK_DESCRIPTION_SUBTITLE}
                    </Typography>
                    <TextEditor
                      className={classes.margin}
                      data=""
                      onInit={(editor) => {
                        console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setValues({ content: data });
                      }}
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                      }}
                    />
                    {errors.content && (
                      <ErrorMessage style={{ margin: '10px 15px 0px 0px' }} text={errors.content} />
                    )}
                  </div>
                  <div style={{ margin: '30px 10px 30px 25px' }}>
                    <Typography variant="body2" component="p" style={{ marginRight: '15px' }}>
                      {getStrings().ASK_TAGS}
                    </Typography>
                    <Autocomplete
                      fullWidth
                      className={classes.margin}
                      style={{ paddingLeft: '15px' }}
                      multiple
                      id="tags-outlined"
                      options={tags}
                      getOptionLabel={(option) => option.title}
                      filterSelectedOptions
                      onChange={(_, tags) => {
                        setValues({ tags });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" label={getStrings().ASK_TAG_LABEL} />
                      )}
                    />
                    {errors.tags && (
                      <ErrorMessage style={{ margin: '10px 15px 0px 0px' }} text={errors.tags} />
                    )}
                  </div>
                  {/* <div style={{ display: 'inline', margin: '30px 35px 0px 25px' }}> */}
                  {/*  <Checkbox */}
                  {/*    checked={checked} */}
                  {/*    onChange={handleChange} */}
                  {/*    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} */}
                  {/*    style={{ display: 'inlineBlock' }} */}
                  {/*  /> */}
                  {/*  <Typography variant="body2" component="p" style={{ display: 'inline' }}> */}
                  {/*    {getStrings().ASK_CHECKOUT} */}
                  {/*  </Typography> */}
                  {/* </div> */}
                </CardContent>
                <CardActions>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    {getStrings().ASK_BUTTON_SENDING}
                  </Button>
                </CardActions>
              </form>
            );
          }}
        </Formik>
      </Card>
    </AskLayout>
  );
};

export default Ask;
