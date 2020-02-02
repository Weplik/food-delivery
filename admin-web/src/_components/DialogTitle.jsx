import React from 'react';
import {
  DialogTitle as MuiDialogTitle,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const DialogTitle = ({ children, onClose, title, ...props }) => (
  <MuiDialogTitle disableTypography {...props}>
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={11}>
        {title && (
          <Typography component="h2" variant="h6">
            {title}
          </Typography>
        )}
        {children}
      </Grid>
      <Grid item>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  </MuiDialogTitle>
);
