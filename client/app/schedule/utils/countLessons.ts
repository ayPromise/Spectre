import { Schedule } from "@shared/types";

function isBeforeYearMonth(d1: Date, d2: Date) {
  return (
    d1.getFullYear() < d2.getFullYear() ||
    (d1.getFullYear() === d2.getFullYear() && d1.getMonth() < d2.getMonth())
  );
}

function isBeforeDay(d1: Date, d2: Date) {
  return d1.getTime() < d2.getTime();
}

function countLessonsBeforeSelectedMonth(
  schedules: Schedule[],
  selectedYear: number,
  selectedMonth: number,
  now: Date
) {
  const targetDateBefore = new Date(selectedYear, selectedMonth, 1);

  let offline = 0;
  let online = 0;
  let passed = 0;

  for (const s of schedules) {
    const lessonDate = new Date(s.date);
    if (isBeforeYearMonth(lessonDate, targetDateBefore)) {
      if (isBeforeDay(lessonDate, now)) {
        passed++;
      } else {
        if (s.meetingType === "Offline") offline++;
        if (s.meetingType === "Online") online++;
      }
    }
  }

  return { offline, online, passed };
}

function countLessonsAfterSelectedMonth(
  schedules: Schedule[],
  selectedYear: number,
  selectedMonth: number,
  now: Date
) {
  const targetDateAfter = new Date(selectedYear, selectedMonth + 1, 1);

  let offline = 0;
  let online = 0;
  let passed = 0;

  for (const s of schedules) {
    const lessonDate = new Date(s.date);

    if (!isBeforeYearMonth(lessonDate, targetDateAfter)) {
      if (isBeforeDay(lessonDate, now)) {
        passed++;
      } else {
        if (s.meetingType === "Offline") offline++;
        if (s.meetingType === "Online") online++;
      }
    }
  }

  return { offline, online, passed };
}

function isSchedulePast(scheduleDate: Date, now: Date) {
  const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;
  return now.getTime() - scheduleDate.getTime() >= TWO_HOURS_IN_MS;
}

export {
  countLessonsBeforeSelectedMonth,
  countLessonsAfterSelectedMonth,
  isSchedulePast,
};
