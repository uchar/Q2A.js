import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import LoginLayout from '../common/components/Layout/LoginLayout';
import ErrorMessage from '../common/components/ErrorMessage/ErrorMessage';
import CardButton from '../common/components/CardButton/CardButton';
import { getStrings } from '../common/utilities';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '220%',
    marginTop: theme.spacing(1),
    padding: '20px 50px 20px 50px',
  },
  submit: {
    marginTop: '10px',
    padding: '15px 0px 15px 0px',
    color: '#ffffff',
  },
}));

export default function Register() {
  const classes = useStyles();

  const makerFormError = (errors) => {
    let formError = '';
    if (errors.email && !errors.name) {
      formError = 'Email is required';
    } else if (errors.name && !errors.email) {
      formError = 'Name is required';
    } else if (errors.name && errors.email) {
      formError = 'Name,Email is required';
    }
    return formError;
  };
  return (
    <LoginLayout pageTitle={getStrings().Register_TITLE}>
      <Formik
        initialValues={{ email: '', name: '' }}
        onSubmit={(values) => {}}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Email is required'),
          name: Yup.string().required('Name is required'),
        })}
      >
        {(props) => {
          const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = props;
          return (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="email"
                label={getStrings().Register_EMAIL}
                variant="outlined"
                value={values.email.toLowerCase()}
                onChange={handleChange}
                style={{ flex: 1 }}
                fullWidth
              />
              {errors.email && touched.email && <ErrorMessage text={errors.email} />}
              <TextField
                id="name"
                label={getStrings().Register_NAME}
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                style={{ marginTop: '20px' }}
                fullWidth
              />
              {errors.name && touched.name && <ErrorMessage text={errors.name} />}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={getStrings().Register_PASSWORD}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && touched.password && <ErrorMessage text={errors.password} />}
              {((errors.name && touched.name) || (errors.email && touched.email)) && (
                <ErrorMessage text={makerFormError(errors)} />
              )}
              <CardButton
                text={getStrings().Register_TITLE}
                fullWidth={true}
                onSubmit={handleSubmit}
                className={classes.submit}
                loading={isSubmitting}
                shouldShowLoading={!(errors.name && touched.name && errors.email && touched.email)}
              />
            </form>
          );
        }}
      </Formik>
    </LoginLayout>
  );
}
