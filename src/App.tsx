import { useState, useMemo, useEffect } from 'react';
import {
  CalendarEvent,
  CalendarViewMode,
  GradeId,
  Language,
} from './types/calendar';
import {
  GRADES,
  TODAY_ISO,
  generateEduSyncEvents,
} from './data/mockSchedule';
import { TRANSLATIONS } from './data/i18n';
import {
  buildMonthGrid,
  buildWeekDays,
  shiftDateByDays,
} from './utils/calendarUtils';
import { TopBar } from './components/TopBar';
import { GradeFilterBar } from './components/GradeFilterBar';
import { CalendarViewport } from './components/CalendarViewport';
import { LessonDetailModal } from './components/LessonDetailModal';

export function App() {
  // 1. Language & RTL State
  const [lang, setLang] = useState<Language>('en');
  const isRtl = lang === 'ar';
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  // 2. Grade Filter State (Defaults to all 7 grades)
  const [selectedGrades, setSelectedGrades] = useState<GradeId[]>(() =>
    GRADES.map((g) => g.id)
  );

  // 3. Calendar View & Date Navigation
  const [viewMode, setViewMode] = useState<CalendarViewMode>('week');
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(8); // September (0-indexed)
  const [viewWeekDate, setViewWeekDate] = useState<string>(TODAY_ISO); // Anchor date for week view
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Active clicked date (null on navigation so next weeks aren't highlighted)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 4. Search Filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 5. Complete Timetable Events (All 2 hours, everyday has 17:00-19:00, max 5 lessons/day, Friday/Saturday/Sunday busy days)
  const events = useMemo<CalendarEvent[]>(() => generateEduSyncEvents(), []);

  // Handler: Grade filter toggle
  const handleToggleGrade = (gradeId: GradeId) => {
    if (selectedGrades.length === 1 && selectedGrades[0] === gradeId) {
      setSelectedGrades(GRADES.map((g) => g.id));
      return;
    }
    setSelectedGrades([gradeId]);
  };

  const handleSelectAllGrades = () => {
    setSelectedGrades(GRADES.map((g) => g.id));
  };

  // Handler: Calendar period navigation
  // NOTE: When navigating next/prev weeks or months, selectedDate is reset to null so next week's Wednesday is NEVER highlighted!
  const handleNavigatePeriod = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentYear(2026);
      setCurrentMonthIndex(8);
      setViewWeekDate(TODAY_ISO);
      setSelectedDate(TODAY_ISO);
      return;
    }

    if (viewMode === 'month') {
      const delta = direction === 'prev' ? -1 : 1;
      const nextDate = new Date(currentYear, currentMonthIndex + delta, 1);
      setCurrentYear(nextDate.getFullYear());
      setCurrentMonthIndex(nextDate.getMonth());
      setSelectedDate(null); // Clear selected date on month navigation
    } else {
      const deltaDays = direction === 'prev' ? -7 : 7;
      setViewWeekDate((prev) => shiftDateByDays(prev, deltaDays));
      setSelectedDate(null); // Clear selected date so next week's day is NOT highlighted
    }
  };

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // When clicking an event, open the detail modal with only that case's info.
  const handleSelectDate = (dateStr: string, eventId?: string) => {
    setSelectedDate(dateStr);
    if (eventId) {
      setSelectedEventId(eventId);
      setIsModalOpen(true);
    } else {
      setSelectedEventId(null);
    }
  };

  // Filtered events
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return events.filter((ev) => {
      if (!selectedGrades.includes(ev.gradeId)) return false;
      if (q) {
        const text = `${ev.title[lang]} ${ev.unitTopic[lang]}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [events, selectedGrades, searchQuery, lang]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const ev of filteredEvents) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    return map;
  }, [filteredEvents]);

  // Monthly grid cells (starts Monday) & Weekly agenda cells
  const monthCells = useMemo(
    () => buildMonthGrid(currentYear, currentMonthIndex, TODAY_ISO),
    [currentYear, currentMonthIndex]
  );

  const weekCells = useMemo(
    () => buildWeekDays(viewWeekDate, TODAY_ISO),
    [viewWeekDate]
  );

  const modalEvents = useMemo(() => {
    if (!selectedDate) return [];
    const dayEvts = eventsByDate[selectedDate] || [];
    if (selectedEventId) {
      const single = dayEvts.filter((ev) => ev.id === selectedEventId);
      if (single.length > 0) return single;
    }
    return dayEvts;
  }, [selectedDate, selectedEventId, eventsByDate]);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900"
    >
      {/* 1. Clean Top Bar */}
      <TopBar
        lang={lang}
        onLanguageChange={setLang}
        filteredEvents={filteredEvents}
      />

      {/* 2. Main Content Viewport */}
      <main
        id="top"
        className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4"
      >
        {/* Grade Filter Bar: 5th Grade through 2nd Sec (Lycée) */}
        <GradeFilterBar
          lang={lang}
          selectedGrades={selectedGrades}
          onToggleGrade={handleToggleGrade}
          onSelectAllGrades={handleSelectAllGrades}
        />

        {/* Calendar Viewport */}
        <CalendarViewport
          lang={lang}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          currentYear={currentYear}
          currentMonthIndex={currentMonthIndex}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          onNavigatePeriod={handleNavigatePeriod}
          monthCells={monthCells}
          weekCells={weekCells}
          eventsByDate={eventsByDate}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* Modal for detailed lesson inspection when tapping any date */}
        {isModalOpen && selectedDate && (
          <LessonDetailModal
            lang={lang}
            selectedDate={selectedDate}
            dayEvents={modalEvents}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEventId(null);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/90 bg-white/70 mt-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>{t.footer.instructorCredit}</span>
          <span>{t.footer.gradesCoverage}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
