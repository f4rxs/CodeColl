import { motion } from "framer-motion";

const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export const varFadeOut = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: TRANSITION_ENTER },
  exit: { opacity: 1, transition: TRANSITION_EXIT },
};

const FadeOut = ({ children }) => (
  <motion.div variants={varFadeOut} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

export default FadeOut;