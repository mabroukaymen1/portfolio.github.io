import React, { useEffect } from 'react';
import TranslationHero from './TranslationHero';
import TranslationAIDemo from './TranslationAIDemo';
import TranslationFeatures from './TranslationFeatures';
import TranslationArchitecture from './TranslationArchitecture';
import TranslationTechStack from './TranslationTechStack';
import TranslationEvaluation from './TranslationEvaluation';
import TranslationSummary from './TranslationSummary';

const TranslationArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <TranslationHero />
      <TranslationAIDemo />
      <TranslationFeatures />
      <TranslationArchitecture />
      <TranslationTechStack />
      <TranslationEvaluation />
      <TranslationSummary />
    </div>
  );
};

export default TranslationArcade;
