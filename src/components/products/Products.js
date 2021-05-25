import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";
import { getProducts } from "../../actions/product";
import { getLikedProducts } from "../../actions/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 20px",
    textAlign: "center",
    borderRadius: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: 0,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  typography: {
    padding: 80,
    backgroundImage: `url(${require("../../assets/images/heading_background.png")})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    fontFamily: "Pacifico",
  },
}));

const Products = ({
  getProducts,
  product: { products, loading },
  auth,
  getLikedProducts,
}) => {
  // Component Did Mount
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Component Will Mount
  useEffect(() => {
    if (auth.isAuthenticated) {
      getLikedProducts(auth.user.id);
    } else {
      getLikedProducts(-1);
    }
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading ? (
    <div className={classes.root}>
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
      >
        Шинээр нэмэгдсэн
      </Typography>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <div className={classes.root}>
        <Typography
          className={classes.typography}
          variant="h3"
          color="textSecondary"
        >
          Шинээр нэмэгдсэн
        </Typography>

        <Grid container spacing={3} justify="center">
          {products.map((product) => (
            <Grid key={product.id} item xs="auto" sm="auto" md="auto" lg="auto">
              <ProductItem modalOpen={handleOpen} product={product} />
            </Grid>
          ))}
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <ProductModal
            textRem={1.4}
            fullModalHeight={false}
            modalClose={handleClose}
            id={id}
          />
        </Modal>
      </div>
    </Fragment>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProducts, getLikedProducts })(
  Products
);
