import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    borderRadius: 0,
  },

  typography: {
    marginTop: 10,
    fontSize: 46,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#475a65",
  },

  button: {
    marginTop: 30,
    color: "#FFF",
    borderRadius: 0,
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container className={classes.root} maxWidth="sm">
        <Grid
          direction="column"
          container
          justify="center"
          alignItems="center"
          style={{ minHeight: 300 }}
        >
          <img src={require("../../assets/images/not_found_page.png")} />

          <Typography component="h2" className={classes.typography}>
            Хуудас олдсонгүй
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            component={Link}
            to="/"
          >
            Эхлэл рүү буцах
          </Button>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default NotFound;
