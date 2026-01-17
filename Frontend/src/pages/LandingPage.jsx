/* eslint-disable no-unused-vars */

import React, { useState, useContext, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import HERO_IMG from "../assets/landingpage.png";
import APP_FEATURES from "../utils/data";

import Modal from "../components/Modal";
import Login from "../pages/Auth/login";
import SignUp from "../pages/Auth/SignUp";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { UserContext } from "../context/userContext";

import { LuSparkles, LuBrain, LuMessageSquare, LuFolderOpen, LuBookOpen, LuTrendingUp, LuArrowRight, LuPlay, LuCheck, LuStar, LuUsers, LuZap, LuBook } from "react-icons/lu";

const featureIcons = [LuBrain, LuMessageSquare, LuFolderOpen, LuBookOpen, LuTrendingUp];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const FloatingElement = ({ children, delay = 0, duration = 3, y = 10 }) => (
  <motion.div
    animate={{
      y: [-y, y, -y],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const GlowingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const MagneticButton = ({ children, onClick, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

const FeatureCard = ({ feature, index, Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-lime-500/5 to-transparent rounded-full"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10">

        <motion.div
          className="w-12 h-12 bg-lime-500 rounded-2xl flex items-center justify-center mb-6"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          {feature.title}
        </h3>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <motion.div
      className="w-14 h-14 bg-lime-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <Icon className="w-7 h-7 text-black" />
    </motion.div>
    <div className="text-3xl font-bold text-black mb-1">
      <AnimatedCounter value={value} suffix="+" />
    </div>
    <div className="text-gray-500 text-sm">{label}</div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, delay }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <LuStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700 mb-6 leading-relaxed italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
      <div>
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </motion.div>
);

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/analyze");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
        
        <GlowingOrb className="w-96 h-96 bg-purple-300 -top-48 -left-48" delay={0} />
        <GlowingOrb className="w-80 h-80 bg-blue-300 top-1/4 -right-40" delay={1} />
        <GlowingOrb className="w-64 h-64 bg-emerald-300 bottom-1/4 -left-32" delay={2} />

        <div className="container mx-auto px-6 pt-6 pb-32 relative">

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-20 sticky top-0 z-50 py-4"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <LuBook className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold tracking-tight">
                Literature Analyzer
              </span>
            </motion.div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <motion.button
                onClick={() => setOpenAuthModal(true)}
                className="text-sm font-medium px-6 py-2.5 rounded-full border border-gray-200 bg-gray-100 backdrop-blur-sm hover:bg-lime-500 hover:text-white hover:border-lime-500 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            )}
          </motion.header>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-1/2"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-gray-200/50"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <LuSparkles size={14} className="text-yellow-500" />
                </motion.span>
                AI-Powered Literature Analysis
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black mb-8 leading-[1.1]"
              >
                Understand{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Literature
                  </span>
                  <motion.span
                    className="absolute bottom-2 left-0 w-full h-3 bg-blue-200/60 -z-0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed"
              >
                Analyze passages deeply with AI insights. Discover meanings, literary devices, themes, and symbolism. Master English literature with confidence.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                <MagneticButton
                  onClick={handleCTA}
                  className="group bg-lime-500 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-lime-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-lime-500/20"
                >
                  Get Started Free
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <LuArrowRight className="w-4 h-4" />
                  </motion.span>
                </MagneticButton>

               {/*<motion.button
                  onClick={handleCTA}
                  className="group text-sm font-medium px-8 py-4 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center gap-2 bg-white/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <LuPlay className="w-3 h-3 text-white ml-0.5" />
                  </div>
                  Watch Demo
                </motion.button> */}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
              >
                {["No credit card required", "Free forever plan", "Cancel anytime"].map((text, i) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                      <LuCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-1/2 relative"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-gray-200/50 via-gray-100/30 to-gray-200/50 rounded-3xl blur-2xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <FloatingElement duration={4} y={8}>
                <motion.div
                  className="relative"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) rotateX(${-mousePosition.y * 0.02}deg)`,
                  }}
                >
                  <motion.img
                    src={HERO_IMG}
                    alt="Literature Analysis Dashboard"
                    className="rounded-3xl border border-gray-200/50 shadow-2xl shadow-gray-300/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <LuCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium">Analysis Ready!</span>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, type: "spring" }}
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <LuZap className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-sm font-medium">AI Powered</span>
                  </motion.div>
                </motion.div>
              </FloatingElement>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-100 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={LuUsers} value={5000} label="Active Learners" delay={0} />
            <StatCard icon={LuBookOpen} value={25000} label="Passages Analyzed" delay={0.1} />
            <StatCard icon={LuTrendingUp} value={92} label="Satisfaction Rate %" delay={0.2} />
            <StatCard icon={LuStar} value={4.8} label="User Rating" delay={0.3} />
          </div>
        </div>
      </div>

      <div className="py-32 bg-white">
        <div className="container mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.span
              className="inline-block text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Features
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Master literature with{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                AI insights
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Deep analysis of literary passages with AI-powered explanations of meanings, devices, themes, and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                Icon={featureIcons[index] || LuSparkles}
              />
            ))}
          </div>

        </div>
      </div>

      <div className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span
              className="inline-block text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full mb-6 border border-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              Testimonials
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Loved by literature students
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The AI analysis helped me understand Shakespeare in ways my textbook never could. Highly recommended!"
              author="Emma Watson"
              role="English Literature Student"
              delay={0}
            />
            <TestimonialCard
              quote="I went from struggling with literary analysis to acing my exams. This tool is a game-changer!"
              author="James Murphy"
              role="High School Senior"
              delay={0.1}
            />
            <TestimonialCard
              quote="Finally, a tool that breaks down complex literary concepts into understandable insights. Amazing!"
              author="Sophia Anderson"
              role="College English Major"
              delay={0.2}
            />
          </div>

        </div>
      </div>

      <div className="py-32 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.3), transparent 50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to master literature?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join thousands of students who deepened their understanding with Literature Analyzer.
            </p>
            <MagneticButton
              onClick={handleCTA}
              className="bg-white text-black text-sm font-semibold px-10 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl shadow-white/10"
            >
              Start Preparing Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <LuArrowRight className="w-5 h-5" />
              </motion.span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center">
                <LuBook className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Literature Analyzer
              </span>
            </motion.div>
           

            <p className="text-sm text-gray-400">
              © 2025 Interview Prep AI · Built by Aditya Bisht
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {openAuthModal && (
          <Modal
            isOpen={openAuthModal}
            hideHeader
            onClose={() => {
              setOpenAuthModal(false);
              setCurrentPage("login");
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === "login" && (
                <Login setCurrentPage={setCurrentPage} />
              )}
              {currentPage === "signup" && (
                <SignUp setCurrentPage={setCurrentPage} />
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;
