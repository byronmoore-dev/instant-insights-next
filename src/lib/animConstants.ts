const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.3,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const dropStaggerItem = {
  hidden: { opacity: 0, scale: 1.2 },
  show: { opacity: 1, scale: 1 },
};

export { staggerContainer, staggerItem, dropStaggerItem };
