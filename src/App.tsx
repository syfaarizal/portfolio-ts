import React from "react";

// Layout Components
import Navbar from "./components/layout/Navbar";

// Section Components
import Hero from "./sections/Hero";
import GithubStats from "./sections/GithubStats";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const App: React.FC = () => {
  return (
    // Wrapper utama dengan background gelap, teks terang, dan custom selection color (Soft Red)
    <div className="bg-[#050505] text-[#f5f5f5] font-sans selection:bg-[#e53935] selection:text-white min-h-screen">
      
      {/* Navbar di tingkat teratas agar tidak tertutup konten lain saat di-scroll */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        {/* Setiap section diberi ID (di dalam komponennya) untuk keperluan navigasi scroll dari Navbar */}
        <section id="home"><Hero /></section>
        <section id="stats"><GithubStats /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>

      {/* Footer Sederhana */}
      <footer className="py-8 text-center text-sm text-gray-600 border-t border-gray-900 bg-black">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-[#e53935] font-mono">KaiShi</span>. All rights reserved. 
          Built with React & Framer Motion.
        </p>
      </footer>
    </div>
  );
};

export default App;