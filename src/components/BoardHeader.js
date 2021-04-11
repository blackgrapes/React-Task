/* eslint-disable react/prop-types */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  boardHeader: {
    padding: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const BoardHeader = ({ title, count }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.boardHeader}>
      <Typography component="h5" variant="h5">
        <Chip label={count} /> {title}
      </Typography>
    </Grid>
  );
};
