// src/sections/Contact.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import { fadeIn } from "../utils/motion";
import { sendContactMessage } from "../utils/api";

// 1. Zod Schema untuk Validasi
const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer type dari Schema
type ContactFormInputs = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    const success = await sendContactMessage(data);
    if (success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle title="Let's Connect" subtitle="Got a question or proposal? Drop a line." />

        <motion.form 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">_name</label>
              <input 
                {...register("name")} 
                className="w-full bg-[#111] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#e53935] transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">_email</label>
              <input 
                {...register("email")} 
                className="w-full bg-[#111] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#e53935] transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-mono">_message</label>
            <textarea 
              {...register("message")} 
              rows={5}
              className="w-full bg-[#111] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#e53935] transition-colors"
              placeholder="Tell me about your project..."
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {isSuccess && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-sm mt-4">
              Message sent successfully! I'll get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;