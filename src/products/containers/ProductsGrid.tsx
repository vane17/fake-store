"use client";

import { useEffect, useContext } from "react";

import Image from "next/image";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { Button, InputText } from "@/components/Index";
import { TableProducts } from "../components/TableProducts";

// ---- interfaces
import { ProductEntity } from "../interfaces/product";

// ---- assets
import iconPlusFolder from "@/assets/icons/plus-folder.svg";
import logoLizit from "@/assets/logos/logoLizit.svg";
import { IconSearch } from "@tabler/icons-react";

interface Props {
  products: ProductEntity[];
}

export const ProductsGrid = ({ products }: Props) => {
  const { dispatch } = useContext(ProductsContext);

  useEffect(() => {
    dispatch({
      type: "setProducts",
      payload: {
        products,
      },
    });
  }, [products]);
  return (
    <section className="flex flex-col gap-9 w-full">
      <div className="flex items-center justify-between">
        <Button customClassButton="h-10 px-6">
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
    </section>
  );
};
