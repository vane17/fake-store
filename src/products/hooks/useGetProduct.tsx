import { useState } from "react";

// ---- components
import { ProductEntity } from "../interfaces/product";

// ---- services
import { LocalStorageService } from "@/services/localStorage.service";

interface GetProduct {
  id: number;
}

const localStorageService = new LocalStorageService();

const useGetProduct = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductEntity>();

  const getProduct = async ({ id }: GetProduct) => {
    try {
      setLoading(true);

      const productsLocalStorage = await localStorageService.getItem<
        ProductEntity[]
      >({
        key: "products",
      });

      const productEdit = productsLocalStorage?.find(
        (product) => product.id === id
      );

      if (productEdit) {
        setProduct(productEdit);
      } else {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const productRes = (await response?.json()) as ProductEntity;
        setProduct(productRes);
      }

      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  return { getProduct, loading, product };
};

export default useGetProduct;
