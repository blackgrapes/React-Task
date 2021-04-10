import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

import { InputAdd } from "./InputAdd";
// CardContent
const useStyles = makeStyles((theme) => ({
  boardButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
}));

export const BoardFooter = ({ setTasks, tasks }) => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState();

  const handleAddCard = (e) => {
    e.preventDefault();
    setShowInput(true);
  };
  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleAddData = () => {
    if (title) {
      let taksdata = tasks[0];

      const taks1Board =
        (tasks[0] &&
          tasks[0]?.boards?.reduce(
            (prev, current) => (prev.id > current.id ? prev.id : current.id),
            1
          )) ||
        1;
      const taks2Board =
        (tasks?.[1] &&
          tasks?.[1]?.boards?.reduce(
            (prev, current) => (prev.id > current.id ? prev.id : current.id),
            1
          )) ||
        1;
      const taks3Board =
        (tasks?.[2] &&
          tasks?.[2]?.boards?.reduce(
            (prev, current) => (prev.id > current.id ? prev.id : current.id),
            1
          )) ||
        1;

      const maximumId = Math.max(taks1Board, taks2Board, taks3Board);
      const newData = taksdata.boards.concat({
        id:
          (taksdata?.boards?.[taksdata?.boards.length - 1]?.id ||
            maximumId ||
            1000) + 1,
        title: title,
      });
      taksdata.boards = newData;
      tasks[0] = taksdata;
      setShowInput(false);
      setTasks(tasks);
    }
  };

  if (!showInput) {
    return (
      <div style={{ display: "flex" }} className={classes.boardButton}>
        <Button
          onClick={handleAddCard}
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Add /> Add Task
        </Button>
      </div>
    );
  } else {
    return (
      <form className={classes.boardButton}>
        <>
          <InputAdd
            handleClose={handleCloseInput}
            onChange={(data) => setTitle(data)}
            onPresEnter={handleAddData}
          />
          <Button onClick={handleAddData} color="primary">
            Add
          </Button>
        </>
      </form>
    );
  }
};
