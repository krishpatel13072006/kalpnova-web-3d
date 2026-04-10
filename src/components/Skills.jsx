import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "After Effects", 
  "Illustrator", 
  "Photoshop", 
  "Figma", 
  "Web Design", 
  "Blender", 
  "3D Visualization", 
  "Branding"
];

const Skills = ({ className = "" }) => {
  return (
    <div className={`mt-20 ${className}`}>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm text-white/50 mb-6 text-center"
      >
        Core Skills & Expertise
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="px-5 py-2 rounded-full flex items-center justify-center
            bg-white/5 border border-white/10 backdrop-blur-sm
            hover:border-orange-500/50 transition-colors"
          >
            <span className="text-sm font-medium text-white/80">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
