import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { AddCircle } from '@material-ui/icons';
import { generate } from 'shortid';
import { DialogTitle } from '../../_components/DialogTitle';
import { productActions } from '../../_actions';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  calorieContent: yup.number().required(),
  cost: yup.number().required(),
  items: yup.array().required(),
});

const CreateAndUpdateModal = ({
  dispatch,
  value,
  onClose,
  activeIngredients,
  ...props
}) => {
  const title = value ? 'Редактирование продукта' : 'Добавление продукта';

  const initialValues = value
    ? {
        id: value.id,
        title: value.title,
        description: value.description,
        imageUrl: value.imageUrl,
        calorieContent: value.calorieContent,
        cost: value.cost,
        items: value.items,
        ingredientWeight: '',
        ingredient: {},
      }
    : {
        title: '',
        description: '',
        imageUrl: '',
        calorieContent: '',
        cost: '',
        items: [],
        ingredientWeight: '',
        ingredient: {},
      };

  const handleSubmit = (values, { setSubmitting }) => {
    value
      ? dispatch(productActions.update(values))
      : dispatch(productActions.create(values));

    setSubmitting(false);
  };

  const handleAddItem = (
    { items, ingredient, ingredientWeight },
    setFieldValue
  ) => {
    items.push({
      ingredientId: ingredient.id,
      weight: ingredientWeight,
      title: ingredient.title,
    });

    setFieldValue('items', items);
  };

  return (
    <Dialog maxWidth="md" {...props}>
      <DialogTitle onClose={onClose} title={title} />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="title"
                    component={TextField}
                    label="Наименование"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="description"
                    component={TextField}
                    label="Описание"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="imageUrl"
                    component={TextField}
                    label="Изображение"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="calorieContent"
                    component={TextField}
                    label="Калорийность"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="cost"
                    component={TextField}
                    label="Цена"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="ingredient"
                    select
                    label="Ингредиент"
                    component={TextField}
                    fullWidth
                  >
                    {activeIngredients.map(item => (
                      <MenuItem key={item.id} value={item}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={2}>
                  <Field
                    name="ingredientWeight"
                    component={TextField}
                    label="Вес"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      handleAddItem(values, setFieldValue);
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                </Grid>
              </Grid>
              {values.items.map(item => (
                <Grid container spacing={2} key={generate()}>
                  <Grid item xs={9}>
                    {item.title}
                  </Grid>
                  <Grid item xs={2}>
                    {item.weight}
                  </Grid>
                </Grid>
              ))}
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
