import * as React from 'react';
import Pagination from '@material-ui/core/Pagination';
import Stack from '@material-ui/core/Stack';
import PropTypes from 'prop-types';

const styles = {
  root: {
    marginTop: (theme) => theme.spacing(5),
    alignItems: 'center',
  },
};
export default function PaginationRounded({ pageCount, onChange }) {
  const handlePageChange = async (event, page) => {
    return onChange(page);
  };
  return (
    <Stack sx={styles.root} spacing={1}>
      <Pagination
        onChange={handlePageChange}
        count={pageCount}
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

PaginationRounded.propTypes = {
  onChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};
