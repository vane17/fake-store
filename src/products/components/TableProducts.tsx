"use client";
import { useContext, useState, useEffect } from "react";

import Image from "next/image";

// ---- hooks
import { useRouter } from "next/navigation";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { IconSearch } from "@tabler/icons-react";
import { Button, Table, InputText } from "@/components";
import { DeleteModal, LoadingTableProduct } from "./";

// ---- interfaces
import { ProductEntity } from "@/products";

// ---- assets
import iconEdit from "@/assets/icons/edit.svg";
import iconTash from "@/assets/icons/trash.svg";

const COLUMNS = [
  { header: "Foto", accessor: "image" },
  { header: "Nombre", accessor: "title" },
  { header: "Categoría", accessor: "category" },
  { header: "Descripción", accessor: "description" },
  { header: "Tarifa base", accessor: "price" },
  { header: "", accessor: "actions" },
];

const COLUMNS_WIDTH = [
  "w-24",
  "w-52",
  "w-32",
  "w-40 xl:w-auto",
  "w-32",
  "w-40",
];

const DATA_LOADING: ProductEntity[] = Array(10)
  .fill(undefined)
  .map((item, index) => ({
    ...item,
    id: index.toString(),
  }));

interface InfoDeleteProduct {
  isOpen: boolean;
  idProduct?: number;
}

export const TableProducts = () => {
  const { state } = useContext(ProductsContext);
  const router = useRouter();

  const [infoDeleteProduct, setInfoDeleteProduct] =
    useState<InfoDeleteProduct>();
  const [filterProducts, setFilterProducts] = useState<ProductEntity[]>([]);
  const [searchWord, setSearchWord] = useState<string>();

  useEffect(() => {
    if (searchWord?.length) {
      searchProducts(searchWord);
    }
  }, [searchWord]);

  const searchProducts = (searchTerm: string) => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    const newList =
      state.products?.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCasedSearchTerm) ||
          product.category.toLowerCase().includes(lowerCasedSearchTerm)
      ) || [];

    setFilterProducts(newList);
  };

  return (
    <>
      <InputText
        maxWidth="lg:w-1/3"
        placeholder="buscar por nombre o categoría"
        suffix={<IconSearch size={16} className="text-customBlue-500" />}
        onChange={(e) => setSearchWord((e.target as HTMLInputElement).value)}
      ></InputText>

      <Table
        data={
          state.loading
            ? DATA_LOADING
            : searchWord?.length
            ? filterProducts
            : state.products
        }
        columns={COLUMNS}
        columnsWidth={COLUMNS_WIDTH}
      >
        {(item, column) => {
          if (state.loading) {
            return (
              <LoadingTableProduct column={column} isLoading={state.loading} />
            );
          }
          if (column.accessor === "image") {
            return (
              <Image
                src={`${item.image}`}
                width={32}
                height={32}
                alt={item.title}
              />
            );
          }

          if (column.accessor === "title") {
            return <p className="line-clamp-2">{item.title}</p>;
          }

          if (column.accessor === "category") {
            return <p>{item.category}</p>;
          }

          if (column.accessor === "description") {
            return <p className="line-clamp-2">{item.description}</p>;
          }

          if (column.accessor === "price") {
            return <p>${item.price}</p>;
          }

          if (column.accessor === "actions") {
            return (
              <section className="flex items-center gap-2 ">
                <Button
                  type="secondary"
                  customClassButton="px-5 py-0"
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <p className="font-bold text-white text-[8px]">Ver</p>
                </Button>

                <Image
                  src={iconEdit}
                  width={26}
                  height={26}
                  alt="edit product"
                  className="cursor-pointer"
                  onClick={() => router.push(`/products/${item.id}?edit=true`)}
                />

                <Image
                  src={iconTash}
                  width={26}
                  height={26}
                  alt="edit product"
                  className="cursor-pointer"
                  onClick={() =>
                    setInfoDeleteProduct({ isOpen: true, idProduct: item.id })
                  }
                />
              </section>
            );
          }

          return null;
        }}
      </Table>
      {infoDeleteProduct?.isOpen && infoDeleteProduct.idProduct && (
        <DeleteModal
          idProduct={infoDeleteProduct?.idProduct}
          onClose={() => setInfoDeleteProduct({ isOpen: false })}
          onCloseSend={() => setInfoDeleteProduct({ isOpen: false })}
        />
      )}
    </>
  );
};
