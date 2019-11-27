import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody } from '@material-ui/core';
import { TbodyTr } from './TbodyTr';
import { rolesActions } from '../../../_actions';
import { Thead } from './Thead';
import { RootPaper } from '../../../_containers/RootPaper';
import { Pagination } from '../../../_components';

const TableRoles = ({ dispatch, roles, count, params }) => {
  useEffect(() => {
    dispatch(rolesActions.getList(params));
  }, []);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(rolesActions.getList({ offset: limit * (page - 1), limit, page }));
  };

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
      <Pagination
        onChange={handleChangePage}
        perPage={params.limit}
        totalResults={count}
        currentPage={params.page}
      />
    </RootPaper>
  );
};

const mapStateToProps = state => {
  const { roles, count, params } = state.role;
  return { roles, count, params };
};

export default connect(mapStateToProps)(TableRoles);
