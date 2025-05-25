export enum Permission {
  ReadArticles = 'r:articles',
  ReadVideo = 'r:video',
  ReadProfile = 'r:profile',
  ReadSchedule = 'r:schedule',
  ReadAssignSchedule = 'ra:schedule',
  ReadAssignProfile = 'ra:profile',
  ReadWriteAdminDeleteArticles = 'rwad:articles',
  ReadWriteAdminDeleteVideo = 'rwad:video',
  ReadWriteAdminDeleteSchedule = 'rwad:schedule',
}

export enum ScheduleType {
  Offline = 'Offline',
  Online = 'Online',
  PracticalFlight = 'PracticalFlight',
}
  
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
  