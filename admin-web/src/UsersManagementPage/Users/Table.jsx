import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import { Lock, LockOpen, Edit } from '@material-ui/icons';
import { usersActions } from '../../_actions';
import { RootPaper } from '../../_containers/RootPaper';
import { Pagination } from '../../_components';
import { Table } from '../../_components/Table';
import CreateAndUpdateModal from './CreateAndUpdateModal';
import AddButton from './AddButton';

const TableBlock = ({
  dispatch,
  users,
  count,
  params,
  activeRoles,
  isUpdated,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(usersActions.getList(params));
    dispatch(usersActions.getActiveRoles());
  }, []);

  useEffect(() => {
    setModalIsVisible(false);
  }, [isUpdated]);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(usersActions.getList({ offset: limit * (page - 1), limit, page }));
  };

  const handleDisableUser = username => {
    dispatch(usersActions.disable(username));
  };

  const handleEnableUser = username => {
    dispatch(usersActions.enable(username));
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Логин',
        accessor: 'username',
      },
      {
        Header: 'ФИО',
        Cell: ({ row }) => `${row.original.lastname} ${row.original.firstname}`,
      },
      {
        Header: 'Роль',
        Cell: ({ row }) => `${row.original.role.title}`,
      },
      {
        Header: 'Статус',
        accessor: 'enabled',
        Cell: ({ row }) => {
          return row.original.enabled ? 'Активен' : 'Заблокирован';
        },
      },
      {
        Header: 'Опции',
        Cell: ({ row }) => (
          <>
            {row.original.enabled && (
              <Tooltip title="Заблокировать">
                <IconButton
                  onClick={() => handleDisableUser(row.original.username)}
                >
                  <Lock />
                </IconButton>
              </Tooltip>
            )}
            {!row.original.enabled && (
              <Tooltip title="Разблокировать">
                <IconButton
                  onClick={() => handleEnableUser(row.original.username)}
                >
                  <LockOpen />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Редактировать">
              <IconButton
                onClick={() => {
                  setModalIsVisible(true);
                  setSelectedRow(row.original);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    [modalIsVisible]
  );

  return (
    <RootPaper>
      <Table columns={columns} data={users} />
      <Pagination
        onChange={handleChangePage}
        perPage={params.limit}
        totalResults={count}
        currentPage={params.page}
      />
      <AddButton />
      <CreateAndUpdateModal
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        activeRoles={activeRoles}
        value={selectedRow}
      />
    </RootPaper>
  );
};

const mapStateToProps = state => {
  const { users, count, params, activeRoles, isUpdated } = state.user;
  return { users, count, params, activeRoles, isUpdated };
};

export default connect(mapStateToProps)(TableBlock);
