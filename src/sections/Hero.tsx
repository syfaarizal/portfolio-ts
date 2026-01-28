// src/sections/Hero.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const experienceTexts = ["Experiences", "Solutions", "Interfaces", "Dreams"];

  // Mouse tracking untuk efek parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotating text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % experienceTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen bg-dark text-light overflow-hidden">
      {/* Background elements dengan efek parallax */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: -mousePosition.x * 0.3,
          y: -mousePosition.y * 0.3,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, `-${Math.random() * 100 + 50}px`],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Animated code tag with typing effect */}
        <motion.div
          variants={fadeIn("down", 0.1)}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <div className="inline-block">
            <div className="text-primary font-mono tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="text-accent">{"<"}</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                HELLO_WORLD
              </motion.span>
              <span className="text-accent">{"/>"}</span>
            </div>
            {/* Blinking cursor */}
            <motion.div
              className="inline-block w-[2px] h-6 bg-accent ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        {/* Main heading with enhanced animation */}
        <div className="relative">
          <motion.h1
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="relative">
              Building
              <motion.span
                className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </span>
            <br />
            <span className="relative inline-block">
              Digital{" "}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.span
                key={textIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative inline-block min-w-[200px]"
              >
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                  {experienceTexts[textIndex]}
                </span>
              </motion.span>
            </span>
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto my-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </div>

        {/* Subtitle with enhanced typography */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <motion.p
            animate={{
              scale: isHovered ? 1.02 : 1,
              textShadow: isHovered 
                ? "0 0 20px rgba(229, 57, 53, 0.5)" 
                : "none"
            }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8 text-xl md:text-2xl leading-relaxed p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10"
          >
            <span className="text-primary font-semibold">Senior Front-End Engineer</span> &{" "}
            <span className="text-accent font-semibold">UI Developer</span>. 
            <br />
            Crafting{" "}
            <span className="relative">
              <span className="text-primary">pixel-perfect</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              />
            </span>
            ,{" "}
            <span className="relative">
              <span className="text-accent">accessible</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              />
            </span>
            , and{" "}
            <span className="relative">
              <span className="text-primary">highly performant</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              />
            </span>{" "}
            web applications.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA buttons with hover effects */}
        <motion.div
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(229, 57, 53, 0.4)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 bg-gradient-to-r from-primary to-accent text-light font-bold text-lg rounded-xl transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* Arrow icon */}
            <motion.span
              className="ml-3 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              y: -5,
              borderColor: "#e53935",
              boxShadow: "0 10px 20px rgba(229, 57, 53, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 border-2 border-gray-600 hover:border-primary text-light font-bold text-lg rounded-xl transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* Email icon animation */}
            <motion.span
              className="ml-3 inline-block"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✉
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
              animate={{ 
                borderColor: ["#4a4a4a", "#e53935", "#4a4a4a"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced background blur effects */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  );
};

export default Hero;