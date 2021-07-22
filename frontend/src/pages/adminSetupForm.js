import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '../common/components/SetupForm/Slider';
import AdminSetupFormLayout from '../common/components/SetupForm/AdminSetupFormLayout';

const adminSetupForm = () => {
  return (
    <Box>
      <Slider />
    </Box>
  );
};
adminSetupForm.getLayout = (page) => <AdminSetupFormLayout pageTitle="Form">{page}</AdminSetupFormLayout>;

export default adminSetupForm;
