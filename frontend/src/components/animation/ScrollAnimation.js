import React from "react";
import { motion } from "framer-motion";

const ScrollAnimation = ({ variants, children }) => (
  <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={variants}>
    {children}
  </motion.div>
);

export default ScrollAnimation;
