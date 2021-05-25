import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/CloseOutlined";
import Divider from "@material-ui/core/Divider";
import RemoveIcon from "@material-ui/icons/Remove";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  getProduct,
  changeCartItemQuantity,
  changeGuestCartItemQuantity,
  deleteCartItem,
  deleteGuestCartItem,
} from "../../actions/cart";
import Spinner from "../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    background: "#cfe8fc",
    marginBottom: 10,
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

  divider: {
    height: 2,
    background: "#FF827B",
  },

  count: {
    padding: "0 20px",
    backgroundColor: theme.palette.secondary.dark,
    color: "#000 !important", // because of disabled button, I used !important
  },
}));

const CartItem = ({
  auth: { isAuthenticated },
  item: { id, product_id, quantity },
  cart: { cartProducts, loading },
  getProduct,
  changeCartItemQuantity,
  changeGuestCartItemQuantity,
  deleteCartItem,
  deleteGuestCartItem,
}) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);

  useEffect(() => {
    getProduct(product_id);
    setCount(quantity);
  }, [getProduct, product_id, quantity]);

  return loading || !cartProducts.hasOwnProperty(product_id) ? (
    <Spinner />
  ) : (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="flex-end" alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => {
                if (isAuthenticated) {
                  deleteCartItem(id);
                } else {
                  deleteGuestCartItem(product_id);
                }
              }}
              style={{ background: "#5C666F", marginBottom: 15 }}
            >
              <Close style={{ color: "#CFE8FC" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Link to={`/product/${cartProducts[product_id].id}`}>
                <img
                  alt={"product"}
                  width="150"
                  src={require(`../../assets${cartProducts[product_id].image}`)}
                />
              </Link>
            </Grid>
            <Grid item>
              <Typography>
                <strong>Бараа: </strong>
                {cartProducts[product_id].product_name}
              </Typography>
              <Typography>
                <strong>Агуулахад байгаа тоо: </strong>
                {cartProducts[product_id].quantity}
              </Typography>

              <Divider className={classes.divider} />

              <Typography>
                <strong>Тоо ширхэг: </strong>
              </Typography>
              <ButtonGroup style={{ marginBottom: 10 }}>
                <Button
                  aria-label="багасгах"
                  onClick={() => {
                    const newCount = Math.max(count - 1, 1);
                    if (newCount !== count) {
                      setCount(newCount);
                      if (isAuthenticated) {
                        changeCartItemQuantity(id, newCount);
                      } else {
                        changeGuestCartItemQuantity(product_id, newCount);
                      }
                    }
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  disabled
                  className={classes.count}
                  style={{ background: "#ffac9b" }}
                >
                  {count}
                </Button>
                <Button
                  aria-label="нэмэх"
                  onClick={() => {
                    const newCount = parseInt(count) + 1;
                    setCount(newCount);
                    if (isAuthenticated) {
                      changeCartItemQuantity(id, newCount);
                    } else {
                      console.log("count: " + newCount);
                      changeGuestCartItemQuantity(product_id, newCount);
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              <Divider className={classes.divider} />
              <Grid container justify="flex-start" alignItems="center">
                <Grid item>
                  <Typography variant="h5" component="span">
                    {cartProducts[product_id].price * count} ₮
                  </Typography>
                  <Typography component="span">
                    Нэгж үнэ: {cartProducts[product_id].price}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProduct,
  changeCartItemQuantity,
  changeGuestCartItemQuantity,
  deleteCartItem,
  deleteGuestCartItem,
})(CartItem);
