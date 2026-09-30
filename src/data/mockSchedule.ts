import { AcademyInfo, CalendarEvent, GradeConfig, GradeId, Language } from '../types/calendar';

export const TODAY_ISO = '2026-09-30';

export const ACADEMY_INFO: AcademyInfo = {
  teacher: {
    en: 'Aymen Beltaief',
    fr: 'Aymen Beltaief',
    ar: 'أيمن بلطيف',
  },
  teacherTitle: {
    en: 'English Instructor',
    fr: 'Enseignant d’Anglais',
    ar: 'أستاذ اللغة الإنجليزية',
  },
  room: {
    en: '',
    fr: '',
    ar: '',
  },
  maxLessonsPerDay: 5,
};

export const GRADES: GradeConfig[] = [
  {
    id: '1st',
    levelCode: 'G1',
    cefr: 'Pre-A1',
    label: {
      en: '1st Grade',
      fr: '1ère Année',
      ar: 'السنة الأولى',
    },
    shortLabel: {
      en: '1st Grade',
      fr: '1ère',
      ar: '1 أساسي',
    },
    ageGroup: '6–7 yrs',
    accentBorder: 'border-amber-500',
    surfaceBg: 'bg-amber-50',
    textColor: 'text-amber-950',
    dotColor: 'bg-amber-500',
    activeChipBg: 'bg-amber-600',
    activeChipText: 'text-white',
  },
  {
    id: '2nd',
    levelCode: 'G2',
    cefr: 'Pre-A1+',
    label: {
      en: '2nd Grade',
      fr: '2ème Année',
      ar: 'السنة الثانية',
    },
    shortLabel: {
      en: '2nd Grade',
      fr: '2ème',
      ar: '2 أساسي',
    },
    ageGroup: '7–8 yrs',
    accentBorder: 'border-orange-500',
    surfaceBg: 'bg-orange-50',
    textColor: 'text-orange-950',
    dotColor: 'bg-orange-500',
    activeChipBg: 'bg-orange-600',
    activeChipText: 'text-white',
  },
  {
    id: '5th',
    levelCode: 'G5',
    cefr: 'A1+',
    label: {
      en: '5th Grade',
      fr: '5ème Année',
      ar: 'السنة الخامسة',
    },
    shortLabel: {
      en: '5th Grade',
      fr: '5ème',
      ar: '5 أساسي',
    },
    ageGroup: '10–11 yrs',
    accentBorder: 'border-sky-500',
    surfaceBg: 'bg-sky-50',
    textColor: 'text-sky-950',
    dotColor: 'bg-sky-500',
    activeChipBg: 'bg-sky-600',
    activeChipText: 'text-white',
  },
  {
    id: '6th',
    levelCode: 'G6',
    cefr: 'A2',
    label: {
      en: '6th Grade',
      fr: '6ème Année',
      ar: 'السنة السادسة',
    },
    shortLabel: {
      en: '6th Grade',
      fr: '6ème',
      ar: '6 أساسي',
    },
    ageGroup: '11–12 yrs',
    accentBorder: 'border-teal-500',
    surfaceBg: 'bg-teal-50',
    textColor: 'text-teal-950',
    dotColor: 'bg-teal-500',
    activeChipBg: 'bg-teal-600',
    activeChipText: 'text-white',
  },
  {
    id: '7th',
    levelCode: 'G7',
    cefr: 'A2+',
    label: {
      en: '7th Grade',
      fr: '7ème Année',
      ar: 'السنة السابعة',
    },
    shortLabel: {
      en: '7th Grade',
      fr: '7ème',
      ar: '7 أساسي',
    },
    ageGroup: '12–13 yrs',
    accentBorder: 'border-emerald-500',
    surfaceBg: 'bg-emerald-50',
    textColor: 'text-emerald-950',
    dotColor: 'bg-emerald-500',
    activeChipBg: 'bg-emerald-600',
    activeChipText: 'text-white',
  },
  {
    id: '8th',
    levelCode: 'G8',
    cefr: 'B1',
    label: {
      en: '8th Grade',
      fr: '8ème Année',
      ar: 'السنة الثامنة',
    },
    shortLabel: {
      en: '8th Grade',
      fr: '8ème',
      ar: '8 أساسي',
    },
    ageGroup: '13–14 yrs',
    accentBorder: 'border-blue-500',
    surfaceBg: 'bg-blue-50',
    textColor: 'text-blue-950',
    dotColor: 'bg-blue-500',
    activeChipBg: 'bg-blue-600',
    activeChipText: 'text-white',
  },
  {
    id: '9th',
    levelCode: 'G9',
    cefr: 'B1+',
    label: {
      en: '9th Grade',
      fr: '9ème Année',
      ar: 'السنة التاسعة',
    },
    shortLabel: {
      en: '9th Grade',
      fr: '9ème',
      ar: '9 أساسي',
    },
    ageGroup: '14–15 yrs',
    accentBorder: 'border-indigo-500',
    surfaceBg: 'bg-indigo-50',
    textColor: 'text-indigo-950',
    dotColor: 'bg-indigo-500',
    activeChipBg: 'bg-indigo-600',
    activeChipText: 'text-white',
  },
  {
    id: 'private',
    levelCode: 'PL',
    cefr: 'Custom',
    label: {
      en: 'Private Lessons',
      fr: 'Cours Particuliers',
      ar: 'دروس خصوصية',
    },
    shortLabel: {
      en: 'Private',
      fr: 'Particulier',
      ar: 'دروس خاصة',
    },
    ageGroup: '1-on-1',
    accentBorder: 'border-purple-500',
    surfaceBg: 'bg-purple-50',
    textColor: 'text-purple-950',
    dotColor: 'bg-purple-500',
    activeChipBg: 'bg-purple-600',
    activeChipText: 'text-white',
  },
];

