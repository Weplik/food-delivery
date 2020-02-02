import React, { useCallback } from 'react';
import { TablePagination } from '@material-ui/core';

export const Pagination = props => {
  const { perPage = 20, totalResults, currentPage, onChange } = props;

  const handleChangePage = useCallback((event, newPage) => {
    onChange(newPage + 1);
  }, []);

  if (totalResults > 0) {
    return (
      <TablePagination
        component="div"
        count={totalResults}
        page={currentPage - 1}
        rowsPerPage={perPage}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[perPage]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to === -1 ? count : to} из ${count}`
        }
      />
    );
  }

  return <></>;
};
