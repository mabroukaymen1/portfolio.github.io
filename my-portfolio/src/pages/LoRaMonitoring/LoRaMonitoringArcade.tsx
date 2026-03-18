import React, { useEffect } from 'react';
import LoRaMonitoringHero from './LoRaMonitoringHero';
import LoRaMonitoringFeatures from './LoRaMonitoringFeatures';
import LoRaMonitoringArchitecture from './LoRaMonitoringArchitecture';
import LoRaMonitoringTechStack from './LoRaMonitoringTechStack';
import LoRaMonitoringDemo from './LoRaMonitoringDemo';
import LoRaMonitoringSummary from './LoRaMonitoringSummary';

const LoRaMonitoringArcade: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen">
      <LoRaMonitoringHero />
      <LoRaMonitoringFeatures />
      <LoRaMonitoringArchitecture />
      <LoRaMonitoringTechStack />
      <LoRaMonitoringDemo />
      <LoRaMonitoringSummary />
    </div>
  );
};

export default LoRaMonitoringArcade;
