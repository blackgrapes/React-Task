import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import TasksPage from "./components/TasksPage";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: "1 1 auto",
    paddingBottom: "10px",
    paddingTop: "10px",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    position: "absolute",
    left: "20%",
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
