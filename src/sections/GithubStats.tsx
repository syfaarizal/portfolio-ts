import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useGithubStats } from "../hooks/useGithubStats";
import { staggerContainer } from "../utils/motion";
import type { StatCardProps } from "../types";

// Enhanced StatCard dengan animasi yang lebih kaya
const StatCard: React.FC<StatCardProps & { index: number }> = ({ label, value, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0.8,
        rotateY: index === 0 ? -20 : index === 2 ? 20 : 0
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateY: 0
      } : {}}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.2
      }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(229, 57, 53, 0.25)",
        borderColor: "#e53935"
      }}
      className="relative p-8 border-2 border-gray-800 bg-gradient-to-br from-[#111] to-[#0a0a0a] 
                 transition-all duration-300 flex flex-col items-center justify-center 
                 overflow-hidden group"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "100%" } : {}}
        transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
      />
      
      {/* Floating particles inside card */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * 200,
              y: Math.random() * 200,
              opacity: 0
            }}
            animate={isInView ? {
              y: [null, `-${Math.random() * 50 + 20}px`],
              opacity: [0, 0.6, 0]
            } : {}}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: i * 0.1 + index * 0.1,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ))}
      </div>

      {/* Counter animation */}
      <motion.h3
        className="text-5xl font-bold text-light mb-2 relative z-10"
        initial={{ textShadow: "0 0 0px rgba(229, 57, 53, 0)" }}
        animate={isInView ? { 
          textShadow: [
            "0 0 0px rgba(229, 57, 53, 0)",
            "0 0 20px rgba(229, 57, 53, 0.5)",
            "0 0 10px rgba(229, 57, 53, 0.2)"
          ]
        } : {}}
        transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
      >
        {value}
        <span className="text-primary">+</span>
      </motion.h3>

      <motion.p
        className="text-gray-400 uppercase tracking-widest text-sm relative z-10 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        {label}
      </motion.p>

      {/* Animated border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
      />
    </motion.div>
  );
};

const GithubStats: React.FC = () => {
  const { stats, loading } = useGithubStats("kaishiscd");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animasi parallax untuk background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Animasi untuk teks header
  const headerY = useTransform(scrollYProgress, [0, 0.3], ["50px", "0px"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  if (loading) {
    return (
      <section ref={sectionRef} className="py-24 bg-dark text-light border-y border-gray-800 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            Loading GitHub Stats...
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="relative py-32 bg-dark text-light border-y border-gray-800 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ y }}
      >
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gray-600"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: i * 0.05 }}
              style={{ top: `${i * 5}%` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gray-600"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1, delay: i * 0.05 }}
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Animated header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ letterSpacing: "0.5em" }}
            whileInView={{ letterSpacing: "0.1em" }}
            transition={{ duration: 1 }}
          >
            OPEN SOURCE IMPACT
          </motion.h2>
          
          <motion.div
            className="inline-block"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>

          <motion.p
            className="text-gray-400 mt-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Real-time data streamed directly from{" "}
            <span className="text-primary font-mono">GitHub API</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              ▮
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Animated stats grid dengan efek masuk dari samping */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="relative"
        >
          {/* Connecting lines between cards */}
          <motion.div
            className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-y-1/2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            style={{ scale }}
          >
            {[
              { label: "PUBLIC REPOS", value: stats.repos },
              { label: "FOLLOWERS", value: stats.followers },
              { label: "CONTRIBUTIONS", value: stats.contributions },
            ].map((stat, index) => (
              <div key={stat.label} className="relative">
                {/* Entry animation dari kanan/kiri */}
                <motion.div
                  initial={{ 
                    x: index === 0 ? -100 : index === 2 ? 100 : 0,
                    opacity: 0,
                    rotate: index === 0 ? -5 : index === 2 ? 5 : 0
                  }}
                  whileInView={{ 
                    x: 0, 
                    opacity: 1,
                    rotate: 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                    delay: index * 0.3
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <StatCard 
                    label={stat.label} 
                    value={stat.value} 
                    index={index}
                  />
                </motion.div>

                {/* Decorative element untuk setiap card */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-accent"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Live update indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-full">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-400">Live Data • Updates Every Hour</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 flex items-center justify-center z-50"
        style={{ scale: scrollYProgress }}
      >
        <div className="relative w-8 h-8">
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 border-2 border-gray-700 rounded-full" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default GithubStats;