// Fallback configs for older grade ids
export const ALL_GRADE_CONFIGS: GradeConfig[] = [
  ...GRADES,
  {
    id: '1sec',
    levelCode: '1S',
    cefr: 'B2',
    label: { en: '1st Sec (Lycée)', fr: '1ère Sec (Lycée)', ar: 'الأولى ثانوي' },
    shortLabel: { en: '1st Sec', fr: '1ère Sec', ar: '1 ثانوي' },
    ageGroup: '15–16 yrs',
    accentBorder: 'border-violet-500',
    surfaceBg: 'bg-violet-50',
    textColor: 'text-violet-950',
    dotColor: 'bg-violet-500',
    activeChipBg: 'bg-violet-600',
    activeChipText: 'text-white',
  },
  {
    id: '2sec',
    levelCode: '2S',
    cefr: 'B2+',
    label: { en: '2nd Sec (Lycée)', fr: '2ème Sec (Lycée)', ar: 'الثانية ثانوي' },
    shortLabel: { en: '2nd Sec', fr: '2ème Sec', ar: '2 ثانوي' },
    ageGroup: '16–17 yrs',
    accentBorder: 'border-rose-500',
    surfaceBg: 'bg-rose-50',
    textColor: 'text-rose-950',
    dotColor: 'bg-rose-500',
    activeChipBg: 'bg-rose-600',
    activeChipText: 'text-white',
  },
];

export const GRADE_MAP: Record<GradeId, GradeConfig> = ALL_GRADE_CONFIGS.reduce(
  (acc, g) => {
    acc[g.id] = g;
    return acc;
  },
  {} as Record<GradeId, GradeConfig>
);

export interface ScheduledSession {
  gradeId: GradeId;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  timeDisplay: string; // e.g. "10:00 AM – 12:00 PM"
  durationMinutes: number;
  durationLabel: Record<Language, string>;
  unitTitle: Record<Language, string>;
  topic: Record<Language, string>;
}

