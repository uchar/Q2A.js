import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: { display: 'flex', alignItems: 'center', height: '60%', alignSelf: 'center' },
  input: { ml: (theme) => theme.spacing(3), flex: 1 },
  search: { p: '10px' },
};
export default function SearchBar(props) {
  return (
    <Paper component="form" sx={{ ...props.sx, ...styles.root }}>
      <InputBase sx={styles.input} placeholder="Search " inputProps={{ 'aria-label': 'search' }} />
      <IconButton type="submit" sx={styles.search} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
