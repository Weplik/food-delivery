import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AddCircle } from '@material-ui/icons';
import { ingredientsActions } from '../../_actions';
import CreateAndUpdateModal from './CreateAndUpdateModal';
import {ingredient} from "../../_reducers/ingredient.reducer";

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

const AddButton = ({ dispatch, isCreated, params }) => {
  const classes = useStyles();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    if (isCreated) {
      dispatch(ingredientsActions.getList(params));
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
        onClose={() => setModalIsVisible(false)}
      />
    </>
  );
};

const mapStateToProps = state => {
  const { isCreated, params } = state.ingredient;

  return { isCreated, params };
};

export default connect(mapStateToProps)(AddButton);
