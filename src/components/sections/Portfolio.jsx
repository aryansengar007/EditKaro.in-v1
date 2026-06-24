import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, X, Clock, Tag, ChevronRight } from 'lucide-react';
import { projects, categories } from '../../lib/portfolioData';

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      layout
      className="masonry-item group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      data-cursor="play"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl overflow-hidden shadow-lg"
        style={{ boxShadow: hovered ? `0 24px 60px ${project.colors[0]}33` : '0 4px 20px rgba(0,0,0,0.08)' }}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ height: project.featured ? '260px' : '200px' }}>
          {/* Gradient placeholder */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${project.colors[0]} 0%, ${project.colors[1]} 100%)` }} />

          {/* Overlay pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: project.featured ? '64px' : '48px', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.2))' }}>{project.icon}</span>
          </div>

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(30,27,75,0.5)', backdropFilter: 'blur(4px)' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.6)' }}>
              <Play size={24} className="fill-white text-white" style={{ transform: 'translateX(2px)' }} />
            </div>
          </motion.div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 glass px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <Clock size={10} style={{ color: '#6C63FF' }} />
            <span className="text-[10px] font-mono-custom" style={{ fontFamily: 'DM Mono, monospace', color: '#1E1B4B' }}>{project.duration}</span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-white text-[10px] font-display font-bold uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #3B82F6)' }}>
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-display font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: `${project.colors[0]}18`, color: project.colors[0] }}>
              {project.category}
            </span>
          </div>
          <h3 className="font-display font-bold text-base mb-1.5" style={{ color: '#1E1B4B' }}>{project.title}</h3>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#1E1B4B', opacity: 0.55 }}>{project.desc}</p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold"
            style={{ color: project.colors[0] }}>
            View Project <ChevronRight size={12} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VideoModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[50000] flex items-center justify-center p-4 md:p-8"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(30,27,75,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: '#F8F7FF' }}
      >
        {/* Video area */}
        <div className="relative" style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})` }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span style={{ fontSize: 80 }}>{project.icon}</span>
            <div className="glass px-6 py-3 rounded-2xl text-center">
              <p className="font-display font-semibold text-sm" style={{ color: '#1E1B4B' }}>Video Placeholder</p>
              <p className="text-xs opacity-50 mt-0.5">Replace with actual video embed</p>
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center glass hover:scale-110 transition-transform"
            style={{ border: '1px solid rgba(255,255,255,0.4)' }}
          >
            <X size={18} style={{ color: '#1E1B4B' }} />
          </button>
          {/* Duration */}
          <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Clock size={12} style={{ color: '#6C63FF' }} />
            <span className="text-xs font-mono-custom" style={{ fontFamily: 'DM Mono, monospace' }}>{project.duration}</span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3"
                style={{ background: `${project.colors[0]}15`, color: project.colors[0] }}>
                <Tag size={10} /> {project.category}
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: '#1E1B4B' }}>{project.title}</h2>
            </div>
            {project.featured && (
              <span className="shrink-0 text-xs font-display font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #3B82F6)' }}>
                Featured
              </span>
            )}
          </div>
          <p className="text-base leading-relaxed" style={{ color: '#1E1B4B', opacity: 0.65 }}>{project.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" ref={ref} className="py-32 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #EEEAF8 50%, #F8F7FF 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: '#6C63FF' }} />
          <span className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: '#6C63FF', fontFamily: 'DM Mono, monospace' }}>
            Our Portfolio
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#1E1B4B', lineHeight: 1.05 }}
          >
            Work That<br />
            <span className="gradient-text">Makes Noise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: '#1E1B4B', opacity: 0.5 }}
          >
            Swipe through {projects.length} projects spanning every format, style, and platform.
          </motion.p>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap gap-2.5 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-300"
              style={activeCategory === cat ? {
                background: 'linear-gradient(135deg, #6C63FF, #3B82F6)',
                color: 'white',
                boxShadow: '0 4px 16px rgba(108,99,255,0.3)',
              } : {
                background: 'rgba(255,255,255,0.7)',
                color: '#1E1B4B',
                border: '1px solid rgba(108,99,255,0.15)',
              }}
            >
              {cat}
              {cat === 'All' && (
                <span className="ml-1.5 opacity-50">({projects.length})</span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} className="masonry-grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={setSelectedProject} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
