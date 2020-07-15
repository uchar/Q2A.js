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
import Layout from '../common/components/Layout/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 25,
    textAlign: 'right',
  },
  title: {
    fontSize: 26,
  },
  margin: {
    margin: theme.spacing(2),
  },
  button: {
    margin: '20px',
    padding: '10px 80px 10px 80px',
  },
}));

export default function Ask() {
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
    <Layout>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            عنوان
          </Typography>
          <Typography variant="body2" component="p">
            لطفا عنوان سوال خود را وارد کنید.
          </Typography>
          <div style={{ margin: '0px 25px 0px 25px' }}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount"> سوال</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={titleQuestion.TitleQuestion}
                onChange={handleChangeTitle('TitleQuestion')}
                labelWidth={50}
              />
            </FormControl>
          </div>

          <Typography className={classes.title} gutterBottom>
            متن سوال
          </Typography>
          <Typography variant="body2" component="p" className={classes.margin}>
            اطلاعات بیشتر درباره سوال:
          </Typography>
          <div style={{ margin: '0px 25px 0px 25px' }}>
            <TextEditor
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
          <Typography variant="body2" component="p">
            حداکثر 5 تگ را اضافه کنید.
          </Typography>
          <Autocomplete
            className={classes.margin}
            multiple
            id="tags-outlined"
            options={tags}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} variant="outlined" label="تگها" />}
          />
          <div style={{ display: 'inlineBlock', marginTop: '30px' }}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
              style={{}}
            />
            <Typography variant="body2" component="p" style={{}}>
              ایمیل بزن (hasanpour.narges8@gmail.com) اگر سوال من پاسخ داده شد یا دیدگاهی دریافت کردم.
            </Typography>
          </div>
        </CardContent>

        <CardActions>
          <Button onClick={handleClose} variant="contained" color="primary" className={classes.button}>
            کنسل
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary" className={classes.button}>
            ارسال
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
}
