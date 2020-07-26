import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import SaveIcon from '@material-ui/icons/Lock';
import LinkedIn from 'linkedin-login-for-react';
import LoginLayout from '../common/components/Layout/LoginLayout';
import ErrorMessage from '../common/components/ErrorMessage/ErrorMessage';
import CardButton from '../common/components/CardButton/CardButton';
import { getStrings } from '../common/utilities';
import { doGraphQLQuery, login } from '../API/utilities';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: '10px',
    padding: '15px 0px 15px 0px',
    color: theme.backgroundColor,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <LoginLayout pageTitle={getStrings().SIGN_IN_TITLE}>
      <GoogleLogin
        render={(renderProps) => (
          <div style={{ textAlign: 'center', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ width: '65%', justifyContent: 'space-between', fontSize: '18px' }}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={classes.button}
              endIcon={
                <img
                  src={'/images/google.png'}
                  style={{ margin: '5px 0px 5px -12px', height: '25px', textAlign: 'left' }}
                />
              }
            >
              {'ورود با گوگل'}
            </Button>
          </div>
        )}
        clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
        buttonText="Login"
        onSuccess={(response) => {
          console.log('SUCCESS', response);
        }}
        onFailure={(response) => {
          console.log('Error', response);
        }}
        cookiePolicy={'single_host_origin'}
      />
      <Divider style={{ margin: '25px 0px 25px 0px', height: '3px' }} />

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const result = await login(values.username, values.password);
            console.log('RESULT OF LOGIN : ', result);
            return router.replace('/');
          } catch (err) {
            setErrors({ api: err.toString() });
          }
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required('Required').min(6),
          username: Yup.string().required('Required').min(6),
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
              <CardButton
                type="submit"
                text={getStrings().SIGN_IN_TITLE}
                onSubmit={handleSubmit}
                className={classes.submit}
                fullWidth={true}
                loading={isSubmitting}
                shouldShowLoading={!(errors.password && errors.username)}
              />
              {errors.api && <ErrorMessage style={{ marginBottom: '12px' }} text={errors.api} />}
              <div style={{ textAlign: 'center' }}>
                <Link prefetch={false} href="/resetPassword" variant="body2">
                  {getStrings().FORGET_PASSWORD}
                </Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px' }}>
                <Link prefetch={false} href="/register" variant="body2" style={{ flex: 1 }}>
                  {getStrings().Register}
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </LoginLayout>
  );
}
