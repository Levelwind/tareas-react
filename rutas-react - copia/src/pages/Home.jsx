import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeUp, staggerChild, staggerParent, transition } from "../lib/motion"

const pilares = [
  {
    titulo: "Rutas declarativas",
    texto: "Las vistas se organizan en un arbol de rutas claro y facil de mantener."
  },
  {
    titulo: "Transiciones elegantes",
    texto: "Cada cambio de ruta tiene entrada y salida con movimiento suave."
  },
  {
    titulo: "Fallback robusto",
    texto: "Las rutas invalidas se manejan con una vista 404 consistente."
  },
  {
    titulo: "Experiencia fluida",
    texto: "Microinteracciones, jerarquia tipografica y feedback visual coherente."
  }
]

const destacados = [
  { etiqueta: "Router", valor: "v7" },
  { etiqueta: "Motion", valor: "Framer" },
  { etiqueta: "Escalabilidad", valor: "Alta" }
]

const pasoFlujo = [
  "Selecciona una ruta desde la barra principal.",
  "Explora cards y estados animados en el catalogo.",
  "Navega a rutas dinamicas por producto y prueba el formulario."
]

const heroItemAnimation = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: transition.easeStandard }
  }
}

const Home = () => {
  return (
    <section className="page page-home">
      <motion.div
        className="hero hero-layout"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        <div className="hero-main">
          <motion.p className="eyebrow" variants={heroItemAnimation}>
            Guia profesional
          </motion.p>
          <motion.h1 variants={heroItemAnimation}>
            Rutas React con identidad visual minimalista y animacion avanzada
          </motion.h1>
          <motion.p variants={heroItemAnimation}>
            La interfaz integra React Router y Framer Motion con un lenguaje visual
            sobrio, pensado para presentacion academica o entorno productivo.
          </motion.p>

          <motion.div className="hero-actions" variants={heroItemAnimation}>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link to="/productos" className="btn btn-primary">
                Explorar catalogo
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link to="/contacto" className="btn btn-ghost">
                Abrir contacto
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.aside className="hero-panel" variants={heroItemAnimation}>
          <h2>Base tecnica</h2>
          <div className="hero-stats">
            {destacados.map((item) => (
              <div key={item.etiqueta}>
                <span>{item.etiqueta}</span>
                <strong>{item.valor}</strong>
              </div>
            ))}
          </div>
          <ol className="flow-list">
            {pasoFlujo.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ol>
        </motion.aside>
      </motion.div>

      <motion.div
        className="grid-cards"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {pilares.map((item) => (
          <motion.article
            className="soft-card"
            key={item.titulo}
            variants={staggerChild}
            whileHover={{ y: -4, transition: { duration: 0.22 } }}
          >
            <h2>{item.titulo}</h2>
            <p>{item.texto}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.article className="soft-card note-card" {...fadeUp(0.05)}>
        <h2>Enfoque de diseno</h2>
        <p>
          La paleta cromatica se mantiene neutral, con movimiento medido en tiempos
          cortos y easing suave. El resultado prioriza claridad, no ornamento.
        </p>
      </motion.article>
    </section>
  )
}

export default Home
