import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => {
  return (
    <section className="py-24 bg-dark text-light border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-8"
        >
          <motion.div variants={fadeIn("up", 0.1)}>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm a passionate developer with a keen interest in building beautiful and functional digital experiences. With expertise in modern web technologies, I focus on creating responsive, performant applications that solve real-world problems.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.
            </p>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.3)} className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border border-gray-800 bg-[#111] hover:border-primary transition-colors">
              <h3 className="text-xl font-bold text-primary mb-2">Frontend</h3>
              <p className="text-gray-500 text-sm">React, TypeScript, Tailwind CSS, Framer Motion</p>
            </div>
            <div className="p-6 border border-gray-800 bg-[#111] hover:border-primary transition-colors">
              <h3 className="text-xl font-bold text-primary mb-2">Tools</h3>
              <p className="text-gray-500 text-sm">Vite, Git, VS Code, NPM, ESLint</p>
            </div>
            <div className="p-6 border border-gray-800 bg-[#111] hover:border-primary transition-colors">
              <h3 className="text-xl font-bold text-primary mb-2">Learning</h3>
              <p className="text-gray-500 text-sm">Always exploring new frameworks and best practices</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;