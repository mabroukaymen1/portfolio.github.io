import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ViewModeProvider } from './context/ViewModeContext';
import Home from './pages/Home/Home';
import MegaTell from './pages/MegaTell/MegaTell';
import BabyTracker from './pages/BabyTracker/BabyTracker';
import LoRaMonitoring from './pages/LoRaMonitoring/LoRaMonitoring';
import SmartHome from './pages/SmartHome/SmartHome';
import LineFollower from './pages/LineFollower/LineFollower';
import AquaTech from './pages/AquaTech/AquaTech';
import Beemo from './pages/Beemo/Beemo';
import TranslationAI from './pages/TranslationAI/TranslationAI';
import PortManagement from './pages/PortManagement/PortManagement';

function App() {
  return (
    <ViewModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/megatell" element={<MegaTell />} />
          <Route path="/projects/babytracker" element={<BabyTracker />} />
          <Route path="/projects/lora-monitoring" element={<LoRaMonitoring />} />
          <Route path="/projects/smart-home" element={<SmartHome />} />
          <Route path="/projects/line-follower" element={<LineFollower />} />
          <Route path="/projects/aquatech" element={<AquaTech />} />
          <Route path="/projects/beemo" element={<Beemo />} />
          <Route path="/projects/translation-ai" element={<TranslationAI />} />
          <Route path="/projects/port-management" element={<PortManagement />} />
        </Routes>
      </Router>
    </ViewModeProvider>
  );
}

export default App;
