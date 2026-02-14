
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HistoricalChat from './components/HistoricalChat';
import { Step } from './types';
import { FIGURES, FACTS_TO_SORT, SortingFact } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [unsorted, setUnsorted] = useState<SortingFact[]>(FACTS_TO_SORT);
  const [britishBucket, setBritishBucket] = useState<SortingFact[]>([]);
  const [americanBucket, setAmericanBucket] = useState<SortingFact[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // Sorting logic
  const moveToBritish = (fact: SortingFact) => {
    setUnsorted(prev => prev.filter(f => f.id !== fact.id));
    setAmericanBucket(prev => prev.filter(f => f.id !== fact.id));
    setBritishBucket(prev => [...prev, fact]);
    setShowFeedback(false);
  };

  const moveToAmerican = (fact: SortingFact) => {
    setUnsorted(prev => prev.filter(f => f.id !== fact.id));
    setBritishBucket(prev => prev.filter(f => f.id !== fact.id));
    setAmericanBucket(prev => [...prev, fact]);
    setShowFeedback(false);
  };

  const moveToUnsorted = (fact: SortingFact) => {
    setBritishBucket(prev => prev.filter(f => f.id !== fact.id));
    setAmericanBucket(prev => prev.filter(f => f.id !== fact.id));
    setUnsorted(prev => [...prev, fact]);
    setShowFeedback(false);
  };

  const resetSorting = () => {
    setUnsorted(FACTS_TO_SORT);
    setBritishBucket([]);
    setAmericanBucket([]);
    setShowFeedback(false);
  };

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
          <h3 className="text-xl font-bold text-red-900 mb-2 uppercase tracking-wide">The British Opportunity</h3>
          <p className="text-stone-600 mb-4">King George promised freedom to those who fled Patriot masters. Was it a genuine offer or a war tactic?</p>
          <button 
            onClick={() => setCurrentStep(Step.BRITISH_PATH)}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors w-full font-semibold"
          >
            Explore the King's Path
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-700">
          <h3 className="text-xl font-bold text-blue-900 mb-2 uppercase tracking-wide">The Patriot Struggle</h3>
          <p className="text-stone-600 mb-4">Black men like Peter Salem fought for the Americans. Did their service earn them the liberty they bled for?</p>
          <button 
            onClick={() => setCurrentStep(Step.PATRIOT_PATH)}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full font-semibold"
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

    const getObjectPosition = (id: string) => {
      if (id === 'peter-salem') return 'object-center'; 
      if (id === 'boston-king') return 'object-top'; 
      if (id === 'elizabeth-freeman') return 'object-center'; 
      return 'object-center';
    };

    return (
      <div className="animate-fade-in space-y-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-2/5">
            <div className="relative group">
              <div className="absolute inset-0 bg-stone-900/5 mix-blend-multiply pointer-events-none rounded-lg z-10"></div>
              <img 
                src={figure.image} 
                alt={figure.name} 
                className={`w-full h-[550px] object-cover rounded-lg shadow-2xl border-4 border-white ${getObjectPosition(figure.id)}`}
              />
              <div className="absolute inset-0 border-[12px] border-black/5 pointer-events-none rounded-lg"></div>
            </div>
            
            <div className={`mt-6 p-4 rounded-lg text-center font-bold uppercase tracking-widest shadow-md border-2 ${
              figure.side === 'British' ? 'bg-red-50 text-red-800 border-red-200' : 
              figure.side === 'American' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
              'bg-green-50 text-green-800 border-green-200'
            }`}>
              {figure.side} Representation
            </div>
            
            <p className="mt-3 text-xs text-stone-500 italic text-center leading-relaxed">
              *Historical illustration used to represent the life of {figure.name}.
            </p>
          </div>

          <div className="w-full md:w-3/5 space-y-8">
            <div className="border-b-4 border-stone-200 pb-4">
              <h2 className="text-5xl md:text-6xl font-bold historical-font text-stone-900 tracking-tight">{figure.name}</h2>
              <span className="text-stone-400 font-semibold uppercase text-sm tracking-[0.2em]">Archival Record No. {figure.id.toUpperCase()}</span>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">The Crossroads</h3>
                <div className="bg-white p-8 rounded-2xl shadow-inner border border-stone-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-200"></div>
                  <p className="text-2xl text-stone-800 font-serif italic leading-relaxed">"{figure.story}"</p>
                </div>
              </section>
              
              <section>
                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">The Outcome</h3>
                <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-100">
                  <p className="text-xl text-stone-700 leading-relaxed">{figure.outcome}</p>
                </div>
              </section>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center pt-8">
              <button 
                onClick={() => setCurrentStep(Step.INTRO)}
                className="text-stone-400 hover:text-amber-800 transition-colors font-bold uppercase text-sm tracking-widest flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Crossroads
              </button>
              <button 
                onClick={() => setCurrentStep(nextStep)}
                className="bg-stone-900 text-amber-50 px-10 py-4 rounded-xl hover:bg-amber-900 transition-all shadow-xl font-bold uppercase tracking-widest flex items-center gap-3 group"
              >
                Continue <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
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
        <h2 className="text-5xl font-bold historical-font text-stone-900">The Final Verdict</h2>
        <p className="text-xl text-stone-600 leading-relaxed">
          The Revolution was a war of promises. Assign the following historical facts to the correct side to prove your understanding.
        </p>
      </div>

      {/* Sorting Pool */}
      {unsorted.length > 0 && (
        <div className="bg-stone-200/50 p-8 rounded-3xl border-2 border-dashed border-stone-300">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-6 text-center">Unsorted Evidence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unsorted.map(fact => (
              <div key={fact.id} className="bg-white p-4 rounded-xl shadow-md border border-stone-100 flex flex-col gap-3 group animate-pop-in">
                <p className="text-stone-800 font-medium leading-tight">{fact.text}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => moveToBritish(fact)}
                    className="flex-1 py-2 text-xs font-bold uppercase tracking-tighter bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-700 hover:text-white transition-all"
                  >
                    Assign British
                  </button>
                  <button 
                    onClick={() => moveToAmerican(fact)}
                    className="flex-1 py-2 text-xs font-bold uppercase tracking-tighter bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-700 hover:text-white transition-all"
                  >
                    Assign Patriot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buckets */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-red-600 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-red-900 tracking-tight uppercase">🇬🇧 The British Promise</h3>
            {britishBucket.length > 0 && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{britishBucket.length} Items</span>
            )}
          </div>
          <div className="flex-grow space-y-3">
            {britishBucket.map(fact => (
              <div 
                key={fact.id} 
                className={`p-4 rounded-xl border flex justify-between items-center gap-4 animate-pop-in ${
                  showFeedback 
                    ? fact.correctSide === 'British' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200 animate-shake'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <p className="text-stone-700 text-sm font-medium">{fact.text}</p>
                <button onClick={() => moveToUnsorted(fact)} className="text-stone-400 hover:text-stone-600">✕</button>
              </div>
            ))}
            {britishBucket.length === 0 && (
              <div className="h-full flex items-center justify-center text-stone-300 italic border-2 border-dashed border-stone-100 rounded-2xl">
                Click "Assign British" above...
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-600 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-blue-900 tracking-tight uppercase">🇺🇸 The Patriot Cause</h3>
            {americanBucket.length > 0 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{americanBucket.length} Items</span>
            )}
          </div>
          <div className="flex-grow space-y-3">
            {americanBucket.map(fact => (
              <div 
                key={fact.id} 
                className={`p-4 rounded-xl border flex justify-between items-center gap-4 animate-pop-in ${
                  showFeedback 
                    ? fact.correctSide === 'American' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200 animate-shake'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <p className="text-stone-700 text-sm font-medium">{fact.text}</p>
                <button onClick={() => moveToUnsorted(fact)} className="text-stone-400 hover:text-stone-600">✕</button>
              </div>
            ))}
            {americanBucket.length === 0 && (
              <div className="h-full flex items-center justify-center text-stone-300 italic border-2 border-dashed border-stone-100 rounded-2xl">
                Click "Assign Patriot" above...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6">
        {unsorted.length === 0 ? (
          <button 
            onClick={() => setShowFeedback(true)}
            className="bg-green-600 text-white font-bold px-12 py-4 rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-200 uppercase tracking-widest text-lg"
          >
            Check Answers
          </button>
        ) : (
          <p className="text-stone-400 font-bold uppercase text-xs tracking-widest">Sort all evidence to check your work</p>
        )}
        <button 
          onClick={resetSorting}
          className="text-stone-400 hover:text-stone-800 font-bold uppercase tracking-widest text-xs"
        >
          Reset Activity
        </button>
      </div>

      <div className="bg-amber-900 text-amber-50 p-12 rounded-[2rem] shadow-2xl text-center space-y-8 parchment-texture border-4 border-amber-950/20 relative">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl font-bold historical-font text-amber-950">Draft Your Testimony</h3>
          <p className="text-lg text-white-900/80 font-medium">
            Based on the evidence you've sorted, who offered a more consistent path to liberty? King George, who used freedom as a weapon of war, or George Washington, whose new nation was built on the contradiction of slavery?
          </p>
          <button 
            onClick={() => setCurrentStep(Step.AI_CONSULTANT)}
            className="bg-amber-600 text-white font-bold px-12 py-5 rounded-2xl hover:bg-amber-700 transition-all shadow-xl hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-lg"
          >
            Present to the Historian
          </button>
        </div>
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
        <div className="animate-fade-in space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold historical-font mb-3 text-stone-900">Historical Consultation</h2>
            <p className="text-xl text-stone-500">Ask your consultant about specific events, the 'Book of Negroes', or the outcomes of the freedom suits.</p>
          </div>
          <HistoricalChat />
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => setCurrentStep(Step.VERDICT)}
              className="text-amber-900 font-bold uppercase tracking-widest border-b-2 border-amber-900/30 hover:border-amber-900 transition-all pb-1"
            >
              &larr; Return to Evidence Review
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
