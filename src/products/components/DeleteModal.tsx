// ---- components
import { Button, ModalContainer } from "@/components";

// ---- hooks
import { useDeleteProduct } from "../hooks";

interface Props {
  idProduct: number;
  onClose: () => void;
  onCloseSend: () => void;
}
export const DeleteModal = ({ onClose, idProduct, onCloseSend }: Props) => {
  const { deleteProduct, loading } = useDeleteProduct();

  return (
    <ModalContainer isOpen={true} onClose={onClose}>
      <section className="flex flex-col gap-6 pt-4 pb-12 px-12">
        <p className="font-bold text-[19px] text-customBlue-900">
          ¿Está seguro que desea eliminar el producto?
        </p>
        <div className="flex w-full gap-6 ">
          <Button type="back" customClassButton="flex-1 h-10" onClick={onClose}>
            <p className="font-bold text-xs text-customViolet-900">Cancelar</p>
          </Button>
          <Button
            type="danger"
            customClassButton="flex-1 h-10"
            isLoading={loading}
            onClick={async () => {
              await deleteProduct({ idProduct });
              onCloseSend();
            }}
          >
            <p className="font-bold text-xs">Confirmar</p>
          </Button>
        </div>
      </section>
    </ModalContainer>
  );
};
