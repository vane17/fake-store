"use client";
import { useContext, useState } from "react";

import Image from "next/image";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { Button, Table } from "@/components/Index";
import { DeleteModal } from "./DeleteModal";

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

interface InfoDeleteProduct {
  isOpen: boolean;
  idProduct?: number;
}

export const TableProducts = () => {
  const { state } = useContext(ProductsContext);
  
  const [infoDeleteProduct, setInfoDeleteProduct] =
    useState<InfoDeleteProduct>();

  return (
    <>
      <Table
        data={state.products}
        columns={COLUMNS}
        columnsWidth={COLUMNS_WIDTH}
      >
        {(item, column) => {
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
                <Button type="secondary" customClassButton="px-5 py-0">
                  <p className="font-bold text-white text-[8px]">Ver</p>
                </Button>
                <Image
                  src={iconEdit}
                  width={26}
                  height={26}
                  alt="edit product"
                  className="cursor-pointer"
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
        />
      )}
    </>
  );
};
