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

export { countLessonsBeforeSelectedMonth, countLessonsAfterSelectedMonth };
