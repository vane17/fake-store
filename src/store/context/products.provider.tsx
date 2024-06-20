import { useReducer } from "react";
import { ProductsContext } from "./products.context";
import { ProductsReducer } from "./products.reducer";

// ---- interfaces
import { ProductEntity } from "@/products";

export interface ProductsState {
  products?: ProductEntity[];
}

const INITIAL_STATE: ProductsState = {
  products: [],
};

interface Prop {
  children?: JSX.Element | JSX.Element[];
}

export const ProductsProvider = ({ children }: Prop) => {
  const [state, dispatch] = useReducer(ProductsReducer, INITIAL_STATE);

  return (
    <ProductsContext.Provider value={{ state: { ...state }, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
