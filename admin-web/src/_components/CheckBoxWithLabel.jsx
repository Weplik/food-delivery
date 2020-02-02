import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export const CheckboxWithLabel = ({ label, ...props }) => (
  <FormControlLabel control={<Checkbox {...props} />} label={label} />
);
