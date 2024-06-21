import { useContext, useState } from "react";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { Toast } from "@/components/Toast";

// ---- interfaces
import { ProductEntity } from "../interfaces/product";

interface CreateProduct {
  product: Omit<ProductEntity, "id" | "rating">;
}

const useCreateProduct = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);

  const createProduct = async ({ product }: CreateProduct) => {
    try {
      setLoading(true);

      const response = await fetch(`https://fakestoreapi.com/products`, {
        method: "POST",
        body: JSON.stringify(product),
      });
      (await response.json()) as { id: number };

      const newProducts = state?.products || [];

      const highestId = newProducts.reduce((maxId, product) => {
        return product.id > maxId ? product.id : maxId;
      }, 0);

      newProducts.push({ ...product, id: highestId + 1 });

      dispatch({
        type: "setProducts",
        payload: {
          products: newProducts,
        },
      });

      setLoading(false);
      Toast(`Producto: ${product.title}, se creo con exito`);
    } catch (error) {
      setLoading(false);
      Toast(`Error al crear producto, intentalo de nuevo`, {
        type: "error",
      });
    }
  };

  return { createProduct, loading };
};

export default useCreateProduct;
