import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    initial: {
        opacity: 0,
        y: 8,
        scale: 0.99
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.99,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            className="w-full flex-grow" // Ensure it takes height if needed
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
