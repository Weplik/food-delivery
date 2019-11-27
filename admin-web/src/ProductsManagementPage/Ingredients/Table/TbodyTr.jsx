import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

export const TbodyTr = ({ ingredient }) => (
  <TableRow>
    <TableCell>{ingredient.id}</TableCell>
    <TableCell>{ingredient.title}</TableCell>
    <TableCell>{ingredient.costPerKilo}</TableCell>
    <TableCell>{ingredient.isEnabled ? 'Активен' : 'Заблокирован'}</TableCell>
    <TableCell>Опции</TableCell>
  </TableRow>
);
