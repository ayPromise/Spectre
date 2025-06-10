import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { showError, showSuccess } from "@/utils/toast";
import { Specification, Video } from "@shared/types";
import {
  MaterialType,
  MaterialTypeNameUA,
  SpecificationeNameUA,
} from "@shared/types/Enums";
import { useMaterials } from "@/context/MaterialsContext";
import { CreateVideoPayload } from "@/types/CreateMaterialPayload";
import saveMaterial from "../utils/saveMaterial";

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Заголовок обовʼязковий"),
  description: Yup.string().trim().required("Опис обовʼязковий"),
  videoURL: Yup.string()
    .required("Посилання на відео обовʼязкове")
    .matches(
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      "Має бути посиланням на YouTube"
    ),
  type: Yup.mixed<Specification>()
    .oneOf(Object.values(Specification), "Невірний тип")
    .required("Тип обовʼязковий"),
});

const specificationOptions = Object.values(Specification);

type VideoFormProps = {
  initialData?: Video;
};

const VideoForm: React.FC<VideoFormProps> = ({ initialData }) => {
  const isEditingMode = !!initialData;

  const router = useRouter();

  const { refetch } = useMaterials();
  const { mutate: createVideoMutation, isPending } = useMutation({
    mutationFn: (data: CreateVideoPayload) =>
      saveMaterial(data, isEditingMode ? initialData._id : undefined),
    onSuccess: (video) => {
      showSuccess(
        `${MaterialTypeNameUA[MaterialType.Video]} була успішно ${
          isEditingMode ? "оновлено" : "створено"
        } 🎉`
      );
      refetch();
      router.push(`/materials/video/${video._id}`);
    },
    onError: (error: Error) => {
      showError(
        error.message ||
          `Не вдалося ${isEditingMode ? "оновити" : "створити"} матеріал`
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      videoURL: initialData?.videoURL ?? "",
      type: initialData?.type ?? specificationOptions[0],
    },
    validationSchema,
    onSubmit: (values) => {
      createVideoMutation({
        ...values,
        kind: MaterialType.Video,
        time: 100,
      });
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" id="videoForm">
        <FormInput
          id="title"
          label="Заголовок"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && errors.title}
          required
        />

        <div>
          <Label htmlFor="type" className="block mb-3 font-medium">
            Тип відео
          </Label>
          <Select
            name="type"
            value={values.type}
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <SelectTrigger
              className={`w-full border p-2 rounded-md ${
                touched.type && errors.type
                  ? "border-red-600"
                  : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Оберіть тип..." />
            </SelectTrigger>
            <SelectContent>
              {specificationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {SpecificationeNameUA[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.type && errors.type && (
            <p className="text-red-600 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description" className="block mb-3 font-medium">
            Опис
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Введіть короткий опис відео..."
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`block w-full rounded-md border p-2 ${
              touched.description && errors.description
                ? "border-red-600"
                : "border-gray-300"
            }`}
          />
          {touched.description && errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <FormInput
          id="videoURL"
          label="Посилання на YouTube відео"
          name="videoURL"
          value={values.videoURL}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.videoURL && errors.videoURL}
          required
        />
      </form>

      <Button
        type="submit"
        form="videoForm"
        className="w-full mt-5 font-bold text-lg"
        disabled={isSubmitting || isPending}
      >
        {isEditingMode ? "Оновити" : "Створити"}
      </Button>
    </>
  );
};

export default VideoForm;
