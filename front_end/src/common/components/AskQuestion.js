import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 25,
    textAlign: 'right',
  },
  title: {
    fontSize: 26,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AskQuestion() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          عنوان
        </Typography>
        <Typography variant="body2" component="p">
          لطفا عنوان سوال خود را وارد کنید.
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
