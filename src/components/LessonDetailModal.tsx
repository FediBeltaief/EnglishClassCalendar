import React from 'react';
import { CalendarEvent, Language } from '../types/calendar';
import { GRADE_MAP } from '../data/mockSchedule';
import { TRANSLATIONS } from '../data/i18n';
import { formatHumanDate, formatTimeAmPm } from '../utils/calendarUtils';
import {
  CalendarCheck,
  Clock,
  User,
  X,
} from 'lucide-react';

interface LessonDetailModalProps {
  lang: Language;
  selectedDate: string;
  dayEvents: CalendarEvent[];
  onClose: () => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lang,
  selectedDate,
  dayEvents,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-sheet-fade"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl border-t sm:border border-stone-200 shadow-2xl max-w-xl w-full max-h-[88vh] sm:max-h-[85vh] overflow-y-auto p-5 sm:p-6 space-y-4 animate-sheet-up pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto -mt-1 mb-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-stone-200/80 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wide">
              <span>{t.modal.title}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-950 mt-0.5">
              {formatHumanDate(selectedDate, lang)}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-900 mt-1">
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span className="font-semibold">{t.instructor}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.close}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {dayEvents.length === 0 ? (
          <div className="py-8 text-center space-y-2 bg-stone-50 rounded-xl p-4">
            <CalendarCheck className="w-6 h-6 text-stone-400 mx-auto" />
            <p className="text-sm font-semibold text-stone-700">{t.modal.noEventsDay}</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-200 space-y-4">
            {dayEvents.map((ev, idx) => {
              const gradeCfg = GRADE_MAP[ev.gradeId];

              return (
                <div key={ev.id} className={`${idx > 0 ? 'pt-4' : ''} space-y-3`}>
                  {/* Grade Badge + Times */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full ${gradeCfg.dotColor} shrink-0`} />
                        <span className="text-base font-bold text-stone-950">
                          {gradeCfg.label[lang]}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs font-mono-tabular font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                        {ev.startTime} – {ev.endTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono-tabular font-semibold text-stone-600 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-200">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{ev.durationLabel[lang]}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-2 border-t border-stone-200/80 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 active:scale-[0.99] rounded-xl transition-colors min-h-[44px] flex items-center justify-center"
          >
            {t.actions.close}
          </button>
        </div>
      </div>
    </div>
  );
};
