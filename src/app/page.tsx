import { Button, Table, InputText } from "@/components/Index";
import Image from "next/image";

import iconEdit from "@/assets/icons/Frame.svg";
import iconTash from "@/assets/icons/trash.svg";

const columns: any[] = [
  { header: "Foto", accessor: "image" },
  { header: "Nombre", accessor: "title" },
  { header: "Categoría", accessor: "category" },
  { header: "Descripción", accessor: "description" },
  { header: "Tarifa base", accessor: "price" },
  { header: "", accessor: "actions" },
];

const DATA = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

export default function Home() {
  return (
    <section>
      {/* <p className="bg-backgroundPrimary">hola</p>
      <Button type="danger" isLoading={true}>
        holddda
      </Button>
 */}
 <InputText label='hola' placeholder="ingre"></InputText>
      <Table data={DATA} columns={columns}>
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
                />
              </section>
            );
          }

          return null;
        }}
      </Table>
    </section>
  );
}
