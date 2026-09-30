export type Language = 'en' | 'fr' | 'ar';

export type GradeId = '1st' | '2nd' | '5th' | '6th' | '7th' | '8th' | '9th' | 'private';

export type EventType = 'regular' | 'override' | 'exam';

export type CalendarViewMode = 'month' | 'week';

export interface GradeConfig {
  id: GradeId;
  levelCode: string;
  cefr: string;
  label: Record<Language, string>;
  shortLabel: Record<Language, string>;
  ageGroup: string;
  accentBorder: string;
  surfaceBg: string;
  textColor: string;
  dotColor: string;
  activeChipBg: string;
  activeChipText: string;
}

export interface ExamMetadata {
  weight: string;
  duration: string;
  materialsRequired: Record<Language, string>;
  syllabusTopics: Record<Language, string[]>;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  gradeId: GradeId;
  type: EventType;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  durationMinutes: number; // 90 or 120
  durationLabel: Record<Language, string>;
  timeDisplay?: string; // e.g. "10:00 AM – 12:00 PM" or "5:00 PM"
  title: Record<Language, string>;
  unitTopic: Record<Language, string>;
  homework?: Record<Language, string>;
  overrideNote?: Record<Language, string>;
  originalSlot?: string;
  examDetails?: ExamMetadata;
}

export interface AcademyInfo {
  teacher: Record<Language, string>;
  teacherTitle: Record<Language, string>;
  room: Record<Language, string>;
  maxLessonsPerDay: number;
}
