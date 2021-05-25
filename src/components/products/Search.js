import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { filterProduct } from "../../actions/product";
import Spinner from "../layout/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";
import { getLikedProducts } from "../../actions/profile";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

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

const Search = ({
  product: { searchResult, loading, searchInput, filterData },
  auth,
  getLikedProducts,
  filterProduct,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

  const [sort, setSort] = React.useState("");
  const [highPrice, setHighPrice] = React.useState("");
  const [lowPrice, setLowPrice] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clear = () => {
    setSort("");
    setHighPrice("");
    setLowPrice("");
    filterProduct();
  };

  const filter = () => {
    if (highPrice < 0 || lowPrice < 0) {
      toast.warn("Үнэ 0 ээс бага байна");
      return;
    }

    if (parseInt(lowPrice) > parseInt(highPrice)) {
      toast.warn("Их үнэ бага үнээс бага байна");
      return;
    }

    if (highPrice === "" && lowPrice === "") {
      filterProduct({ sort });
      return;
    }

    if (highPrice >= 0 && lowPrice >= 0) {
      filterProduct({ highPrice, lowPrice, sort });
      return;
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      getLikedProducts(auth.user.id);
    } else {
      getLikedProducts(-1);
    }
  });

  if (searchInput == null) {
    return (
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
        style={{ background: "#fff", textAlign: "center" }}
      >
        Хайх утгаа оруулна уу
      </Typography>
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={classes.root}>
        <Typography
          className={classes.typography}
          variant="h3"
          color="textSecondary"
        >
          Хайлтын утга: {searchInput}
        </Typography>

        <Grid
          container
          spacing={3}
          justify="space-between"
          style={{ maxWidth: "80%", margin: "auto", marginBottom: 30 }}
        >
          <Grid item>
            Эрэмбэлэх:{" "}
            <Select
              style={{ margin: "0 20px" }}
              value={sort}
              onChange={handleChange}
            >
              <MenuItem value="asc">Үнэ өссөн</MenuItem>
              <MenuItem value="desc">Үнэ буурсан</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Grid container justify="center" spacing={3}>
              <Grid item>
                <TextField
                  id="low_price"
                  label="Бага үнэ"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  type="number"
                  value={lowPrice}
                  onChange={(e) => {
                    console.log(lowPrice);
                    setLowPrice(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="high_price"
                  label="Их үнэ"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  type="number"
                  value={highPrice}
                  onChange={(e) => {
                    console.log(highPrice);
                    setHighPrice(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={filter}
            >
              Шүүлт хийх
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="default"
              size="large"
              className={classes.button}
              onClick={clear}
            >
              Цэвэрлэх
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} justify="center">
          {searchResult.length === 0 && (
            <Typography
              className={classes.typography}
              variant="h3"
              color="textSecondary"
              style={{ background: "#fff" }}
            >
              Бараа байхгүй байна
            </Typography>
          )}
          {searchResult
            .filter((item) => {
              if (filterData) {
                if (filterData.highPrice && filterData.lowPrice) {
                  return (
                    item.price < filterData.highPrice &&
                    item.price > filterData.lowPrice
                  );
                } else if (filterData.highPrice) {
                  return item.price < filterData.highPrice;
                } else if (filterData.lowPrice) {
                  return item.price > filterData.lowPrice;
                }
              }

              return true;
            })
            .sort((a, b) => {
              if (filterData) {
                if (filterData.sort) {
                  console.log("sort type: " + filterData.sort);
                  if (filterData.sort === "asc") return a.price - b.price;
                  else return b.price - a.price;
                } else {
                  return a.price - b.price;
                }
              } else {
                return a.price - b.price;
              }
            })
            .map((product) => (
              <Grid
                key={product.id}
                item
                xs="auto"
                sm="auto"
                md="auto"
                lg="auto"
              >
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

Search.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLikedProducts,
  filterProduct,
})(Search);
