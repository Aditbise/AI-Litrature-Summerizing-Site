import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuSparkles, LuBookOpen } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] w-full md:w-[42vw] lg:w-[38vw] bg-neutral-950 border-l border-neutral-800 shadow-2xl shadow-black/50"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            tabIndex="-1"
            aria-labelledby="drawer-right-label"
          >
            <div className="h-full flex flex-col">
              <motion.div
                className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-lg shadow-white/10"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LuBookOpen className="w-5 h-5 text-black" />
                  </motion.div>

                  <div>
                    <motion.h5
                      id="drawer-right-label"
                      className="text-base font-semibold text-white line-clamp-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      {title || "AI Explanation"}
                    </motion.h5>
                    <motion.p
                      className="text-xs text-neutral-500 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <LuSparkles className="w-3 h-3 text-white" />
                      Powered by AI
                    </motion.p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={onClose}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LuX className="text-lg relative z-10" />
                </motion.button>
              </motion.div>

              <motion.div
                className="flex-1 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="px-6 py-6">{children}</div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>

            <motion.div
              className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-30"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.3, scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
