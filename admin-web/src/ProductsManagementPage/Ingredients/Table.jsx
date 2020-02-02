import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import { Lock, LockOpen, Edit } from '@material-ui/icons';
import { ingredientsActions } from '../../_actions';
import { RootPaper } from '../../_containers/RootPaper';
import { Pagination } from '../../_components';
import { Table } from '../../_components/Table';
import AddButton from './AddButton';
import CreateAndUpdateModal from './CreateAndUpdateModal';

const TableBlock = ({
  dispatch,
  ingredients,
  count,
  params,
  isCreated,
  isUpdated,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(ingredientsActions.getList(params));
  }, []);

  useEffect(() => {
    setModalIsVisible(false);
  }, [isCreated, isUpdated]);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(
      ingredientsActions.getList({ offset: limit * (page - 1), limit, page })
    );
  };

  const handleDisableIngredient = id => {
    dispatch(ingredientsActions.disable(id));
  };

  const handleEnableIngredient = id => {
    dispatch(ingredientsActions.enable(id));
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
        Header: 'Цена за килограмм',
        accessor: 'costPerKilo',
      },
      {
        Header: 'Статус',
        accessor: 'isEnabled',
        Cell: ({ row }) => {
          return row.original.isEnabled ? 'Активен' : 'Заблокирован';
        },
      },
      {
        Header: 'Опции',
        Cell: ({ row }) => (
          <>
            {row.original.isEnabled && (
              <Tooltip
                title="Заблокировать"
                onClick={() => handleDisableIngredient(row.original.id)}
              >
                <IconButton>
                  <Lock />
                </IconButton>
              </Tooltip>
            )}
            {!row.original.isEnabled && (
              <Tooltip title="Разблокировать">
                <IconButton
                  onClick={() => handleEnableIngredient(row.original.id)}
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
    []
  );

  return (
    <RootPaper>
      <Table columns={columns} data={ingredients} />
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
  const { ingredients, count, params, isCreated, isUpdated } = state.ingredient;
  return { ingredients, count, params, isCreated, isUpdated };
};

export default connect(mapStateToProps)(TableBlock);
