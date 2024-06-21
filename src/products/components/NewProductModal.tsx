// ---- components
import { ModalContainer } from "@/components";
import { FormProduct } from "./";

// ---- hooks
import useCreateProduct from "../hooks/useCreateProduct";

// ---- interfaces
import { ProductEntity } from "@/products";

interface Props {
  onClose: () => void;
}
export const NewProductModal = ({ onClose }: Props) => {
  const { createProduct, loading } = useCreateProduct();

  return (
    <ModalContainer
      isOpen={true}
      onClose={onClose}
      customContainerClass="!p-12 lg:w-3/4 max-w-5xl"
    >
      <FormProduct
        handleSubmitProp={async (
          values: Omit<ProductEntity, "id" | "rating">
        ) => {
          await createProduct({ product: values });
          onClose();
        }}
        loadingButtonPrimary={loading}
      />
    </ModalContainer>
  );
};
