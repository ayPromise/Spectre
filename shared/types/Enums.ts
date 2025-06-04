export enum UserRole {
  Student = "Student",
  Instructor = "Instructor",
  Admin = "Admin"
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
  Offline = 'Offline',
  Online = 'Online',
}

export const MeetingTypeNameUA: Record<MeetingType, string> = {
  [MeetingType.Offline]: "Офлайн",
  [MeetingType.Online]: "Онлайн",
};
  
export enum FlightType {
  Recon = 'Recon',
  Assault = 'Assault',
  Mixed = 'Mixed',
}

export const FlightTypeNameUA = [
  { value: FlightType.Recon, label: "Розвідка" },
  { value: FlightType.Assault, label: "Атака" },
  { value: FlightType.Mixed, label: "Змішаний" },
];

export enum MaterialType {
  Tech = 'Tech',
  UsageExperience = 'Usage experience',
  Engineering = 'Engineering',
}
  