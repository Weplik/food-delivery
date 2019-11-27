import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

export const Thead = () => (
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Наименование</TableCell>
      <TableCell>Права</TableCell>
      <TableCell>Статус</TableCell>
      <TableCell>Опции</TableCell>
    </TableRow>
  </TableHead>
);
