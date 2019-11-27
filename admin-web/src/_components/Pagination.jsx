import React, { useCallback } from 'react';
import { TablePagination } from '@material-ui/core';

export const Pagination = props => {
  const { perPage = 20, totalResults, currentPage, onChange } = props;

  const handleChangePage = useCallback((event, newPage) => {
    onChange(newPage + 1);
  }, []);

  return (
    <TablePagination
      component="div"
      count={totalResults}
      page={currentPage - 1}
      rowsPerPage={perPage}
      onChangePage={handleChangePage}
      labelRowsPerPage="Строк на странице"
      rowsPerPageOptions={[perPage]}
    />
  );
};
