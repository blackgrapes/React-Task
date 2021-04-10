/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Paper } from "@material-ui/core";
import { BoardList } from "./BoardList";
import { BoardHeader } from "./BoardHeader";
// import { getTasks } from '../redux/actions/tasks';

// const url = '/db.json'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
  },
  boardsWrap: {
    display: "flex",
    flex: "1 1 auto",
    overflowX: "auto",
    overflowY: "hidden",
    height: "100%",
  },
  boardsContent: {
    display: "flex",
    paddingTop: "24px",
    paddingBottom: "24px",
    height: "100%",
  },
  boardCard: {
    width: "380px",
    display: "flex",
    maxHeight: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    marginLeft: "8px",
    marginRight: "8px",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
    backgroundColor: "#F6F8FA",
  },
  boardButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));
const defaultTask = [
  {
    id: 1,
    title: "To do",
    boards: [
      {
        id: 1,
        title: "Build a House",
      },
      {
        id: 2,
        title: "Plant a Tree",
      },
      {
        id: 3,
        title: "Go to Grocery",
      },
      {
        id: 4,
        title: "Take out the trash",
      },
      {
        id: 5,
        title: "Walk the dog",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    boards: [],
  },
  {
    id: 3,
    title: "Done",
    boards: [],
  },
];
const TasksPage = () => {
  const [tasks, setTasks] = useState(defaultTask);

  const classes = useStyles();

  const handleDataChange = (data) => {
    console.log();
    setTasks(() => [...data]);
  };
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid container className={classes.boardsWrap}>
        <Grid className={classes.boardsContent}>
          {tasks &&
            tasks.map((task) => {
              return (
                <Paper
                  key={task.id}
                  elevation={3}
                  className={classes.boardCard}
                >
                  <BoardHeader
                    title={task.title}
                    count={task?.boards?.length || 0}
                  />
                  <Divider />
                  <BoardList
                    boards={task.boards}
                    task={task}
                    setTask={(data) => handleDataChange(data)}
                    tasks={tasks}
                  />
                  <Divider className={classes.divider} />
                </Paper>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TasksPage;
