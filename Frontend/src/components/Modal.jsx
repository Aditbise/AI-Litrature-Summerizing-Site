/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative flex flex-col bg-neutral-900 border border-neutral-800 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {!hideHeader && title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
            )}

            <motion.button
              type="button"
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-xl text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LuX className="w-5 h-5" />
            </motion.button>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
