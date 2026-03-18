import React, { useEffect } from 'react';
import BabyTrackerHero from './BabyTrackerHero';
import BabyTrackerFeatures from './BabyTrackerFeatures';
import BabyTrackerArchitecture from './BabyTrackerArchitecture';
import BabyTrackerTechStack from './BabyTrackerTechStack';
import BabyTrackerDemo from './BabyTrackerDemo';
import BabyTrackerSummary from './BabyTrackerSummary';

const BabyTrackerArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <BabyTrackerHero />
      <BabyTrackerFeatures />
      <BabyTrackerArchitecture />
      <BabyTrackerTechStack />
      <BabyTrackerDemo />
      <BabyTrackerSummary />
    </div>
  );
};

export default BabyTrackerArcade;
