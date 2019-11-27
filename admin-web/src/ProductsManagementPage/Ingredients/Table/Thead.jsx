import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

export const Thead = () => (
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Наименование</TableCell>
      <TableCell>Цена за кг.</TableCell>
      <TableCell>Статус</TableCell>
      <TableCell>Опции</TableCell>
    </TableRow>
  </TableHead>
);
