import React from 'react';
import { Grid } from '@material-ui/core';
import { Filter } from './Filter';
import Table from './Table';

export const RolesPage = () => (
  <Grid container spacing={2} direction="column">
    <Filter />
    <Grid item>
      <Table />
    </Grid>
  </Grid>
);
