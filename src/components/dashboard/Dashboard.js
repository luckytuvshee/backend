import React from "react";
import { connect } from "react-redux";
import TabPanel from "./TabPanel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    margin: "auto",
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxHeight: "100vh",
    minHeight: "100%",
    borderRadius: 0,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TabPanel />
    </Paper>
  );
};

export default connect()(Dashboard);
