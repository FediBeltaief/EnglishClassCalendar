import { Language } from '../types/calendar';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  instructor: string;
  actions: {
    exportIcs: string;
    today: string;
    jumpToToday: string;
    close: string;
    allGrades: string;
  };
  gradeFilter: {
    label: string;
    allGrades: string;
    showingAll: string;
    showingSingle: string;
    scheduleFrequency: string;
  };
  calendarControls: {
    filterAll: string;
    searchPlaceholder: string;
    lessonsCount: string;
    lessonSingle: string;
    sundayPrivateHint: string;
    weeklyScheduleTitle: string;
    mobileDayFocus: string;
    mobileFullGrid: string;
    swipeHint: string;
    daySchedule: string;
    noClassesToday: string;
    selectDay: string;
  };
  eventTypes: {
    regular: string;
  };
  modal: {
    title: string;
    duration: string;
    instructor: string;
    noEventsDay: string;
  };
  months: string[];
  weekdaysShort: string[];
  weekdaysFull: string[];
  legend: {
    title: string;
    privateLessonDesc: string;
    regularDesc: string;
    schedulePattern: string;
  };
  footer: {
    instructorCredit: string;
    gradesCoverage: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    brandName: 'English Class Calendar',
    tagline: '1st Grade to 9th Grade & Private Lessons',
    instructor: 'Instructor: Aymen Beltaief',
    actions: {
      exportIcs: 'Export .ICS',
      today: 'Today',
      jumpToToday: 'Jump to Today',
      close: 'Close',
      allGrades: 'All Grades & Activities',
    },
    gradeFilter: {
      label: 'Filter by Grade / Activity',
      allGrades: 'All Classes',
      showingAll: 'Showing schedule across all grades',
      showingSingle: 'Filtered for',
      scheduleFrequency: 'Weekly Schedule: Mon–Sun',
    },
    calendarControls: {
      filterAll: 'All Classes',
      searchPlaceholder: 'Search grade or class...',
      lessonsCount: 'lessons',
      lessonSingle: 'lesson',
      sundayPrivateHint: 'Sunday: Private Lessons available by appointment + scheduled classes',
      weeklyScheduleTitle: 'WEEKLY TIMETABLE',
      mobileDayFocus: 'Day Focus',
      mobileFullGrid: 'Full Table',
      swipeHint: 'Swipe horizontally to view all days',
      daySchedule: 'Day Schedule',
      noClassesToday: 'No classes scheduled on this day',
      selectDay: 'Select Day',
    },
    eventTypes: {
      regular: 'English Class',
    },
    modal: {
      title: 'Lesson Details',
      duration: 'Duration',
      instructor: 'Instructor',
      noEventsDay: 'No lessons scheduled for this date.',
    },
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weekdaysFull: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    legend: {
      title: 'Timetable Guide',
      privateLessonDesc: 'Sunday: Private Lessons (Individual & Small Group)',
      regularDesc: 'Group sessions: 1st, 2nd, 5th, 6th, 7th, 8th & 9th Grade',
      schedulePattern: 'Exact weekly timetable updated with all new entries',
    },
    footer: {
      instructorCredit: 'Instructor: Aymen Beltaief',
      gradesCoverage: '1st Grade – 9th Grade · Private Lessons · Mon – Sun',
    },
  },

  fr: {
    brandName: 'Calendrier des Cours d’Anglais',
    tagline: 'De la 1ère à la 9ème Année & Cours Particuliers',
    instructor: 'Enseignant : Aymen Beltaief',
    actions: {
      exportIcs: 'Exporter .ICS',
      today: 'Aujourd’hui',
      jumpToToday: 'Aller à Aujourd’hui',
      close: 'Fermer',
      allGrades: 'Tous les Niveaux & Activités',
    },
    gradeFilter: {
      label: 'Filtrer par Niveau / Activité',
      allGrades: 'Tous les Cours',
      showingAll: 'Affichage de l’ensemble des niveaux',
      showingSingle: 'Filtré pour',
      scheduleFrequency: 'Emploi du temps : Lun–Dim',
    },
    calendarControls: {
      filterAll: 'Tous les Cours',
      searchPlaceholder: 'Rechercher un niveau ou cours...',
      lessonsCount: 'séances',
      lessonSingle: 'séance',
      sundayPrivateHint: 'Dimanche : Cours particuliers sur rendez-vous + séances programmées',
      weeklyScheduleTitle: 'EMPLOI DU TEMPS HEBDOMADAIRE',
      mobileDayFocus: 'Par Jour',
      mobileFullGrid: 'Tableau',
      swipeHint: 'Glissez horizontalement pour naviguer',
      daySchedule: 'Emploi du Temps du Jour',
      noClassesToday: 'Aucun cours programmé ce jour-là',
      selectDay: 'Choisir le Jour',
    },
    eventTypes: {
      regular: 'Cours d’Anglais',
    },
    modal: {
      title: 'Détails de la Séance',
      duration: 'Durée',
      instructor: 'Enseignant',
      noEventsDay: 'Aucun cours prévu à cette date.',
    },
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ],
    weekdaysShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    weekdaysFull: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    legend: {
      title: 'Légende',
      privateLessonDesc: 'Dimanche : Cours particuliers (Individuel & Petits groupes)',
      regularDesc: 'Séances de groupe : 1ère, 2ème, 5ème, 6ème, 7ème, 8ème & 9ème Année',
      schedulePattern: 'Emploi du temps hebdomadaire mis à jour avec les nouveaux cours',
    },
    footer: {
      instructorCredit: 'Enseignant : Aymen Beltaief',
      gradesCoverage: 'De la 1ère à la 9ème Année · Cours Particuliers · Lun – Dim',
    },
  },

  ar: {
    brandName: 'رزنامة حصص اللغة الإنجليزية',
    tagline: 'من السنة الأولى إلى التاسعة أساسي والدروس الخصوصية',
    instructor: 'الأستاذ: أيمن بلطيف',
    actions: {
      exportIcs: 'تصدير التقويم',
      today: 'اليوم',
      jumpToToday: 'العودة إلى اليوم',
      close: 'إغلاق',
      allGrades: 'كل المستويات والأنشطة',
    },
    gradeFilter: {
      label: 'تصفية حسب المستوى / النشاط',
      allGrades: 'جميع الحصص',
      showingAll: 'عرض جدول جميع المستويات الدراسية والأنشطة',
      showingSingle: 'تصفية خاصة بـ',
      scheduleFrequency: 'الجدول الأسبوعي: من الإثنين إلى الأحد',
    },
    calendarControls: {
      filterAll: 'جميع الحصص',
      searchPlaceholder: 'ابحث عن المستوى أو الحصة...',
      lessonsCount: 'حصص',
      lessonSingle: 'حصة',
      sundayPrivateHint: 'الأحد: دروس خصوصية حسب الموعد + الحصص المبرمجة',
      weeklyScheduleTitle: 'الجدول الأسبوعي',
      mobileDayFocus: 'يومي',
      mobileFullGrid: 'الجدول الكامل',
      swipeHint: 'اسحب أفقياً لتصفح بقية الأيام',
      daySchedule: 'برنامج اليوم',
      noClassesToday: 'لا توجد حصص مبرمجة في هذا اليوم',
      selectDay: 'اختر اليوم',
    },
    eventTypes: {
      regular: 'حصة لغة إنجليزية',
    },
    modal: {
      title: 'تفاصيل الحصة',
      duration: 'المدة',
      instructor: 'الأستاذ',
      noEventsDay: 'لا توجد حصص مبرمجة في هذا التاريخ.',
    },
    months: [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
    ],
    weekdaysShort: ['إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت', 'أحد'],
    weekdaysFull: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
    legend: {
      title: 'دليل الجدول',
      privateLessonDesc: 'الأحد: دروس خصوصية (فردية ومجموعات صغيرة)',
      regularDesc: 'حصص المستويات: الأولى، الثانية، الخامسة، السادسة، السابعة، الثامنة والتاسعة',
      schedulePattern: 'جدول أسبوعي محدّث بجميع الحصص والمواعيد الجديدة',
    },
    footer: {
      instructorCredit: 'الأستاذ: أيمن بلطيف',
      gradesCoverage: 'المستويات: 1 إلى 9 أساسي · دروس خصوصية · من الإثنين إلى الأحد',
    },
  },
};
