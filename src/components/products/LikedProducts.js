import React from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Grid from "@material-ui/core/Grid";
import LikedProductItem from "./LikedProductItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
    maxWidth: 900,
    borderRadius: 0,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: 0,
  },

  typography: {
    padding: 80,
    backgroundImage: `url(${require("../../assets/images/heading_background.png")})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    fontFamily: "Pacifico",
  },
}));

const LikedProducts = ({ profile: { likedProducts, loading } }) => {
  const classes = useStyles();

  return loading ? (
    <div className={classes.root}>
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
      >
        Таалагдсан бараанууд
      </Typography>
      <Spinner />
    </div>
  ) : (
    <div className={classes.root}>
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
      >
        Таалагдсан бараанууд
      </Typography>
      {likedProducts.length === 0 && (
        <Typography
          className={classes.typography}
          variant="h3"
          color="textSecondary"
          style={{ background: "#fff" }}
        >
          Таалагдсан бараа байхгүй байна
        </Typography>
      )}
      <Grid container justify="center" spacing={2}>
        {likedProducts.map((liked, index) => (
          <Grid item>
            <LikedProductItem key={index} liked={liked} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(LikedProducts);
