// src/sections/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-dark text-light overflow-hidden">
      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          variants={fadeIn("down", 0.1)}
          initial="hidden"
          animate="show"
          className="text-primary font-mono tracking-widest mb-4"
        >
          &lt;HELLO_WORLD /&gt;
        </motion.p>
        
        <motion.h1
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Building Digital <br />
          <span className="text-primary">Experiences.</span>
        </motion.h1>

        <motion.p
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          className="text-gray-400 max-w-xl mx-auto mb-8 text-lg"
        >
          Senior Front-End Engineer & UI Developer. Crafting pixel-perfect, 
          accessible, and highly performant web applications.
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          animate="show"
          className="flex gap-4 justify-center"
        >
          <button className="px-8 py-3 bg-primary hover:bg-accent text-light font-bold transition-all duration-300 transform hover:scale-105">
            View My Work
          </button>
          <button className="px-8 py-3 border border-gray-600 hover:border-primary text-light transition-all duration-300">
            Contact Me
          </button>
        </motion.div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default Hero;