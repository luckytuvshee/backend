import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import {
  makeOrder,
  makeGuestOrder,
  makeInstantOrder,
} from "../../actions/order";
import { getUserOrders } from "../../actions/order";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    background: "#cfe8fc",
    backgroundSize: "contain",
    margin: "auto",
    marginTop: 50,
    padding: 20,
    borderRadius: 0,
  },

  cardContent: {
    minWidth: 345,
    padding: "10px 0 0 0",
  },

  button: {
    marginTop: 30,
    color: "#FFF",
    borderRadius: 0,
  },

  textField: {
    marginTop: 10,
  },
}));

const Payment = ({
  order: { orderAddress, instantPurchaseInfo, lastOrderId },
  cart: { cartInfo, cartItems, guestCartItems, cartProducts },
  auth,
  makeOrder,
  makeGuestOrder,
  makeInstantOrder,
  history,
  location,
}) => {
  const classes = useStyles();

  const [totalAmount, setTotalAmount] = useState(0);

  const makeOrderPayment = () => {
    if (instantPurchaseInfo !== null) {
      const { user_id, product_id, quantity, price } = instantPurchaseInfo;

      setTotalAmount(price * quantity);

      makeInstantOrder({
        user_id,
        product_id,
        quantity,
        address_id: orderAddress,
      });

      toast.success("Захиалга амжилттай хийгдлээ");
      return;
    }

    if (auth.isAuthenticated) {
      const amount = cartItems.reduce((a, b) => {
        return a + b["quantity"] * cartProducts[b["product_id"]].price;
      }, 0);

      setTotalAmount(amount);

      makeOrder({
        user_id: auth.user.id,
        basket_id: cartInfo.id,
        address_id: orderAddress,
        amount,
      });
    } else {
      const amount = guestCartItems.reduce((a, b) => {
        return a + b["quantity"] * cartProducts[b["product_id"]].pricde;
      }, 0);

      setTotalAmount(amount);

      makeGuestOrder({
        user_id: 1,
        cartItems: guestCartItems,
        address_id: orderAddress,
        amount,
      });
    }

    toast.success("Захиалга амжилттай хийгдлээ");
  };

  useEffect(() => {
    if (orderAddress === null) history.push("/");
    else {
      if (auth.isAuthenticated) {
        getUserOrders(auth.user.id);
      }
    }

    if (location.fromLink) {
      if (orderAddress !== -1) {
        makeOrderPayment();
      }
    }
  }, [auth.isAuthenticated, history, orderAddress]);

  return auth.loading || lastOrderId === -1 || totalAmount === 0 ? (
    <Spinner />
  ) : (
    <Card
      className={classes.root}
      style={{
        background: "#fff",
      }}
    >
      <CardContent className={classes.cardContent}>
        <Typography
          style={{
            margin: "10px 0",
          }}
        >
          Захиалгийн дугаар: {lastOrderId}
        </Typography>
        <Typography>
          <strong>Данс: </strong>
          5040099200
        </Typography>
        <Typography>
          <strong>Төлбөр хүлээн авагч: </strong>
          Cosmetics Shop
        </Typography>
        <Typography>
          <strong>Гүйлгээний утга: </strong>
          {lastOrderId}, Утасны дугаар
        </Typography>

        <Typography variant="h5" style={{ margin: "10px 0" }}>
          <strong>Шилжүүлэх дүн: {totalAmount}</strong>
        </Typography>

        <Typography>
          Та гүйлгээний утга дээр{" "}
          <strong>{lastOrderId}, Утасны дугаараа</strong> бичнэ.{" "}
          <strong>ХААН БАНК 5040099200 Cosmetics Shop</strong> дансанд төлбөрөө
          шилжүүлнэ үү.
        </Typography>
      </CardContent>

      <Grid container justify="center">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ color: "inherit" }}
          size="large"
          className={classes.button}
          component={Link}
          to="/"
        >
          Эхлэл рүү буцах
        </Button>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  cart: state.cart,
  order: state.order,
});

export default connect(mapStateToProps, {
  makeOrder,
  makeInstantOrder,
  makeGuestOrder,
})(withRouter(Payment));
