import React from 'react';
import { CalendarEvent, Language } from '../types/calendar';
import { TRANSLATIONS } from '../data/i18n';
import { downloadIcsFile } from '../utils/calendarUtils';
import { Download, User } from 'lucide-react';

interface TopBarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  filteredEvents: CalendarEvent[];
}

export const TopBar: React.FC<TopBarProps> = ({
  lang,
  onLanguageChange,
  filteredEvents,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/90">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Instructor */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-700"
          >
            {t.brandName}
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-950 text-xs font-semibold">
            <User className="w-3.5 h-3.5 text-amber-800" />
            <span>{t.instructor}</span>
          </span>
        </div>

        {/* Language Switcher & Export Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language Selector"
            className="inline-flex items-center p-0.5 sm:p-1 bg-stone-200/75 rounded-lg border border-stone-300/60"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[32px] ${
                lang === 'ar'
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[32px] ${
                lang === 'fr'
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Français
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[32px] ${
                lang === 'en'
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              English
            </button>
          </div>

          {/* Export Action: Icon on mobile, full label on desktop */}
          <button
            type="button"
            onClick={() => downloadIcsFile(filteredEvents, lang)}
            aria-label={t.actions.exportIcs}
            title={t.actions.exportIcs}
            className="inline-flex sm:hidden items-center justify-center p-2 min-h-[40px] min-w-[40px] text-stone-700 bg-white hover:bg-stone-100 active:scale-95 border border-stone-300 rounded-lg shadow-3xs transition-all"
          >
            <Download className="w-4 h-4 text-stone-700" />
          </button>

          <button
            type="button"
            onClick={() => downloadIcsFile(filteredEvents, lang)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-[0.99] rounded-lg transition-all whitespace-nowrap shrink-0 min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.actions.exportIcs}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
