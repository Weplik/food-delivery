import React from 'react';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { ACCESS_RIGHTS } from '../../../_utils';

export const TbodyTr = ({ role }) => (
  <TableRow>
    <TableCell>{role.id}</TableCell>
    <TableCell>{role.title}</TableCell>
    <TableCell>
      {ACCESS_RIGHTS.filter(right =>
        role.accessRights.includes(right.code)
      ).map(right => (
        <Typography>{right.title}</Typography>
      ))}
    </TableCell>
    <TableCell>{role.enabled ? 'Активна' : 'Заблокирована'}</TableCell>
    <TableCell>Опции</TableCell>
  </TableRow>
);
