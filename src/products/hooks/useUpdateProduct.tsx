import { useContext, useState } from "react";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { Toast } from "@/components/Toast";

// ---- interfaces
import { ProductEntity } from "../interfaces/product";

interface CreateProduct {
  product: Omit<ProductEntity, "id" | "rating">;
  id: number;
}

export const useUpdateProduct = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);

  const updateProduct = async ({ product, id }: CreateProduct) => {
    try {
      setLoading(true);

      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(product),
      });
      (await response.json()) as { id: number };

      const newProducts = state?.products || [];

      dispatch({
        type: "setProducts",
        payload: {
          products:newProducts.map((prod)=> (prod.id === id ? product as ProductEntity : prod)),
        },
      });

      setLoading(false);
      Toast(`Producto: ${product.title}, actualizado con exito`);
    } catch (error) {
      setLoading(false);
    }
  };

  return { updateProduct, loading };
};
