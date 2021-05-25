import React from 'react';
import ProductModal from '../products/ProductModal';
import Grid from '@material-ui/core/Grid';
import SimilarProducts from '../products/SimilarProducts';

const Product = ({ match }) => {
  return (
    <Grid
      style={{ marginTop: 30 }}
      container
      alignItems="center"
      direction="column"
    >
      <ProductModal textRem={1} fullModalHeight={true} id={match.params.id} />
      <SimilarProducts id={match.params.id} />
    </Grid>
  );
};

export default Product;
