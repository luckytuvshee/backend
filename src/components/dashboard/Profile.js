import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    borderRadius: 0,
  },

  typography: {
    padding: "5px 0",
  },

  headerText: {
    paddingBottom: "10px",
  },
}));

const Profile = ({ auth: { loading, user } }) => {
  const classes = useStyles();
  return loading || user === null ? (
    <Spinner />
  ) : (
    <Paper className={classes.root}>
      <Typography className={classes.headerText} variant="h5">
        Профайл
      </Typography>
      <Typography className={classes.typography} component="span">
        <strong>Овог: </strong> {user.last_name}
      </Typography>
      <Typography className={classes.typography} component="span">
        <strong>Нэр: </strong> {user.first_name}
      </Typography>
      <Typography className={classes.typography} component="span">
        <strong>Утасны дугаар: </strong> {user.mobile_number}
      </Typography>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
