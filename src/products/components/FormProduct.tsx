import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as Yup from "yup";

// ---- components
import { Button, InputText, InputSelect } from "@/components";
import { AddImages, DeleteModal } from "./";

// ---- hooks
import { useFormik } from "formik";
import useGetCategories from "../hooks/useGetCategories";

// ---- interfaces
import { ProductEntity } from "@/products";

interface Props {
  handleSubmitProp: (values: Omit<ProductEntity, "id" | "rating">) => void;
  loadingButtonPrimary: boolean;
  initialData?: ProductEntity;
  isDetail?: boolean;
  isSearchParamsEdit?: string;
}

interface InfoDeleteProduct {
  isOpen: boolean;
  idProduct?: number;
}

export const FormProduct = ({
  handleSubmitProp,
  loadingButtonPrimary,
  initialData,
  isDetail,
  isSearchParamsEdit,
}: Props) => {
  const {
    getCategories,
    categories,
    loading: loadingCategories,
  } = useGetCategories();

  const [infoDeleteProduct, setInfoDeleteProduct] =
    useState<InfoDeleteProduct>();
  const [isEditable, setIsEditable] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setValues(initialData);

      setIsEditable(isSearchParamsEdit === "true");
    }
  }, [initialData, isSearchParamsEdit]);

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isValid,
    setFieldValue,
    setFieldTouched,
    getFieldMeta,
    setValues,
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
      await handleSubmitProp(values);
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
    <form className="flex flex-col gap-10 mt-10">
      <div className="grid grid-cols-2 gap-6">
        <section className="flex flex-col gap-6">
          <InputText
            label="Nombre*"
            placeholder=""
            errorMessage={touched.title && errors.title}
            {...getFieldProps("title")}
            isDisabled={!isEditable}
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
            isDisabled={!isEditable}
          />
          <InputText
            inputType="textarea"
            label="Descripción*"
            placeholder=""
            errorMessage={touched.description && errors.description}
            {...getFieldProps("description")}
            isDisabled={!isEditable}
          />
          <InputText
            prefixIcon="$"
            label="Tarifa base*"
            placeholder=""
            errorMessage={touched.price && errors.price}
            type="number"
            {...getFieldProps("price")}
            isDisabled={!isEditable}
          />
        </section>
        {isDetail ? (
          <div className="w-full flex items-center justify-center">
            <Image
              src={getFieldMeta("image").value}
              width={50}
              height={500}
              alt="logo"
              className="!h-full w-auto"
            />
          </div>
        ) : (
          <AddImages setFieldValue={setFieldValue} />
        )}
      </div>
      <div className="w-full flex justify-end">
        {isDetail && (
          <Button
            type="back"
            customClassButton="h-10 px-16"
            buttonType="button"
          >
            <Link
              href="/products"
              className="text-xs font-bold text-customViolet-900 "
            >
              {isEditable ? "Cancelar" : "Volver"}
            </Link>
          </Button>
        )}

        {!isEditable ? (
          <>
            <Button
              type="danger"
              customClassButton="h-10 px-16"
              onClick={() => {
                if (initialData)
                  setInfoDeleteProduct({
                    isOpen: true,
                    idProduct: initialData.id,
                  });
              }}
              buttonType="button"
            >
              <p className="text-xs font-bold ">Eliminar</p>
            </Button>

            <Button
              customClassButton="h-10 px-16"
              buttonType="button"
              onClick={() => setIsEditable(true)}
            >
              <p className="text-xs font-bold ">Editar</p>
            </Button>
          </>
        ) : (
          <Button
            customClassButton={`h-10 ${isDetail ? "px-16" : "px-12"}`}
            onClick={handleSubmit}
            buttonType="button"
            isDisabled={!isValid}
            isLoading={loadingButtonPrimary}
          >
            <p className="text-xs font-bold">Guardar</p>
          </Button>
        )}
      </div>

      {infoDeleteProduct?.isOpen && infoDeleteProduct.idProduct && (
        <DeleteModal
          idProduct={infoDeleteProduct?.idProduct}
          onClose={() => {
            setInfoDeleteProduct({ isOpen: false });
            router.push("/products");
          }}
        />
      )}
    </form>
  );
};
