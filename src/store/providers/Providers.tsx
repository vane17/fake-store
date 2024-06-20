"use client";
import { ProductsProvider } from "@/store/context/products.provider";

interface Props {
  children: JSX.Element;
}

export const Providers = ({ children }: Props) => {
  /*  useEffect(() => {
    const favorites = JSON.parse( localStorage.getItem('favorite-pokemons') ?? '{}'  );
    store.dispatch( setFavoritePokemons(favorites) );
    
  }, [])
   */

  return <ProductsProvider>{children}</ProductsProvider>;
};
