// src/components/ui/SectionTitle.tsx
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <motion.div 
      variants={fadeIn("up")}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-gray-400 font-mono text-sm">{subtitle}</p>}
      <div className="w-12 h-1 bg-[#e53935] mt-4" /> {/* Soft Red accent */}
    </motion.div>
  );
};

export default SectionTitle;