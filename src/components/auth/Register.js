import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { register } from "../../actions/auth";
import { withRouter } from "react-router-dom";

// Container
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";

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
    marginTop: 10,
  },

  button: {
    marginTop: 15,
    borderRadius: 0,
  },
});

const Register = ({ register, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    password: "",
    password_confirmation: "",
  });

  const {
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    password_confirmation,
  } = formData;

  const onChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const onSubmit = () => {
    if (formData.first_name.trim() === "") {
      toast.error("Нэр хоосон утгатай байна");
      return;
    }

    if (formData.last_name.trim() === "") {
      toast.error("Овог хоосон утгатай байна");
      return;
    }

    if (formData.email.trim() === "") {
      toast.error("Имэйл хоосон утгатай байна");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(
        "Имэйл буруу байна. (зөв имэйл ийн жишээ: example@example.com)"
      );
      return;
    }

    if (formData.mobile_number.trim() === "") {
      toast.error("Утасны дугаар хоосон утгатай байна");
      return;
    }

    if (formData.password.trim() === "") {
      toast.error("Нууц үг хоосон утгатай байна");
      return;
    }

    if (formData.password_confirmation.trim() === "") {
      toast.error("Нууц үгээ давтаж оруулаагүй байна");
      return;
    }

    if (
      formData.password.trim() !== "" &&
      formData.password !== formData.password_confirmation
    ) {
      toast.error("Нууц үгнүүд адилхан биш байна");
      return;
    }

    register(formData, history);

    setFormData({
      ...formData,
      password: "",
      password_confirmation: "",
    });
  };

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
              Бүртгүүлэх
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="first_name"
                    label="Нэр"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.textField}
                    fullWidth
                    required
                    value={first_name}
                    onInput={(e) => onChange(e, "first_name")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="last_name"
                    label="Овог"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.textField}
                    fullWidth
                    required
                    value={last_name}
                    onInput={(e) => onChange(e, "last_name")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    label="Имэйл"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    size="small"
                    className={classes.textField}
                    required
                    value={email}
                    errorText={"Имэйл буруу байна"}
                    type="email"
                    onInput={(e) => onChange(e, "email")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="mobile_number"
                    label="Утасны дугаар"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    fullWidth
                    className={classes.textField}
                    required
                    value={mobile_number}
                    onInput={(e) => onChange(e, "mobile_number")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="filled-password-input"
                    label="Нууц үг"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    required
                    size="small"
                    className={classes.textField}
                    onInput={(e) => onChange(e, "password")}
                    value={password}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="filled-password-input"
                    label="Нууц үг давтах"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    required
                    className={classes.textField}
                    size="small"
                    onInput={(e) => onChange(e, "password_confirmation")}
                    value={password_confirmation}
                  />
                </Grid>
              </Grid>

              <Button
                onClick={() => onSubmit()}
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
              >
                Бүртгүүлэх
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};

export default connect(null, { register })(withRouter(Register));
