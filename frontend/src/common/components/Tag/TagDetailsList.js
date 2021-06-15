import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import TagDetailBox from './TagDetailBox';
import { getStrings } from '../../utlities/languageUtilities';
import Q2aButton from '../Q2aButton';

const styles = {
  root: { padding: (theme) => theme.spacing(2) },
  pageTitle: {
    textAlign: 'initial',
    margin: (theme) => theme.spacing(5, 2, 0, 2),
    fontSize: '25px',
    fontWeight: 700,
  },
  pageSubTitle: {
    textAlign: 'initial',
    margin: (theme) => theme.spacing(1, 2, 0, 2),
    fontSize: '14px',
    fontWeight: 500,
  },
  buttonAddTag: {
    marginTop: (theme) => theme.spacing(6),
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default function TagDetailsList({ tags }) {
  return (
    <div>
      <Typography sx={styles.pageTitle} variant={'h1'}>
        {getStrings().TAGS_PAGE_TITLE}
      </Typography>
      <Typography sx={styles.pageSubTitle} variant={'subtitle1'}>
        {getStrings().TAGS_PAGE_DESCRIPTION}
      </Typography>
      {/* <Button variant="contained" color="primary" sx={styles.button} startIcon={<AddIcon />}> */}
      {/*  Add Tag */}
      {/* </Button> */}
      <Box sx={styles.buttonAddTag}>
        <Q2aButton
          sx={styles.buttons}
          shouldShowLoading={false}
          text={'Add Tag'}
          backgroundColor={'secondary'}
        />
      </Box>
      <Grid container justify={'center'} spacing={2} sx={styles.root}>
        {tags &&
          tags.map((tag) => (
            <Grid item key={tag.id} md={4} xs={6}>
              <TagDetailBox tag={tag.title} description={tag.content} count={tag.used} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
TagDetailsList.propTypes = {
  tags: PropTypes.array.isRequired,
};
