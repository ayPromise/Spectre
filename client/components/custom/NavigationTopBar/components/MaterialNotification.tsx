"use client";

import React from "react";
import Link from "next/link";
import { MaterialUnion, MaterialType } from "@shared/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, FileText } from "lucide-react";

interface MaterialNotificationProps {
  material: MaterialUnion;
  action: "edit" | "create";
  onHover: (id: string) => void;
  isRead: boolean;
}

const MaterialNotification: React.FC<MaterialNotificationProps> = ({
  material,
  onHover,
  isRead,
  action,
}) => {
  const { kind, title, _id } = material;
  const url = `/materials/${kind.toLowerCase()}/${_id}`;

  const getPrefix = () => {
    switch (kind) {
      case MaterialType.Article:
        return action === "edit" ? "Оновлена стаття: " : "Нова стаття: ";
      case MaterialType.Lecture:
        return action === "edit" ? "Оновлена лекція: " : "Нова лекція: ";
      case MaterialType.Video:
        return action === "edit" ? "Оновлене відео: " : "Нове відео: ";
      default:
        return action === "edit" ? "Оновлений матеріал: " : "Новий матеріал: ";
    }
  };

  const iconByKind: Record<
    MaterialType.Article | MaterialType.Lecture,
    React.ReactNode
  > = {
    [MaterialType.Article]: <FileText width={50} height={20} />,
    [MaterialType.Lecture]: <BookOpen width={50} height={20} />,
  };

  return (
    <Link
      href={url}
      onMouseEnter={() => onHover(_id)}
      className={cn(
        "flex items-center gap-3 p-3 rounded transition duration-300 cursor-pointer group hover:bg-indigo-50",
        isRead ? "bg-white text-muted-foreground" : "bg-indigo-50"
      )}
    >
      {kind === MaterialType.Video ? (
        <Image
          src={`https://img.youtube.com/vi/${extractYoutubeID(
            material.videoURL
          )}/0.jpg`}
          alt="thumbnail"
          className="object-cover rounded"
          width={50}
          height={10}
        />
      ) : (
        <span className="bg-gray-100 py-2 rounded-md">{iconByKind[kind]}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col text-sm">
          <span>{getPrefix()}</span>
          <span
            className={cn(
              "text-sm align-bottom italic text-black truncate inline-block max-w-full",
              "group-hover:underline"
            )}
          >
            {title}
          </span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </Link>
  );
};

function extractYoutubeID(url: string) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}

export default MaterialNotification;
