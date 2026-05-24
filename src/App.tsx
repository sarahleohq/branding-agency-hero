/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Facebook, ArrowUpRight, X, Check, Sparkles, Send, RefreshCw, ArrowRight, ArrowLeft, Home } from "lucide-react";

/**
 * Geometric bold logo R path
 */
function LogoR() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer" id="app-logo">
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 text-white fill-current transition-transform duration-500 group-hover:scale-105"
      >
        <path d="M22 15h32c16 0 28 11.5 28 26.5s-12 26.5-28 26.5H38v22H22V15zm16 35H50c7.7 0 13-5 13-11.5s-5.3-11.5-13-11.5H38v23z" />
        <path d="M48 62l24 28H54L34 65h14z" />
      </svg>
      {/* Equal Sign Symbol */}
      <div className="flex flex-col gap-1 w-5 shrink-0 animate-pulse">
        <div className="h-0.5 w-full bg-white rounded-full transition-transform duration-300 group-hover:translate-x-1"></div>
        <div className="h-0.5 w-full bg-white rounded-full transition-transform duration-300 group-hover:-translate-x-0.5"></div>
      </div>
    </div>
  );
}

/**
 * Custom Fading dots spinner to imitate high quality reloading
 */
function DotsSpinner() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-white fill-current animate-[spin_6s_linear_infinite]"
      >
        <circle cx="50" cy="18" r="6" className="opacity-100" />
        <circle cx="72" cy="28" r="6" className="opacity-90" />
        <circle cx="82" cy="50" r="6" className="opacity-80" />
        <circle cx="72" cy="72" r="6" className="opacity-70" />
        <circle cx="50" cy="82" r="6" className="opacity-55" />
        <circle cx="28" cy="72" r="6" className="opacity-40" />
        <circle cx="18" cy="50" r="6" className="opacity-25" />
        <circle cx="28" cy="28" r="6" className="opacity-15" />
      </svg>
    </div>
  );
}

