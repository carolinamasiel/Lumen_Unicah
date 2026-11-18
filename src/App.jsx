
import { useState, useEffect, useRef } from 'react'
import {
  MessageCircle,
  CalendarDays,
  Users,
  HeartHandshake,
  Church,
  ContactRound,
  Send,
  Plus
} from 'lucide-react'

import './App.css'

const menu = [
  { nombre: 'Asistente', icono: MessageCircle },
  { nombre: 'Calendario', icono: CalendarDays },
  { nombre: 'Grupos y comunidades', icono: Users },
  { nombre: 'Bienestar', icono: HeartHandshake },
  { nombre: 'Pastoral', icono: Church },
  { nombre: 'Contactos', icono: ContactRound }
]

const mensajeInicial = {
  tipo: 'bot',
  texto: '¡Hola! 💛 Soy LUMEN, una luz que te acompaña.\n\nEstoy aquí para orientarte, ayudarte a descubrir nuestra comunidad universitaria y acercarte a los servicios de Bienestar y Pastoral.\n\n¿Cómo puedo acompañarte hoy?'
}

function App() {

  const [seccion, setSeccion] = useState('Asistente')
  const [pregunta, setPregunta] = useState('')
  const [pensando, setPensando] = useState(false)
  const [respondiendo, setRespondiendo] = useState(false)
  const [mensajes, setMensajes] = useState([
    mensajeInicial
  ])

  const mensajesRef = useRef(null)

  // DESPLAZAMIENTO AUTOMÁTICO DEL CHAT

  useEffect(() => {
    const contenedor = mensajesRef.current

    if (contenedor) {
      contenedor.scrollTop = contenedor.scrollHeight
    }
  }, [mensajes, seccion])

  // NUEVA CONVERSACIÓN

  const nuevaConversacion = () => {
    setMensajes([mensajeInicial])
    setPregunta('')
    setSeccion('Asistente')
    disabled={pensando}
  }

  // ENVIAR MENSAJE

 

const enviarMensaje = (texto) => {
  if (!texto.trim() || pensando || respondiendo) return

  setMensajes(anteriores => [
    ...anteriores,
    {
      tipo: 'usuario',
      texto: texto.trim()
    }
  ])

  setPregunta('')
  setPensando(true)

  setTimeout(() => {

    setPensando(false)
    setRespondiendo(true)

    setMensajes(anteriores => [
      ...anteriores,
      {
        tipo: 'bot',
        texto: 'Gracias por acercarte a mí. 💛 Actualmente estoy en una versión de demostración.'
      }
    ])

    setTimeout(() => {
      setRespondiendo(false)
    }, 3000)

  }, 2500)
}



  return (
    <div className="app">

      {/* MENÚ LATERAL */}

      <aside className="sidebar">

        <div className="marca">
          <img
            src="/mascotas/lumen_01.png"
            alt="Mascota LUMEN"
            className="mascota-marca"
          />

          <div>
            <h1>LUMEN</h1>
            <span>UNICAH</span>
          </div>
        </div>

        <p className="subtitulo">
          Bienestar y Pastoral Universitaria
        </p>

        <nav className="menu">
          {menu.map(({ nombre, icono: Icono }) => (
            <button
              key={nombre}
              className={seccion === nombre ? 'activo' : ''}
              onClick={() => setSeccion(nombre)}
            >
              <Icono size={20} />
              {nombre}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>✦</span>
          <p>Una luz que te acompaña.</p>

          <small>
            Fe · Amor · Servicio
          </small>
        </div>

      </aside>

      {/* CONTENIDO PRINCIPAL */}

      <main className="contenido">

        {/* LOGOTIPO INSTITUCIONAL */}

        <div className="barra-institucional">

          <img
            src="/logos/unicah.png"
            alt="Universidad Católica de Honduras"
            className="logo-unicah"
          />

          <div className="identificacion">
            <span>Bienestar y Pastoral</span>
            <small>Prototipo académico</small>
          </div>

        </div>

        
        {/* ASISTENTE */}

        {seccion === 'Asistente' ? (

          <section className="chat">

            <div className="chat-header">

              <div className="perfil-asistente">

                <div className="avatar">
                  <img
                    src="/mascotas/lumen_03.png"
                    alt="Asistente LUMEN"
                    className="mascota-avatar"
                  />
                </div>

                <div>
                  <h3>Asistente LUMEN</h3>
                  <span>
                    Tu compañero universitario
                  </span>
                </div>

              </div>

              
<button
  className="nueva-conversacion"
  onClick={nuevaConversacion}
  type="button"
  disabled={pensando || respondiendo}
>
  <Plus size={17} />
  Nueva conversación
</button>


            </div>

            {/* MENSAJES */}

            <div
              className="mensajes"
              ref={mensajesRef}
              aria-live="polite"
            >

              {mensajes.map((mensaje, indice) => (

                <div
                  key={indice}
                  className={`fila-mensaje ${mensaje.tipo}`}
                >

                  {mensaje.tipo === 'bot' && (
                    <img
                      src="/mascotas/lumen_02.png"
                      alt="LUMEN"
                      className="avatar-mensaje"
                    />
                  )}

                  <div className={`mensaje ${mensaje.tipo}`}>
                    {mensaje.texto}
                  </div>

                </div>

              ))}

            </div>

            {/* PREGUNTAS RÁPIDAS */}

            {mensajes.length === 1 && (

              <div className="preguntas-rapidas">

                <button
                  onClick={() =>
                    enviarMensaje('¿Qué actividades hay?')
                  }
                >
                  <CalendarDays size={16} />
                  Ver actividades
                </button>

                <button
                  onClick={() =>
                    enviarMensaje('¿Qué grupos existen?')
                  }
                >
                  <Users size={16} />
                  Conocer grupos
                </button>

                <button
                  onClick={() =>
                    enviarMensaje('Necesito acompañamiento')
                  }
                >
                  <HeartHandshake size={16} />
                  Necesito apoyo
                </button>

                <button
                  onClick={() =>
                    enviarMensaje('¿Qué ofrece Pastoral?')
                  }
                >
                  <Church size={16} />
                  Conocer Pastoral
                </button>

              </div>

            )}

            {/* CAMPO DE TEXTO */}

            <form
              className="entrada-chat"
              onSubmit={e => {
                e.preventDefault()
                enviarMensaje(pregunta)
              }}
            >



<img
  src={
    pensando
      ? '/mascotas/lumen_pensando.gif'
      : respondiendo
        ? '/mascotas/lumen_respondiendo.gif'
        : pregunta.trim()
          ? '/mascotas/lumen_atento.gif'
          : '/mascotas/lumen_sentado.gif'
  }
  alt=""
  className="mascota-sentada"
/>



              <input
                type="text"
                aria-label="Escribe tu pregunta"
                placeholder="¿En qué puedo acompañarte?"
                value={pregunta}
                onChange={e =>
                  setPregunta(e.target.value)
                }
              />

             
<button
  type="submit"
  aria-label="Enviar mensaje"
  disabled={!pregunta.trim() || pensando || respondiendo}
>
  <Send size={21} />
</button>


            </form>

            <p className="aviso">
              LUMEN brinda orientación informativa.
              No sustituye la consejería ni la atención
              profesional. Evita compartir información
              personal sensible.
            </p>

          </section>

        ) : (

          <section className="panel">

            <h2>{seccion}</h2>

            <p>
              Próximamente encontrarás aquí información
              de {seccion.toLowerCase()}.
            </p>

            <span>Sección en desarrollo</span>

          </section>

        )}

        <footer className="pie">
          LUMEN UNICAH · Bienestar y Pastoral
          · Prototipo académico
        </footer>

      </main>

    </div>
  )
}

export default App
