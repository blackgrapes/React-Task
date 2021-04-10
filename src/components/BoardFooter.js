import React, { useState } from "react";
import { Button, CardActionArea, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdd } from "./InputAdd";

const useStyles = makeStyles((theme) => ({
  boardButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
}));

export const BoardFooter = ({ setTasks, tasks }) => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);

  const handleAddCard = (e) => {
    e.preventDefault();
    setShowInput(true);
  };
  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleAddData = () => {
    // e.preventDefault();
    let taksdata = tasks[0];
    const newData = taksdata.boards.concat({
      id: (taksdata?.boards?.[taksdata?.boards.length - 1]?.id || 0) + 1,
      title: "Test",
    });
    taksdata.boards = newData;
    tasks[0] = taksdata;
    setShowInput(false);
    setTasks(tasks);
  };

  if (!showInput) {
    return (
      <CardActionArea>
        <CardContent onClick={handleAddCard}>
          <>
            <Button style={{ backGroundColor: "#fff" }}>Add Task</Button>
          </>
        </CardContent>
      </CardActionArea>
    );
  } else {
    return (
      <form className={classes.boardButton}>
        <InputAdd handleClose={handleCloseInput} />
        <Button onClick={handleAddData} color="primary">
          Add
        </Button>
      </form>
    );
  }
};
