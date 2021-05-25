import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CartItem from "./CartItem";
import CartInfo from "./CartInfo";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Typography from "@material-ui/core/Typography";
import { getGuestCartItems } from "../../actions/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    maxWidth: "100vw",
    borderRadius: 0,
  },
  paper: {
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxHeight: "100vh",
    minHeight: "100%",
    borderRadius: 0,
  },

  typography: {
    backgroundImage: `url(${require("../../assets/images/heading_background.png")})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    fontFamily: "Pacifico",
    padding: "80px 0",
    textAlign: "center",
  },

  cardContent: {
    minWidth: 345,
    minHeight: 345,
    maxHeight: "100vh",
    padding: 10,
    overflowX: "hidden",
  },
}));

const Cart = ({
  auth: { isAuthenticated, loading },
  cart: { cartInfo, cartItems, guestCartItems },
}) => {
  const classes = useStyles();

  return loading || (isAuthenticated && cartInfo === null) ? (
    <Spinner />
  ) : (
    <Grid className={classes.root} container spacing={3} justify="center">
      {cartItems.length === 0 && guestCartItems.length === 0 ? (
        <Grid item xs={12} sm={12}>
          <Typography
            className={classes.typography}
            variant="h3"
            color="textSecondary"
          >
            Сагс хоосон байна
          </Typography>
        </Grid>
      ) : (
        <Fragment>
          <Grid item xs={12} sm={5}>
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
            {guestCartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </Grid>
          <Grid item xs={12} sm={5}>
            {(cartItems.length !== 0 || guestCartItems.length !== 0) && (
              <CartInfo />
            )}
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { getGuestCartItems })(Cart);
