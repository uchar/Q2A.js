import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import AskLayout from '../../common/layouts/AskLayout';
import EditQuestion from '../../common/components/Post/EditQuestion';
import Layout from '../../common/layouts/Layout';
import Post from './[id]/[title]';

const useStyles = makeStyles(() => ({}));

const Ask = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <EditQuestion />
    </Card>
  );
};

Ask.getLayout = (page) => <AskLayout>{page}</AskLayout>;
export default Ask;
