import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody } from '@material-ui/core';
import { TbodyTr } from './TbodyTr';
import { usersActions} from '../../../_actions';
import { Thead } from './Thead';
import { RootPaper } from '../../../_containers/RootPaper';
import { Pagination } from '../../../_components';

const TableBlock = ({ dispatch, users, count, params }) => {
  useEffect(() => {
    dispatch(usersActions.getList(params));
  }, []);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(usersActions.getList({ offset: limit * (page - 1), limit, page }));
  };

  return (
    <RootPaper>
      <Table>
        <Thead />
        <TableBody>
          {users.map(user => (
            <TbodyTr key={user.username} user={user} />
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
  const { users, count, params } = state.user;
  return { users, count, params };
};

export default connect(mapStateToProps)(TableBlock);
