import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import LoginLayout from '../common/components/Layout/LoginLayout';
import ErrorMessage from '../common/components/ErrorMessage/ErrorMessage';
import CardButton from '../common/components/CardButton/CardButton';
import { getStrings } from '../common/utilities';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: '10px',
    padding: '15px 0px 15px 0px',
    color: theme.backgroundColor,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState(null);

  return (
    <LoginLayout pageTitle={getStrings().SIGN_IN_TITLE}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          console.log(values);
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
              {submitError && (
                <Typography variant="p" style={{ color: 'red', fontSize: 11 }}>
                  {submitError}
                </Typography>
              )}
              <CardButton
                type="submit"
                text={getStrings().SIGN_IN_TITLE}
                onSubmit={handleSubmit}
                className={classes.submit}
                fullWidth={true}
                loading={isSubmitting}
                shouldShowLoading={!(errors.password && errors.username)}
              />
              <div style={{ textAlign: 'center' }}>
                <Link href="/resetPassword" variant="body2">
                  {getStrings().FORGET_PASSWORD}
                </Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px' }}>
                <Link href="/register" variant="body2" style={{ flex: 1 }}>
                  {getStrings().Register}
                </Link>
              </div>
              {/* <CardButton */}
              {/*  type="submit" */}
              {/*  text="گوگل" */}
              {/*  onSubmit={handleSubmit} */}
              {/*  fullWidth={true} */}
              {/*  loading={isSubmitting} */}
              {/*  shouldShowLoading={!(errors.password && errors.email)} */}
              {/* /> */}
              {/* <CardButton */}
              {/*  type="submit" */}
              {/*  text="لینکداین" */}
              {/*  onSubmit={handleSubmit} */}
              {/*  fullWidth={true} */}
              {/*  loading={isSubmitting} */}
              {/*  shouldShowLoading={!(errors.password && errors.email)} */}
              {/* /> */}
            </form>
          );
        }}
      </Formik>
    </LoginLayout>
  );
}
