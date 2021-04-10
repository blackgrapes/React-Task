import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import TasksPage from "./components/TasksPage";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  content: {
    flex: "1 1 auto",
    padding: "64px 15px 15px",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <TasksPage />
      </main>
    </div>
  );
}

export default App;
