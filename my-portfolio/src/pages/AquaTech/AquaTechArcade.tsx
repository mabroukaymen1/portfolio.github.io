import React, { useEffect } from 'react';
import AquaTechHero from './AquaTechHero';
import AquaTechFeatures from './AquaTechFeatures';
import AquaTechArchitecture from './AquaTechArchitecture';
import AquaTechTechStack from './AquaTechTechStack';
import AquaTechDemo from './AquaTechDemo';
import AquaTechSummary from './AquaTechSummary';

const AquaTechArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <AquaTechHero />
      <AquaTechFeatures />
      <AquaTechArchitecture />
      <AquaTechTechStack />
      <AquaTechDemo />
      <AquaTechSummary />
    </div>
  );
};

export default AquaTechArcade;
