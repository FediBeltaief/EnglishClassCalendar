import React, { useState, useEffect, useRef } from 'react';
import {
  CalendarEvent,
  CalendarViewMode,
  Language,
} from '../types/calendar';
import { GRADE_MAP } from '../data/mockSchedule';
import { TRANSLATIONS } from '../data/i18n';
import { CalendarDayCell, formatTimeAmPm } from '../utils/calendarUtils';
import {
  Calendar as CalendarIcon,
  TableProperties,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  LayoutList,
  X,
  Sparkles,
} from 'lucide-react';

interface CalendarViewportProps {
  lang: Language;
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
  currentYear: number;
  currentMonthIndex: number;
  selectedDate: string | null;
  onSelectDate: (dateStr: string, eventId?: string) => void;
  onNavigatePeriod: (direction: 'prev' | 'next' | 'today') => void;
  monthCells: CalendarDayCell[];
  weekCells: CalendarDayCell[];
  eventsByDate: Record<string, CalendarEvent[]>;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
}

interface WeekSlot {
  id: number;
  label: Record<Language, string>;
  timeRange: string;
  time12: string;
}

const WEEK_SLOTS: WeekSlot[] = [
  {
    id: 1,
    label: { en: 'Morning', fr: 'Matin', ar: 'الصباح' },
    timeRange: '09:00 – 12:00',
    time12: '9:00 AM – 12:00 PM',
  },
  {
    id: 2,
    label: { en: 'Midday', fr: 'Midi', ar: 'منتصف النهار' },
    timeRange: '11:00 – 14:00',
    time12: '11:00 AM – 2:00 PM',
  },
  {
    id: 3,
    label: { en: 'Early Afternoon', fr: 'Début Après-midi', ar: 'بعد الزوال' },
    timeRange: '13:00 – 16:00',
    time12: '1:00 PM – 4:00 PM',
  },
  {
    id: 4,
    label: { en: 'Late Afternoon', fr: 'Fin Après-midi', ar: 'العصر' },
    timeRange: '15:00 – 18:00',
    time12: '3:00 PM – 6:00 PM',
  },
  {
    id: 5,
    label: { en: 'Evening', fr: 'Soir', ar: 'المساء' },
    timeRange: '17:00 – 19:30',
    time12: '5:00 PM – 7:30 PM',
  },
];

function getEventSlotIndex(ev: CalendarEvent): number {
  const [h, m] = ev.startTime.split(':').map(Number);
  const totalMins = h * 60 + (m || 0);

  if (totalMins < 11 * 60) return 0; // 09:00, 10:00 -> Slot 1
  if (totalMins < 13 * 60) return 1; // 11:00, 12:30 -> Slot 2
  if (totalMins < 15 * 60) return 2; // 13:00, 14:00 -> Slot 3
  if (totalMins < 17 * 60) return 3; // 15:00, 16:00 -> Slot 4
  return 4;                          // 17:00, 18:00 -> Slot 5
}

