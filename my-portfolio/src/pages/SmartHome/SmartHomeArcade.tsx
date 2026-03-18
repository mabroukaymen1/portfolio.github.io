import React, { useEffect } from 'react';
import SmartHomeHero from './SmartHomeHero';
import SmartHomeFeatures from './SmartHomeFeatures';
import SmartHomeArchitecture from './SmartHomeArchitecture';
import SmartHomeTechStack from './SmartHomeTechStack';
import SmartHomeDemo from './SmartHomeDemo';
import SmartHomeSummary from './SmartHomeSummary';

const SmartHomeArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <SmartHomeHero />
      <SmartHomeFeatures />
      <SmartHomeArchitecture />
      <SmartHomeTechStack />
      <SmartHomeDemo />
      <SmartHomeSummary />
    </div>
  );
};

export default SmartHomeArcade;
