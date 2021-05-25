import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getProduct } from "../../actions/product";
import { removeLikedProduct } from "../../actions/profile";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Spinner from "../layout/Spinner";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForeverOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    borderRadius: 0,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  typography: {
    padding: "5px 0",
  },

  cardContent: {
    maxWidth: 200,
    padding: 10,
    overflowX: "hidden",
    overflowY: "hidden",
  },
}));

const ProductModal = ({
  liked,
  auth,
  product: { productsMore, loading },
  getProduct,
  removeLikedProduct,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProduct(liked.product_id);
  }, [getProduct, liked.product_id]);

  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: true,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: true,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    thumbWidth: 80,
    selectedItem: 0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });

  return loading || !productsMore.hasOwnProperty(liked.product_id) ? (
    <Card className={classes.root}>
      <CardContent>
        <Paper className={classes.paper}>
          <Spinner />
        </Paper>
      </CardContent>
    </Card>
  ) : (
    <Fragment>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Carousel {...getConfigurableProps()}>
            {productsMore[liked.product_id].images
              .split("\\")
              .map((image, index) => (
                <div key={index}>
                  <img
                    alt={"product_image"}
                    style={{ maxHeight: 400, objectFit: "cover" }}
                    src={require(`../../assets${image}`)}
                  />
                  <Typography
                    className="legend"
                    color="default"
                    component={Link}
                    to={`/product/${liked.product_id}`}
                  >
                    Дэлгэрэнгүй
                  </Typography>
                </div>
              ))}
          </Carousel>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography color="default" variant="h6">
                {productsMore[liked.product_id].price} ₮
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() =>
                  removeLikedProduct(auth.user.id, liked.product_id)
                }
                style={{ background: "#C2175B" }}
              >
                <DeleteForeverIcon style={{ fontSize: 30, color: "#fff" }} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

ProductModal.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProduct,
  removeLikedProduct,
})(ProductModal);
