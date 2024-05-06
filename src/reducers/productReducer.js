export const productReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
        case "PRODUCT_LOADED_SUCCESS":
            return {
              ...state,
              products: payload,
              isProductLoading: false,
            };
        case "POST_LOADED_FAILED":
            return {
                ...state,
                products: [],
                isProductLoading: false,
            };
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, payload],
            };
        case "FIND_PRODUCT":
        
            return {
                ...state,
                product: payload,
            };
        case "UPDATE_PRODUCT":
            const newProduct = state.products.map((product) =>
                product.product_id === payload.product_id ? payload : product
            );
            return {
                ...state,
                products: newProduct,
            };

            case "SEARCH_PRODUCT":
                return {
                    ...state,
                    products: payload,
                    isProductLoading: false,
                  };

     
      default:
        return state;
    }
  };
  