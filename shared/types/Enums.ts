export enum UserRole {
  Student = "Student",
  Instructor = "Instructor",
  Admin = "Admin",
}

export enum LessonType {
  Lecture = "Lecture",
  Practice = "Practice",
  Mixed = "Mixed",
}

export const LessonTypeNameUA: Record<LessonType, string> = {
  [LessonType.Lecture]: "Лекція",
  [LessonType.Practice]: "Практика",
  [LessonType.Mixed]: "Змішаний",
};

export enum MeetingType {
  Offline = "Offline",
  Online = "Online",
}

export const MeetingTypeNameUA: Record<MeetingType, string> = {
  [MeetingType.Offline]: "Офлайн",
  [MeetingType.Online]: "Онлайн",
};

export enum FlightType {
  Recon = "Recon",
  Assault = "Assault",
  Mixed = "Mixed",
}

export const FlightTypeNameUA: Record<FlightType, string> = {
  [FlightType.Recon]: "Розвідка",
  [FlightType.Assault]: "Атака",
  [FlightType.Mixed]: "Змішаний",
};

export enum MaterialType {
  Article = "Article",
  Lecture = "Lecture",
  Video = "Video",
}

export const MaterialTypeNameUA: Record<MaterialType, string> = {
  [MaterialType.Article]: "Стаття",
  [MaterialType.Lecture]: "Лекція",
  [MaterialType.Video]: "Відео",
};
