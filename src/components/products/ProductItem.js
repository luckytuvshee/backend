import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { addLikedProduct, removeLikedProduct } from "../../actions/profile";

import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    background: "#cfe8fc",
    "&:hover": {
      boxShadow: " 6px 6px 7px 2px rgba(255,172,155,1)",
      cursor: "pointer",
    },
    backgroundSize: "contain",
    borderRadius: 0,
  },
  media: {
    height: 0,
    paddingTop: "100%",
    marginTop: 10,
    backgroundSize: "contain",
  },

  cardContent: {
    minWidth: 345,
    padding: "10px 0 0 0",
  },

  like: {
    color: red[500],
  },
}));

const ProductItem = ({
  product: { id, product_name, price, image },
  auth,
  profile,
  modalOpen,
  addLikedProduct,
  removeLikedProduct,
}) => {
  const classes = useStyles();

  const check_liked = () => {
    if (profile.likedProducts.length === 0) return false;

    for (let i = 0; i < profile.likedProducts.length; i++) {
      if (
        profile.likedProducts[i].user_id === auth.user.id &&
        profile.likedProducts[i].product_id === id
      ) {
        return true;
      }
    }
    return false;
  };

  const [liked, setLiked] = React.useState(check_liked());

  const like = () => {
    if (auth.isAuthenticated) {
      if (!liked) {
        addLikedProduct(auth.user.id, id);
        setLiked(!liked);
        toast.success("Бараа таалагдсан бараанд нэмэгдлээ");
      } else {
        removeLikedProduct(auth.user.id, id);
        setLiked(!liked);
        toast.warn("Бараа таалагдсан бараанаас хасагдлаа");
      }
    } else {
      toast.error("Та эхлээд нэвтэрнэ үү!");
    }
  };

  // Component Will Mount
  useEffect(() => {
    setLiked(check_liked());
  }, [profile.loading, profile.likedProducts]);

  return profile.loading ? (
    <Card
      className={classes.root}
      style={{
        background: "#fff",
      }}
    >
      <CardContent className={classes.cardContent}>
        <Spinner />
      </CardContent>
    </Card>
  ) : (
    <Card className={classes.root}>
      <Link to={`/product/${id}`}>
        <CardMedia
          className={classes.media}
          image={require(`../../assets${image}`)}
          title={product_name}
        />
      </Link>

      <Link to={`/product/${id}`}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" color="textSecondary" component="p">
            {product_name}
          </Typography>
          <Typography
            style={{ paddingTop: 5 }}
            color="textSecondary"
            component="p"
          >
            ₮{price}
          </Typography>
        </CardContent>
      </Link>
      <CardActions style={{ justifyContent: "space-between" }} disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => like()}>
          <FavoriteOutlinedIcon className={liked ? classes.like : null} />
        </IconButton>
        <Button
          onClick={() => modalOpen(id)}
          variant="contained"
          color="secondary"
          size="large"
          style={{ borderRadius: 0 }}
        >
          Харах
        </Button>
      </CardActions>
    </Card>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLikedProduct,
  removeLikedProduct,
})(ProductItem);
