// src/components/ui/Button.tsx
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className = "", ...props }) => {
  const baseStyles = "px-6 py-3 font-medium tracking-wide transition-all duration-300 transform rounded-sm";
  const variants = {
    primary: "bg-[#e53935] hover:bg-[#ff5252] text-white shadow-lg shadow-red-500/20", // Soft Red
    outline: "border border-gray-600 hover:border-[#e53935] text-white bg-transparent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;