import React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import LoginLayout from '../common/layouts/LoginLayout';
import ErrorMessage from '../common/components/ErrorMessage';
import Q2aButton from '../common/components/Q2aButton';
import { login } from '../API/utilities';
import GoogleLoginButton from '../common/components/GoogleLoginButton';
import { getStrings } from '../common/utlities/languageUtilities';

const styles = {
  submit: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 0, 3, 0),
    color: theme.backgroundColor,
  },
};

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <GoogleLoginButton buttonText={getStrings().SIGN_IN_GOOGLE} />
      <Divider style={{ margin: '25px 0px 25px 0px', height: '3px' }} />
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          try {
            await login(values.username, values.password);
            return router.replace('/');
          } catch (err) {
            setErrors({ api: err.toString() });
          }
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required('Required').min(6),
          username: Yup.string().required('Required').min(4),
        })}
      >
        {(props) => {
          const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = props;
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label={getStrings().SIGN_IN_EMAIL}
                name="username"
                autoComplete="username"
                value={values.username}
                onChange={handleChange}
                autoFocus
              />
              {errors.username && touched.username && <ErrorMessage text={errors.username} />}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={getStrings().SIGN_IN_PASSWORD}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && touched.password && <ErrorMessage text={errors.password} />}
              <Q2aButton
                type="submit"
                text={getStrings().SIGN_IN_TITLE}
                onSubmit={handleSubmit}
                sx={styles.submit}
                fullWidth={true}
                loading={isSubmitting}
                shouldShowLoading={!(errors.password && errors.username)}
              />
              {errors.api && <ErrorMessage style={{ marginBottom: '12px' }} text={errors.api} />}
              <div style={{ textAlign: 'center' }}>
                <Link prefetch={false} href={`/resetPassword`} variant="body2">
                  {getStrings().FORGET_PASSWORD}
                </Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px' }}>
                <Link prefetch={false} href={`/register`} variant="body2" style={{ flex: 1 }}>
                  {getStrings().Register}
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

Login.getLayout = (page) => <LoginLayout pageTitle={getStrings().SIGN_IN_TITLE}>{page}</LoginLayout>;

export default Login;
