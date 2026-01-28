import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { ProjectType } from "../types";

// Project data dengan detail lebih lengkap
const projectData: ProjectType[] = [
  { 
    id: 1, 
    title: "E-Commerce Dashboard", 
    category: "React", 
    tech: ["React", "TypeScript", "Tailwind", "Redux Toolkit", "Chart.js"],
    description: "A modern admin dashboard for managing e-commerce operations with real-time analytics",
    year: "2024"
  },
  { 
    id: 2, 
    title: "Fintech Landing Page", 
    category: "UI/UX", 
    tech: ["Next.js", "Framer Motion", "Tailwind", "GSAP"],
    description: "High-performance landing page with smooth animations and optimized conversions",
    year: "2023"
  },
  { 
    id: 3, 
    title: "Task Manager CLI", 
    category: "Open Source", 
    tech: ["Node.js", "TypeScript", "Inquirer.js", "Chalk"],
    description: "Interactive command-line interface for task management with colorful output",
    year: "2023"
  },
  { 
    id: 4, 
    title: "Real-Time Chat App", 
    category: "React", 
    tech: ["React", "Socket.io", "MongoDB", "Express", "JWT"],
    description: "Full-stack chat application with real-time messaging and user authentication",
    year: "2024"
  },
  { 
    id: 5, 
    title: "Portfolio Website", 
    category: "UI/UX", 
    tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    description: "3D interactive portfolio with smooth animations and modern design",
    year: "2024"
  },
  { 
    id: 6, 
    title: "API Documentation Generator", 
    category: "Open Source", 
    tech: ["TypeScript", "Swagger", "Express", "Markdown"],
    description: "Automated API documentation generator with interactive playground",
    year: "2023"
  },
];

type CategoryType = ProjectType["category"];
const filters: CategoryType[] = ["All", "React", "UI/UX", "Open Source"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryType>("All");
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth parallax untuk background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const filteredProjects = projectData.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="relative py-32 bg-[#0d0d0d] text-light overflow-hidden"
    >
      {/* Subtle background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        {/* Grid dots pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A curated selection of my recent work showcasing modern web development practices
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-primary to-accent text-light shadow-lg shadow-primary/20'
                  : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800/50 hover:text-light'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {filter}
              {activeFilter === filter && (
                <motion.span
                  className="block h-0.5 bg-light mt-1"
                  layoutId="underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/20 
                           backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 
                           hover:border-primary/30 transition-all duration-300"
                >
                  {/* Project header */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <motion.h3 
                        className="text-xl font-semibold text-light group-hover:text-primary transition-colors duration-300"
                        whileHover={{ x: 2 }}
                      >
                        {project.title}
                      </motion.h3>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>
                    
                    <motion.p 
                      className="text-gray-400 mb-6 text-sm leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Category badge */}
                    <motion.div
                      className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 
                               border border-primary/20 text-primary text-xs font-medium mb-6"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.div>
                  </div>

                  {/* Tech stack */}
                  <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: techIndex * 0.05 + index * 0.05 
                          }}
                          className="text-xs bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 
                                   px-3 py-1.5 rounded-lg transition-colors duration-300 cursor-default"
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(229, 57, 53, 0.2)"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />

                  {/* Bottom border animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🚧</div>
            <h3 className="text-xl text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try selecting a different filter</p>
          </motion.div>
        )}

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 
                     text-primary rounded-lg font-medium hover:border-primary/40 hover:from-primary/20 
                     hover:to-accent/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects →
          </motion.button>
        </motion.div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 opacity-50"
        style={{ scaleX: scrollYProgress }}
      >
        <div className="text-xs text-gray-500 text-center mb-2">Projects</div>
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: "100%" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Projects;