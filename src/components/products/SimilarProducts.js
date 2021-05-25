import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Spinner from "../layout/Spinner";
import { getSimilarProducts } from "../../actions/product";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    borderRadius: 0,
  },

  card: {
    margin: "0 10px",
    maxWidth: 345,
    background: "#cfe8fc",
    "&:hover": {
      boxShadow: " 6px 6px 7px 2px rgba(255,172,155,1)",
      cursor: "pointer",
    },
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

const SimilarProducts = ({
  id,
  getSimilarProducts,
  product: { similarProducts, loading },
  history,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getSimilarProducts(id);
  }, [getSimilarProducts, id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
      >
        Төстэй бараанууд
      </Typography>
      <Grid
        style={{
          marginBottom: 50,
        }}
        justify="space-between"
        container
        className={classes.root}
      >
        {similarProducts.map((product, index) => (
          <Card className={classes.card}>
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
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getSimilarProducts })(
  withRouter(SimilarProducts)
);
