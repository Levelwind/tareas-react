const easeStandard = [0.22, 1, 0.36, 1]

export const transition = {
  easeStandard,
  spring: { type: "spring", stiffness: 340, damping: 28, mass: 0.65 }
}

export const routeVariants = {
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: easeStandard }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: [0.5, 0, 0.75, 0] }
  }
}

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay, ease: easeStandard }
  },
  viewport: { once: true, amount: 0.3 }
})

export const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02
    }
  }
}

export const staggerChild = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeStandard }
  }
}
