import { motion, useReducedMotion } from "framer-motion"
import { routeVariants } from "../lib/motion"

const RouteTransition = ({ children }) => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className="route-shell">{children}</div>
  }

  return (
    <motion.div
      className="route-shell"
      variants={routeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default RouteTransition
