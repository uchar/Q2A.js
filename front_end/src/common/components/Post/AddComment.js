import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { doGraphQLMutation } from '../../../API/utilities';
import { ADD_COMMENT } from '../../../API/mutations';
import CKEditor from '../Editor/CKEditor';
import SaveCancelButtons from '../SaveCancelButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing(7, 5, 0, 5),
    justifyContent: 'left',
  },
}));

const AddComment = ({ className, enable, onCancel, postId }) => {
  const classes = useStyles();
  const [commentData, setCommentData] = React.useState('');
  const [APIError, setAPIError] = React.useState(null);

  const submitComment = async () => {
    try {
      if (commentData.length < 15) {
        setAPIError('حداقل تعداد کاراکتر برای پاسخ 15 است');
        return;
      }
      setAPIError(null);
      const resultObject = await doGraphQLMutation(ADD_COMMENT, {
        postId,
        content: commentData,
      });
      const result = resultObject.addComment;
      if (result.statusCode !== 'SUCCESS') {
        throw new Error(result.message);
      }
      window.location.reload();
    } catch (error) {
      setAPIError(error.toString());
    }
  };
  if (!enable) return <div />;
  return (
    <div className={`${classes.root} ${className}`} style={{}}>
      <CKEditor
        onChange={(event, editor) => {
          const data = editor.getData();
          setCommentData(data);
        }}
        toolbar={['bold', 'italic', 'code', 'link']}
      />
      <SaveCancelButtons onSave={submitComment} onCancel={onCancel} error={APIError} />
    </div>
  );
};

export default AddComment;
