"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaterialType } from "@shared/types/Enums";
import ArticleForm from "../components/ArticleForm";
import LectureForm from "../components/LectureForm";
import VideoForm from "../components/VideoForm";
import CourseCombobox from "@/components/custom/CourseComboBox";
import { useMaterials } from "@/context/MaterialsContext";
import { Label } from "@/components/ui/label";

const CreateMaterialPage = () => {
  const [selectedType, setSelectedType] = useState<MaterialType>(
    MaterialType.Article
  );

  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const { materials } = useMaterials();

  const allCourses = Array.from(
    new Set(materials.map((material) => material.course).filter(Boolean))
  );
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Створення навчального матеріалу
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
        <ArticleForm selectedCourse={selectedCourse} />
      )}

      {selectedType === MaterialType.Lecture && (
        <LectureForm selectedCourse={selectedCourse} />
      )}

      {selectedType === MaterialType.Video && (
        <VideoForm selectedCourse={selectedCourse} />
      )}
    </div>
  );
};

export default CreateMaterialPage;
