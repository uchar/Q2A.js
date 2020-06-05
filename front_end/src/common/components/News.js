import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    width: 70,
    height: 70,
    marginRight: '15px',
  },
}));

export default function QuestionItem() {
  return (
    <div>
      <Box
        boxShadow={2}
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          minHeight: '300px',
          marginTop: '25px',
        }}
      >
        <Typography style={{ fontSize: '17px', paddingTop: '10px' }}>Latest post on blog</Typography>
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '15px',
            paddingBottom: '10px',
          }}
        >
          7khatcode with new UI is here
        </Typography>
        <Divider style={{ padding: '0px 12px 0px 12px' }} />
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          How to traing a capsule network?
        </Typography>
        <Divider />
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          Choose the right framework for your..
        </Typography>
        <Divider />
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          New version of unity is here{' '}
        </Typography>
        <Divider />
      </Box>
      <Box
        boxShadow={2}
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          minHeight: '300px',
          marginTop: '25px',
        }}
      >
        <Typography style={{ fontSize: '17px', paddingTop: '10px' }}>Job Opportunities</Typography>
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '15px',
            paddingBottom: '10px',
          }}
        >
          Senior C++ Developer at Farapardaz
        </Typography>
        <Divider style={{ padding: '0px 12px 0px 12px' }} />
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          Junior Java developer
        </Typography>
        <Divider />
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          Full stack developer
        </Typography>
        <Divider />
        <Typography
          style={{
            textDecorationLine: 'underline',
            fontSize: '12px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          Technical Advisor at fbsaz
        </Typography>
        <Divider />
      </Box>
    </div>
  );
}
