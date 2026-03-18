import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const hardware = [
  { name: 'ESP32', desc: 'Core microcontroller with Wi-Fi' },
  { name: 'DHT11', desc: 'Temperature and humidity sensor' },
  { name: 'Flame Sensor', desc: 'Fire detection' },
  { name: 'ACS712', desc: 'Current sensor for energy monitoring' },
  { name: 'LED/Buzzer', desc: 'Smart lighting and audible alerts' },
  { name: '16x2 I2C LCD', desc: 'Local data display' },
];

const software = [
  { name: 'Flutter App', desc: 'Cross-platform mobile interface' },
  { name: 'Firebase', desc: 'Real-time database and authentication' },
  { name: 'MQTT', desc: 'Lightweight messaging protocol' },
  { name: 'Arduino IDE', desc: 'ESP32 firmware development' },
];

const SmartHomeArchitecture: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">System Architecture</h2>
          <p className="text-slate-600 dark:text-slate-400">Hardware and software components powering the smart home ecosystem.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hardware */}
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h3 className="flex items-center gap-3 font-bold uppercase tracking-tight mb-6 dark:text-white">
              <i className="fas fa-microchip text-orange-500" /> Hardware Components
            </h3>
            <div className="space-y-4">
              {hardware.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm dark:text-white">{item.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Software */}
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h3 className="flex items-center gap-3 font-bold uppercase tracking-tight mb-6 dark:text-white">
              <i className="fas fa-code text-orange-500" /> Software Components
            </h3>
            <div className="space-y-4">
              {software.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm dark:text-white">{item.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartHomeArchitecture;
