import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth parallax untuk background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="relative py-32 bg-dark text-light overflow-hidden"
    >
      {/* Subtle background elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        {/* Simple grid pattern */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gray-600 w-full"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gray-600 h-full"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Simple header dengan smooth animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.p
            className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Technologies and tools I specialize in for building modern web applications
          </motion.p>
        </motion.div>

        {/* Skill groups dengan staggered animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {skillsData.map((skillGroup, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn(index % 2 === 0 ? "left" : "right")}
              custom={index}
              className="relative"
            >
              {/* Category header */}
              <motion.h3 
                className="text-xl font-semibold text-primary mb-6 pb-4 relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {skillGroup.category}
                <motion.span
                  className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                />
              </motion.h3>
              
              {/* Skill list dengan smooth staggered items */}
              <ul className="space-y-3">
                {skillGroup.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1 + itemIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-400 hover:text-light 
                               transition-colors duration-300 group cursor-default"
                  >
                    <motion.span
                      className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mr-3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 + 0.1 }}
                    />
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="transition-all duration-300"
                    >
                      {item}
                    </motion.span>
                    
                    {/* Simple hover indicator */}
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100 text-primary"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Subtle background glow pada hover */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Simple stats indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-900/50 rounded-lg">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gray-400">
              <span className="text-primary font-medium">15+</span> technologies mastered
            </span>
          </div>
        </motion.div>
      </div>

      {/* Simple scroll progress indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full overflow-hidden z-50"
        style={{ scaleX: scrollYProgress }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: "100%" }}
        />
      </motion.div>
    </motion.section>
  );
};

export default Skills;