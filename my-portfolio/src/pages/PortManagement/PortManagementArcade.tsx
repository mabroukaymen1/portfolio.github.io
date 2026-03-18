import React, { useEffect } from 'react';
import PortManagementHero from './PortManagementHero';
import PortManagementFeatures from './PortManagementFeatures';
import PortManagementArchitecture from './PortManagementArchitecture';
import PortManagementTechStack from './PortManagementTechStack';
import PortManagementDemo from './PortManagementDemo';
import PortManagementSummary from './PortManagementSummary';

const PortManagementArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <PortManagementHero />
      <PortManagementFeatures />
      <PortManagementArchitecture />
      <PortManagementTechStack />
      <PortManagementDemo />
      <PortManagementSummary />
    </div>
  );
};

export default PortManagementArcade;
