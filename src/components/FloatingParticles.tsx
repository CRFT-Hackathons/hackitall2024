import { motion } from "framer-motion";
import React from "react";

interface FloatingParticlesProps {
  isVisible: boolean;
  color?: string;
  count?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  isVisible,
  color = "#3B82F6",
  count = 6,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0, y: 0, x: 0 }}
          animate={{
            scale: [1, 0],
            y: [-20 - Math.random() * 20, -60 - Math.random() * 40],
            x: [-20 + Math.random() * 40, -30 + Math.random() * 60],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: Math.random() * 0.2,
          }}
        />
      ))}
    </div>
  );
};
