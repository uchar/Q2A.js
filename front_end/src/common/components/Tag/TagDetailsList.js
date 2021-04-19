import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import TagDetailBox from './TagDetailBox';
import { getStrings } from '../../utlities/languageUtilities';

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
