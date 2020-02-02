import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import { Lock, LockOpen, Edit } from '@material-ui/icons';
import { generate } from 'shortid';
import { rolesActions } from '../../_actions';
import { RootPaper } from '../../_containers/RootPaper';
import { Pagination } from '../../_components';
import { Table } from '../../_components/Table';
import { ACCESS_RIGHTS } from '../../_utils';
import CreateAndUpdateModal from './CreateAndUpdateModal';
import AddButton from './AddButton';

const TableBlock = ({
  dispatch,
  roles,
  count,
  params,
  isCreated,
  isUpdated,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(rolesActions.getList(params));
  }, []);

  useEffect(() => {
    setModalIsVisible(false);
  }, [isCreated, isUpdated]);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(rolesActions.getList({ offset: limit * (page - 1), limit, page }));
  };

  const handleDisableRole = id => {
    dispatch(rolesActions.disable(id));
  };

  const handleEnableRole = id => {
    dispatch(rolesActions.enable(id));
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
      },
      {
        Header: 'Наименование',
        accessor: 'title',
      },
      {
        Header: 'Права',
        accessor: 'accessRights',
        Cell: ({ row }) => (
          <>
            {ACCESS_RIGHTS.filter(right =>
              row.original.accessRights.includes(right.code)
            ).map(right => (
              <Typography key={generate()}>{right.title}</Typography>
            ))}
          </>
        ),
      },
      {
        Header: 'Статус',
        accessor: 'enabled',
        Cell: ({ row }) => {
          return row.original.enabled ? 'Активна' : 'Заблокирована';
        },
      },
      {
        Header: 'Опции',
        accessor: 'options',
        Cell: ({ row }) => (
          <>
            {row.original.enabled && (
              <Tooltip title="Заблокировать">
                <IconButton onClick={() => handleDisableRole(row.original.id)}>
                  <Lock />
                </IconButton>
              </Tooltip>
            )}
            {!row.original.enabled && (
              <Tooltip title="Разблокировать">
                <IconButton onClick={() => handleEnableRole(row.original.id)}>
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
    []
  );

  return (
    <RootPaper>
      <Table columns={columns} data={roles} />
      <Pagination
        onChange={handleChangePage}
        perPage={params.limit}
        totalResults={count}
        currentPage={params.page}
      />
      <CreateAndUpdateModal
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        value={selectedRow}
      />
      <AddButton />
    </RootPaper>
  );
};

const mapStateToProps = state => {
  const { roles, count, params, isCreated, isUpdated } = state.role;
  return { roles, count, params, isCreated, isUpdated };
};

export default connect(mapStateToProps)(TableBlock);
