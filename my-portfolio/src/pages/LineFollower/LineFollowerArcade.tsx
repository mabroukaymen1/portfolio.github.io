import React, { useEffect } from 'react';
import LineFollowerHero from './LineFollowerHero';
import LineFollowerFeatures from './LineFollowerFeatures';
import LineFollowerArchitecture from './LineFollowerArchitecture';
import LineFollowerTechStack from './LineFollowerTechStack';
import LineFollowerDemo from './LineFollowerDemo';
import LineFollowerSummary from './LineFollowerSummary';

const LineFollowerArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <LineFollowerHero />
      <LineFollowerFeatures />
      <LineFollowerArchitecture />
      <LineFollowerTechStack />
      <LineFollowerDemo />
      <LineFollowerSummary />
    </div>
  );
};

export default LineFollowerArcade;
