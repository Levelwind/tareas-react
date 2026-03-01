import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeUp } from "../lib/motion"

const NotFound = () => {
  return (
    <section className="page">
      <motion.article className="soft-card not-found" {...fadeUp(0.04)}>
        <p className="eyebrow">Error 404</p>
        <h1>Ruta no disponible</h1>
        <p>La direccion no existe dentro de esta aplicacion.</p>
        <div className="hero-actions">
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
          <Link to="/productos" className="btn btn-ghost">
            Ir a productos
          </Link>
        </div>
      </motion.article>
    </section>
  )
}

export default NotFound
