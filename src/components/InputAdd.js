/* eslint-disable react/prop-types */

import React from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputAddCard: {
    marginBottom: theme.spacing(1),
  },
}));

export const InputAdd = ({ handleClose, onChange, onPresEnter }) => {
  const classes = useStyles();

  return (
    <TextField
      required
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onPresEnter();
        }
      }}
      label="Card title"
      variant="outlined"
      fullWidth
      className={classes.inputAddCard}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => handleClose(false)}>
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
