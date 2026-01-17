import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuTrash2, LuArrowRight, LuBriefcase, LuMessageSquare, LuClock } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer group relative"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="p-5 relative">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <span className="text-lg font-bold text-black">
              {getInitials(role)}
            </span>
          </motion.div>

          <motion.button
            className="p-2 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LuTrash2 className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors">
            {role}
          </h2>
          <p className="text-sm text-neutral-500 line-clamp-1">
            {topicsToFocus}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <motion.div
            className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700"
            whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            <LuBriefcase className="w-3 h-3" />
            {experience} {experience == 1 ? "Year" : "Years"}
          </motion.div>

          <motion.div
            className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700"
            whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            <LuMessageSquare className="w-3 h-3" />
            {questions} Q&A
          </motion.div>

          <motion.div
            className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700"
            whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            <LuClock className="w-3 h-3" />
            {lastUpdated}
          </motion.div>
        </div>

        {description && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
            {description}
          </p>
        )}

        <motion.div
          className="flex items-center gap-2 text-sm font-medium text-white"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          Start Practicing
          <motion.span
            animate={{ x: isHovered ? [0, 4, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <LuArrowRight className="w-4 h-4" />
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white via-neutral-400 to-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

export default SummaryCard;
