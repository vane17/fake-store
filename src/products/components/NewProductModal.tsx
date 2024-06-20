import { useContext } from "react";
import Image from "next/image";

// ---- context
import { ProductsContext } from "@/store/context/products.context";

// ---- components
import { Button, InputText, ModalContainer } from "@/components/Index";

// ---- hooks
import useDeleteProduct from "../hooks/useDeleteProduct";

interface Props {
  onClose: () => void;
}
export const NewProductModal = ({ onClose }: Props) => {
  /*  const { state } = useContext(ProductsContext); */
  const { deleteProduct, loading } = useDeleteProduct();

  return (
    <ModalContainer isOpen={true} onClose={onClose} customContainerClass="!p-12 lg:w-3/4 max-w-5xl">
      <section className="flex flex-col gap-6 mt-10">
        <form className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-6">
          <section className="flex flex-col gap-6">
            <InputText label="Nombre*" placeholder="" />
            <InputText inputType="textarea" label="Descripción*" placeholder="" />
            <InputText label="Tarifa base*" placeholder="" />
          </section>
          <section className="bg-customBlue-50 h-full flex flex-col p-4 rounded-2xl">
            <p className="font-bold text-xs text-customBlue-500 mb-2">
              Imágenes
            </p>
            <p className="font-light text-[10px] text-customBlue-900">
              Añada los links de las imágenes relacionadas al producto.
            </p>
            <div className="flex items-center gap-1 mt-2">
              <InputText placeholder="" />
              <Button type="secondary" buttonType="button">
                <p className="font-bold text-[9px] px-3">Agregar </p>
              </Button>
            </div>

            <p className="font-light text-[10px] text-customBlue-900 text-center mt-10">
              Selecciona la imagen principal
            </p>

            <div className="flex flex-grow">
              <div className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                />
                <Image
                  src={
                    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  }
                  width={48}
                  height={48}
                  alt={"name"}
                />
              </div>
            </div>
          </section>
          </div>
          <div className="w-full flex justify-end">
            <Button customClassButton="h-10 px-12"><p className="text-xs font-bold">Guardar</p></Button>
          </div>

        </form>
      </section>
    </ModalContainer>
  );
};
