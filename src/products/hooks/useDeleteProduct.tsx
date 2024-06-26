import { useContext, useState } from "react";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { Toast } from "@/components/Toast";

// ---- interfaces
import { ProductEntity } from "../interfaces/product";

interface DeleteProduct {
  idProduct: number;
}

export const useDeleteProduct = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);

  const deleteProduct = async ({ idProduct }: DeleteProduct) => {
    try {
      setLoading(true);

      await fetch(
        `https://fakestoreapi.com/products/${idProduct}`,
        {
          method: "DELETE",
        }
      );
      const productDelete = state.products?.find((product)=> product.id === idProduct)

      dispatch({
        type: "setProducts",
        payload: {
          products:
            state.products?.filter((product) => product.id !== idProduct) || [],
        },
      });

      setLoading(false);
      Toast(`Producto: ${productDelete?.title}, eliminado con exito`);
    } catch (error) {
      setLoading(false);
      Toast(`Error al eliminar producto, intentalo de nuevo`, {
        type: "error",
      });
    }
  };

  return { deleteProduct, loading };
};
