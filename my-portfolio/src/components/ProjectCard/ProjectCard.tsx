import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects';
import { useViewMode } from '../../context/viewModeHooks';
import { getCardHover } from '../../design/motion';
import clsx from 'clsx';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { mode } = useViewMode();
  const hoverVariants = getCardHover(mode);

  const isInternalLink = project.link?.startsWith('/');

  return (
    <motion.article
      variants={hoverVariants}
      whileHover="hover"
      className={clsx(
        "group relative flex flex-col h-full overflow-hidden border-2 transition-colors",
        {
          "bg-white border-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]": mode !== 'terminal', // Arcade style
          "bg-black border-green-500 rounded-sm shadow-none": mode === 'terminal', // Terminal style
        }
      )}
    >
      {/* Arcade Decorative Corner Pixel */}
      {mode !== 'terminal' && (
        <div className="absolute top-0 right-0 p-1">
          <div className="w-2 h-2 bg-yellow-400" />
        </div>
      )}

      {/* Hero Image (or Placeholder) */}
      <div className={clsx("h-40 w-full bg-gray-200 relative overflow-hidden", { "grayscale": mode === 'terminal' })}>
         {project.hero ? (
           <img src={project.hero} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
         ) : (
           <div className="w-full h-full flex items-center justify-center text-4xl select-none opacity-20 font-bold">
             {project.title.charAt(0)}
           </div>
         )}
          {project.status && (
            <div className="absolute top-2 left-2 z-10">
              <span className={clsx("px-2 py-0.5 text-[10px] font-black uppercase rounded shadow-sm", {
                "bg-green-500 text-white": project.status === 'Completed',
                "bg-yellow-400 text-black": project.status !== 'Completed',
              })}>
                {project.status}
              </span>
            </div>
          )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className={clsx("text-lg font-bold mb-2 uppercase tracking-tight", {
          "font-sans text-gray-800": mode !== 'terminal',
          "font-mono text-green-400": mode === 'terminal'
        })}>
          {project.title}
        </h3>
        
        <p className={clsx("text-sm flex-1 mb-4", {
          "text-gray-600 font-sans": mode !== 'terminal',
          "text-green-500/80 font-mono text-xs": mode === 'terminal'
        })}>
          {project.summary}
        </p>

        {project.features && project.features.length > 0 && mode !== 'terminal' && (
          <ul className="mb-4 space-y-1">
            {project.features.map((feature, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
                <i className="fas fa-check text-[10px] text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span 
              key={tag}
              className={clsx("px-2 py-1 text-[10px] font-bold uppercase", {
                "bg-yellow-100 text-yellow-800 rounded": mode !== 'terminal',
                "border border-green-500/50 text-green-400": mode === 'terminal'
              })}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-3">
           <a 
             href={project.githubUrl || 'https://github.com/mabroukaymen1'} 
             target="_blank" 
             rel="noopener noreferrer"
             className={clsx("flex items-center justify-center gap-2 py-2 text-[10px] font-bold transition-all", {
               "bg-gray-800 text-white hover:bg-black rounded shadow-sm": mode !== 'terminal',
               "text-green-500/70 border border-green-500/30 hover:bg-green-500/10": mode === 'terminal'
             })}
           >
             <i className="fab fa-github" />
             {mode === 'terminal' ? 'GO_SRC' : 'VIEW CODE'}
           </a>
           {isInternalLink ? (
             <Link 
               to={project.link || '#'} 
               className={clsx("flex items-center justify-center gap-2 py-2 text-[10px] font-bold transition-all", {
                 "bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-1 shadow-sm rounded": mode !== 'terminal',
                 "text-green-500 hover:bg-green-500 hover:text-black border border-green-500": mode === 'terminal'
               })}
             >
               <i className="fas fa-external-link-alt" />
               {mode === 'terminal' ? 'EXECUTE' : 'DETAILS'}
             </Link>
           ) : (
             <a 
               href={project.link || '#'} 
               target="_blank" 
               rel="noopener noreferrer"
               className={clsx("flex items-center justify-center gap-2 py-2 text-[10px] font-bold transition-all", {
                 "bg-indigo-600 text-white hover:bg-indigo-700 active:translate-y-1 shadow-sm rounded": mode !== 'terminal',
                 "text-green-500 hover:bg-green-500 hover:text-black border border-green-500": mode === 'terminal'
               })}
             >
               <i className="fas fa-external-link-alt" />
               {mode === 'terminal' ? 'EXECUTE' : 'DETAILS'}
             </a>
           )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
