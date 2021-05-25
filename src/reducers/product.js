import {
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCT_TYPES,
  GET_PRODUCT_BRANDS,
  GET_TYPE_PRODUCTS,
  SEARCH_TEXT,
  FILTER,
  FETCH_SEARCH_RESULT,
  GET_BRAND_PRODUCTS,
  GET_SIMILAR_PRODUCTS,
  GET_TYPE_GROUP_PRODUCTS,
  GET_POPULAR_PRODUCTS,
  GET_MOST_PURCHASED_PRODUCTS,
} from '../actions/types';

const initialState = {
  products: [],
  productTypes: [],
  productBrands: [],
  searchInput: null,
  searchResult: [],
  filterData: {},
  brandProducts: [],
  similarProducts: [],
  popularProducts: [],
  mostPurchasedProducts: [],
  typeProducts: [],
  typeGroupProducts: [],
  productsMore: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };

    case GET_PRODUCT:
      state.productsMore[payload.id] = payload.product;
      return {
        ...state,
        productsMore: state.productsMore,
        loading: false,
      };

    case GET_PRODUCT_TYPES:
      return {
        ...state,
        productTypes: payload,
        loading: false,
      };

    case GET_PRODUCT_BRANDS:
      return {
        ...state,
        productBrands: payload,
        loading: false,
      };

    case GET_BRAND_PRODUCTS:
      return {
        ...state,
        brandProducts: payload,
        loading: false,
      };

    case GET_SIMILAR_PRODUCTS:
      return {
        ...state,
        similarProducts: payload,
        loading: false,
      };

    case GET_POPULAR_PRODUCTS:
      return {
        ...state,
        popularProducts: payload,
        loading: false,
      };

    case GET_MOST_PURCHASED_PRODUCTS:
      return {
        ...state,
        mostPurchasedProducts: payload,
        loading: false,
      };

    case GET_TYPE_PRODUCTS:
      return {
        ...state,
        typeProducts: payload,
        loading: false,
      };

    case GET_TYPE_GROUP_PRODUCTS:
      return {
        ...state,
        typeGroupProducts: payload,
        loading: false,
      };

    case SEARCH_TEXT:
      return {
        ...state,
        searchInput: payload,
      };

    case FETCH_SEARCH_RESULT:
      return {
        ...state,
        searchResult: payload,
      };

    case FILTER:
      return {
        ...state,
        filterData: payload,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
