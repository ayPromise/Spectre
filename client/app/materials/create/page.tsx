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
import ArticleForm from "./components/ArticleForm";
import LectureForm from "./components/LectureForm";
import VideoForm from "./components/VideoForm";

const CreateMaterialPage = () => {
  const [type, setType] = useState<MaterialType>(MaterialType.Article);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">
        Створення навчального матеріалу
      </h1>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Тип матеріалу</label>
        <Select
          onValueChange={(val: MaterialType) => setType(val)}
          defaultValue={MaterialType.Article}
        >
          <SelectTrigger>
            <SelectValue placeholder="Оберіть тип матеріалу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MaterialType.Article}>Стаття</SelectItem>
            <SelectItem value={MaterialType.Lecture}>Лекція</SelectItem>
            <SelectItem value={MaterialType.Video}>Відео</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === MaterialType.Article && <ArticleForm />}
      {type === MaterialType.Lecture && <LectureForm />}
      {type === MaterialType.Video && <VideoForm />}
    </div>
  );
};

export default CreateMaterialPage;
