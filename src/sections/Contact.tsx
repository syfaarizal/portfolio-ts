import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fadeIn } from "../utils/motion";
import { sendContactMessage } from "../utils/api";

// Zod Schema untuk Validasi
const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer type dari Schema
type ContactFormInputs = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth animations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const onSubmit = async (data: ContactFormInputs) => {
    const success = await sendContactMessage(data);
    if (success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const contactInfo = [
    { icon: "📧", label: "Email", value: "hello@kaishi.dev", action: "mailto:hello@kaishi.dev" },
    { icon: "💼", label: "LinkedIn", value: "/in/kaishi", action: "https://linkedin.com/in/kaishi" },
    { icon: "💻", label: "GitHub", value: "@kaishi", action: "https://github.com/kaishi" },
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="contact"
      style={{ opacity }}
      className="relative py-32 bg-[#050505] text-white overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Animated lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: "100%", x: "0%" }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
            style={{ top: `${20 + i * 10}%` }}
          />
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Got a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info cards */}
          <motion.div
            variants={fadeIn("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.action}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block group"
              >
                <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/20 
                              backdrop-blur-sm rounded-xl border border-gray-800 
                              hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered === index ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.span
                      className="text-2xl"
                      animate={{ 
                        rotate: isHovered === index ? [0, 10, -10, 0] : 0,
                        scale: isHovered === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {info.icon}
                    </motion.span>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-400 font-medium mb-1">{info.label}</h3>
                      <p className="text-light font-medium">{info.value}</p>
                    </div>
                    <motion.span
                      className="text-primary opacity-0 group-hover:opacity-100"
                      animate={{ x: isHovered === index ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={fadeIn("up")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-8 p-8 bg-gradient-to-br from-gray-900/50 to-gray-900/20 
                        backdrop-blur-sm rounded-xl border border-gray-800"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <label className="block text-sm text-gray-400 mb-3 font-mono tracking-wider">
                    _name
                  </label>
                  <div className="relative">
                    <input 
                      {...register("name")} 
                      className="w-full bg-gray-900/30 border border-gray-700 p-4 text-white 
                               focus:outline-none focus:border-primary rounded-lg transition-all duration-300
                               placeholder-gray-600"
                      placeholder="Enter your name"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <label className="block text-sm text-gray-400 mb-3 font-mono tracking-wider">
                    _email
                  </label>
                  <div className="relative">
                    <input 
                      {...register("email")} 
                      className="w-full bg-gray-900/30 border border-gray-700 p-4 text-white 
                               focus:outline-none focus:border-primary rounded-lg transition-all duration-300
                               placeholder-gray-600"
                      placeholder="your@email.com"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Message field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <label className="block text-sm text-gray-400 mb-3 font-mono tracking-wider">
                  _message
                </label>
                <div className="relative">
                  <textarea 
                    {...register("message")} 
                    rows={6}
                    className="w-full bg-gray-900/30 border border-gray-700 p-4 text-white 
                             focus:outline-none focus:border-primary rounded-lg transition-all duration-300
                             placeholder-gray-600 resize-none"
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0 }}
                    whileFocus={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {errors.message && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-2"
                  >
                    ⚠️ {errors.message.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white 
                           font-medium rounded-lg hover:shadow-xl hover:shadow-primary/20 
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                           relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Success message */}
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 
                             border border-green-500/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        ✓
                      </motion.div>
                      <div>
                        <p className="text-green-400 font-medium">Message sent successfully!</p>
                        <p className="text-green-400/70 text-sm mt-1">
                          I'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.form>

            {/* Form footer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-500 text-sm mt-6 text-center"
            >
              I typically respond within 24 hours. For urgent matters, please mention "URGENT" in your message.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ scaleX: scrollYProgress }}
      >
        <div className="text-xs text-gray-500 text-center mb-2">Contact</div>
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: "100%" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;