export const CalendarViewport: React.FC<CalendarViewportProps> = ({
  lang,
  viewMode,
  onViewModeChange,
  currentYear,
  currentMonthIndex,
  selectedDate,
  onSelectDate,
  onNavigatePeriod,
  monthCells,
  weekCells,
  eventsByDate,
  searchQuery,
  onSearchQueryChange,
}) => {
  const t = TRANSLATIONS[lang];

  const currentMonthName = t.months[currentMonthIndex];
  const weekStartCell = weekCells[0];
  const weekEndCell = weekCells[weekCells.length - 1];

  const periodTitle =
    viewMode === 'month'
      ? `${currentMonthName} ${currentYear}`
      : `${weekStartCell.dayNumber} ${t.months[weekStartCell.monthIndex]} – ${weekEndCell.dayNumber} ${t.months[weekEndCell.monthIndex]} ${weekEndCell.year}`;

  // Mobile layout state: Day Focus vs Full Table
  const [mobileLayoutMode, setMobileLayoutMode] = useState<'day' | 'table'>('day');

  // Active day for Day Focus on mobile
  const [activeDayIso, setActiveDayIso] = useState<string>(() => {
    const todayCell = weekCells.find((c) => c.isToday);
    return todayCell ? todayCell.dateStr : weekCells[0]?.dateStr || '';
  });

  // Keep activeDayIso in sync when navigating weeks
  useEffect(() => {
    const isDayInWeek = weekCells.some((c) => c.dateStr === activeDayIso);
    if (!isDayInWeek && weekCells.length > 0) {
      const todayCell = weekCells.find((c) => c.isToday);
      setActiveDayIso(todayCell ? todayCell.dateStr : weekCells[0].dateStr);
    }
  }, [weekCells, activeDayIso]);

  const activeDayCell =
    weekCells.find((c) => c.dateStr === activeDayIso) || weekCells[0];
  const activeDayEvents = activeDayIso ? eventsByDate[activeDayIso] || [] : [];

  // Ref to table scroll container for horizontal scrolling assistance
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollToDay = (dateStr: string) => {
    setActiveDayIso(dateStr);
    if (tableContainerRef.current) {
      const dayIndex = weekCells.findIndex((c) => c.dateStr === dateStr);
      if (dayIndex >= 0) {
        const approxColumnWidth = 140;
        tableContainerRef.current.scrollTo({
          left: dayIndex * approxColumnWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section
      aria-label="Class Timetable"
      className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden"
    >
      {/* 1. Calendar Toolbar (Fully Responsive with Touch Hitboxes >= 40-44px) */}
      <div className="p-3.5 sm:p-5 border-b border-stone-200/80 space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onNavigatePeriod('today')}
                className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 active:scale-95 transition-all shadow-3xs min-h-[40px] flex items-center justify-center"
              >
                {t.actions.today}
              </button>

              <div
                role="group"
                aria-label="Previous and Next Navigation"
                className="inline-flex items-center rounded-xl border border-stone-300 bg-white p-0.5 shadow-3xs"
              >
                <button
                  type="button"
                  onClick={() => onNavigatePeriod('prev')}
                  aria-label="Previous Period"
                  className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 active:scale-95 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePeriod('next')}
                  aria-label="Next Period"
                  className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 active:scale-95 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            <h2 className="text-sm sm:text-lg font-bold text-stone-900 tracking-tight truncate ms-1">
              {periodTitle}
            </h2>
          </div>

          {/* Right controls: View Toggle & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
            {/* View Toggle */}
            <div
              role="group"
              aria-label="Calendar View Switcher"
              className="inline-flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/80 self-start sm:self-auto"
            >
              <button
                type="button"
                onClick={() => onViewModeChange('week')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[38px] ${
                  viewMode === 'week'
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'الجدول الأسبوعي' : lang === 'fr' ? 'Semaine' : 'Weekly Timetable'}</span>
              </button>

              <button
                type="button"
                onClick={() => onViewModeChange('month')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[38px] ${
                  viewMode === 'month'
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'شهري' : lang === 'fr' ? 'Mois' : 'Month'}</span>
              </button>
            </div>

            {/* Search Box with Clear Button */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder={t.calendarControls.searchPlaceholder}
                className="w-full h-10 sm:h-9 ps-8 pe-8 text-xs bg-stone-50 border border-stone-200/90 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-stone-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchQueryChange('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 -translate-y-1/2 end-2 p-1 text-stone-400 hover:text-stone-600 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: WEEK VIEW */}
      {viewMode === 'week' && (
        <div className="p-3 sm:p-6 bg-slate-50/60">
          {/* Header Bar */}
          <div className="bg-stone-900 text-white rounded-t-xl px-3.5 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shadow-2xs">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-amber-400">
                {t.calendarControls.weeklyScheduleTitle}
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-xs sm:text-sm font-semibold text-stone-200 hidden sm:inline">
                {t.instructor}
              </span>
            </div>

            {/* Mobile Sub-view Switcher: Day Focus vs Full Table (Mobile only) */}
            <div className="flex sm:hidden items-center p-0.5 bg-stone-800 rounded-lg border border-stone-700/80">
              <button
                type="button"
                onClick={() => setMobileLayoutMode('day')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 min-h-[30px] ${
                  mobileLayoutMode === 'day'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <LayoutList className="w-3 h-3" />
                <span>{t.calendarControls.mobileDayFocus}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileLayoutMode('table')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 min-h-[30px] ${
                  mobileLayoutMode === 'table'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <TableProperties className="w-3 h-3" />
                <span>{t.calendarControls.mobileFullGrid}</span>
              </button>
            </div>

            <div className="text-xs font-mono-tabular text-stone-300 hidden sm:block">
              {weekStartCell.dayNumber} {t.months[weekStartCell.monthIndex]} – {weekEndCell.dayNumber} {t.months[weekEndCell.monthIndex]} {weekEndCell.year}
            </div>
          </div>

          {/* SUB-VIEW A: MOBILE DAY FOCUS (Shown on small screens when selected) */}
          <div className={`${mobileLayoutMode === 'day' ? 'block sm:hidden' : 'hidden'} bg-white border-x border-b border-stone-200 rounded-b-xl p-3 space-y-4 shadow-xs`}>
            {/* Horizontal Day Selector Strip for Mobile */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
                <span>{t.calendarControls.selectDay || 'Select Day'}</span>
                <span className="text-[11px] font-mono-tabular">
                  {activeDayEvents.length} {activeDayEvents.length === 1 ? t.calendarControls.lessonSingle : t.calendarControls.lessonsCount}
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Select day of week"
                className="flex items-center gap-1.5 overflow-x-auto touch-scroll no-scrollbar py-1 px-0.5"
              >
                {weekCells.map((dayCell, idx) => {
                  const isSelected = dayCell.dateStr === activeDayIso;
                  const dayEvts = eventsByDate[dayCell.dateStr] || [];
                  const count = dayEvts.length;

                  return (
                    <button
                      key={dayCell.dateStr}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleScrollToDay(dayCell.dateStr)}
                      className={`flex-1 min-w-[50px] py-2 px-1.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 min-h-[54px] ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : dayCell.isToday
                          ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-tight">
                        {t.weekdaysShort[idx]}
                      </span>
                      <span className="text-sm font-mono-tabular font-bold">
                        {dayCell.dayNumber}
                      </span>
                      {count > 0 && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-amber-400' : 'bg-amber-500'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Sessions by Time Slot */}
            <div className="space-y-2.5 pt-1">
              {WEEK_SLOTS.map((slot) => {
                const slotEvents = activeDayEvents.filter(
                  (ev) => getEventSlotIndex(ev) === slot.id - 1
                );

                return (
                  <div
                    key={slot.id}
                    className="border border-stone-200/90 rounded-xl overflow-hidden bg-white shadow-3xs"
                  >
                    {/* Slot Header */}
                    <div className="bg-stone-50/90 px-3 py-2 border-b border-stone-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span className="text-xs font-bold text-stone-900">
                          {slot.label[lang]}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono-tabular text-stone-500 font-medium">
                        {slot.timeRange}
                      </span>
                    </div>

                    {/* Slot Classes */}
                    <div className="p-2.5">
                      {slotEvents.length === 0 ? (
                        <div className="py-2 text-center text-xs text-stone-400 font-mono-tabular select-none">
                          —
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {slotEvents.map((ev) => {
                            const gradeCfg = GRADE_MAP[ev.gradeId];

                            return (
                              <div
                                key={ev.id}
                                onClick={() => onSelectDate(activeDayIso, ev.id)}
                                className={`p-3 rounded-xl border-2 transition-all active:scale-[0.98] cursor-pointer shadow-2xs flex items-center justify-between gap-2 ${gradeCfg.surfaceBg} ${gradeCfg.accentBorder} ${gradeCfg.textColor}`}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight">
                                    <span className={`w-2.5 h-2.5 rounded-full ${gradeCfg.dotColor} shrink-0`} />
                                    <span>{gradeCfg.label[lang]}</span>
                                  </div>
                                  <div className="text-xs font-mono-tabular opacity-80 flex items-center gap-2">
                                    <span className="font-semibold">{ev.unitTopic[lang]}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 shrink-0 font-mono-tabular">
                                  <span className="text-xs font-bold text-stone-900 bg-white/90 px-2 py-0.5 rounded shadow-3xs">
                                    {formatTimeAmPm(ev.startTime)}
                                  </span>
                                  <span className="text-[10px] font-semibold text-stone-700 bg-stone-100/90 px-1.5 py-0.5 rounded">
                                    {ev.durationLabel[lang]}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUB-VIEW B: FULL TIMETABLE TABLE (Always on desktop, toggleable on mobile) */}
          <div
            className={`${
              mobileLayoutMode === 'table' ? 'block' : 'hidden sm:block'
            } border-x border-b border-stone-200 bg-white rounded-b-xl shadow-xs overflow-hidden`}
          >
            {/* Mobile swipe hint */}
            <div className="sm:hidden px-3 py-1.5 bg-stone-50 border-b border-stone-200 text-[11px] text-stone-500 font-medium flex items-center justify-center gap-1.5">
              <span>←</span>
              <span>{t.calendarControls.swipeHint}</span>
              <span>→</span>
            </div>

            <div
              ref={tableContainerRef}
              className="overflow-x-auto touch-scroll"
            >
              <table className="w-full min-w-[760px] border-collapse text-start">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    {/* Sticky Corner Header */}
                    <th
                      scope="col"
                      className="sticky start-0 z-20 w-28 sm:w-36 p-3 text-center text-xs font-bold text-stone-600 uppercase tracking-wider bg-stone-50 border-e border-stone-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{lang === 'ar' ? 'التوقيت' : lang === 'fr' ? 'Horaire' : 'Time'}</span>
                      </span>
                    </th>
                    {weekCells.map((dayCell, idx) => {
                      const isToday = dayCell.isToday;
                      const isSelected = selectedDate !== null && dayCell.dateStr === selectedDate;

                      return (
                        <th
                          key={dayCell.dateStr}
                          scope="col"
                          className={`p-3 text-center border-e last:border-e-0 border-stone-200 select-none min-w-[110px] sm:min-w-[125px] ${
                            isToday
                              ? 'bg-amber-500 text-white font-bold ring-2 ring-inset ring-amber-300'
                              : isSelected
                              ? 'bg-stone-800 text-white'
                              : 'text-stone-800'
                          }`}
                        >
                          <div className="text-xs font-extrabold uppercase tracking-wide">
                            {t.weekdaysShort[idx]}
                          </div>
                          <div className="text-xs sm:text-sm font-mono-tabular font-bold mt-0.5">
                            {dayCell.dayNumber} {t.months[dayCell.monthIndex].slice(0, 3)}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {WEEK_SLOTS.map((slot) => {
                    return (
                      <tr key={slot.id} className="hover:bg-stone-50/40 transition-colors">
                        {/* Sticky Left/Right Time Column */}
                        <th
                          scope="row"
                          className="sticky start-0 z-10 p-3 text-center align-middle bg-stone-50 border-e border-stone-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]"
                        >
                          <div className="text-xs font-bold text-stone-900 whitespace-nowrap">
                            {slot.label[lang]}
                          </div>
                          <div className="text-[11px] font-mono-tabular font-medium text-stone-500 mt-0.5 whitespace-nowrap">
                            {slot.timeRange}
                          </div>
                        </th>

                        {/* 7 Days Columns for this slot */}
                        {weekCells.map((dayCell) => {
                          const dayEvents = eventsByDate[dayCell.dateStr] || [];
                          const slotEvents = dayEvents.filter((ev) => getEventSlotIndex(ev) === slot.id - 1);
                          const isSelectedDay = selectedDate !== null && dayCell.dateStr === selectedDate;

                          return (
                            <td
                              key={dayCell.dateStr}
                              className={`p-2 sm:p-2.5 align-middle border-e last:border-e-0 border-stone-200 min-h-[85px] transition-colors select-none ${
                                isSelectedDay ? 'bg-amber-50/30' : ''
                              }`}
                            >
                              {slotEvents.length === 0 ? (
                                <div className="h-14 flex items-center justify-center text-stone-300 select-none">
                                  <span className="text-sm font-mono-tabular">—</span>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-1.5">
                                  {slotEvents.map((ev) => {
                                    const gradeCfg = GRADE_MAP[ev.gradeId];

                                    return (
                                      <div
                                        key={ev.id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onSelectDate(dayCell.dateStr, ev.id);
                                        }}
                                        className={`p-2.5 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-2xs flex flex-col justify-between gap-1.5 text-start ${gradeCfg.surfaceBg} ${gradeCfg.accentBorder} ${gradeCfg.textColor}`}
                                      >
                                        {/* Grade Label */}
                                        <div className="flex items-center gap-1.5 text-xs font-extrabold tracking-tight">
                                          <span className={`w-2 h-2 rounded-full ${gradeCfg.dotColor}`} />
                                          <span>{gradeCfg.label[lang]}</span>
                                        </div>

                                        {/* Time & Duration Footer */}
                                        <div className="pt-1.5 border-t border-black/5 flex items-center justify-between gap-1 text-[11px] font-mono-tabular">
                                          <span className="font-bold text-stone-900 bg-white/80 px-1.5 py-0.5 rounded shadow-3xs">
                                            {formatTimeAmPm(ev.startTime)}
                                          </span>
                                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-700 bg-stone-100/90 px-1.5 py-0.5 rounded">
                                            <Clock className="w-2.5 h-2.5 text-stone-500" />
                                            <span>{ev.durationLabel[lang]}</span>
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: MONTHLY GRID */}
      {viewMode === 'month' && (
        <div>
          {/* Weekday Column Headers */}
          <div className="grid grid-cols-7 border-b border-stone-200/80 bg-stone-50/70">
            {t.weekdaysShort.map((dayName, idx) => {
              const isSunday = idx === 6;
              return (
                <div
                  key={idx}
                  className={`py-2 sm:py-2.5 px-1 sm:px-2 text-center text-[11px] sm:text-xs font-semibold tracking-wide ${
                    isSunday ? 'text-stone-700' : 'text-stone-500'
                  }`}
                >
                  <span>{dayName}</span>
                </div>
              );
            })}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 divide-x rtl:divide-x-reverse divide-y divide-stone-200/80">
            {monthCells.map((cell) => {
              const dayEvents = eventsByDate[cell.dateStr] || [];
              const isSelected = selectedDate !== null && cell.dateStr === selectedDate;
              const isSunday = cell.isoWeekday === 7;

              return (
                <div
                  key={cell.dateStr}
                  className={`min-h-[105px] sm:min-h-[145px] p-1.5 sm:p-2.5 flex flex-col justify-between transition-colors text-start select-none ${
                    !cell.isCurrentMonth
                      ? 'bg-stone-50/40 text-stone-400'
                      : isSelected
                      ? 'bg-amber-50/60 ring-2 ring-inset ring-amber-600'
                      : isSunday
                      ? 'bg-stone-50/30'
                      : 'bg-white'
                  }`}
                >
                  {/* Top: Day Number + Daily Lessons Count */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold tabular-nums ${
                        cell.isToday
                          ? 'bg-amber-600 text-white'
                          : isSelected
                          ? 'bg-stone-900 text-white'
                          : cell.isCurrentMonth
                          ? 'text-stone-800'
                          : 'text-stone-400'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-mono-tabular font-semibold text-stone-700 bg-stone-100 px-1 sm:px-1.5 py-0.5 rounded">
                        {dayEvents.length}
                        <span className="hidden sm:inline ms-1">
                          {dayEvents.length === 1 ? t.calendarControls.lessonSingle : t.calendarControls.lessonsCount}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Scheduled Classes for the day */}
                  <div className="space-y-1 flex-1">
                    {/* Mobile View: Touch-friendly Case Pill Buttons */}
                    <div className="flex sm:hidden flex-col gap-1 mt-0.5">
                      {dayEvents.map((ev) => {
                        const gradeCfg = GRADE_MAP[ev.gradeId];
                        return (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDate(cell.dateStr, ev.id);
                            }}
                            aria-label={`${gradeCfg.label[lang]}: ${ev.startTime}`}
                            className={`w-full text-start px-1.5 py-1 rounded-md text-[10px] font-bold border transition-transform active:scale-95 flex items-center justify-between gap-1 min-h-[30px] ${gradeCfg.surfaceBg} ${gradeCfg.accentBorder} ${gradeCfg.textColor}`}
                          >
                            <span className="truncate">{gradeCfg.shortLabel[lang]}</span>
                            <span className="font-mono-tabular text-[9px] opacity-80 shrink-0">
                              {formatTimeAmPm(ev.startTime).split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Tablet/Desktop View: Tiles */}
                    <div className="hidden sm:flex flex-col gap-1">
                      {dayEvents.map((ev) => {
                        const gradeCfg = GRADE_MAP[ev.gradeId];
                        const tileClasses = `${gradeCfg.surfaceBg} border border-stone-200/80 border-s-4 ${gradeCfg.accentBorder} ${gradeCfg.textColor}`;

                        return (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDate(cell.dateStr, ev.id);
                            }}
                            className={`w-full text-start px-2 py-1 rounded-md transition-transform active:scale-[0.99] hover:brightness-95 ${tileClasses}`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[11px] font-bold truncate">
                                {gradeCfg.shortLabel[lang]}
                              </span>
                              <span className="text-[10px] font-mono-tabular font-semibold opacity-85 shrink-0">
                                {formatTimeAmPm(ev.startTime)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1 mt-0.5">
                              <span className="text-[10px] font-mono-tabular opacity-75 truncate">
                                {ev.durationLabel[lang]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
