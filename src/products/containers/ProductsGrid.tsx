"use client";

import { useEffect, useContext, useState } from "react";

import Image from "next/image";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { IconSearch } from "@tabler/icons-react";
import { Button, InputText } from "@/components";
import { TableProducts, NewProductModal } from "../components";

// ---- interfaces
import { ProductEntity } from "../interfaces/product";

// ---- services
import { LocalStorageService } from "@/services/localStorage.service";

// ---- assets
import iconPlusFolder from "@/assets/icons/plus-folder.svg";
import logoLizit from "@/assets/logos/logoLizit.svg";

interface Props {
  products: ProductEntity[];
}

const localStorageService = new LocalStorageService();

export const ProductsGrid = ({ products }: Props) => {
  const { dispatch } = useContext(ProductsContext);
  const [addProduct, setProduct] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const productsLocalStorage = await localStorageService.getItem<
        ProductEntity[]
      >({
        key: "products",
      });

      dispatch({
        type: "setProducts",
        payload: {
          products: productsLocalStorage ?? products,
        },
      });
    };

    getProducts();
  }, [products]);
  return (
    <section className="flex flex-col gap-9 w-full">
      <div className="flex items-center justify-between">
        <Button customClassButton="h-10 px-6" onClick={() => setProduct(true)}>
          <div className="flex items-center gap-2">
            <Image
              src={iconPlusFolder}
              width={14}
              height={12}
              alt="icon plus folder"
            />
            <p className="font-bold text-xs max-w-72">Nuevo producto</p>
          </div>
        </Button>

        <Image src={logoLizit} width={50} height={12} alt="logo" />
      </div>

      <InputText
        maxWidth="lg:w-1/3"
        placeholder="buscar"
        suffix={<IconSearch size={16} className="text-customBlue-500" />}
      ></InputText>
      <TableProducts />
      {addProduct && <NewProductModal onClose={() => setProduct(false)} />}
    </section>
  );
};
