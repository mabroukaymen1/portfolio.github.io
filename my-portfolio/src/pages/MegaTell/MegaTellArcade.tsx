import React, { useEffect } from 'react';
import MegaTellHero from './MegaTellHero';
import MegaTellFeatures from './MegaTellFeatures';
import MegaTellArchitecture from './MegaTellArchitecture';
import MegaTellTechStack from './MegaTellTechStack';
import MegaTellDemo from './MegaTellDemo';
import MegaTellSummary from './MegaTellSummary';

const MegaTellArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <MegaTellHero />
      <MegaTellFeatures />
      <MegaTellArchitecture />
      <MegaTellTechStack />
      <MegaTellDemo />
      <MegaTellSummary />
    </div>
  );
};

export default MegaTellArcade;
