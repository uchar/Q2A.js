import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Divider } from '@material-ui/core';
import LoginLayout from '../common/layouts/LoginLayout';
import ErrorMessage from '../common/components/ErrorMessage';
import Q2aButton from '../common/components/Q2aButton';
import { login, signUp } from '../API/utilities';
import GoogleLoginButton from '../common/components/GoogleLoginButton';
import { getStrings } from '../common/utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '220%',
    marginTop: theme.spacing(1),
    padding: theme.spacing(4, 10, 4, 10),
  },
  submit: {
    marginTop: '10px',
    padding: '15px 0px 15px 0px',
    color: '#ffffff',
  },
}));

const Register = () => {
  const classes = useStyles();
  const router = useRouter();

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
    <div>
      <GoogleLoginButton buttonText={getStrings().SIGN_IN_GOOGLE}  />
      <Divider style={{ margin: '25px 0px 25px 0px', height: '3px' }} />

      <Formik
        initialValues={{ email: '', name: '' }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const result = await signUp(values.email, values.username, values.password);
            return router.replace('/');
          } catch (err) {
            setErrors({ api: err.toString() });
          }
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Email is required'),
          username: Yup.string().required('Email is required').min(6),
          password: Yup.string().required('Name is required').min(6),
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
                id="username"
                label={getStrings().Register_NAME}
                variant="outlined"
                value={values.username}
                onChange={handleChange}
                style={{ marginTop: '20px' }}
                fullWidth
              />
              {errors.username && touched.username && <ErrorMessage text={errors.username} />}
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
              {errors.api && <ErrorMessage style={{ marginTop: '18px' }} text={errors.api} />}
              <Q2aButton
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
    </div>
  );
};

Register.getLayout = (page) => <LoginLayout pageTitle={getStrings().Register_TITLE}>{page}</LoginLayout>;

export default Register;
