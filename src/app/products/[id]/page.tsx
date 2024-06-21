import { Metadata } from "next";

// ---- containers
import { ProductsDetail } from "@/products";

// ---- interfaces
import { ProductEntity } from "@/products";

interface Props {
  params: { id: string };
  searchParams: { edit?: string };
}
//! En build time
export async function generateStaticParams() {
  const static20Products = Array.from({ length: 20 }).map((v, i) => `${i + 1}`);

  return static20Products.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product
      ? `#${product?.id}`
      : "Página del producto",
    description: product
      ? `Página del producto ${product?.title}`
      : "Description.",
  };
}

const getProduct = async (id: string): Promise<ProductEntity | undefined> => {
  try {
    const product = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: {
        revalidate: 60 * 60 * 30 * 6,
      },
    }).then((resp) => resp.json());

    return product;
  } catch (error) {
    console.error({ error });
  }
};

export default async function ProductPage({ params, searchParams }: Props) {
  return (
    <ProductsDetail
      id={+params.id}
      isSearchParamsEdit={searchParams?.edit}
    ></ProductsDetail>
  );
}
