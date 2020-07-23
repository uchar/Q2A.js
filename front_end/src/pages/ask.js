import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextEditor from '../common/components/TextEditor';
import { getStrings } from '../common/utilities';
import AskLayout from '../common/components/Layout/AskLayout';
import { doGraphQLQuery } from '../API/utilities';
import { ALL_TAGS} from '../API/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    textAlign: 'right',
  },
  title: {
    fontSize: 26,
  },
  margin: {
    margin: '25px 15px 0px 25px',
  },
  button: {
    margin: '20px 52px 30px 20px',
    padding: '10px 80px 10px 80px',
  },
}));

const Ask = () => {
  const classes = useStyles();
  const [titleQuestion, setTitleQuestion] = React.useState({ TitleQuestion: '' });
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [tags, setTags] = React.useState([
    { title: 'c' },
    { title: 'c++' },
    { title: 'c#' },
    { title: 'java' },
  ]);
  const handleChangeTitle = (prop) => (event) => {
    setTitleQuestion({ ...titleQuestion, [prop]: event.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <AskLayout >
      <Card className={classes.root}>
        <CardContent>
          <div style={{ margin: '0px 25px 0px 25px' }}>
            <Typography className={classes.title} gutterBottom style={{ marginRight: '20px' }}>
              {getStrings().ASK_TITLE}
            </Typography>
            <Typography variant="body2" component="p" style={{ marginRight: '20px' }}>
              {getStrings().ASK_SUBTITLE}
            </Typography>
            <div style={{ marginLeft: '15px' }}>
              <FormControl className={classes.margin} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">{getStrings().ASK_INPUT_LABEL} </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={titleQuestion.TitleQuestion}
                  onChange={handleChangeTitle('TitleQuestion')}
                  labelWidth={50}
                />
              </FormControl>
            </div>
          </div>
          <div style={{ margin: '30px 25px 0px 25px' }}>
            <Typography className={classes.title} gutterBottom style={{ marginRight: '20px' }}>
              {getStrings().ASK_DESCRIPTION_TITLE}
            </Typography>
            <Typography variant="body2" component="p" style={{ marginRight: '20px', marginBottom: '15px' }}>
              {getStrings().ASK_DESCRIPTION_SUBTITLE}
            </Typography>
            <TextEditor
              className={classes.margin}
              data=""
              onInit={(editor) => {
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </div>
          <div style={{ margin: '30px 25px 30px 25px' }}>
            <Typography variant="body2" component="p" style={{ marginRight: '20px' }}>
              {getStrings().ASK_TAGS}
            </Typography>
            <div style={{ marginLeft: '15px' }}>
              <Autocomplete
                fullWidth
                className={classes.margin}
                multiple
                id="tags-outlined"
                options={tags}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label={getStrings().ASK_TAG_LABEL} />
                )}
              />
            </div>
          </div>
          <div style={{ display: 'inline', margin: '30px 35px 0px 25px' }}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              style={{ display: 'inlineBlock' }}
            />
            <Typography variant="body2" component="p" style={{ display: 'inline' }}>
              {getStrings().ASK_CHECKOUT}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleClose} variant="contained" color="primary" className={classes.button}>
            {getStrings().ASK_BUTTON_SENDING}
          </Button>
        </CardActions>
      </Card>
    </AskLayout>
  );
};

export default Ask;