// Updated weekly schedule with the exact new entries added:
// Monday:
//   - 10:00 AM – 12:00 PM: 2nd Grade
//   - 5:00 PM: 5th Grade (17:00 - 19:00)
// Tuesday:
//   - 5:00 PM: 6th Grade (17:00 - 19:00)
// Wednesday:
//   - 12:30 PM – 2:00 PM: 1st Grade (12:30 - 14:00)
//   - 5:00 PM: 5th Grade (17:00 - 19:00)
// Thursday:
//   - 5:00 PM: 6th Grade (17:00 - 19:00)
// Friday:
//   - 6:00 PM – 7:30 PM: 1st Grade (18:00 - 19:30)
// Saturday:
//   - 9:00 AM – 11:00 AM: 1st Grade (09:00 - 11:00)
//   - 1:00 PM: 9th Grade (13:00 - 15:00)
//   - 3:00 PM: 8th Grade (15:00 - 17:00)
//   - 5:00 PM: 7th Grade (17:00 - 19:00)
// Sunday:
//   - 9:00 AM: 7th Grade (09:00 - 11:00)
//   - 11:00 AM: 9th Grade (11:00 - 13:00)
//   - 2:00 PM: 8th Grade (14:00 - 16:00)
//   - 4:00 PM: Private Lessons (16:00 - 18:00)
export const WEEKDAY_SCHEDULES: Record<number, ScheduledSession[]> = {
  // Monday (1)
  1: [
    {
      gradeId: '2nd',
      startTime: '10:00',
      endTime: '12:00',
      timeDisplay: '10:00 AM – 12:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '2nd Grade · English Session',
        fr: '2ème Année · Séance d’Anglais',
        ar: 'السنة الثانية · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Early Phonics & Vocabulary',
        fr: 'Phonétique & Vocabulaire',
        ar: 'الصوتيات التأسيسية والمفردات',
      },
    },
    {
      gradeId: '5th',
      startTime: '17:00',
      endTime: '19:00',
      timeDisplay: '5:00 PM – 7:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '5th Grade · English Session',
        fr: '5ème Année · Séance d’Anglais',
        ar: 'السنة الخامسة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Reading & Communication',
        fr: 'Lecture & Communication',
        ar: 'القراءة والتواصل',
      },
    },
  ],

  // Tuesday (2)
  2: [
    {
      gradeId: '6th',
      startTime: '17:00',
      endTime: '19:00',
      timeDisplay: '5:00 PM – 7:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '6th Grade · English Session',
        fr: '6ème Année · Séance d’Anglais',
        ar: 'السنة السادسة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Grammar & Oral Skills',
        fr: 'Grammaire & Expression Orale',
        ar: 'القواعد والتعبير الشفوي',
      },
    },
  ],

  // Wednesday (3)
  3: [
    {
      gradeId: '1st',
      startTime: '12:30',
      endTime: '14:00',
      timeDisplay: '12:30 PM – 2:00 PM',
      durationMinutes: 90,
      durationLabel: { en: '1h 30m', fr: '1h 30', ar: '1:30 س' },
      unitTitle: {
        en: '1st Grade · English Session',
        fr: '1ère Année · Séance d’Anglais',
        ar: 'السنة الأولى · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Fun English & Letter Recognition',
        fr: 'Éveil à l’Anglais & Lettres',
        ar: 'التأسيس اللغوي والحروف',
      },
    },
    {
      gradeId: '5th',
      startTime: '17:00',
      endTime: '19:00',
      timeDisplay: '5:00 PM – 7:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '5th Grade · English Session',
        fr: '5ème Année · Séance d’Anglais',
        ar: 'السنة الخامسة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Grammar & Interactive Dialogue',
        fr: 'Grammaire & Dialogue Interactif',
        ar: 'القواعد والحوار التفاعلي',
      },
    },
  ],

  // Thursday (4)
  4: [
    {
      gradeId: '6th',
      startTime: '17:00',
      endTime: '19:00',
      timeDisplay: '5:00 PM – 7:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '6th Grade · English Session',
        fr: '6ème Année · Séance d’Anglais',
        ar: 'السنة السادسة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Fluency & Writing Practice',
        fr: 'Fluence & Pratique Écrite',
        ar: 'الطلاقة والممارسة الكتابية',
      },
    },
  ],

  // Friday (5)
  5: [
    {
      gradeId: '1st',
      startTime: '18:00',
      endTime: '19:30',
      timeDisplay: '6:00 PM – 7:30 PM',
      durationMinutes: 90,
      durationLabel: { en: '1h 30m', fr: '1h 30', ar: '1:30 س' },
      unitTitle: {
        en: '1st Grade · English Session',
        fr: '1ère Année · Séance d’Anglais',
        ar: 'السنة الأولى · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Phonics & Song Workshop',
        fr: 'Atelier Phonétique & Chansons',
        ar: 'ورشة الصوتيات والأناشيد التعليمية',
      },
    },
  ],

  // Saturday (6)
  6: [
    {
      gradeId: '1st',
      startTime: '09:00',
      endTime: '11:00',
      timeDisplay: '9:00 AM – 11:00 AM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '1st Grade · English Session',
        fr: '1ère Année · Séance d’Anglais',
        ar: 'السنة الأولى · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Reading Discovery & Games',
        fr: 'Découverte de la Lecture & Jeux',
        ar: 'اكتشاف القراءة والألعاب التعليمية',
      },
    },
    {
      gradeId: '9th',
      startTime: '13:00',
      endTime: '15:00',
      timeDisplay: '1:00 PM – 3:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '9th Grade · English Session',
        fr: '9ème Année · Séance d’Anglais',
        ar: 'السنة التاسعة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'National Exam Preparation & Reading',
        fr: 'Préparation Examen & Lecture',
        ar: 'تحضير الامتحان الوطني والقراءة المنهجية',
      },
    },
    {
      gradeId: '8th',
      startTime: '15:00',
      endTime: '17:00',
      timeDisplay: '3:00 PM – 5:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '8th Grade · English Session',
        fr: '8ème Année · Séance d’Anglais',
        ar: 'السنة الثامنة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Structured Writing & Grammar',
        fr: 'Rédaction Structurée & Grammaire',
        ar: 'التحرير المنهجي والقواعد',
      },
    },
    {
      gradeId: '7th',
      startTime: '17:00',
      endTime: '19:00',
      timeDisplay: '5:00 PM – 7:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '7th Grade · English Session',
        fr: '7ème Année · Séance d’Anglais',
        ar: 'السنة السابعة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Active Listening & Dialogue',
        fr: 'Écoute Active & Dialogue',
        ar: 'الاستماع النشط والحوار',
      },
    },
  ],

  // Sunday (7)
  // Sunday schedule:
  // - 9:00 AM: 7th Grade
  // - 11:00 AM: 9th Grade
  // - 2:00 PM: 8th Grade
  // - 4:00 PM: Private Lessons
  7: [
    {
      gradeId: '7th',
      startTime: '09:00',
      endTime: '11:00',
      timeDisplay: '9:00 AM – 11:00 AM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '7th Grade · English Session',
        fr: '7ème Année · Séance d’Anglais',
        ar: 'السنة السابعة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Written Expression & Reading',
        fr: 'Expression Écrite & Lecture',
        ar: 'التعبير الكتابي والقراءة',
      },
    },
    {
      gradeId: '9th',
      startTime: '11:00',
      endTime: '13:00',
      timeDisplay: '11:00 AM – 1:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '9th Grade · English Session',
        fr: '9ème Année · Séance d’Anglais',
        ar: 'السنة التاسعة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Intensive Drilling & Essay Practice',
        fr: 'Entraînement Intensif & Rédaction',
        ar: 'التدريب المكثف والإنشاء',
      },
    },
    {
      gradeId: '8th',
      startTime: '14:00',
      endTime: '16:00',
      timeDisplay: '2:00 PM – 4:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: '8th Grade · English Session',
        fr: '8ème Année · Séance d’Anglais',
        ar: 'السنة الثامنة · حصة اللغة الإنجليزية',
      },
      topic: {
        en: 'Academic Focus & Language Mastery',
        fr: 'Pratique Approfondie & Maîtrise',
        ar: 'التركيز الأكاديمي والتحكم اللغوي',
      },
    },
    {
      gradeId: 'private',
      startTime: '16:00',
      endTime: '18:00',
      timeDisplay: '4:00 PM – 6:00 PM',
      durationMinutes: 120,
      durationLabel: { en: '2h 00m', fr: '2h 00', ar: '2:00 س' },
      unitTitle: {
        en: 'Private Lessons',
        fr: 'Cours Particuliers',
        ar: 'دروس خصوصية',
      },
      topic: {
        en: 'One-on-One Tutoring Session',
        fr: 'Séance de cours particulier individuel',
        ar: 'حصة تدريس خصوصي فردي',
      },
    },
  ],
};

