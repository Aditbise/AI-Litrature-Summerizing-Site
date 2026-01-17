/* eslint-disable no-unused-vars */


import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles, LuMessageCircle } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";


const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  isLoading = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPinEffect, setShowPinEffect] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePin = useCallback(() => {
    if (isLoading) return; // Prevent multiple clicks while loading
    
    setShowPinEffect(true);
    setTimeout(() => setShowPinEffect(false), 600);
    onTogglePin();
  }, [isLoading, onTogglePin]);

  return (
    <motion.div
      layout
      className={`relative rounded-2xl mb-4 overflow-hidden transition-all duration-300 group ${
        isPinned
          ? "bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 border border-white/20 shadow-lg shadow-white/5"
          : "bg-neutral-900 border border-neutral-800 hover:border-neutral-700"
      } ${isHovered ? "shadow-xl shadow-black/30" : "shadow-lg shadow-black/20"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {showPinEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {isPinned && (
        <motion.div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white via-neutral-400 to-white"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative py-5 px-6">
        <div className="flex items-start justify-between cursor-pointer relative">
          <div className="flex items-start gap-4 flex-1">
            <motion.div
              className={`flex items-center justify-center w-9 h-9 rounded-xl font-bold text-sm transition-all duration-300 ${
                isExpanded
                  ? "bg-white text-black shadow-lg shadow-white/20"
                  : "bg-neutral-800 text-neutral-400"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpand}
            >
              Q
            </motion.div>

            <motion.h3
              className="text-[14px] md:text-[15px] font-medium text-neutral-200 leading-relaxed flex-1 pr-4 cursor-pointer hover:text-white transition-colors"
              onClick={toggleExpand}
              layout
            >
              {question}
            </motion.h3>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <AnimatePresence>
              {(isExpanded || isHovered) && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >

                  <motion.button
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      isLoading
                        ? "bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed"
                        : isPinned
                        ? "bg-white/10 text-white border border-white/20"
                        : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:border-white/20 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={handlePin}
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                  >
                    <motion.span
                      animate={!isLoading && isPinned ? { rotate: [0, -20, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {isLoading ? (
                        <motion.div
                          className="w-3.5 h-3.5 border-2 border-neutral-500 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : isPinned ? (
                        <LuPinOff className="w-3.5 h-3.5" />
                      ) : (
                        <LuPin className="w-3.5 h-3.5" />
                      )}
                    </motion.span>
                    <span className="hidden md:inline">
                      {isLoading ? "Loading..." : isPinned ? "Unpin" : "Pin"}
                    </span>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-1.5 text-xs font-medium bg-white text-black px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-neutral-200"
                    onClick={() => {
                      setIsExpanded(true);
                      onLearnMore();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <LuSparkles className="w-3.5 h-3.5" />
                    </motion.span>
                    <span className="hidden md:inline">Learn More</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className="text-neutral-500 hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
              onClick={toggleExpand}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <LuChevronDown size={20} />
              </motion.div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                ref={contentRef}
                className="mt-5 relative"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div
                  className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-700 rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                <div className="flex items-center gap-2 mb-4 ml-2">
                  <motion.div
                    className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    <LuMessageCircle className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    Answer
                  </span>
                </div>

                <motion.div
                  className="bg-black/50 px-5 py-4 rounded-xl border border-neutral-800"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <AIResponsePreview content={answer} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white via-neutral-400 to-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

export default QuestionCard;
