import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { productos } from "../data/productos"
import { fadeUp, transition } from "../lib/motion"

const Productos = () => {
  const [query, setQuery] = useState("")
  const [orden, setOrden] = useState("asc")
  const [categoria, setCategoria] = useState("todas")

  const categorias = useMemo(
    () => ["todas", ...new Set(productos.map((item) => item.categoria.toLowerCase()))],
    []
  )

  const resultados = useMemo(() => {
    const normalizado = query.trim().toLowerCase()

    const filtrados = productos.filter((producto) => {
      const bag = `${producto.nombre} ${producto.categoria}`.toLowerCase()
      const categoriaOk = categoria === "todas" || producto.categoria.toLowerCase() === categoria
      return bag.includes(normalizado) && categoriaOk
    })

    return [...filtrados].sort((a, b) => (orden === "asc" ? a.precio - b.precio : b.precio - a.precio))
  }, [categoria, orden, query])

  return (
    <section className="page">
      <motion.div className="section-head" {...fadeUp(0.02)}>
        <h1>Catalogo</h1>
        <p>Filtra, ordena y navega a detalle con rutas dinamicas.</p>
      </motion.div>

      <motion.div className="toolbar" {...fadeUp(0.07)}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre o categoria"
        />

        <button
          type="button"
          className="btn btn-ghost toolbar-btn"
          onClick={() => setOrden((actual) => (actual === "asc" ? "desc" : "asc"))}
        >
          Orden: {orden === "asc" ? "precio menor" : "precio mayor"}
        </button>
      </motion.div>

      <motion.div className="chip-row" {...fadeUp(0.1)}>
        {categorias.map((item) => {
          const active = item === categoria

          return (
            <motion.button
              key={item}
              type="button"
              className={`chip-btn ${active ? "chip-btn-active" : ""}`}
              onClick={() => setCategoria(item)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2, ease: transition.easeStandard }}
            >
              {item}
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div className="product-grid" layout>
        <AnimatePresence mode="popLayout">
          {resultados.map((producto) => (
            <motion.article
              className="soft-card product-card"
              key={producto.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: transition.easeStandard }}
              whileHover={{ y: -4 }}
            >
              <span className="chip">{producto.categoria}</span>
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <div className="row-between">
                <strong>${producto.precio}</strong>
                <motion.div whileHover={{ x: 2 }}>
                  <Link to={`/productos/${producto.id}`} className="text-link">
                    Ver detalle
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {resultados.length === 0 && (
          <motion.p
            className="empty-state"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            No hay resultados con ese criterio de busqueda.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Productos
