import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AddCircle } from '@material-ui/icons';
import { productActions } from '../../_actions';
import CreateAndUpdateModal from './CreateAndUpdateModal';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(2),
    zIndex: 1,
    border: `${theme.spacing(0.5)}px double`,
    borderRadius: theme.spacing(2),
  },
}));

const AddButton = ({ dispatch, isCreated, params, activeIngredients }) => {
  const classes = useStyles();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    if (isCreated) {
      dispatch(productActions.getList(params));
      setModalIsVisible(false);
    }
  }, [isCreated]);

  return (
    <>
      <IconButton
        className={classes.button}
        onClick={() => setModalIsVisible(true)}
      >
        <AddCircle />
      </IconButton>
      <CreateAndUpdateModal
        open={modalIsVisible}
        activeIngredients={activeIngredients}
        onClose={() => setModalIsVisible(false)}
      />
    </>
  );
};

const mapStateToProps = state => {
  const { isCreated, params, activeIngredients } = state.product;

  return { isCreated, params, activeIngredients };
};

export default connect(mapStateToProps)(AddButton);
