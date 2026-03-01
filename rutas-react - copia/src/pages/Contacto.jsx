import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
import { fadeUp, transition } from "../lib/motion"

const initialForm = { nombre: "", correo: "", mensaje: "" }

const Contacto = () => {
  const [form, setForm] = useState(initialForm)
  const [enviado, setEnviado] = useState(false)

  const actualizar = (event) => {
    const { name, value } = event.target
    setForm((actual) => ({ ...actual, [name]: value }))
  }

  const correoValido = useMemo(() => /\S+@\S+\.\S+/.test(form.correo), [form.correo])
  const mensajeLargo = form.mensaje.trim().length >= 12
  const bloqueado = !form.nombre.trim() || !correoValido || !mensajeLargo

  const enviar = (event) => {
    event.preventDefault()
    if (bloqueado) return

    setEnviado(true)
    setTimeout(() => setEnviado(false), 2600)
    setForm(initialForm)
  }

  return (
    <section className="page">
      <motion.div className="section-head" {...fadeUp(0.03)}>
        <h1>Contacto</h1>
        <p>Formulario con validacion, feedback y microinteracciones.</p>
      </motion.div>

      <motion.form className="contact-form" {...fadeUp(0.09)} onSubmit={enviar}>
        <label htmlFor="nombre">Nombre</label>
        <motion.input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={actualizar}
          placeholder="Nombre completo"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.2, ease: transition.easeStandard }}
        />

        <label htmlFor="correo">Correo</label>
        <motion.input
          id="correo"
          name="correo"
          type="email"
          value={form.correo}
          onChange={actualizar}
          placeholder="correo@dominio.com"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.2, ease: transition.easeStandard }}
        />

        <label htmlFor="mensaje">Mensaje</label>
        <motion.textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={form.mensaje}
          onChange={actualizar}
          placeholder="Describe tu requerimiento"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.2, ease: transition.easeStandard }}
        />

        <div className="form-foot">
          <span className="hint">Minimo 12 caracteres en el mensaje.</span>
          <span className={`hint ${correoValido || !form.correo ? "" : "hint-error"}`}>
            {correoValido || !form.correo ? "Correo valido" : "Correo invalido"}
          </span>
        </div>

        <motion.button
          className="btn btn-primary"
          type="submit"
          disabled={bloqueado}
          whileHover={bloqueado ? {} : { y: -2 }}
          whileTap={bloqueado ? {} : { y: 0 }}
        >
          Enviar mensaje
        </motion.button>

        <AnimatePresence>
          {enviado && (
            <motion.p
              className="status show"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              Solicitud enviada correctamente.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  )
}

export default Contacto
