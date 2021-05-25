import React, { useEffect, Fragment } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Spinner from "../layout/Spinner";
import { getMostPurchasedProducts } from "../../actions/product";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 60px",
    margin: "auto",
    borderRadius: 0,
  },

  card: {
    margin: "0 10px",
    maxWidth: 250,
    background: "#cfe8fc",
    backgroundSize: "contain",
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
    minWidth: 100,
    minHeight: 200,
    maxWidth: 250,
    maxHeight: 350,
    padding: 10,
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MostPurchasedProducts = ({
  getMostPurchasedProducts,
  product: { mostPurchasedProducts, loading },
  history,
}) => {
  const classes = useStyles();

  const params = {
    slidesPerView: 5,
    spaceBetween: 50,
    rebuildOnUpdate: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };

  useEffect(() => {
    getMostPurchasedProducts();
  }, [getMostPurchasedProducts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
      >
        Хамгийн их худалдагдсан бараанууд
      </Typography>
      <Grid
        style={{
          marginBottom: 50,
        }}
        justify="space-between"
        container
        className={classes.root}
      >
        <Swiper {...params}>
          {mostPurchasedProducts.map((product, index) => (
            <Card key={index} className={classes.card}>
              <Link to={`/product/${product.id}`}>
                <Grid container justify="center">
                  <Grid item>
                    <CardContent className={classes.cardContent}>
                      <img
                        alt={"product_image"}
                        height="250"
                        style={{ objectFit: "contains" }}
                        src={require(`../../assets${product.image}`)}
                      />
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        style={{ textAlign: "center" }}
                      >
                        {product.product_name}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Link>
            </Card>
          ))}
        </Swiper>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getMostPurchasedProducts })(
  withRouter(MostPurchasedProducts)
);
