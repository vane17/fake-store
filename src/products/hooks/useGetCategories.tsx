import { useState } from "react";

interface Options {
  label: string;
  value: string;
}

const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Options[]>();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://fakestoreapi.com/products/categories`
      );
      const categoriesRes = (await response.json()) as string[];

      setCategories(
        categoriesRes.map((category) => ({ label: category, value: category }))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return { getCategories, loading, categories };
};

export default useGetCategories;
