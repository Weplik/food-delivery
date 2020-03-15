import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { Edit, Lock, LockOpen } from '@material-ui/icons';
import { productActions } from '../../_actions';
import { RootPaper } from '../../_containers/RootPaper';
import { Table } from '../../_components/Table';
import { Pagination } from '../../_components';
import AddButton from './AddButton';
import CreateAndUpdateModal from './CreateAndUpdateModal';

const TableBlock = ({
  dispatch,
  products,
  count,
  params,
  isUpdated,
  activeIngredients,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(productActions.getList(params));
    dispatch(productActions.getActiveIngredients());
  }, []);

  useEffect(() => {
    setModalIsVisible(false);
  }, [isUpdated]);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(
      productActions.getList({ offset: limit * (page - 1), limit, page })
    );
  };

  const handleDisableUser = id => {
    dispatch(productActions.disable(id));
  };

  const handleEnableUser = id => {
    dispatch(productActions.enable(id));
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Наименование',
        accessor: 'title',
      },
      {
        Header: 'Описание',
        accessor: 'description',
      },
      {
        Header: 'Фото',
        Cell: ({ row }) => `<img src="${row.original.imageUrl}">`,
      },
      {
        Header: 'Информация',
        Cell: ({ row }) => (
          <>
            <Typography>
              {'Калорийность: '}
              {row.original.calorieContent}
            </Typography>
            <Typography>
              {'Вес: '}
              {row.original.weight}
            </Typography>
            <Typography>
              {'Себестоимость: '}
              {row.original.primeCost}
            </Typography>
            <Typography>
              {'Цена: '}
              {row.original.cost}
            </Typography>
          </>
        ),
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
              <Tooltip title="Заблокировать">
                <IconButton onClick={() => handleDisableUser(row.original.id)}>
                  <Lock />
                </IconButton>
              </Tooltip>
            )}
            {!row.original.isEnabled && (
              <Tooltip title="Разблокировать">
                <IconButton onClick={() => handleEnableUser(row.original.id)}>
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
      <Table columns={columns} data={products} />
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
        activeIngredients={activeIngredients}
        value={selectedRow}
      />
    </RootPaper>
  );
};

const mapStateToProps = state => {
  const {
    products,
    count,
    params,
    isCreated,
    isUpdated,
    activeIngredients,
  } = state.product;
  return { products, count, params, isCreated, isUpdated, activeIngredients };
};

export default connect(mapStateToProps)(TableBlock);
