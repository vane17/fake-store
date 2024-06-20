import { createContext } from "react";
import { ProductsState } from "./products.provider";
import { ProductsAction } from "./products.reducer";

export interface DeliveryContextProps {
  state: ProductsState;
  dispatch: React.Dispatch<ProductsAction>;
}

export const ProductsContext = createContext<DeliveryContextProps>(
  {} as DeliveryContextProps
);
