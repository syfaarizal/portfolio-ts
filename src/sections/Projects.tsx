// src/sections/Projects.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectType } from "../types";

// Gunakan tipe data langsung dari interface
const projectData: ProjectType[] = [
  { id: 1, title: "E-Commerce Dashboard", category: "React", tech: ["React", "Tailwind", "Redux"] },
  { id: 2, title: "Fintech Landing Page", category: "UI/UX", tech: ["Next.js", "Framer Motion"] },
  { id: 3, title: "Task Manager CLI", category: "Open Source", tech: ["Node.js", "TypeScript"] },
];

// Ekstrak tipe union dari category
type CategoryType = ProjectType["category"];
const filters: CategoryType[] = ["All", "React", "UI/UX", "Open Source"];

const Projects = () => {
  // State sekarang terikat pada tipe CategoryType
  const [activeFilter, setActiveFilter] = useState<CategoryType>("All");

  const filteredProjects = projectData.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <section className="py-24 bg-[#0d0d0d] text-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10">Featured Projects</h2>

        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              // ... styling class tetap sama seperti sebelumnya
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} className="bg-[#1a1a1a] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.category}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-sm bg-[#2a2a2a] px-3 py-1 rounded">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;