// src/App.tsx
import React from "react";
import Hero from "./sections/Hero";
import GithubStats from "./sections/GithubStats";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects"; // Anggap Projects.tsx dari kode di prompt sebelumnya

const App: React.FC = () => {
  return (
    <main className="bg-dark text-light font-sans selection:bg-primary selection:text-white">
      <Hero />
      <GithubStats />
      <Skills />
      <Projects />
    </main>
  );
};

export default App;