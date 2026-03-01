import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"
import { productos } from "../data/productos"
import { fadeUp, staggerChild, staggerParent, transition } from "../lib/motion"

const ProductoDetalle = () => {
  const { id } = useParams()
  const producto = productos.find((item) => item.id === Number(id))

  if (!producto) {
    return (
      <section className="page">
        <motion.article className="soft-card detail-card" {...fadeUp(0.03)}>
          <p className="eyebrow">Error de ruta</p>
          <h1>Producto no encontrado</h1>
          <p>La ruta solicitada no corresponde a un producto valido.</p>
          <Link to="/productos" className="btn btn-primary">
            Regresar al catalogo
          </Link>
        </motion.article>
      </section>
    )
  }

  const recomendados = productos.filter((item) => item.id !== producto.id).slice(0, 2)

  return (
    <section className="page">
      <motion.article className="soft-card detail-card" variants={staggerParent} initial="hidden" animate="show">
        <motion.p className="eyebrow" variants={staggerChild}>
          Detalle de producto
        </motion.p>
        <motion.h1 variants={staggerChild}>{producto.nombre}</motion.h1>
        <motion.p variants={staggerChild}>{producto.descripcion}</motion.p>

        <motion.div className="metrics" variants={staggerParent}>
          <motion.div variants={staggerChild}>
            <span>Categoria</span>
            <strong>{producto.categoria}</strong>
          </motion.div>
          <motion.div variants={staggerChild}>
            <span>Precio</span>
            <strong>${producto.precio}</strong>
          </motion.div>
          <motion.div variants={staggerChild}>
            <span>ID</span>
            <strong>{producto.id}</strong>
          </motion.div>
        </motion.div>

        <motion.div className="hero-actions" variants={staggerChild}>
          <Link to="/productos" className="btn btn-ghost">
            Volver al catalogo
          </Link>
          <Link to="/contacto" className="btn btn-primary">
            Solicitar cotizacion
          </Link>
        </motion.div>
      </motion.article>

      <motion.div className="grid-cards related-grid" {...fadeUp(0.06)}>
        {recomendados.map((item) => (
          <motion.article
            key={item.id}
            className="soft-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.24, ease: transition.easeStandard }}
          >
            <span className="chip">Recomendado</span>
            <h2>{item.nombre}</h2>
            <p>{item.descripcion}</p>
            <Link className="text-link" to={`/productos/${item.id}`}>
              Abrir detalle
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default ProductoDetalle
