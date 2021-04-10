/* eslint-disable react/prop-types */

import React from "react";
import { Grid } from "@material-ui/core";
import { Board } from "./Board";
import { makeStyles } from "@material-ui/core/styles";
import { BoardFooter } from "./BoardFooter";

const useStyles = makeStyles(() => ({
  boardContent: {
    overflowY: "auto",
    height: "100%",
  },
}));

export const BoardList = ({ boards, task, setTask, tasks }) => {
  const classes = useStyles();
  const handleChanges = (data) => {
    setTask(data);
  };
  return (
    <Grid className={classes.boardContent}>
      {boards?.map?.((board, index) => (
        <Grid key={board.id} item xs={12}>
          <Board
            board={board}
            task={task}
            index={index}
            setTasks={(data) => handleChanges(data)}
            tasks={tasks}
          />
        </Grid>
      ))}
      {task?.id === 1 && (
        <BoardFooter tasks={tasks} setTasks={(data) => handleChanges(data)} />
      )}
    </Grid>
  );
};
