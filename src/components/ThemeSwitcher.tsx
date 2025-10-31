"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer focus:outline-none"
      style={{ backgroundColor: darkMode ? "var(--primary)" : "var(--secondary)" }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{ x: darkMode ? "100%" : "0%", translateX: darkMode ? "-100%" : "0%" }}
      />
      <span className="absolute left-2 text-xs font-bold" style={{ color: darkMode ? "var(--background)" : "var(--foreground)" }}>
        {darkMode ? "🌙" : "☀️"}
      </span>
    </motion.button>
  );
};

export default ThemeSwitcher;
