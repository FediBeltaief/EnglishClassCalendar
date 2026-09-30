import { CalendarEvent, Language } from '../types/calendar';
import { ACADEMY_INFO, GRADE_MAP } from '../data/mockSchedule';

export interface CalendarDayCell {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  monthIndex: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isoWeekday: number; // 1 (Mon) to 7 (Sun)
}

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function toIsoDate(year: number, monthIndex: number, day: number): string {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

export function parseIsoDate(dateStr: string): { year: number; monthIndex: number; day: number } {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, monthIndex: m - 1, day: d };
}

export function getIsoWeekday(year: number, monthIndex: number, day: number): number {
  const jsDay = new Date(year, monthIndex, day).getDay();
  return jsDay === 0 ? 7 : jsDay;
}

export function buildMonthGrid(year: number, monthIndex: number, todayIso: string): CalendarDayCell[] {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayIsoDow = getIsoWeekday(year, monthIndex, 1);
  const leadingDaysCount = firstDayIsoDow - 1;

  const prevMonthDate = new Date(year, monthIndex, 0);
  const prevMonthYear = prevMonthDate.getFullYear();
  const prevMonthIdx = prevMonthDate.getMonth();
  const prevMonthTotalDays = prevMonthDate.getDate();

  const cells: CalendarDayCell[] = [];

  for (let i = leadingDaysCount - 1; i >= 0; i--) {
    const d = prevMonthTotalDays - i;
    const dateStr = toIsoDate(prevMonthYear, prevMonthIdx, d);
    cells.push({
      dateStr,
      dayNumber: d,
      monthIndex: prevMonthIdx,
      year: prevMonthYear,
      isCurrentMonth: false,
      isToday: dateStr === todayIso,
      isPast: dateStr <= todayIso,
      isoWeekday: getIsoWeekday(prevMonthYear, prevMonthIdx, d),
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = toIsoDate(year, monthIndex, d);
    cells.push({
      dateStr,
      dayNumber: d,
      monthIndex,
      year,
      isCurrentMonth: true,
      isToday: dateStr === todayIso,
      isPast: dateStr <= todayIso,
      isoWeekday: getIsoWeekday(year, monthIndex, d),
    });
  }

  const totalSoFar = cells.length;
  const targetCells = totalSoFar > 35 ? 42 : 35;
  const trailingCount = targetCells - totalSoFar;

  const nextMonthDate = new Date(year, monthIndex + 1, 1);
  const nextMonthYear = nextMonthDate.getFullYear();
  const nextMonthIdx = nextMonthDate.getMonth();

  for (let d = 1; d <= trailingCount; d++) {
    const dateStr = toIsoDate(nextMonthYear, nextMonthIdx, d);
    cells.push({
      dateStr,
      dayNumber: d,
      monthIndex: nextMonthIdx,
      year: nextMonthYear,
      isCurrentMonth: false,
      isToday: dateStr === todayIso,
      isPast: dateStr <= todayIso,
      isoWeekday: getIsoWeekday(nextMonthYear, nextMonthIdx, d),
    });
  }

  return cells;
}

export function buildWeekDays(selectedDateStr: string, todayIso: string): CalendarDayCell[] {
  const { year, monthIndex, day } = parseIsoDate(selectedDateStr);
  const currentDow = getIsoWeekday(year, monthIndex, day);
  const mondayOffset = -(currentDow - 1);

  const weekCells: CalendarDayCell[] = [];
  for (let i = 0; i < 7; i++) {
    const dt = new Date(year, monthIndex, day + mondayOffset + i);
    const y = dt.getFullYear();
    const m = dt.getMonth();
    const d = dt.getDate();
    const dateStr = toIsoDate(y, m, d);
    weekCells.push({
      dateStr,
      dayNumber: d,
      monthIndex: m,
      year: y,
      isCurrentMonth: m === monthIndex,
      isToday: dateStr === todayIso,
      isPast: dateStr <= todayIso,
      isoWeekday: i + 1,
    });
  }
  return weekCells;
}

export function shiftDateByDays(dateStr: string, deltaDays: number): string {
  const { year, monthIndex, day } = parseIsoDate(dateStr);
  const dt = new Date(year, monthIndex, day + deltaDays);
  return toIsoDate(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

export function formatHumanDate(dateStr: string, lang: Language): string {
  const { year, monthIndex, day } = parseIsoDate(dateStr);
  const dow = getIsoWeekday(year, monthIndex, day);

  const weekdaysFull: Record<Language, string[]> = {
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    fr: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    ar: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
  };

  const months: Record<Language, string[]> = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  };

  const weekdayName = weekdaysFull[lang][dow - 1];
  const monthName = months[lang][monthIndex];

  if (lang === 'ar') {
    return `${weekdayName}، ${day} ${monthName} ${year}`;
  }
  if (lang === 'fr') {
    return `${weekdayName} ${day} ${monthName} ${year}`;
  }
  return `${weekdayName}, ${monthName} ${day}, ${year}`;
}

export function formatTimeAmPm(time24: string): string {
  if (!time24 || !time24.includes(':')) return time24;
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${ampm}`;
}

export function formatSlotRange(startTime: string, endTime: string): string {
  return `${formatTimeAmPm(startTime)} – ${formatTimeAmPm(endTime)}`;
}

export function downloadIcsFile(events: CalendarEvent[], lang: Language) {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aymen Beltaief//English Calendar//EN',
    'CALSCALE:GREGORIAN',
  ];

  const teacherName = ACADEMY_INFO.teacher[lang];

  for (const ev of events) {
    const cleanDate = ev.date.replace(/-/g, '');
    const startClean = ev.startTime.replace(':', '') + '00';
    const endClean = ev.endTime.replace(':', '') + '00';
    const grade = GRADE_MAP[ev.gradeId];

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${ev.id}@aymen-beltaief.calendar`);
    lines.push(`DTSTART:${cleanDate}T${startClean}`);
    lines.push(`DTEND:${cleanDate}T${endClean}`);
    lines.push(`SUMMARY:${grade.shortLabel[lang]} - ${ev.title[lang]} [${ev.durationLabel[lang]}]`);
    lines.push(`DESCRIPTION:${teacherName} - ${ev.unitTopic[lang]}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `english-schedule-${lang}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
