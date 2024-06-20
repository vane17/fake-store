import { ProductsState } from "./products.provider";

// ---- interfaces
import { ProductEntity } from "@/products";

export type ProductsAction = {
  type: "setProducts";
  payload: {
    products: ProductEntity[];
  };
};

export const ProductsReducer = (
  state: ProductsState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case "setProducts":
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};
