import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../../utils/assets';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useViewMode } from '../../context/viewModeHooks';
import { containerStagger, getFadeInUp } from '../../design/motion';
import clsx from 'clsx';
import emailjs from '@emailjs/browser';

const ArcadeLayout: React.FC = () => {
  const { mode } = useViewMode();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    project_type: 'Mobile Development',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // These will be configured by the user in EmailJS dashboard
      const result = await emailjs.send(
        'service_s3acqz5', // Replace with your Service ID
        'template_4tkd0ew', // Replace with your Template ID
        {
          from_name: `${formData.first_name} ${formData.last_name}`,
          from_email: formData.email,
          project_type: formData.project_type,
          message: formData.message,
          reply_to: formData.email,
        },
        'PVDbTLZzARzxSd4Hn' // Replace with your Public Key
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          project_type: 'Mobile Development',
          message: ''
        });
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
    }
  };

  return (
    <section 
      className={clsx(
        "w-full h-full p-4 md:p-8 overflow-y-auto scrollbar-hide",
        {
          "bg-[#F6ECD7] dark:bg-gray-900": mode !== 'terminal',
          "bg-transparent text-green-500": mode === 'terminal'
        }
      )}
    >
      <motion.div
        variants={containerStagger(mode)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto space-y-16"
      >
        {/* Hero / About Section - Only show if not exclusively terminal (where terminal has this info) */}
        {mode !== 'terminal' && (
          <header id="about" className="space-y-6 pt-20">
            <div className="space-y-2">
              <span className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Front-End Developer & UI Designer
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                Aymen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Mabrouk</span>
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 font-medium">
                Passionate about creating mobile applications and integrating IoT technologies for real-world impact. 
                I build innovative solutions that bridge the gap between hardware and software.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={getAssetUrl('enresume.pdf')} 
                  download="Aymen_Mabrouk_Resume_EN.pdf"
                  className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <i className="fas fa-file-pdf" /> EN RESUME
                </a>
                <a 
                  href={getAssetUrl('frresumeaymen01.pdf')} 
                  download="Aymen_Mabrouk_Resume_FR.pdf"
                  className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <i className="fas fa-file-pdf" /> FR RESUME
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Specialization</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Flutter & IoT Specialist</span>
               </div>
               <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Location</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Monastir, Tunisia</span>
               </div>
            </div>
          </header>
        )}

        {/* Detailed About Text - Only arcade */}
        {mode !== 'terminal' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                <img 
                  src={getAssetUrl('image/profile.png')} 
                  alt="Aymen Mabrouk" 
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto transform group-hover:-rotate-1 transition-transform"
                />
                <div className="absolute -bottom-4 -right-4 flex flex-col gap-2">
                   <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">Flutter Developer</span>
                   <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">IoT Specialist</span>
                </div>
             </div>
             <div className="space-y-6">
                <div className="space-y-4">
                   <h3 className="text-2xl font-black uppercase text-gray-900 dark:text-white flex items-center gap-3">
                      <i className="fas fa-user-astronaut text-purple-600" />
                      Who I Am
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      I am a computer engineer, graduated from the Higher Institute of Computer Science in Mahdia, specializing in IoT and Embedded Systems. 
                      Passionate about technology, I am a Flutter developer focused on creating and optimizing mobile applications.
                   </p>
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-black uppercase text-gray-900 dark:text-white flex items-center gap-3">
                      <i className="fas fa-lightbulb text-yellow-500" />
                      My Mission
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      My expertise lies in integrating real-time messaging and IoT solutions. I am committed to leveraging the latest technologies to deliver 
                      innovative projects. I seek opportunities to develop impactful, user-centric solutions.
                   </p>
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-black uppercase text-gray-900 dark:text-white flex items-center gap-3">
                      <i className="fas fa-code text-indigo-500" />
                      Philosophy
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      With a strong foundation in programming and a creative mindset, I aim to engineer applications and systems that make a difference in people's lives through cutting-edge technology solutions.
                   </p>
                </div>
             </div>
          </section>
        )}

        {/* Languages grid - Only arcade */}
        {mode !== 'terminal' && (
          <section className="space-y-6">
             <h3 className="text-2xl font-black uppercase text-gray-900 dark:text-white flex items-center gap-3">
                <i className="fas fa-globe text-blue-500" />
                Languages
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Arabic', level: 'Native', percent: '100%' },
                  { name: 'French', level: 'Intermediate', percent: '70%' },
                  { name: 'English', level: 'B1 - Intermediate', percent: '65%' },
                  { name: 'German', level: 'Beginner', percent: '25%' },
                ].map(lang => (
                  <div key={lang.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800 dark:text-gray-200">{lang.name}</span>
                      <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">{lang.level}</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
                       <div className="h-full bg-indigo-500 rounded-full" style={{ width: lang.percent }} />
                    </div>
                  </div>
                ))}
             </div>
          </section>
        )}

        {/* Skills Section - Only show if not terminal */}
        {mode !== 'terminal' && (
          <section id="skills" className="space-y-8 pt-20">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">Expertise</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase text-gray-900 dark:text-white flex items-center gap-3">
                <i className="fas fa-tools text-orange-500" />
                My Skills
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Flutter', level: '70%', color: 'bg-blue-500', cat: 'Mobile', desc: 'Cross-platform apps, UI/UX optimization' },
                { name: 'Node.js', level: '65%', color: 'bg-green-600', cat: 'Backend', desc: 'REST APIs, Real-time services' },
                { name: 'Python', level: '65%', color: 'bg-yellow-500', cat: 'ML/Backend', desc: 'Automation, AI models, Data' },
                { name: 'Embedded C', level: '60%', color: 'bg-gray-700', cat: 'Systems', desc: 'Microcontrollers, Low-level optimization' },
                { name: 'Machine Learning', level: '55%', color: 'bg-purple-500', cat: 'AI', desc: 'Supervised learning, Computer vision' },
                { name: 'MongoDB', level: '60%', color: 'bg-green-700', cat: 'Database', desc: 'NoSQL architecture, Scalability' },
                { name: 'Firebase', level: '50%', color: 'bg-orange-500', cat: 'Backend', desc: 'Auth, Real-time DB, Firestore' },
                { name: 'Scrum', level: '80%', color: 'bg-red-500', cat: 'Agile', desc: 'Team leadership, Agile methodologies' },
                { name: 'HTML/CSS/JS', level: '40%', color: 'bg-orange-600', cat: 'Web', desc: 'Modern responsive designs' },
                { name: 'Java', level: '60%', color: 'bg-red-700', cat: 'Backend', desc: 'Enterprise logic, Android core' },
                { name: 'Raspberry Pi/Linux', level: '50%', color: 'bg-pink-600', cat: 'Systems', desc: 'OS configuration, Gpio control' },
                { name: 'Docker', level: '40%', color: 'bg-blue-400', cat: 'Tools', desc: 'Containerization, Deployment' },
              ].map(skill => (
                <div key={skill.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 group hover:-translate-y-1 transition-transform">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-tighter text-gray-500 group-hover:text-indigo-600 transition-colors">{skill.name}</span>
                    <span className="text-[10px] font-mono text-gray-400">{skill.level}</span>
                  </div>
                  <div className="text-[8px] font-bold text-indigo-400 uppercase mb-2">{skill.cat}</div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-3 leading-tight h-8 overflow-hidden line-clamp-2">{skill.desc}</p>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={clsx("h-full rounded-full", skill.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <div id="projects" className="pt-20">
          <div className="mb-8">
             <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-2 block">Work</span>
             <h2 className={clsx("text-3xl md:text-5xl font-black uppercase mb-2", {
               "text-gray-900 dark:text-white font-sans tracking-tighter": mode !== 'terminal',
               "text-green-500 font-mono tracking-widest text-xl": mode === 'terminal'
             })}>
               {mode === 'terminal' ? '> SELECT_MISSION' : 'Featured Work'}
             </h2>
             <div className={clsx("h-2 w-24", {
               "bg-yellow-400": mode !== 'terminal',
               "bg-green-500/50": mode === 'terminal'
             })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div key={project.id} variants={getFadeInUp(mode)} layout>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* FAQ Section - Only arcade */}
        {mode !== 'terminal' && (
          <section id="faq" className="space-y-8 pt-20">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] block">Questions</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-gray-500 max-w-xl mx-auto uppercase text-xs font-bold tracking-widest">Answers to common queries about my workflow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: 'What technologies do you specialize in?', a: 'I specialize in Flutter for mobile development, IoT technologies (ESP32, Raspberry Pi, LoRa), and embedded systems programming.' },
                { q: 'How long does a typical project take?', a: 'Timelines vary: 4-6 weeks for simple apps, 3-6 months for complex IoT systems with custom hardware.' },
                { q: 'Do you work with international clients?', a: 'Yes, I regularly collaborate with clients globally and am comfortable with remote workflows across time zones.' },
                { q: 'What is your development process?', a: 'I follow an agile process: requirements gathering, prototyping, iterative development with testing, and final deployment.' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg underline decoration-yellow-400 decoration-2 underline-offset-4">{item.q}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section - Only arcade */}
        {mode !== 'terminal' && (
          <section id="contact" className="space-y-12 py-12 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Get In Touch</h2>
              <p className="text-gray-500 max-w-xl mx-auto uppercase text-xs font-bold tracking-widest">Let's build something extraordinary together</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                         <i className="fas fa-envelope text-xl" />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 dark:text-white uppercase text-sm">Email</h4>
                         <p className="text-gray-600 dark:text-gray-400">aymenmabrouk803@gmail.com</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                         <i className="fas fa-phone text-xl" />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 dark:text-white uppercase text-sm">Phone</h4>
                         <p className="text-gray-600 dark:text-gray-400">+216 94-231-159</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                         <i className="fas fa-map-marker-alt text-xl" />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 dark:text-white uppercase text-sm">Location</h4>
                         <p className="text-gray-600 dark:text-gray-400">Monastir, Tunisia</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-gray-900 rounded-3xl text-white space-y-6">
                   <h4 className="text-xl font-black uppercase tracking-tight">Connect with me</h4>
                   <div className="flex gap-4">
                      <a href="https://github.com/mabroukaymen1" target="_blank" rel="noopener noreferrer" className="flex-1 p-4 bg-gray-800 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors">
                         <i className="fab fa-github text-2xl" />
                         <span className="font-bold uppercase text-xs tracking-widest">GitHub</span>
                      </a>
                      <a href="https://www.linkedin.com/in/aymen-mabrouk-1a06061ab/" target="_blank" rel="noopener noreferrer" className="flex-1 p-4 bg-blue-600 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-500 transition-colors">
                         <i className="fab fa-linkedin text-xl" />
                         <span className="font-bold uppercase text-xs tracking-widest">LinkedIn</span>
                      </a>
                   </div>
                   <div className="pt-4 flex items-center gap-3 text-green-400 text-xs font-bold uppercase tracking-widest">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Available for new projects
                   </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleContactSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">First Name</label>
                      <input 
                        type="text" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                        className="w-full p-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        placeholder="Aymen" 
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Last Name</label>
                      <input 
                        type="text" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                        className="w-full p-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                        placeholder="Mabrouk" 
                      />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Email Address</label>
                   <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                    placeholder="aymen@example.com" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Project Type</label>
                   <select 
                    name="project_type"
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white appearance-none"
                   >
                      <option>Mobile Development</option>
                      <option>IoT Solution</option>
                      <option>Web Development</option>
                      <option>Embedded System</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Message</label>
                   <textarea 
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white min-h-[120px]" 
                    placeholder="Tell me about your project..." 
                   />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className={clsx(
                    "w-full p-4 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none",
                    status === 'sending' ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98]"
                  )}
                >
                  {status === 'sending' ? 'Sending Mission Brief...' : 'Send Mission Brief'}
                </button>

                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-center font-bold text-xs uppercase tracking-widest mt-2"
                  >
                    Successfully Sent! I'll be in touch soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-center font-bold text-xs uppercase tracking-widest mt-2"
                  >
                    Error sending message. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-12 border-t border-gray-200 dark:border-gray-800 pb-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          © 2025 Aymen Mabrouk. All rights reserved.
        </footer>
      </motion.div>

      {/* Scroll Progress Bar */}
      {mode !== 'terminal' && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-50 rounded-r-full"
          style={{ scaleX }}
        />
      )}

      {/* Back to Top Button */}
      {mode !== 'terminal' && (
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl z-40 hover:scale-110 active:scale-95 transition-transform"
              aria-label="Back to Top"
            >
              <i className="fas fa-arrow-up" />
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default ArcadeLayout;
