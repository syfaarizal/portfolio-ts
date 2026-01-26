// src/sections/Skills.tsx
import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";
import type { SkillGroupType } from "../types";

const skillsData: SkillGroupType[] = [
  {
    category: "Front-End",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "State Management & API",
    items: ["Redux Toolkit", "Zustand", "React Query", "GraphQL", "REST API"],
  },
  {
    category: "Tools & Testing",
    items: ["Git", "Webpack/Vite", "Jest", "Cypress", "Figma"],
  },
];

const Skills: React.FC = () => {
  return (
    <section className="py-24 bg-dark text-light">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up")}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Arsenal</h2>
          <div className="w-16 h-1 bg-primary" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {skillsData.map((skillGroup, index) => (
            <motion.div key={index} variants={fadeIn("up")}>
              <h3 className="text-xl font-mono text-primary mb-6">{skillGroup.category}</h3>
              <ul className="space-y-4">
                {skillGroup.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex items-center text-gray-400 hover:text-light hover:translate-x-2 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;