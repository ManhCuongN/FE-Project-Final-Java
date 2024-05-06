import React, { createContext, useReducer, useState } from 'react';
import {productReducer} from '../reducers/productReducer'
import axios from "axios";
import {apiURL} from "../constants/apiUrl.js"
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    products: [],
    isProductLoading: true,
    product: null,
  });

  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false)

  //Call post
  const getProduct = async () => {
    try {
      const response = await axios.get(`${apiURL}`);
        dispatch({ type: "PRODUCT_LOADED_SUCCESS", payload: response.data.metadata });
        return response.data
    } catch (error) {
      dispatch({ type: "PRODUCT_LOADED_FAILED" });
    }
  };

  const findProduct = (productId) => {
    const product = productState.products.find((product) => product.product_id === productId);
    dispatch({ type: "FIND_PRODUCT", payload: product });
  };

  const addProduct = async(data) => {
    try {
      const response = await axios.post(`${apiURL}`, data); 
        dispatch({ type: "ADD_PRODUCT", payload: response.data.metadata });
      return response.data;
    } catch (error) {
      console.log("err",error);
    }
  }

  const updateProduct = async(data) => {
    try {
      const response = await axios.patch(`${apiURL}/${data.product_id}`, data); 
        dispatch({ type: "UPDATE_PRODUCT", payload: response.data.metadata });
      return response.data;
    } catch (error) {
      console.log("err",error);
    }
  }

  const searchProduct = async(keyWord) => {
    try {
      const response = await axios.get(`${apiURL}/searchKeyWord?keyword=${keyWord}`); 
      dispatch({ type: "SEARCH_PRODUCT", payload: response.data.metadata });
      return response.data;
    } catch (error) {
      console.log("err",error);
    }
  }
  
  //Context Data
  const productContextData = {
    getProduct,
    productState,
    showModalUpdateProduct, 
    setShowModalUpdateProduct,
    findProduct,
    addProduct,
    updateProduct,
    searchProduct
  };

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
