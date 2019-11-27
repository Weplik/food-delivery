import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Button, makeStyles } from '@material-ui/core';
import { authActions } from '../_actions';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    marginLeft: 0,
  },
}));

const LoginForm = ({ dispatch }) => {
  const classes = useStyles();
  const initialValues = { username: '', password: '' };

  const schema = yup.object().shape({
    username: yup.string().required('Необходимо обязательно ввести логин'),
    password: yup.string().required('Необходимо обязательно ввести пароль'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      dispatch(authActions.signIn(values));
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Field
            name="username"
            placeholder="Логин"
            component={TextField}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Field
            name="password"
            placeholder="Пароль"
            component={TextField}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            fullWidth
          >
            Подтвердить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default connect()(LoginForm);
