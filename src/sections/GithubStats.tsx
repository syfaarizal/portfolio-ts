// src/sections/GithubStats.tsx
import React from "react";
import { motion } from "framer-motion";
import { useGithubStats } from "../hooks/useGithubStats";
import { staggerContainer, fadeIn } from "../utils/motion";
import type { StatCardProps } from "../types";

// Sub-komponen dengan Props Interface
const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <motion.div
    variants={fadeIn("up")}
    className="p-8 border border-gray-800 bg-[#111] hover:border-primary transition-colors flex flex-col items-center justify-center"
  >
    <h3 className="text-4xl font-bold text-light mb-2">{value}+</h3>
    <p className="text-gray-500 uppercase tracking-widest text-sm">{label}</p>
  </motion.div>
);

const GithubStats: React.FC = () => {
  const { stats, loading } = useGithubStats("kaishiscd"); // Ganti dengan username Anda

  if (loading) return null;

  return (
    <section className="py-24 bg-dark text-light border-y border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Open Source Impact</h2>
          <p className="text-gray-500 mt-2">Data pulled live from GitHub API</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard label="Public Repos" value={stats.repos} />
          <StatCard label="Followers" value={stats.followers} />
          <StatCard label="Contributions" value={stats.contributions} />
        </motion.div>
      </div>
    </section>
  );
};

export default GithubStats;