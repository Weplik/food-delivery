import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

export const TbodyTr = ({ user }) => (
  <TableRow>
    <TableCell>{user.username}</TableCell>
    <TableCell>{user.lastname}</TableCell>
    <TableCell>{user.firstname}</TableCell>
    <TableCell>{user.role.title}</TableCell>
    <TableCell>{user.enabled ? 'Активен' : 'Заблокирован'}</TableCell>
    <TableCell>Опции</TableCell>
  </TableRow>
);
