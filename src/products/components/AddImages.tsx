import { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

// ---- components
import { Button, InputText } from "@/components/Index";

interface Props {
  setFieldValue: (fieldName: string, value: string) => void;
}

export const AddImages = ({ setFieldValue }: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);

  const { errors, getFieldProps, handleSubmit, isValid, touched } = useFormik({
    validateOnMount: true,
    initialValues: {
      link: "",
    },
    onSubmit: async (values) => {
      setImages([...images, values.link]);
    },
    validationSchema: Yup.object({
      link: Yup.string()
        .url("Este campo debe ser una URL válida")
        .min(6, "Este campo debe tener al menos 6 caracteres")
        .required("Este campo es requerido"),
    }),
  });

  return (
    <section className="bg-customBlue-50 h-full flex flex-col p-4 rounded-2xl justify-center">
      <p className="font-bold text-xs text-customBlue-500 mb-2">Imágenes</p>
      <p className="font-light text-[10px] text-customBlue-900">
        Añada los links de las imágenes relacionadas al producto.
      </p>
      <div className="flex gap-1 mt-2">
        <InputText
          placeholder=""
          {...getFieldProps("link")}
          errorMessage={touched.link && errors.link}
        />
        <Button
          type="secondary"
          buttonType="button"
          customClassButton="h-8"
          isDisabled={!isValid}
          onClick={handleSubmit}
        >
          <p className="font-bold text-[9px] px-3">Agregar </p>
        </Button>
      </div>

      <p className="font-light text-[10px] text-customBlue-900 text-center mt-10 mb-3">
        Selecciona la imagen principal
      </p>

      <div className="flex flex-wrap">
        {images.map((url, idx) => (
          <div className="flex flex-col items-center gap-2" key={idx}>
            <input
              type="radio"
              id="huey"
              name="drone"
              onChange={(e) => {
                if (e.target.checked) {
                  console.log("entro aca", url);
                  setFieldValue("image", url);
                }
              }}
              disabled={brokenImages.includes(url)}
            />
            {brokenImages.includes(url) ? (
              <div className="w-12 h-12  rounded-lg"></div>
            ) : (
              <Image
                src={url}
                width={48}
                height={48}
                alt={url}
                onError={() => setBrokenImages([...brokenImages, url])}
              />
            )}
          </div>
        ))}

        {!images.length && (
          <div className="flex flex-col items-center gap-2">
            <input type="radio" disabled />
            <div className="w-12 h-12 bg-white rounded-lg"></div>
          </div>
        )}
      </div>
    </section>
  );
};
