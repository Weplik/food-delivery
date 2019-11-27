import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { columns } from './default-params';
import { rolesActions } from '../../../_actions';

const Table = ({ dispatch, roles = [], count = 0 }) => {
  useEffect(() => {
    dispatch(rolesActions.getList());
  });

  return <MaterialTable columns={columns} data={roles} />;
};

const mapStateToProps = state => {
  const { roles, count } = state.role;
  return { roles, count };
};

export default connect(mapStateToProps)(Table);
