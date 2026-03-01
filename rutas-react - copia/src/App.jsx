import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring
} from "framer-motion"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import RouteTransition from "./components/RouteTransition"
import Home from "./pages/Home"
import Productos from "./pages/Productos"
import Contacto from "./pages/Contacto"
import ProductoDetalle from "./pages/ProductoDetalle"
import NotFound from "./pages/NotFound"

const AppRoutes = () => {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.2
  })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="app-shell">
        <motion.div
          className="ambient ambient-left"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 28, -10, 0], y: [0, -20, 14, 0], scale: [1, 1.06, 0.98, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }
        />
        <motion.div
          className="ambient ambient-right"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -24, 10, 0], y: [0, 18, -12, 0], scale: [1, 1.04, 0.97, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }
        />
        <Navbar />

        <main className="content">
          <AnimatePresence initial={false} mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <RouteTransition>
                    <Home />
                  </RouteTransition>
                }
              />
              <Route path="/inicio" element={<Navigate to="/" replace />} />
              <Route
                path="/productos"
                element={
                  <RouteTransition>
                    <Productos />
                  </RouteTransition>
                }
              />
              <Route
                path="/productos/:id"
                element={
                  <RouteTransition>
                    <ProductoDetalle />
                  </RouteTransition>
                }
              />
              <Route
                path="/contacto"
                element={
                  <RouteTransition>
                    <Contacto />
                  </RouteTransition>
                }
              />
              <Route
                path="*"
                element={
                  <RouteTransition>
                    <NotFound />
                  </RouteTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
