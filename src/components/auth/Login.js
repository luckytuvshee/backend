import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Container
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
    borderRadius: 0,
  },

  typography: {
    fontFamily: "Pacifico",
  },

  textField: {
    marginTop: 15,
  },

  button: {
    marginTop: 15,
    borderRadius: 0,
  },
});

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  // parameter of useState is initial(default) value of formData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Container maxWidth="sm" className={classes.root}>
        <Card style={{ backgroundColor: "#cfe8fc" }} variant="outlined">
          <CardContent>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="h4"
              gutterBottom
            >
              Нэвтрэх
            </Typography>
            <form
              className={classes.root}
              onSubmit={(e) => onSubmit(e)}
              autoComplete="off"
            >
              <TextField
                id="email"
                label="Имэйл"
                variant="outlined"
                color="secondary"
                size="small"
                className={classes.textField}
                value={email}
                onInput={(e) => onChange(e, "email")}
                fullWidth
                required
              />
              <TextField
                id="password"
                label="Нууц үг"
                variant="outlined"
                color="secondary"
                size="small"
                type="password"
                className={classes.textField}
                value={password}
                onInput={(e) => onChange(e, "password")}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Нэвтрэх
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
