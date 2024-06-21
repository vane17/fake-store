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

const useDeleteProduct = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);

  const deleteProduct = async ({ idProduct }: DeleteProduct) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fakestoreapi.com/products/${idProduct}`,
        {
          method: "DELETE",
        }
      );
      const res = (await response.json()) as ProductEntity;

      dispatch({
        type: "setProducts",
        payload: {
          products:
            state.products?.filter((product) => product.id !== idProduct) || [],
        },
      });

      setLoading(false);
      Toast(`Producto: ${res.title}, eliminado con exito`);
    } catch (error) {
      setLoading(false);
      Toast(`Error al eliminar producto, intentalo de nuevo`, {
        type: "error",
      });
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;
