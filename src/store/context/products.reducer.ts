import { ProductsState } from "./products.provider";

// ---- services 
import {LocalStorageService} from '@/services/localStorage.service'

// ---- interfaces
import { ProductEntity } from "@/products";

const localStorageService = new LocalStorageService();

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

      localStorageService.setItem({
        key: 'products',
        value: JSON.stringify(action.payload.products),
      });

      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};
