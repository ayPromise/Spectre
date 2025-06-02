export enum UserRole {
  Student = "Student",
  Instructor = "Instructor",
  Admin = "Admin"
}

export enum ScheduleType {
  Offline = 'Offline',
  Online = 'Online',
  PracticalFlight = 'PracticalFlight',
  Mixed= 'Mixed'
}

export const ScheduleTypeNameUA: Record<ScheduleType, string> = {
  [ScheduleType.Offline]: "Офлайн",
  [ScheduleType.Online]: "Онлайн",
  [ScheduleType.PracticalFlight]: "Практичний політ",
  [ScheduleType.Mixed]: "Змішаний",
};
  
export enum FlightType {
  Reccon = 'Recon',
  Assault = 'Assault',
  Mixed = 'Mixed',
}

export enum MaterialType {
  Tech = 'Tech',
  UsageExperience = 'Usage experience',
  Engineering = 'Engineering',
}
  