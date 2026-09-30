import React from 'react';
import { GradeId, Language } from '../types/calendar';
import { GRADES } from '../data/mockSchedule';
import { TRANSLATIONS } from '../data/i18n';
import { Check } from 'lucide-react';

interface GradeFilterBarProps {
  lang: Language;
  selectedGrades: GradeId[];
  onToggleGrade: (gradeId: GradeId) => void;
  onSelectAllGrades: () => void;
}

export const GradeFilterBar: React.FC<GradeFilterBarProps> = ({
  lang,
  selectedGrades,
  onToggleGrade,
  onSelectAllGrades,
}) => {
  const t = TRANSLATIONS[lang];
  const isAllSelected = selectedGrades.length === GRADES.length;

  return (
    <section
      aria-label={t.gradeFilter.label}
      className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-wide text-stone-600">
          {t.gradeFilter.label}
        </span>
        <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
          {t.gradeFilter.scheduleFrequency}
        </span>
      </div>

      <div className="relative">
        <div
          role="group"
          aria-label={t.gradeFilter.label}
          className="flex items-center gap-2 overflow-x-auto touch-scroll no-scrollbar py-1 px-0.5"
        >
          {/* All Grades Button */}
          <button
            type="button"
            onClick={onSelectAllGrades}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap shrink-0 min-h-[44px] active:scale-[0.98] ${
              isAllSelected
                ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                : 'bg-stone-100/90 text-stone-700 border-stone-200/90 hover:bg-stone-200/70'
            }`}
          >
            {t.gradeFilter.allGrades}
          </button>

          {/* Individual Grade Chips */}
          {GRADES.map((grade) => {
            const isActive = selectedGrades.includes(grade.id);

            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => onToggleGrade(grade.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap shrink-0 min-h-[44px] active:scale-[0.98] ${
                  isActive
                    ? `${grade.activeChipBg} ${grade.activeChipText} border-transparent shadow-2xs`
                    : 'bg-white text-stone-700 border-stone-200/90 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isActive ? 'bg-white' : grade.dotColor
                  }`}
                />
                <span>{grade.label[lang]}</span>
                <span
                  className={`text-[10px] font-mono-tabular opacity-80 ${
                    isActive ? 'text-white' : 'text-stone-400'
                  }`}
                >
                  ({grade.cefr})
                </span>
                {isActive && !isAllSelected && (
                  <Check className="w-3.5 h-3.5 shrink-0 opacity-90" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
