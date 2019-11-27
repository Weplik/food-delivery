import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody } from '@material-ui/core';
import { TbodyTr } from './TbodyTr';
import { ingredientsActions } from '../../../_actions';
import { Thead } from './Thead';
import { RootPaper } from '../../../_containers/RootPaper';
import { Pagination } from '../../../_components';

const TableBlock = ({ dispatch, ingredients, count, params }) => {
  useEffect(() => {
    dispatch(ingredientsActions.getList(params));
  }, []);

  const handleChangePage = page => {
    const { limit } = params;

    dispatch(
      ingredientsActions.getList({ offset: limit * (page - 1), limit, page })
    );
  };

  return (
    <RootPaper>
      <Table>
        <Thead />
        <TableBody>
          {ingredients.map(ingredient => (
            <TbodyTr key={ingredient.id} user={ingredient} />
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
  const { ingredients, count, params } = state.ingredient;
  return { ingredients, count, params };
};

export default connect(mapStateToProps)(TableBlock);
