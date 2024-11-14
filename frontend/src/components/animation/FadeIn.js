import { motion } from "framer-motion";

// Adjusted transition values for smoother effect
const TRANSITION_ENTER = {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.99],
};

const TRANSITION_EXIT = {
  duration: 0.6,
  ease: [0.6, -0.05, 0.01, 0.99],
};

// Updated fade-in animation with slight scaling for a smoother feel
export const varFadeInSmooth = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: TRANSITION_ENTER },
  exit: { opacity: 0, scale: 0.95, transition: TRANSITION_EXIT },
};

const FadeIn = ({ children }) => (
  <motion.div variants={varFadeInSmooth} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);


export default FadeIn;