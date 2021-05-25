import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { getUserOrders } from "../../actions/order";
import Spinner from "../layout/Spinner";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MyOrders = ({ auth, order: { loading, userOrders }, getUserOrders }) => {
  const classes = useStyles();

  useEffect(() => {
    getUserOrders(auth.user.id);
  }, [getUserOrders, auth.user.id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      {userOrders.length === 0 && <strong>Та захиалга хийгээгүй байна</strong>}
      {userOrders.map((order) => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <strong>Захиалгийн дугаар: </strong>
              {order.order_id} <strong> Огноо: </strong>
              {new Date(Date.parse(order.created_at)).toLocaleString()}
              <strong> Төлөв: </strong> {order.order_status}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              {order.products.map((product) => (
                <Grid container spacing={3}>
                  <Grid item>
                    <Link to={`/product/${product.id}`}>
                      <img
                        alt={"product"}
                        width="150"
                        src={require(`../../assets${product.image}`)}
                      />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <strong>Бараа: </strong>
                      {product.product_name}
                    </Typography>
                    <Typography>
                      <strong>Нэгж үнэ: </strong>
                      {product.price}₮
                    </Typography>
                    <Typography>
                      <strong>Тоо ширхэг: </strong>
                      {product.quantity}
                    </Typography>
                    <Typography>
                      <strong>Нийт үнэ: </strong>
                      {product.price * product.quantity}₮
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Typography>
                <strong>Захиалгийн төлөв: </strong>
                {order.order_status}
              </Typography>

              <Typography>
                <strong>Захиалгийн нийт үнэ: </strong>
                {order.total}₮
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

export default connect(mapStateToProps, { getUserOrders })(MyOrders);
