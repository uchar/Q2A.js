import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import TagDetailBox from './TagDetailBox';
import { getStrings } from '../../utlities/languageUtilities';
import Q2aButton from '../Q2aButton';
import { ALL_TAGS_ACTION, ADD_TAG_ACTION } from '../../../redux/constants';
import { doGraphQLQuery, isAccessLevelEnough, USER_ACTIONS } from '../../../API/utility';
import { getFirstItemFromJSON } from '../../utlities/generalUtilities';
import { GET_ALL_TAGS_DATA } from '../../constants';

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
  const dispatch = useDispatch();
  const [isAccessEnough, setIsAccessEnough] = React.useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const isEnough = await isAccessLevelEnough(USER_ACTIONS.EDIT_TAG);
      setIsAccessEnough(isEnough);
    };
    getUserId();
  }, []);

  const handleSubmit = async () => {
    dispatch({ type: ADD_TAG_ACTION, payload: { operationMode: 'addMode' } });
  };

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant={'h1'}>
        {getStrings().TAGS_PAGE_TITLE}
      </Typography>
      <Typography sx={styles.pageSubTitle} variant={'subtitle1'}>
        {getStrings().TAGS_PAGE_DESCRIPTION}
      </Typography>
      {isAccessEnough && (
        <Box sx={styles.buttonAddTag}>
          <Q2aButton
            onSubmit={handleSubmit}
            sx={styles.buttons}
            shouldShowLoading={false}
            text={'Add Tag'}
            backgroundColor={'secondary'}
          />
        </Box>
      )}
      <Grid container justify={'center'} spacing={2} sx={styles.root}>
        {tags &&
          tags.map((tag) => (
            <Grid item key={tag.id} md={4} xs={6}>
              <TagDetailBox
                tag={tag.title}
                description={tag.content}
                count={tag.used}
                operationMode={tag.operationMode}
                id={tag.id}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
TagDetailsList.propTypes = {
  tags: PropTypes.array.isRequired,
};
