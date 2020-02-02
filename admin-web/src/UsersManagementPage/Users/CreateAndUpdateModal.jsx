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
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { DialogTitle } from '../../_components/DialogTitle';
import { usersActions } from '../../_actions';

const schema = yup.object().shape({
  username: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  role: yup.object().required(),
  password: yup.string().required(),
});

const CreateAndUpdateModal = ({
  dispatch,
  activeRoles,
  value,
  onClose,
  ...props
}) => {
  const title = value
    ? 'Редактирование пользователя'
    : 'Добавление пользователя';

  const initialValues = value
    ? {
        username: value.username,
        firstname: value.firstname,
        lastname: value.lastname,
        role: activeRoles.find(item => item.id == value.role.id),
        password: '1',
      }
    : {
        username: '',
        firstname: '',
        lastname: '',
        role: '',
        password: '',
      };

  const handleSubmit = (values, { setSubmitting }) => {
    value
      ? dispatch(usersActions.update(values))
      : dispatch(usersActions.create(values));

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
                    disabled={!!value}
                    name="username"
                    component={TextField}
                    label="Логин пользователя"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="role"
                    select
                    label="Роль"
                    component={TextField}
                    fullWidth
                  >
                    {activeRoles.map(role => (
                      <MenuItem key={role.id} value={role}>
                        {role.title}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="lastname"
                    component={TextField}
                    label="Фамилия"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field name="firstname" component={TextField} label="Имя" />
                </Grid>
              </Grid>
              {!value && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="password"
                      component={TextField}
                      label="Пароль"
                    />
                  </Grid>
                </Grid>
              )}
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