export default function App() {
  // Navigation active state - fully integrated
  const [activePanel, setActivePanel] = useState<"home" | "service" | "contact">("home");

  // State to track if initial entrance animation has finished to start glowing effects
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse tracking coordinates for tactile background parallax and spotlight halo
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-0.5, 0.5] range for parallax
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
      // Clear viewport positions for cursor follower
      setSpotlightPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Statistical incremental upcounting logic on load
  const [statPercent, setStatPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 85;
    const duration = 2500; // matches hero loads neatly
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setStatPercent(end);
        clearInterval(timer);
      } else {
        setStatPercent(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3200); // Activated nicely post the sequence timings (approx 3.2s)
    return () => clearTimeout(timer);
  }, []);

  // Local state for interactive Service Details toggles
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Local state for Contact Form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    projectName: "",
    serviceType: "Creative Strategy",
    budget: "$25K - $50K",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!contactForm.name || !contactForm.email) {
      setFormError("Please enter both your name and email address to proceed.");
      return;
    }
    setIsSubmitting(true);
    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setContactForm({
      name: "",
      email: "",
      projectName: "",
      serviceType: "Creative Strategy",
      budget: "$25K - $50K",
      message: ""
    });
    setFormError(null);
    setIsSubmitted(false);
  };

  const servicesData = [
    {
      id: 1,
      title: "CREATIVE STRATEGY",
      desc: "Brand positioning, competitive benchmarking, core visual ethos & comprehensive DNA architecture.",
      highlight: "85% market outperformance rating",
      capabilities: ["Audience Intelligence", "Strategic Roadmaps", "Value Architecture", "Narrative Strategy"]
    },
    {
      id: 2,
      title: "VISUAL DNA & SYSTEM IDENTITY",
      desc: "Architecting scalable logo design languages, custom displays, typography guidelines, and digital asset structures.",
      highlight: "Crafted for global tier-1 scale",
      capabilities: ["Geometric Logo Design", "Design Tokens", "Typography Palettes", "Scalable Styleguides"]
    },
    {
      id: 3,
      title: "DIGITAL CAMPAIGNS & CONTENT",
      desc: "High-octane immersive rollouts that dominate mindshare across all digital platforms and consumer touchpoints.",
      highlight: "Highly viral interactive activations",
      capabilities: ["Interactive UI Production", "Creative Motion Guides", "Social-First DNA", "Performance Imagery"]
    }
  ];

  // Animation container variants for cascading staggers
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const rightHeadingVariants = {
    hidden: { opacity: 0, x: 35 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden relative flex flex-col justify-between">
      {/* Cinematic Grain/Noise Overlay */}
      <div className="noise-overlay" />

      {/* Futuristic Cybernetic Spotlight Glow Follower */}
      <div
        className="pointer-events-none fixed z-40 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,21,0,0.06)_0%,rgba(255,15,0,0)_65%)] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${spotlightPos.x}px`,
          top: `${spotlightPos.y}px`,
          transition: "left 0.1s ease-out, top 0.1s ease-out"
        }}
      />
      
      {/* Sleek Minimal Precision Target Ring */}
      <div
        className="pointer-events-none fixed z-50 w-8 h-8 rounded-full border border-[#FF1500]/40 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${spotlightPos.x}px`,
          top: `${spotlightPos.y}px`,
          transition: "left 0.16s cubic-bezier(0.25, 1, 0.5, 1), top 0.16s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      />

      {/* Perfect center tracking pixel */}
      <div
        className="pointer-events-none fixed z-50 w-1.5 h-1.5 rounded-full bg-[#FF1500] mix-blend-screen -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${spotlightPos.x}px`,
          top: `${spotlightPos.y}px`,
          transition: "left 0.04s ease-out, top 0.04s ease-out"
        }}
      />

      {/* Background Loop Video Layer - Fades in with interactive 3D mouse camera parallax */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 1.05 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * -18}px, ${mousePosition.y * -18}px) scale(1.025)`,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source
            src="https://res.cloudinary.com/dfpfxjdre/video/upload/v1779604979/kling_20260516_Image_to_Video__4121_0_bnmvle.mp4"
            type="video/mp4"
          />
        </video>
        {/* Ambient translucent Overlay for text contrast with optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />
        
        {/* Slowly pulsing ambient glows that dynamically respond to cursor coordinate position skew */}
        <motion.div
          animate={{
            opacity: [0.6, 1.2, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transform: `translate(${mousePosition.x * 35}px, ${mousePosition.y * 35}px)`,
            transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,21,0,0.08),transparent_50%)] pointer-events-none"
        />
        <motion.div
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
            transition: "transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,15,0,0.05),transparent_40%)] pointer-events-none"
        />
      </motion.div>

      {/* Main Inner wrapper to hold content cleanly with padding */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 flex-1 flex flex-col justify-between relative z-10">
        
        {/* TOP NAVBAR */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
          className="flex flex-row justify-between items-center w-full gap-4 pb-4 md:pb-0"
          id="nav-header"
        >
          {/* Brand Logo & interactive reset */}
          <div onClick={() => setActivePanel("home")} className="cursor-pointer shrink-0">
            <LogoR />
          </div>

          {/* Nav menu links customized to Home, Service, Contact and fully functional */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12">
            {activePanel === "home" ? (
              <>
                <nav className="flex items-center gap-2.5 sm:gap-6 md:gap-8" id="nav-links">
                  <button
                    onClick={() => setActivePanel("home")}
                    className={`text-[9px] sm:text-xs font-bold tracking-widest transition-all duration-300 relative py-1 cursor-pointer ${
                      activePanel === "home" ? "text-white scale-105" : "text-neutral-400 hover:text-white"
                    }`}
                    id="link-home"
                  >
                    HOME
                    {activePanel === "home" && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF1500]"
                      />
                    )}
                  </button>

                  <button
                    onClick={() => setActivePanel("service")}
                    className={`text-[9px] sm:text-xs font-bold tracking-widest transition-all duration-300 relative py-1 cursor-pointer ${
                      activePanel === "service" ? "text-white scale-105" : "text-neutral-400 hover:text-white"
                    }`}
                    id="link-service"
                  >
                    SERVICE
                    {activePanel === "service" && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF1500]"
                      />
                    )}
                  </button>

                  <button
                    onClick={() => setActivePanel("contact")}
                    className={`text-[9px] sm:text-xs font-bold tracking-widest transition-all duration-300 relative py-1 cursor-pointer ${
                      activePanel === "contact" ? "text-white scale-105" : "text-neutral-400 hover:text-white"
                    }`}
                    id="link-contact"
                  >
                    CONTACT
                    {activePanel === "contact" && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF1500]"
                      />
                    )}
                  </button>
                </nav>

                {/* Social capsules formatted exactly from reference */}
                <div className="hidden sm:flex items-center gap-2" id="nav-socials">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800/80 flex items-center justify-center hover:border-neutral-500 hover:bg-neutral-800 transition-all duration-300 group"
                    id="social-instagram"
                  >
                    <Instagram size={13} className="text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800/80 flex items-center justify-center hover:border-neutral-500 hover:bg-neutral-800 transition-all duration-300 group"
                    id="social-facebook"
                  >
                    <Facebook size={13} className="text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </>
            ) : (
              <button
                onClick={() => setActivePanel("home")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800/80 bg-neutral-950/80 hover:bg-neutral-900 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF1500] hover:text-white transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,21,0,0.1)] hover:border-neutral-500 group"
                id="back-to-home-nav-button"
              >
                <ArrowLeft size={13} className="text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span className="text-neutral-400 group-hover:text-white transition-colors">BACK TO HOME</span>
              </button>
            )}
          </div>
        </motion.header>

        {/* MAIN BODY AREA WITH ANIMATED TRANSITIONS */}
        <AnimatePresence mode="wait">
          {activePanel === "home" && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end my-12 md:my-16 lg:my-20"
              id="hero-content"
            >
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full gap-16 lg:gap-24 text-left">
                
                {/* Source of Bold Ideas - Reveals line-by-line with sleek overflows */}
                <div className="text-left" id="source-phrase-container">
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[44px] xl:text-[54px] font-extrabold tracking-tight text-white leading-[1.05] uppercase flex flex-col">
                    <span className="overflow-hidden block">
                      <motion.span
                        className="block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      >
                        SOURCE
                      </motion.span>
                    </span>
                    <span className="overflow-hidden block">
                      <motion.span
                        className="block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                      >
                        OF BOLD
                      </motion.span>
                    </span>
                    <span className="overflow-hidden block">
                      <motion.span
                        className="block text-[#FF1500]"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                      >
                        IDEAS/
                      </motion.span>
                    </span>
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 1.1 }}
                    className="mt-5 text-xs md:text-sm text-neutral-400 font-normal leading-relaxed tracking-wide"
                  >
                    Where brands are reborn <br />
                    and boundaries are erased
                  </motion.p>
                </div>

                {/* Bottom Cards Row - Slides upward with Blur reduction & delayed gentle post-load glowing style */}
                <motion.div
                  initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}
                  className="flex flex-col sm:flex-row gap-4 w-full"
                  id="highlight-cards"
                >
                  {/* Card 1 - Pure White with tactile hover, shadow glow, and border illumination */}
                  <motion.div
                    onClick={() => setActivePanel("service")}
                    whileHover={{ scale: 1.025, y: -6, boxShadow: "0 22px 45px rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className={`bg-white rounded-[24px] p-6 text-black flex flex-col justify-between w-full sm:flex-1 sm:max-w-[240px] h-52 cursor-pointer border transition-colors duration-300 group ${
                      isLoaded ? "animate-glow-white border-white/60" : "border-white"
                    }`}
                    id="card-statistics"
                    title="Explore our services performance"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid grid-cols-3 gap-[3px] w-4 h-4 shrink-0 transition-transform duration-500 group-hover:rotate-90">
                        <div className="bg-transparent"></div>
                        <div className="bg-black w-1.2 h-1.2 rounded-sm"></div>
                        <div className="bg-transparent"></div>
                        <div className="bg-black w-1.2 h-1.2 rounded-sm"></div>
                        <div className="bg-black w-1.2 h-1.2 rounded-sm"></div>
                        <div className="bg-black w-1.2 h-1.2 rounded-sm"></div>
                        <div className="bg-transparent"></div>
                        <div className="bg-black w-1.2 h-1.2 rounded-sm"></div>
                        <div className="bg-transparent"></div>
                      </div>
                      <span className="text-[9px] font-black tracking-wider uppercase text-neutral-900 leading-none">
                        Brands that trust forward
                      </span>
                    </div>
                    <div>
                      {/* Dynamic smoothly incrementing ticker */}
                      <span className="text-5xl lg:text-[52px] font-black tracking-tighter text-black block leading-none transition-transform duration-300 group-hover:scale-105">
                        {statPercent}%
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-600 mt-3 block leading-none flex items-center gap-1 group-hover:text-black">
                        Win beyond the market <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  </motion.div>

                  {/* Card 2 - Glassy Black with tactile hover, border illumination, and faster loading feedback */}
                  <motion.div
                    onClick={() => {
                      setContactForm(prev => ({ ...prev, message: "Interested in a professional Brand Reload." }));
                      setActivePanel("contact");
                    }}
                    whileHover={{ scale: 1.025, y: -6, boxShadow: "0 22px 45px rgba(255,21,0,0.12)" }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className={`bg-[#0B0B0A]/90 rounded-[24px] p-6 text-white flex flex-col justify-between w-full sm:flex-1 sm:max-w-[240px] h-52 cursor-pointer border transition-colors duration-300 group ${
                      isLoaded ? "animate-glow-red border-[#FF1500]/50 shadow-[0_0_20px_rgba(255,21,0,0.15)]" : "border-neutral-800/80 hover:border-neutral-500"
                    }`}
                    id="card-loader-badge"
                    title="Start reloading your brand with us"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-[11px] font-semibold tracking-wider leading-snug text-neutral-100 uppercase max-w-[90px] group-hover:text-[#FF1500] transition-colors">
                        Reload your brand
                      </span>
                      {/* Interactive dot rotator accelerates spin velocity on card hover */}
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-6 h-6 text-white fill-current animate-[spin_6s_linear_infinite] group-hover:animate-[spin_1.5s_linear_infinite]"
                        >
                          <circle cx="50" cy="18" r="6" className="opacity-100" />
                          <circle cx="72" cy="28" r="6" className="opacity-90" />
                          <circle cx="82" cy="50" r="6" className="opacity-80" />
                          <circle cx="72" cy="72" r="6" className="opacity-70" />
                          <circle cx="50" cy="82" r="6" className="opacity-55" />
                          <circle cx="28" cy="72" r="6" className="opacity-40" />
                          <circle cx="18" cy="50" r="6" className="opacity-25" />
                          <circle cx="28" cy="28" r="6" className="opacity-15" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-normal leading-relaxed tracking-wide group-hover:text-neutral-200 transition-colors">
                      It's not just about what we design, <br />
                      but the impact that stays. <span className="text-[#FF1500] font-bold">Inquire →</span>
                    </p>
                  </motion.div>
                </motion.div>
              </div>              {/* Right Column (Giant Colossal Heading + Desc + Badges) */}
              <div className="lg:col-span-7 flex flex-col justify-between items-end text-right h-full gap-8 lg:gap-14">
                
                {/* Colossal Text - Reveals line-by-line using slick overflow block masks and modern staggered blur-to-sharp transitions */}
                <div
                  className="w-full flex flex-col items-end leading-[0.85] uppercase text-white font-sans text-right select-none"
                  id="colossal-title-container"
                >
                  <div className="overflow-hidden block">
                    <motion.h2
                      initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                      className="text-4xl xs:text-5xl sm:text-8xl lg:text-[104px] xl:text-[124px] font-black tracking-tight leading-[0.85] text-white hover:text-neutral-200 transition-colors"
                    >
                      CREATIVE
                    </motion.h2>
                  </div>
                  <div className="overflow-hidden block my-1">
                    <motion.h2
                      initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                      className="text-4xl xs:text-5xl sm:text-8xl lg:text-[104px] xl:text-[124px] font-black tracking-tight leading-[0.85] text-white hover:text-[#FF1500] transition-colors"
                    >
                      BRANDING
                    </motion.h2>
                  </div>
                  <div className="overflow-hidden block">
                    <motion.h2
                      initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
                      className="text-4xl xs:text-5xl sm:text-8xl lg:text-[104px] xl:text-[124px] font-black tracking-tight leading-[0.85] text-white hover:text-neutral-200 transition-colors"
                    >
                      AGENCY
                    </motion.h2>
                  </div>
                </div>

                {/* Paragraph + Circle arrow which is fully interactive to open Contact - Slides upward with Blur reduction */}
                <motion.div
                  initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-6 text-right w-full"
                  id="branding-description-row"
                >
                  <p className="text-neutral-400 text-xs sm:text-sm max-w-sm text-left leading-relaxed tracking-wide font-normal">
                    We craft bold identities that stand out. <br className="hidden sm:inline" />
                    From strategy to visual DNA — we help <br className="hidden sm:inline" />
                    brands redefine, not just refresh.
                  </p>
                  
                  <div
                    onClick={() => setActivePanel("contact")}
                    className="w-14 h-14 rounded-full border border-neutral-800 flex items-center justify-center cursor-pointer group hover:border-[#FF1500] hover:bg-[#FF1500]/10 transition-all duration-300 shrink-0 self-start sm:self-center"
                    id="diagonal-arrow-circle"
                    title="Secure custom branding assessment"
                  >
                    <ArrowUpRight
                      className="text-white group-hover:text-[#FF1500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      size={20}
                    />
                  </div>
                </motion.div>

                {/* Bottom Badges - Slides up with Blur reduction & triggers soft red pulse glow after loading finished */}
                <motion.div
                  initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 2.1 }}
                  className="flex flex-col items-end gap-4 w-full"
                  id="bottom-buttons-badges"
                >
                  {/* Expanding Badge */}
                  <div
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500 group ${
                      isLoaded ? "animate-glow-red bg-red-950/25" : "border-red-500/70 bg-red-950/15"
                    }`}
                    id="badge-expanding"
                  >
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF1500]/20 text-[#FF1500] leading-none text-sm font-black animate-pulse">
                      *
                    </span>
                    <span>EXPANDING GLOBAL BOUNDARIES</span>
                  </div>

                  {/* Dynamic interactive tags to toggle Service Panel and filter category */}
                  <div className="flex flex-wrap gap-2.5 justify-end" id="tags-container">
                    <button
                      onClick={() => {
                        setActivePanel("service");
                        setExpandedService(3);
                      }}
                      className="px-5 py-2.5 rounded-full border border-neutral-800 text-[10px] font-bold uppercase tracking-widest text-neutral-300 hover:border-neutral-500 hover:text-white transition-all bg-neutral-950/50 cursor-pointer hover:bg-neutral-900"
                      id="tag-digital-campaigns"
                    >
                      DIGITAL CAMPAIGNS
                    </button>
                    <button
                      onClick={() => {
                        setActivePanel("service");
                        setExpandedService(2);
                      }}
                      className="px-5 py-2.5 rounded-full border border-neutral-800 text-[10px] font-bold uppercase tracking-widest text-neutral-300 hover:border-neutral-500 hover:text-white transition-all bg-neutral-950/50 cursor-pointer hover:bg-neutral-900"
                      id="tag-content"
                    >
                      CONTENT
                    </button>
                    <button
                      onClick={() => {
                        setActivePanel("service");
                        setExpandedService(1);
                      }}
                      className={`px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest text-[#FF1500] hover:bg-red-950/20 transition-all cursor-pointer ${
                        isLoaded ? "animate-glow-red" : "border-[#FF1500] shadow-[0_0_15px_rgba(255,21,0,0.1)] hover:shadow-[0_0_20px_rgba(255,21,0,0.2)]"
                      }`}
                      id="tag-creative-strategy"
                    >
                      CREATIVE STRATEGY
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {activePanel === "service" && (
            <motion.section
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="my-10 md:my-14"
              id="services-panel-container"
            >
              {/* Service Header Info */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-black tracking-widest text-[#FF1500]">01/</span>
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-300">
                    OUR CAPABILITY MATRIX / SERVICES
                  </h3>
                </div>
              </div>

              {/* Grid of Interactive Services */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {servicesData.map((service) => {
                  const isExpanded = expandedService === service.id;
                  return (
                    <motion.div
                      layout
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.99 }}
                      key={service.id}
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      className={`rounded-3xl p-8 cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between min-h-[300px] h-full ${
                        isExpanded
                          ? "bg-neutral-900/90 border-[#FF1500]/60 shadow-[0_0_30px_rgba(255,21,0,0.15)]"
                          : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-500 hover:bg-neutral-900/40"
                      }`}
                    >
                      <div>
                        {/* Service ID Counter */}
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500">
                            ID: 00{service.id} //
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF1500] px-2.5 py-0.5 rounded-full bg-red-950/20 border border-red-900/40">
                            {service.highlight}
                          </span>
                        </div>

                        {/* Heading */}
                        <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-4 uppercase">
                          {service.title}
                        </h4>

                        {/* Desc */}
                        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mb-6">
                          {service.desc}
                        </p>
                      </div>

                      {/* Interactive Section details */}
                      <div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mb-6 pt-4 border-t border-neutral-800 overflow-hidden"
                            >
                              <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase block mb-3">
                                CORE DISCIPLINE CAPABILITIES:
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                {service.capabilities.map((cap, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-neutral-300">
                                    <span className="text-[#FF1500] font-black text-[12px]">*</span>
                                    <span>{cap}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Call to action within Service box */}
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-[10px] font-bold tracking-widest text-[#FF1500] uppercase hover:underline">
                            {isExpanded ? "COLLAPSE DETAILS" : "EXPLORE DISCIPLINE →"}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContactForm(prev => ({
                                ...prev,
                                serviceType: service.title,
                                message: `I am highly interested in launching a branding setup focused on ${service.title}.`
                              }));
                              setActivePanel("contact");
                            }}
                            className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center hover:border-[#FF1500] hover:text-[#FF1500] transition-colors"
                            title="Directly select this service style"
                          >
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quote Area below services */}
              <div className="bg-[#0B0B0A] border border-neutral-800/80 rounded-[28px] p-6 sm:p-10 my-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold tracking-tight text-white mb-2 uppercase">
                    Ready to launch a state-of-the-art rebirth for your brand?
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xl">
                    Our team matches extreme visual fidelity with robust consumer analysis. You aren't just buying static designs; you are embedding high-gravity performance metrics into your brand's DNA.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setContactForm(prev => ({ ...prev, message: "Request comprehensive consultation with branding specialists." }));
                    setActivePanel("contact");
                  }}
                  className="px-6 py-3 rounded-full bg-[#FF1500] text-white hover:bg-[#d61200] transition-colors font-bold text-[10px] uppercase tracking-widest cursor-pointer self-stretch md:self-auto text-center"
                >
                  START INQUIRY NOW →
                </button>
              </div>
            </motion.section>
          )}

          {activePanel === "contact" && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="my-10 md:my-14"
              id="contact-panel-container"
            >
              {/* Contact Header Info */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-black tracking-widest text-[#FF1500]">02/</span>
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-300">
                    SECURE INQUIRY / PROJECT ASSESSMENT
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left pitch */}
                <div className="lg:col-span-4 text-left">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight uppercase mb-4">
                    LET'S CO-CREATE <br className="hidden sm:inline" />
                    YOUR LEGACY /
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed tracking-wide mb-8">
                    Contact us with your project coordinates. We respond manually with zero generic content templates, aligning our creative director with your vision directly.
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-[#FF1500] font-black shrink-0 mt-0.5">
                        *
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Zero Generic Templates</h4>
                        <p className="text-[10px] text-neutral-500">Every strategic insight is designed from clean slate.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-[#FF1500] font-black shrink-0 mt-0.5">
                        *
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">24 Hour Alignment</h4>
                        <p className="text-[10px] text-neutral-500">Fast tactical responses built for hypergrowth teams.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-900">
                    <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">OFFICE HEADQUARTERS COORDINATES:</span>
                    <p className="text-[10px] text-neutral-400 font-mono mt-1">
                      124 SOUTHERN CROSS, BLDG D <br />
                      SINGAPORE // UTC+8
                    </p>
                  </div>
                </div>

                {/* Right Interactive Form Area */}
                <div className="lg:col-span-8 bg-[#0B0B0A]/80 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleContactSubmit}
                        className="space-y-6 text-left"
                      >
                        {formError && (
                          <div className="p-3.5 bg-red-950/25 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold tracking-wide flex items-center gap-2 animate-[pulse_1.5s_infinite] leading-normal" id="form-validation-alert">
                            <span className="text-[#FF1500] font-black text-sm shrink-0">*</span>
                            <span>{formError}</span>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Name Input */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                              Your Name / Brand Name <span className="text-[#FF1500]">*</span>
                            </label>
                            <input
                              type="text"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              required
                              placeholder="e.g. Acme Studio"
                              className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-[#FF1500] focus:ring-1 focus:ring-[#FF1500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                            />
                          </div>

                          {/* Email Input */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                              Your Email Coordinates <span className="text-[#FF1500]">*</span>
                            </label>
                            <input
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              required
                              placeholder="e.g. partner@acme.com"
                              className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-[#FF1500] focus:ring-1 focus:ring-[#FF1500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Project Name (Optional) */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                              Project Name / Domain (Optional)
                            </label>
                            <input
                              type="text"
                              value={contactForm.projectName}
                              onChange={(e) => setContactForm({ ...contactForm, projectName: e.target.value })}
                              placeholder="e.g. Acme Web Platform"
                              className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-[#FF1500] focus:ring-1 focus:ring-[#FF1500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                            />
                          </div>

                          {/* Service Type Selection */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                              Primary Branding Focus
                            </label>
                            <select
                              value={contactForm.serviceType}
                              onChange={(e) => setContactForm({ ...contactForm, serviceType: e.target.value })}
                              className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-[#FF1500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer"
                            >
                              <option value="Creative Strategy">CREATIVE STRATEGY</option>
                              <option value="Visual DNA System">VISUAL DNA SYSTEM</option>
                              <option value="Digital Campaigns">DIGITAL CAMPAIGNS</option>
                            </select>
                          </div>
                        </div>

                        {/* Interactive Budget Selectors with glowing tags */}
                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            Estimated Project Budget Capital (USD)
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {["<$15K", "$15K - $25K", "$25K - $50K", "$50K+"].map((tier) => {
                              const isSelected = contactForm.budget === tier;
                              return (
                                <button
                                  key={tier}
                                  type="button"
                                  onClick={() => setContactForm({ ...contactForm, budget: tier })}
                                  className={`px-4 py-2 text-[10px] font-bold rounded-lg border uppercase tracking-widest transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#FF1500] border-[#FF1500] text-white shadow-[0_0_15px_rgba(255,21,0,0.25)]"
                                      : "bg-neutral-950 border-neutral-800 hover:border-neutral-600 text-neutral-300"
                                  }`}
                                >
                                  {tier}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Project Narrative Message Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            Tell us the brand vision
                          </label>
                          <textarea
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            rows={3}
                            placeholder="Describe your current bottleneck, objective, or design criteria..."
                            className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-[#FF1500] focus:ring-1 focus:ring-[#FF1500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all resize-none"
                          />
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
                          <span className="text-[10px] text-neutral-500 font-normal leading-relaxed">
                            * Guaranteed compliance under brand confidentiality.
                          </span>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-3.5 rounded-full text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto shrink-0 ${
                              isSubmitting
                                ? "bg-neutral-800 text-neutral-500 border border-neutral-700"
                                : "bg-[#FF1500] hover:bg-[#d61200] border border-[#FF1500] shadow-[0_0_20px_rgba(255,21,0,0.15)]"
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <RefreshCw size={12} className="animate-spin" /> SUBMITTING SECURELY...
                              </>
                            ) : (
                              <>
                                <Send size={12} /> INITIATE STRATEGIC BRIEF
                              </>
                            )}
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      /* Inquiry Success State Receipt Panel */
                      <motion.div
                        key="contact-success"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-10 space-y-6"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#FF1500]/10 border border-[#FF1500]/40 flex items-center justify-center mx-auto mb-2 text-[#FF1500] shadow-[0_0_20px_rgba(255,21,0,0.1)]">
                          <Check size={28} className="animate-[bounce_1.5s_infinite]" />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-2xl font-black tracking-tight uppercase text-white">
                            ALIGNMENT SECURED
                          </h4>
                          <p className="text-xs text-neutral-400 max-w-md mx-auto">
                            Thank you, <strong className="text-neutral-200">{contactForm.name}</strong>. Your strategic project brief has been registered with our design principal.
                          </p>
                        </div>

                        {/* Premium Digital Signature / Receipt Box */}
                        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 text-left max-w-lg mx-auto font-mono space-y-3 relative overflow-hidden">
                          <div className="absolute right-0 top-0 rotate-12 text-[10px] font-bold text-red-500/25 border border-red-500/30 px-3 py-1 bg-red-950/20 rounded uppercase tracking-widest pointer-events-none select-none">
                            // ACTIVE REBORN
                          </div>
                          
                          <div className="flex justify-between border-b border-neutral-900 pb-2 text-[10px] text-neutral-500 font-bold">
                            <span>TRANSACTION RECEIPT</span>
                            <span>STATUS: CO-CREATE INITIATED</span>
                          </div>
                          
                          <div className="text-[11px] space-y-1.5 text-neutral-400">
                            <div><span className="text-neutral-600">CLIENT:</span> {contactForm.name}</div>
                            <div><span className="text-neutral-600">CONTACT:</span> {contactForm.email}</div>
                            {contactForm.projectName && <div><span className="text-neutral-600">PROJECT:</span> {contactForm.projectName}</div>}
                            <div><span className="text-neutral-600">FOCUS DISCIPLINE:</span> {contactForm.serviceType}</div>
                            <div><span className="text-neutral-600">ESTIMATED FUNDING:</span> {contactForm.budget}</div>
                            {contactForm.message && <div><span className="text-neutral-600">NARRATIVE LOGS:</span> <span className="italic">"{contactForm.message}"</span></div>}
                          </div>

                          <div className="border-t border-neutral-900 pt-2 flex items-center justify-between text-[9px] text-neutral-600 uppercase">
                            <span>COORDINATE ASSIGNED // REBORN-MATRIX</span>
                            <span className="text-neutral-400">MAY 24, 2026 UTC</span>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-center gap-4">
                          <button
                            onClick={handleResetForm}
                            className="px-5 py-2.5 rounded-full border border-neutral-800 hover:border-neutral-500 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          >
                            SEND NEW BRIEF
                          </button>
                          <button
                            onClick={() => setActivePanel("home")}
                            className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-[#FF1500]/10 text-xs text-white border border-[#FF1500]/20 hover:border-[#FF1500]/50 transition-colors cursor-pointer"
                          >
                            RETURN TO HERO DASHBOARD
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* COMPREHENSIVE SUB FOOTER TO COMPLETE ALIGNMENT */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center w-full border-t border-neutral-900/40 pt-6 mt-6 text-neutral-500"
          id="brand-footer"
        >
          <div className="flex gap-4 text-[9px] tracking-widest font-mono uppercase">
            <span>© 2026 BRND AGENCY</span>
            <span>// ALL BOUNDARIES ERASED</span>
          </div>

          <div className="flex items-center gap-6 mt-3 sm:mt-0">
            <button
              onClick={() => {
                setContactForm(prev => ({ ...prev, message: "Request system diagnostics advice." }));
                setActivePanel("contact");
              }}
              className="text-[9px] font-bold tracking-widest text-neutral-400 hover:text-white transition-colors uppercase cursor-pointer"
            >
              PROJECT ESTIMATOR
            </button>
            <span className="text-neutral-800">|</span>
            <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider text-[#FF1500] uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1500] animate-ping" />
              <span>CRAFTING DESIGN FREQUENCIES LIVE</span>
            </div>
          </div>
        </motion.footer>

      </div>
    </main>
  );
}
