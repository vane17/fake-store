"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ---- components
import { LoadingPage } from "@/components";
import { FormProduct, NotFoundProduct } from "../components";

// ---- interfaces
import { ProductEntity } from "../interfaces/product";

// ---- hooks
import useGetProduct from "../hooks/useGetProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";

// ---- assets
import logoLizit from "@/assets/logos/logoLizit.svg";
import iconArrow from "@/assets/icons/arrow.svg";

interface Props {
  id: number;
  isSearchParamsEdit?: string;
}

export const ProductsDetail = ({ id, isSearchParamsEdit }: Props) => {
  const { getProduct, loading, product } = useGetProduct();
  const { updateProduct, loading: loadingUpdate } = useUpdateProduct();
  const router = useRouter();

  useEffect(() => {
    getProduct({ id });
  }, []);

  return loading ? (
    <LoadingPage />
  ) : !loading && !product ? (
    <NotFoundProduct />
  ) : (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="bg-customBlue-50 flex justify-center items-center rounded-[5px] h-5 w-5"
          >
            <Image src={iconArrow} width={50} height={12} alt="logo" />
          </Link>
          <h3 className="font-bold text-customBlue-900 text-2xl">
            {product?.title}
          </h3>
        </div>

        <Image src={logoLizit} width={50} height={12} alt="logo" />
      </div>
      <FormProduct
        handleSubmitProp={async (
          values: Omit<ProductEntity, "id" | "rating">
        ) => {
          await updateProduct({ product: values, id });
          router.push("/products");
        }}
        loadingButtonPrimary={loadingUpdate}
        initialData={product}
        isDetail={true}
        isSearchParamsEdit={isSearchParamsEdit}
      />
    </section>
  );
};
