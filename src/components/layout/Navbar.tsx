// src/components/layout/Navbar.tsx
import React from "react";
import { motion } from "framer-motion";
import { useScroll } from "../../hooks/useScroll";

const navLinks = ["Home", "About", "Projects", "Contact"];

const Navbar: React.FC = () => {
  const isScrolled = useScroll();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold font-mono tracking-tighter">
          <span className="text-[#e53935]">&lt;</span>
          KaiShi
          <span className="text-[#e53935]">/&gt;</span>
        </div>
        
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a 
                href={`#${link.toLowerCase()}`} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;