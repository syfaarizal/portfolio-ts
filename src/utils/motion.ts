// src/utils/motion.ts
import type { Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

export const fadeIn = (direction: Direction = "up", delay: number = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      duration: 1.2,
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};