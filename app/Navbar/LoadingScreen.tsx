"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="flex" variants={textVariants}>
            {"Achei!".split("").map((letter, index) => (
              <motion.span key={index} className="text-6xl font-bold text-blue" variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

