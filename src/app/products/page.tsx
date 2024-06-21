// ---- containers
import { ProductsGrid } from "@/products";

// ---- interfaces
import { ProductEntity } from "@/products";

const getProducts = async (): Promise<ProductEntity[]> => {
  return await fetch(`https://fakestoreapi.com/products`).then((res) =>
    res.json()
  );
};

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsGrid products={products} />;
}
