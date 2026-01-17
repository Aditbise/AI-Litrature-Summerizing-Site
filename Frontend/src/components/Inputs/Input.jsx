/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-sm text-neutral-400 font-medium mb-1.5 block">
        {label}
      </label>
      <motion.div
        className={`flex items-center gap-3 bg-neutral-800 border rounded-xl px-4 py-3 transition-all duration-200 ${
          isFocused
            ? "border-white/30 bg-neutral-800/80"
            : "border-neutral-700 hover:border-neutral-600"
        }`}
        whileTap={{ scale: 0.995 }}
      >
        {Icon && (
          <Icon
            className={`w-4 h-4 transition-colors ${
              isFocused ? "text-white" : "text-neutral-500"
            }`}
          />
        )}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-neutral-600"
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {type === "password" && (
          <motion.button
            type="button"
            onClick={toggleShowPassword}
            className="text-neutral-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Input;
