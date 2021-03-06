import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import requiredIf from 'react-required-if';
import { doGraphQLMutation, doGraphQLQuery } from '../../../API/utility';
import CKEditor from '../Editor/CKEditor';
import SaveCancelButtons from '../SaveCancelButtons';
import { getFirstItemFromJSON } from '../../utlities/generalUtilities';

const styles = {
  root: {
    flex: 1,
    padding: (theme) => theme.spacing(7, 5, 0, 5),
    justifyContent: 'left',
  },
};

const AddComment = ({
  enable,
  onClose,
  postId,
  rootId,
  refreshQuery,
  reduxRefreshAction,
  addCommentMutation,
}) => {
  const dispatch = useDispatch();
  const [commentData, setCommentData] = React.useState('');
  const [APIError, setAPIError] = React.useState(null);

  const refreshPost = async () => {
    const getData = await doGraphQLQuery(refreshQuery, { id: rootId });
    dispatch({ type: reduxRefreshAction, payload: getFirstItemFromJSON(getData) });
  };

  const submitComment = async () => {
    try {
      if (commentData.length < 15) {
        setAPIError('حداقل تعداد کاراکتر برای پاسخ 15 است');
        return;
      }
      setAPIError(null);
      const resultObject = await doGraphQLMutation(addCommentMutation, {
        postId,
        content: commentData,
      });
      const result = getFirstItemFromJSON(resultObject);
      if (result.statusCode !== 'SUCCESS') {
        throw new Error(result.message);
      }
      await refreshPost();
      onClose();
    } catch (error) {
      setAPIError(error.toString());
    }
  };
  if (!enable) return <div />;
  return (
    <Box sx={styles.root}>
      <CKEditor
        onChange={(event, editor) => {
          const data = editor.getData();
          setCommentData(data);
        }}
        toolbar={['bold', 'italic', 'code', 'link']}
      />
      <SaveCancelButtons onSave={submitComment} onCancel={onClose} error={APIError} />
    </Box>
  );
};

AddComment.defaultProps = {
  editMode: false,
};
AddComment.propTypes = {
  enable: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  rootId: PropTypes.string.isRequired,
  refreshQuery: requiredIf(PropTypes.object, (props) => props.editMode),
  reduxRefreshAction: requiredIf(PropTypes.string, (props) => props.editMode),
  addCommentMutation: requiredIf(PropTypes.object, (props) => !props.editMode),
};
export default AddComment;
