import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { transition } from "../lib/motion"

const items = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/contacto", label: "Contacto" }
]

const routePalette = {
  inicio: {
    accent: "#2f4039",
    accentStrong: "#1f2d27",
    accentSoft: "#e6ece7",
    progressStart: "#23372f",
    progressEnd: "#607267"
  },
  productos: {
    accent: "#3e3b31",
    accentStrong: "#2b2921",
    accentSoft: "#ece8de",
    progressStart: "#3e3b31",
    progressEnd: "#7d725c"
  },
  contacto: {
    accent: "#2f3943",
    accentStrong: "#202831",
    accentSoft: "#e4e9ee",
    progressStart: "#2f3943",
    progressEnd: "#64707b"
  }
}

const Navbar = () => {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [compact, setCompact] = useState(false)

  const palette = useMemo(() => {
    if (pathname.startsWith("/productos")) return routePalette.productos
    if (pathname.startsWith("/contacto")) return routePalette.contacto
    return routePalette.inicio
  }, [pathname])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCompact(latest > 20)
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--accent", palette.accent)
    root.style.setProperty("--accent-strong", palette.accentStrong)
    root.style.setProperty("--accent-soft", palette.accentSoft)
    root.style.setProperty("--progress-start", palette.progressStart)
    root.style.setProperty("--progress-end", palette.progressEnd)
  }, [palette])

  const activo = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to))

  return (
    <motion.header
      className={`topbar ${compact ? "topbar-compact" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: transition.easeStandard }}
    >
      <Link className="brand" to="/">
        <span className="brand-mark" />
        Rutas React
      </Link>

      <nav className="nav-links" aria-label="Navegacion principal">
        {items.map((item) => {
          const isActive = activo(item.to)

          return (
            <Link className={`nav-link ${isActive ? "active" : ""}`} to={item.to} key={item.to}>
              {isActive && (
                <motion.span
                  className="nav-pill"
                  layoutId="nav-pill"
                  transition={transition.spring}
                />
              )}
              <motion.span
                className="nav-label"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </Link>
          )
        })}
      </nav>
    </motion.header>
  )
}

export default Navbar
