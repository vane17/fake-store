import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ---- components
import {
  Button,
  InputText,
  ModalContainer,
  InputSelect,
} from "@/components/Index";
import { AddImages } from "./";

// ---- hooks
import useCreateProduct from "../hooks/useCreateProduct";
import useGetCategories from "../hooks/useGetCategories";

interface Props {
  onClose: () => void;
}
export const NewProductModal = ({ onClose }: Props) => {
  const { createProduct, loading } = useCreateProduct();
  const { getCategories, categories, loading: loadingCategories } = useGetCategories();

  useEffect(() => {
    getCategories();
  }, []);

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isValid,
    setFieldValue,
    setFieldTouched,
    getFieldMeta,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    },
    onSubmit: async (values) => {
      await createProduct({ product: values });
      onClose();
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(6, "Este campo debe tener al menos 6 caracteres")
        .required("Este campo es requerido"),
      price: Yup.number()
        .required("Este campo es requerido")
        .min(1, "El precio debe ser mayor que 1"),
      description: Yup.string()
        .min(6, "Este campo debe tener al menos 6 caracteres")
        .required("Este campo es requerido"),
      image: Yup.string()
        .min(6, "Este campo debe tener al menos 6 caracteres")
        .required("Este campo es requerido"),
      category: Yup.string().required("Este campo es requerido"),
    }),
  });

  return (
    <ModalContainer
      isOpen={true}
      onClose={onClose}
      customContainerClass="!p-12 lg:w-3/4 max-w-5xl"
    >
      <section className="flex flex-col gap-6 mt-10">
        <form className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-6">
            <section className="flex flex-col gap-6">
              <InputText
                label="Nombre*"
                placeholder=""
                errorMessage={touched.title && errors.title}
                {...getFieldProps("title")}
              />
              <InputSelect
                options={categories}
                label="Categoría"
                value={{
                  value: getFieldMeta("category").value,
                  label: getFieldMeta("category").value,
                }}
                onItemSelected={(category) =>
                  setFieldValue("category", category.value)
                }
                errorMessage={touched.category && errors.category}
                setFieldTouched={setFieldTouched}
                name="category"
                isLoading={loadingCategories}
              />
              <InputText
                inputType="textarea"
                label="Descripción*"
                placeholder=""
                errorMessage={touched.description && errors.description}
                {...getFieldProps("description")}
              />
              <InputText
                prefixIcon="$"
                label="Tarifa base*"
                placeholder=""
                errorMessage={touched.price && errors.price}
                type="number"
                {...getFieldProps("price")}
              />
            </section>
            <AddImages setFieldValue={setFieldValue} />
          </div>
          <div className="w-full flex justify-end">
            <Button
              customClassButton="h-10 px-12"
              onClick={handleSubmit}
              buttonType="button"
              isDisabled={!isValid}
              isLoading={loading}
            >
              <p className="text-xs font-bold">Guardar</p>
            </Button>
          </div>
        </form>
      </section>
    </ModalContainer>
  );
};
