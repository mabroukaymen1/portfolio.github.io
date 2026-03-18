import React, { useEffect } from 'react';
import BeemoHero from './BeemoHero';
import BeemoFeatures from './BeemoFeatures';
import BeemoArchitecture from './BeemoArchitecture';
import BeemoTechStack from './BeemoTechStack';
import BeemoDemo from './BeemoDemo';
import BeemoSummary from './BeemoSummary';

const BeemoArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <BeemoHero />
      <BeemoFeatures />
      <BeemoArchitecture />
      <BeemoTechStack />
      <BeemoDemo />
      <BeemoSummary />
    </div>
  );
};

export default BeemoArcade;
