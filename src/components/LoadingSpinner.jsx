"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner({ fullScreen = true, message = "Loading..." }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-[60vh]" : "py-12"
      }`}
    >
      {/* Spinner */}
      <div className="relative w-14 h-14">
        {/* Outer ring */}
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          style={{ borderTopColor: "hsl(var(--primary))" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <motion.span
          className="absolute inset-2 rounded-full border-4 border-primary/10"
          style={{ borderBottomColor: "hsl(var(--primary))", opacity: 0.6 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        {/* Center dot */}
        <motion.span
          className="absolute inset-[18px] rounded-full bg-primary"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Message */}
      <motion.p
        className="text-sm font-medium text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {message}
      </motion.p>
    </div>
  );
}
