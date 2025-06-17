"use client";

import { useParams } from "next/navigation";
import { MaterialType } from "@shared/types/Enums";
import { useMaterials } from "@/context/MaterialsContext";
import { useEffect, useState } from "react";
import { showError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import ArticleForm from "@/app/materials/components/ArticleForm";
import LectureForm from "@/app/materials/components/LectureForm";
import VideoForm from "@/app/materials/components/VideoForm";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseCombobox from "@/components/custom/CourseComboBox";
import { Article, Video } from "@shared/types";
import { Lecture } from "@shared/types/Lecture";

const MaterialEditPage = () => {
  const params = useParams();
  const kind = String(params.kind);
  const kindToMaterialType = (k: string): MaterialType => {
    switch (k.toLowerCase()) {
      case "article":
        return MaterialType.Article;
      case "lecture":
        return MaterialType.Lecture;
      case "video":
        return MaterialType.Video;
      default:
        return MaterialType.Article;
    }
  };
  const id = String(params.id);
  const [selectedType, setSelectedType] = useState<MaterialType>(
    kindToMaterialType(kind)
  );
  const router = useRouter();
  const { materials, isLoading, isError, error } = useMaterials();
  const materialById = materials.find((m) => m._id === id);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const allCourses = Array.from(
    new Set(materials.map((material) => material.course).filter(Boolean))
  );

  useEffect(() => {
    if (!isLoading && materials.length > 0 && !materialById) {
      showError("Матеріал не знайдено");
      router.replace(`/materials/${kind}`);
    }
    if (materialById?.course) {
      setSelectedCourse(materialById.course);
    }
  }, [isLoading, materialById, kind, router, materials]);

  return (
    materialById && (
      <div>
        <h1 className="text-2xl font-semibold mb-6">
          Редагування навчального матеріалу
        </h1>

        <div className="flex gap-4">
          <div className="mb-6">
            <Label className="block mb-2 text-sm font-medium">
              Тип матеріалу
            </Label>
            <Select
              onValueChange={(val: MaterialType) => setSelectedType(val)}
              value={selectedType}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue>
                  {
                    {
                      [MaterialType.Article]: "Стаття",
                      [MaterialType.Lecture]: "Лекція",
                      [MaterialType.Video]: "Відео",
                    }[selectedType]
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MaterialType.Article}>Стаття</SelectItem>
                <SelectItem value={MaterialType.Lecture}>Лекція</SelectItem>
                <SelectItem value={MaterialType.Video}>Відео</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type" className="block mb-2 text-sm font-medium">
              Курс:
            </Label>
            <CourseCombobox
              allCourses={allCourses}
              value={selectedCourse}
              onChange={(val) => setSelectedCourse(val)}
            />
          </div>
        </div>

        {selectedType === MaterialType.Article && (
          <ArticleForm
            selectedCourse={selectedCourse}
            initialData={materialById as Article}
          />
        )}

        {selectedType === MaterialType.Lecture && (
          <LectureForm
            selectedCourse={selectedCourse}
            initialData={materialById as Lecture}
          />
        )}

        {selectedType === MaterialType.Video && (
          <VideoForm
            selectedCourse={selectedCourse}
            initialData={materialById as Video}
          />
        )}
      </div>
    )
  );
};

export default MaterialEditPage;
