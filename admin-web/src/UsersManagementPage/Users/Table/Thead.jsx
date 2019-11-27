import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

export const Thead = () => (
  <TableHead>
    <TableRow>
      <TableCell>Логин</TableCell>
      <TableCell>Фамилия</TableCell>
      <TableCell>Имя</TableCell>
      <TableCell>Роль</TableCell>
      <TableCell>Статус</TableCell>
      <TableCell>Опции</TableCell>
    </TableRow>
  </TableHead>
);
