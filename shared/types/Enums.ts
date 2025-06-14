export enum UserRole {
  Student = "Student",
  Instructor = "Instructor",
  Admin = "Admin",
}

export enum LessonType {
  Lecture = "Lecture",
  Flight = "Flight",
  Mixed = "Mixed",
}

export const LessonTypeNameUA: Record<LessonType, string> = {
  [LessonType.Lecture]: "Лекція",
  [LessonType.Flight]: "Політ",
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

export enum Specification {
  Tech = "Tech",
  UsageExperience = "Usage experience",
  Engineering = "Engineering",
}

export const SpecificationeNameUA: Record<Specification, string> = {
  [Specification.Tech]: "Next.js",
  [Specification.UsageExperience]: "React Native",
  [Specification.Engineering]: "Jest",
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
