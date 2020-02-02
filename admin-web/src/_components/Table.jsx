import React from 'react';
import { useSortBy, useTable } from 'react-table';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { isEmpty } from 'lodash';
import { generate } from 'shortid';
import { RootPaper } from '../_containers/RootPaper';

export const Table = ({
  columns,
  data = [],
  emptyDataText = 'Нет данных',
  isLoading = false,
  ...options
}) => {
  const table = useTable({ columns, data, ...options }, useSortBy);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isEmpty(data)) {
    return <Typography align="center">{emptyDataText}</Typography>;
  }

  return (
    <MuiTable {...table.getTableProps()}>
      <TableHead>
        {table.headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell key={generate()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.rows.map(row => {
          table.prepareRow(row);
          return (
            <TableRow key={generate()} {...row.getRowProps()}>
              {row.cells.map(cell => (
                <TableCell key={generate()} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
};
