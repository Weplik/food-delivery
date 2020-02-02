import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { DialogTitle } from '../../_components/DialogTitle';
import { ingredientsActions } from '../../_actions';

const schema = yup.object().shape({
  title: yup.string().required(),
  costPerKilo: yup.number().required(),
});

const CreateAndUpdateModal = ({ dispatch, value, onClose, ...props }) => {
  const title = value ? 'Редактирование ингредиента' : 'Добавление ингредиента';

  const initialValues = value
    ? {
        id: value.id,
        title: value.title,
        costPerKilo: value.costPerKilo,
      }
    : {
        title: '',
        costPerKilo: '',
      };

  const handleSubmit = (values, { setSubmitting }) => {
    value
      ? dispatch(ingredientsActions.update(values))
      : dispatch(ingredientsActions.create(values));

    setSubmitting(false);
  };

  return (
    <Dialog maxWidth="md" {...props}>
      <DialogTitle onClose={onClose} title={title} />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="title"
                    component={TextField}
                    label="Наименование"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="costPerKilo"
                    component={TextField}
                    label="Цена за 1 кг."
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Сохранить</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default connect()(CreateAndUpdateModal);
