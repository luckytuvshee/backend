import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCT_TYPES,
  GET_BRAND_PRODUCTS,
  GET_TYPE_PRODUCTS,
  GET_TYPE_GROUP_PRODUCTS,
  SEARCH_TEXT,
  FILTER,
  FETCH_SEARCH_RESULT,
  GET_PRODUCT_BRANDS,
  GET_SIMILAR_PRODUCTS,
  GET_POPULAR_PRODUCTS,
  GET_MOST_PURCHASED_PRODUCTS,
} from "./types";

// Get products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.products,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get product
export const getProduct = (id) => async (dispatch) => {
  console.log("id: " + id);
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: {
        product: res.data.product,
        id,
      },
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get product types
export const getProductTypes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/product/types");
    dispatch({
      type: GET_PRODUCT_TYPES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get product brands
export const getProductBrands = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/product/brands");
    dispatch({
      type: GET_PRODUCT_BRANDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get type products
export const getTypeProducts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/type/${id}`);

    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_TYPE_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get type group products
export const getTypeGroupProducts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/type/group/${id}`);

    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_TYPE_GROUP_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get brand products
export const getBrandProducts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/brand/${id}`);

    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_BRAND_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get similar products
export const getSimilarProducts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/like/${id}`);

    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_SIMILAR_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get popular products
export const getPopularProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/popular");

    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_POPULAR_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Get most purchased products
export const getMostPurchasedProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/most-purchased");

    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_MOST_PURCHASED_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Search
export const searchText = (text) => (dispatch) => {
  dispatch({
    type: SEARCH_TEXT,
    payload: text,
  });
};

// Fetch Search Result
export const fetchSearchResult = (value) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ value });

  try {
    const res = await axios.post("/api/products/search", body, config);

    console.log("res:", res.data);

    dispatch({
      type: FETCH_SEARCH_RESULT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err },
    });
  }
};

// Filter
export const filterProduct = (object) => (dispatch) => {
  dispatch({
    type: FILTER,
    payload: object,
  });
};
