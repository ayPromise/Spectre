"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Label } from "@/components/ui/label";
import { useMaterials } from "@/context/MaterialsContext";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Achievement } from "@shared/types";
import saveAchievement from "../utils/saveAchievement";
import MultiSelect from "@/components/custom/MultiSelect";
import { MaterialTypeNameUA } from "@shared/types/Enums";
import FormTextarea from "@/components/custom/FormTextarea";

interface AchievementFormProps {
  initialData?: Achievement;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Обов'язково вкажіть назву"),
  description: Yup.string().trim().required("Обов'язково вкажіть опис"),
  category: Yup.string().trim().required("Обов'язково вкажіть категорію"),
  requiredMaterials: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required(),
        kind: Yup.string().required(),
      })
    )
    .min(1, "Оберіть хоча б один матеріал"),
});

const AchievementForm: React.FC<AchievementFormProps> = ({
  initialData,
  open,
  onClose,
  onSubmit,
}) => {
  const isEditing = !!initialData;
  const { materials } = useMaterials();

  const { mutate: saveAchievementMutation, isPending } = useMutation({
    mutationFn: (data: Partial<Achievement>) =>
      saveAchievement(data, initialData?._id),
    onSuccess: () => {
      showSuccess(`Досягнення ${isEditing ? "оновлено" : "створено"}!`);
      onClose();
      if (onSubmit) onSubmit();
      window.location.reload();
    },
    onError: (err: Error) => showError(err.message),
  });

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      requiredMaterials:
        initialData?.requiredMaterials.map((m) => ({
          id: m.id,
          kind: m.kind,
        })) || [],
    },
    validationSchema,
    onSubmit: (values) => {
      saveAchievementMutation({
        title: values.title,
        description: values.description,
        category: values.category,
        requiredMaterials: values.requiredMaterials,
      });
    },
  });

  const {
    handleSubmit,
    values,
    handleChange,
    isSubmitting,
    touched,
    errors,
    setFieldValue,
    handleBlur,
  } = formik;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редагування досягнення" : "Нове досягнення"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FormInput
            id="title"
            label="Назва"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title ? errors.title : undefined}
            required
            disabled={isSubmitting || isPending}
          />
          <FormInput
            id="category"
            label="Категорія"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.category && errors.category ? errors.category : undefined
            }
            required
            disabled={isSubmitting || isPending}
          />
          <FormTextarea
            id="description"
            name="description"
            label="Опис"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            required
            disabled={isSubmitting || isPending}
          />

          <div>
            <Label
              htmlFor="requiredMaterials"
              className="block mb-1 font-medium"
            >
              Матеріали
            </Label>
            <MultiSelect
              options={materials.map((m) => ({
                label: `${m.title} (${MaterialTypeNameUA[m.kind]})`,
                value: JSON.stringify({ id: m._id, kind: m.kind }),
              }))}
              selectedValues={values.requiredMaterials.map((r) =>
                JSON.stringify(r)
              )}
              setSelectedValues={(sel) => {
                const arr = sel.map((s) => JSON.parse(s));
                setFieldValue("requiredMaterials", arr);
              }}
              placeholder="Оберіть матеріали..."
            />
            {touched.requiredMaterials && errors.requiredMaterials && (
              <p className="text-red-600 text-sm mt-1"></p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isPending}
          >
            {isEditing ? "Оновити" : "Створити"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementForm;
