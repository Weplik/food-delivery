import React from 'react';
import { Grid } from '@material-ui/core';
import Table from './Table';

export const ClientsManagementPage = () => (
  <Grid container spacing={2} direction="column">
    <Grid item />
    <Grid item>
      <Table />
    </Grid>
  </Grid>
);