function getIsoDayOfWeek(year: number, monthIndex: number, day: number): number {
  const jsDay = new Date(year, monthIndex, day).getDay();
  return jsDay === 0 ? 7 : jsDay;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function generateEduSyncEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  const months = [
    { year: 2026, monthIndex: 7, days: 31 }, // Aug
    { year: 2026, monthIndex: 8, days: 30 }, // Sep
    { year: 2026, monthIndex: 9, days: 31 }, // Oct
    { year: 2026, monthIndex: 10, days: 30 }, // Nov
  ];

  let seq = 1;

  for (const m of months) {
    for (let day = 1; day <= m.days; day++) {
      const dateStr = `${m.year}-${pad2(m.monthIndex + 1)}-${pad2(day)}`;
      const isoDow = getIsoDayOfWeek(m.year, m.monthIndex, day);
      const daySessions = WEEKDAY_SCHEDULES[isoDow] || [];

      for (const item of daySessions) {
        events.push({
          id: `evt-${dateStr}-${item.gradeId}-${seq++}`,
          date: dateStr,
          gradeId: item.gradeId,
          type: 'regular',
          startTime: item.startTime,
          endTime: item.endTime,
          durationMinutes: item.durationMinutes,
          durationLabel: item.durationLabel,
          title: item.unitTitle,
          unitTopic: item.topic,
        });
      }
    }
  }

  events.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startTime.localeCompare(b.startTime);
  });

  return events;
}
