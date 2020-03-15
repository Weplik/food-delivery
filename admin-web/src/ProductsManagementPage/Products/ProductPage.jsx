import React from 'react';
import { Grid } from '@material-ui/core';
import Table from './Table';

export const ProductPage = () => (
  <Grid container spacing={2} direction="column">
    <Grid item>
      <Table />
    </Grid>
  </Grid>
);
