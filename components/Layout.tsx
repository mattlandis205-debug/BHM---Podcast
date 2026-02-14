
import React from 'react';
import { Step } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: Step;
  onNavigate: (step: Step) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentStep, onNavigate }) => {
  const steps = [
    { id: Step.INTRO, label: 'The Crossroads' },
    { id: Step.BRITISH_PATH, label: 'The King’s Promise' },
    { id: Step.PATRIOT_PATH, label: 'The Patriot Cause' },
    { id: Step.LEGAL_PATH, label: 'The Legal Fight' },
    { id: Step.VERDICT, label: 'The Verdict' },
    { id: Step.AI_CONSULTANT, label: 'Ask Historian' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-amber-900 text-amber-50 py-6 px-4 shadow-xl border-b-4 border-amber-950 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold historical-font uppercase tracking-widest">
            Crossroads of Freedom
          </h1>
          <nav className="flex flex-wrap justify-center gap-2">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={`px-3 py-1 text-sm rounded transition-colors border ${
                  currentStep === s.id
                    ? 'bg-amber-100 text-amber-900 border-amber-100'
                    : 'hover:bg-amber-800 text-amber-200 border-amber-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-stone-100 border-t border-stone-200 py-8 px-4 text-center text-stone-500 text-sm">
        <p className="max-w-2xl mx-auto">
          &copy; {new Date().getFullYear()} Historical Discovery Project. Based on the American Made podcast. 
          Celebrate Black History Month by uncovering the hidden stories of our founders.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
