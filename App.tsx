
import React, { useState } from 'react';
import Layout from './components/Layout';
import HistoricalChat from './components/HistoricalChat';
import { Step } from './types';
import { FIGURES } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);

  const renderIntro = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-amber-50 p-8 rounded-2xl border-l-8 border-amber-800 shadow-sm parchment-texture">
        <h2 className="text-4xl font-bold historical-font mb-4 text-amber-900">The Great Contradiction</h2>
        <p className="text-lg text-stone-700 leading-relaxed mb-6">
          250 years ago, Black History Month did not exist. Slavery thrived in the American colonies. 
          While Jefferson and the founding fathers were writing about freedom, they were keeping actual human beings in chains.
        </p>
        <div className="bg-white p-6 rounded-xl border border-amber-200 italic text-stone-600 relative">
          <span className="absolute -top-4 -left-2 text-6xl text-amber-200">"</span>
          <p className="relative z-10">
            "Mankind in a state of nature are equal, free, and independent of each other, and have a right to the undisturbed enjoyment of their lives, their liberty and property."
          </p>
          <p className="text-right mt-2 font-bold">— Words that sparked a revolution (and a dilemma)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-700">
          <h3 className="text-xl font-bold text-red-900 mb-2 uppercase">The British Opportunity</h3>
          <p className="text-stone-600 mb-4">King George promised freedom to those who fled Patriot masters. Was it a genuine offer or a war tactic?</p>
          <button 
            onClick={() => setCurrentStep(Step.BRITISH_PATH)}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors w-full"
          >
            Explore the King's Path
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-700">
          <h3 className="text-xl font-bold text-blue-900 mb-2 uppercase">The Patriot Struggle</h3>
          <p className="text-stone-600 mb-4">Black men like Peter Salem fought for the Americans. Did their service earn them the liberty they bled for?</p>
          <button 
            onClick={() => setCurrentStep(Step.PATRIOT_PATH)}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full"
          >
            Explore the Patriot Path
          </button>
        </div>
      </div>
    </div>
  );

  const renderFigurePath = (figureId: string, nextStep: Step) => {
    const figure = FIGURES.find(f => f.id === figureId);
    if (!figure) return null;

    return (
      <div className="animate-fade-in space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-2/5">
            <div className="relative group">
              <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply pointer-events-none rounded-lg z-10"></div>
              <img 
                src={figure.image} 
                alt={figure.name} 
                className={`w-full h-96 object-cover rounded-lg shadow-2xl border-4 border-stone-200 ${
                  figure.id === 'peter-salem' ? 'object-right-top' : 'object-center'
                }`}
              />
              <div className="absolute inset-0 border-[12px] border-white/20 pointer-events-none rounded-lg"></div>
            </div>
            <div className={`mt-4 p-4 rounded text-center font-bold uppercase tracking-widest shadow-sm border ${
              figure.side === 'British' ? 'bg-red-50 text-red-800 border-red-100' : 
              figure.side === 'American' ? 'bg-blue-50 text-blue-800 border-blue-100' : 
              'bg-green-50 text-green-800 border-green-100'
            }`}>
              {figure.side} Representation
            </div>
            <p className="mt-2 text-xs text-stone-400 italic text-center">
              *Historical representation from the period.
            </p>
          </div>
          <div className="w-full md:w-3/5 space-y-6">
            <h2 className="text-5xl font-bold historical-font text-stone-900">{figure.name}</h2>
            <div className="bg-white p-6 rounded-xl shadow-inner border border-stone-200">
              <h3 className="font-bold text-lg mb-2 text-stone-500 uppercase tracking-tight">The Crossroads</h3>
              <p className="text-xl text-stone-800 font-serif leading-relaxed italic">"{figure.story}"</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <h3 className="font-bold text-lg mb-2 text-amber-900 uppercase tracking-tight">The Legacy</h3>
              <p className="text-lg text-stone-700 leading-relaxed">{figure.outcome}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-stone-200">
              <button 
                onClick={() => setCurrentStep(Step.INTRO)}
                className="text-stone-500 hover:text-stone-800 transition-colors font-medium flex items-center gap-2"
              >
                &larr; Return to Crossroads
              </button>
              <button 
                onClick={() => setCurrentStep(nextStep)}
                className="bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-all shadow-lg hover:translate-x-1"
              >
                Next Story &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVerdictTask = () => (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold historical-font text-stone-900">The Final Verdict</h2>
        <p className="text-xl text-stone-600">
          Based on the stories of Boston King, Peter Salem, and Elizabeth Freeman, evaluate the paths to freedom.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-500/20">
          <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
            🇬🇧 The British Path
          </h3>
          <ul className="space-y-4">
            {[
              "Promised freedom via 1775/1779 proclamations.",
              "Evacuated 4,000 Black Loyalists in the 'Book of Negroes'.",
              "Smallpox-ridden camps killed many runaways.",
              "Only offered freedom to slaves of Patriot masters."
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-stone-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-500/20">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            🇺🇸 The American Path
          </h3>
          <ul className="space-y-4">
            {[
              "1778 Rhode Island Slave Enlistment Act (all-Black regiment).",
              "Legal freedom suits like Elizabeth Freeman's in Mass.",
              "Many states didn't require freeing slave soldiers after war.",
              "1792 Militia Act banned Black people from serving."
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-stone-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-amber-900 text-white p-8 rounded-2xl shadow-2xl text-center space-y-6">
        <h3 className="text-2xl font-bold historical-font">Your Historical Assessment</h3>
        <p className="text-amber-100 max-w-2xl mx-auto">
          If you were living in 1780, which path would have seemed most likely to lead to true liberation? 
          The choice wasn't just about politics—it was about survival.
        </p>
        <button 
          onClick={() => setCurrentStep(Step.AI_CONSULTANT)}
          className="bg-amber-500 text-amber-950 font-bold px-8 py-3 rounded-full hover:bg-amber-400 transition-all transform hover:scale-105"
        >
          Discuss your Verdict with the Historian
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case Step.INTRO: return renderIntro();
      case Step.BRITISH_PATH: return renderFigurePath('boston-king', Step.PATRIOT_PATH);
      case Step.PATRIOT_PATH: return renderFigurePath('peter-salem', Step.LEGAL_PATH);
      case Step.LEGAL_PATH: return renderFigurePath('elizabeth-freeman', Step.VERDICT);
      case Step.VERDICT: return renderVerdictTask();
      case Step.AI_CONSULTANT: return (
        <div className="animate-fade-in space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold historical-font mb-2">Historical Consultation</h2>
            <p className="text-stone-600">Deepen your understanding of these hidden stories. Ask about the contradictions of the Revolution.</p>
          </div>
          <HistoricalChat />
          <div className="flex justify-center pt-4">
            <button 
              onClick={() => setCurrentStep(Step.VERDICT)}
              className="text-amber-800 font-semibold hover:underline"
            >
              &larr; Return to Review Checklist
            </button>
          </div>
        </div>
      );
      default: return renderIntro();
    }
  };

  return (
    <Layout currentStep={currentStep} onNavigate={setCurrentStep}>
      {renderStep()}
    </Layout>
  );
};

export default App;
