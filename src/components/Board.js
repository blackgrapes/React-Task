/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import moment from "moment";

const RATE = 10;
const useStyles = makeStyles((theme) => ({
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
  },
  boardHeader: {
    padding: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
  boardHeaderButton: {
    marginRight: "-12px",
  },
  boardButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
  },

  cardRoot: {
    margin: theme.spacing(2),
    marginBottom: 20,
    borderLeft: "5px solid red",
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: theme.spacing(2),
    height: "120px",
  },
  // cover: {
  //   width: 151,
  // },
  bottomBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  buttonColor: {
    backgroundColor: "red",
  },
}));

// setTasks
export const Board = ({ board, task, tasks, index, setTasks }) => {
  const [second, setSecond] = useState("00:00:00");
  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h : "00";
    var mDisplay = m > 0 ? m : "00";
    var sDisplay = s > 0 ? s : "00";
    return { hours: hDisplay, minutes: mDisplay, secondes: sDisplay };
  };
  useEffect(() => {
    let secTimer = setInterval(() => {
      if (board.StartTime) {
        const seconds = moment().diff(
          moment(board.StartTime).format(),
          "seconds"
        );
        const funOut = secondsToHms(seconds);
        setSecond(`${funOut.hours}:${funOut.minutes}:${funOut.secondes}`);
      }
    }, 1000);

    return () => clearInterval(secTimer);
  }, [board.StartTime]);
  const classes = useStyles();
  const moveInInProgress = (ind) => {
    const tasksData = tasks;
    const boardData = task.boards[ind];
    tasksData[0].boards.splice(ind, 1);
    const newTask = tasksData[1].boards.concat({
      ...boardData,
      StartTime: moment().format(),
    });
    tasksData[1].boards = newTask;
    setTasks(tasksData);
  };

  const moveInInDone = (ind) => {
    const tasksData = tasks;
    const boardData = task.boards[ind];
    tasksData[1].boards.splice(ind, 1);
    const seconds = moment().diff(
      moment(boardData.StartTime).format(),
      "seconds"
    );
    const funOut = secondsToHms(seconds);
    let totalAmount =
      funOut.hours * RATE +
      (funOut.minutes / 60) * RATE +
      (funOut.secondes / 3600) * RATE;
    totalAmount = parseFloat(totalAmount).toFixed(3);
    const newTask = tasksData[2].boards.concat({
      ...boardData,
      endTime: moment().format(),
      totalData: funOut,
      totalAmount,
    });
    tasksData[2].boards = newTask;
    setTasks(tasksData);
  };
  return (
    <Card
      className={clsx(classes.cardRoot, {
        waitingBoard: board.status === "Waiting",
        successBoard: board.status === "Approved",
      })}
      //   variant="outlined"
      style={{
        borderLeft: `5px solid ${
          task.id === 1 ? "#007FF9" : task.id === 2 ? "green" : "danger"
        }`,
      }}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h6">
            {board.title}
          </Typography>
          <Grid item xs={12}>
            <Box component="small" m={1}>
              <Typography variant="body2">{board.start}</Typography>
            </Box>
            {/* <Box component="small" m={1}>
              <Typography variant='body2'>{board.status}</Typography>
            </Box> */}
            {task.id == 2 && <Grid>{second}</Grid>}
          </Grid>

          {task.id !== 3 ? (
            <Grid item xs={12} className={classes.bottomBox}>
              {task.id === 1 ? (
                <div>
                  <Button
                    style={{
                      backgroundColor: "#007FF9",
                      color: "#fff",
                    }}
                    onClick={() => moveInInProgress(index)}
                  >
                    Start
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                    }}
                    onClick={() => moveInInDone(index)}
                  >
                    Resolve
                  </Button>
                </>
              )}
            </Grid>
          ) : (
            `$ ${board.totalAmount || 0}`
          )}
        </CardContent>
      </div>
    </Card>
  );
};
