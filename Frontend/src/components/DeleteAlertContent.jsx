import React from "react";
import { motion } from "framer-motion";
import { LuTriangleAlert, LuTrash2 } from "react-icons/lu";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <motion.div
      className="p-6 w-[90vw] md:w-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
      >
        <LuTriangleAlert className="w-7 h-7 text-red-400" />
      </motion.div>

      <h3 className="text-lg font-semibold text-white text-center mb-2">
        Delete Session
      </h3>
      <p className="text-sm text-neutral-400 text-center mb-6">{content}</p>

      <div className="flex gap-3">
        <motion.button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 text-neutral-300 text-sm font-medium px-4 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Cancel
        </motion.button>

        <motion.button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-400 text-sm font-medium px-4 py-3 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-colors"
          onClick={onDelete}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <LuTrash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DeleteAlertContent;
