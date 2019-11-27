import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody } from '@material-ui/core';
import { TbodyTr } from './TbodyTr';
import { rolesActions } from '../../../_actions';
import { Thead } from './Thead';
import { RootPaper } from '../../../_containers/RootPaper';

const TableRoles = ({ dispatch, roles = [], count = 0 }) => {
  useEffect(() => {
    dispatch(rolesActions.getList());
  }, []);

  return (
    <RootPaper>
      <Table>
        <Thead />
        <TableBody>
          {roles.map(role => (
            <TbodyTr key={role.id} role={role} />
          ))}
        </TableBody>
      </Table>
    </RootPaper>
  );
};

const mapStateToProps = state => {
  const { roles, count } = state.role;
  return { roles, count };
};

export default connect(mapStateToProps)(TableRoles);
