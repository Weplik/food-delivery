import React from 'react';
import { Container, Paper } from '@material-ui/core';
import Form from './Form';

export const LoginPage = () => {
  return (
    <Container>
      <Paper>
        <Container>
          <Form />
        </Container>
      </Paper>
    </Container>
  );
};
