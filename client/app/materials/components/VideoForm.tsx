import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { showError, showSuccess } from "@/utils/toast";
import { Video } from "@shared/types";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";
import { useMaterials } from "@/context/MaterialsContext";
import { CreateVideoPayload } from "@/types/CreateMaterialPayload";
import saveMaterial from "../utils/saveMaterial";
import FormTextarea from "@/components/custom/FormTextarea";

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Заголовок обовʼязковий"),
  description: Yup.string().trim().required("Опис обовʼязковий"),
  videoURL: Yup.string()
    .required("Посилання на відео обовʼязкове")
    .matches(
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      "Має бути посиланням на YouTube"
    ),
  course: Yup.string().trim().required("Тип обовʼязковий"),
});

type VideoFormProps = {
  initialData?: Video;
  selectedCourse?: string;
};

const VideoForm: React.FC<VideoFormProps> = ({
  initialData,
  selectedCourse,
}) => {
  const isEditingMode = !!initialData;

  const router = useRouter();

  const { refetch } = useMaterials();

  const {
    mutate: createVideoMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: CreateVideoPayload) =>
      saveMaterial(data, isEditingMode ? initialData._id : undefined),
    onSuccess: (video) => {
      showSuccess(
        `${MaterialTypeNameUA[MaterialType.Video]} було успішно ${
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
      course: initialData?.course ?? selectedCourse ?? "",
    },
    enableReinitialize: true,
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
    isSubmitting,
  } = formik;

  return (
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
        disabled={(isSubmitting || isPending) && !isError}
      />

      <FormTextarea
        id="description"
        name="description"
        placeholder="Введіть короткий опис лекції..."
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        label="Опис"
        error={touched.description && errors.description}
        disabled={(isSubmitting || isPending) && !isError}
      />

      <FormInput
        id="videoURL"
        label="Посилання на YouTube відео"
        name="videoURL"
        value={values.videoURL}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.videoURL && errors.videoURL}
        required
        disabled={(isSubmitting || isPending) && !isError}
      />

      <Button
        type="submit"
        form="videoForm"
        className="w-full mt-5 font-bold text-lg"
        disabled={(isSubmitting || isPending) && !isError}
      >
        {isEditingMode ? "Оновити" : "Створити"}
      </Button>
    </form>
  );
};

export default VideoForm;
