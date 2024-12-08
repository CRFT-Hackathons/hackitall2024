import { motion } from "framer-motion";
import React from "react";

interface AnimatedIconProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  activeColor?: string;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  isActive,
  onClick,
  activeColor = "text-blue-500",
  className = "",
}) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className} ${
        isActive ? activeColor : "text-muted-foreground"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isActive
          ? {
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0],
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      {icon}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      )}
    </motion.div>
  );
};
