import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { clientActions } from '../_actions/client.actions';
import { RootPaper } from '../_containers/RootPaper';
import { Table } from '../_components/Table';
import { Pagination } from '../_components';

const TableBlock = ({ dispatch, clients, count, params }) => {
  useEffect(() => {
    dispatch(clientActions.getList(params));
  }, []);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(
      clientActions.getList({ offset: limit * (page - 1), limit, page })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'ФИО',
        Cell: ({ row }) => `${row.original.lastname} ${row.original.firstname}`,
      },
      {
        Header: 'Контактная информация',
        Cell: ({ row }) => (
          <>
            <Typography>{`Номер: ${row.original.phoneNumber}`}</Typography>
            <Typography>{`E-mail: ${row.original.email}`}</Typography>
          </>
        ),
      },
      {
        Header: 'Адреса',
        Cell: ({ row }) => (
          <>
            {row.original.addresses.map(address => (
              <Typography key={address.id}>
                {address.street}
                {', дом '}
                {address.house}
                {address.isPrivateHouse ? ', частный дом' : ', квартира '}
                {!address.isPrivateHouse && address.flat}
                {!address.isPrivateHouse && ', этаж '}
                {!address.isPrivateHouse && address.floor}
              </Typography>
            ))}
          </>
        ),
      },
    ],
    []
  );

  return (
    <RootPaper>
      <Table columns={columns} data={clients} />
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
  const { clients, count, params } = state.client;
  return { clients, count, params };
};

export default connect(mapStateToProps)(TableBlock);
