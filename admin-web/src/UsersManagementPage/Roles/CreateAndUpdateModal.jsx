import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button,
  Divider,
} from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { DialogTitle } from '../../_components/DialogTitle';
import { rolesActions } from '../../_actions';
import { ACCESS_RIGHTS } from '../../_utils';
import { CheckboxWithLabel } from '../../_components';

const schema = yup.object().shape({
  title: yup.string().required(),
  accessRights: yup.array().required(),
});

const CreateAndUpdateModal = ({ dispatch, value, onClose, ...props }) => {
  const title = value ? 'Редактирование роли' : 'Добавление роли';

  const initialValues = value
    ? {
        id: value.id,
        title: value.title,
        accessRights: value.accessRights,
      }
    : {
        title: '',
        accessRights: [],
      };

  const handleSubmit = (values, { setSubmitting }) => {
    value
      ? dispatch(rolesActions.update(values))
      : dispatch(rolesActions.create(values));

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
        {({ values }) => (
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
                <Grid container wrap="wrap" alignItems="flex-end">
                  <FieldArray
                    name="accessRights"
                    render={arrayHelpers =>
                      ACCESS_RIGHTS.map(right => (
                        <Grid key={right.code} item xs={12}>
                          <CheckboxWithLabel
                            label={right.title}
                            checked={values.accessRights.includes(right.code)}
                            onChange={e => {
                              if (e.target.checked)
                                arrayHelpers.push(right.code);
                              else {
                                const idx = values.accessRights.indexOf(
                                  right.code
                                );
                                arrayHelpers.remove(idx);
                              }
                            }}
                            color="primary"
                          />
                          <Divider />
                        </Grid>
                      ))
                    }
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
