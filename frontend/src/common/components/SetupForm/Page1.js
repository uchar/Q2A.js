import React from 'react';
import { TextField, Box, Divider } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../ErrorMessage';
import Q2aButton from '../Q2aButton';
import { getStrings } from '../../utlities/languageUtilities';
import AdminSetupFormLayout from './AdminSetupFormLayout';

const styles = {
  submit: {
    margin: (theme) => theme.spacing(1, 0),
    padding: (theme) => theme.spacing(2, 5),
    color: (theme) => theme.backgroundColor,
  },
};

const Page1 = () => {
  return (
    <Box style={{ margin: '100px 0px 25px 0px', height: '3px' }}>
      <Divider style={{ margin: '25px 0px 25px 0px', height: '3px' }} />
      <Formik
        initialValues={{ username: '', password: '' }}
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
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

Page1.getLayout = (page) => <AdminSetupFormLayout pageTitle="Form">{page}</AdminSetupFormLayout>;

export default Page1;
