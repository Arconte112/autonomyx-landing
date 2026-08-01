import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

type IconName =
  | 'target'
  | 'nodes'
  | 'server'
  | 'search'
  | 'code'
  | 'chart'
  | 'users'
  | 'database'
  | 'file'
  | 'spark'
  | 'lock'
  | 'menu'
  | 'close'

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  const paths: Record<IconName, ReactNode> = {
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path className="icon-accent" d="m16 8 4-4m0 0v4m0-4h-4"/></>,
    nodes: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><rect className="icon-accent" x="15" y="3" width="6" height="6" rx="1"/><path d="M9 6h6M18 9v6M6 9v6h9"/></>,
    server: <><rect x="4" y="3" width="16" height="5" rx="1"/><rect x="4" y="10" width="16" height="5" rx="1"/><rect x="4" y="17" width="16" height="4" rx="1"/><path d="M8 5.5h.01M8 12.5h.01M8 19h.01"/><path className="icon-accent" d="M17 19h1"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></>,
    code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 3l-4 18"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20V7M2 20h22"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    spark: <><path d="m12 2 1.3 4.7L18 8l-4.7 1.3L12 14l-1.3-4.7L6 8l4.7-1.3L12 2ZM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m5 5 14 14M19 5 5 19"/></>,
  }

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...common}>{paths[name]}</svg>
}

const services = [
  {
    icon: 'target' as IconName,
    title: 'Consultoría estratégica',
    copy: 'Convertimos objetivos de negocio en una hoja de ruta de IA priorizada, viable y conectada con la operación real.',
    href: '#proceso',
  },
  {
    icon: 'nodes' as IconName,
    title: 'Automatización con IA',
    copy: 'Integramos procesos, datos y herramientas para reducir trabajo manual, errores y tiempos de respuesta.',
    href: '#proceso',
  },
  {
    icon: 'server' as IconName,
    title: 'Soluciones de IA',
    copy: 'Construimos agentes, asistentes y sistemas de IA en la arquitectura que mejor encaje: nube, híbrida o privada.',
    href: '#soluciones-ia',
  },
]

const timeline = [
  { icon: 'search' as IconName, n: '1', title: 'Diagnóstico', copy: 'Entendemos su negocio, procesos y datos para identificar oportunidades de alto impacto.' },
  { icon: 'nodes' as IconName, n: '2', title: 'Diseño', copy: 'Definimos la solución, arquitectura y plan de implementación con enfoque en valor.' },
  { icon: 'code' as IconName, n: '3', title: 'Desarrollo', copy: 'Construimos y probamos la automatización o el modelo de IA en entornos controlados.' },
  { icon: 'server' as IconName, n: '4', title: 'Implementación', copy: 'Desplegamos en el entorno acordado con seguridad, integraciones y capacitación.' },
  { icon: 'chart' as IconName, n: '5', title: 'Operación', copy: 'Monitoreamos, medimos y optimizamos para garantizar resultados sostenibles.' },
]

const diagnosticDeliverables = [
  {
    n: '01',
    title: 'Mapa de oportunidades',
    copy: 'Procesos y puntos de fricción donde la IA puede producir valor operativo medible.',
  },
  {
    n: '02',
    title: 'Priorización ejecutiva',
    copy: 'Iniciativas ordenadas por impacto, viabilidad, riesgo y retorno esperado.',
  },
  {
    n: '03',
    title: 'Piloto recomendado',
    copy: 'Una primera iniciativa con alcance, dependencias y criterios de éxito definidos.',
  },
  {
    n: '04',
    title: 'Hoja de ruta de 90 días',
    copy: 'Secuencia concreta para validar, implementar y llevar la iniciativa a producción.',
  },
]

const faqs = [
  {
    question: '¿Qué es AUTONOMYX?',
    answer: 'AUTONOMYX SRL es una firma dominicana de consultoría, ingeniería e implementación de inteligencia artificial para empresas. Identifica casos de uso, construye soluciones, las integra con la operación y las lleva a producción.',
  },
  {
    question: '¿Qué procesos puede automatizar AUTONOMYX?',
    answer: 'Evaluamos procesos operativos, administrativos, comerciales y de análisis para identificar dónde la automatización y la inteligencia artificial pueden reducir trabajo manual, errores y tiempos de respuesta.',
  },
  {
    question: '¿Trabajan solamente con inteligencia artificial local?',
    answer: 'No. Implementamos soluciones en la nube, híbridas o privadas según los requisitos de integración, seguridad, rendimiento y costo de cada empresa.',
  },
  {
    question: '¿La solución puede integrarse con nuestros sistemas?',
    answer: 'Sí. Diseñamos cada solución para conectarse con aplicaciones, bases de datos, documentos, APIs y herramientas que ya forman parte de la operación.',
  },
  {
    question: '¿AUTONOMYX trabaja con empresas fuera de República Dominicana?',
    answer: 'Sí. AUTONOMYX tiene base en República Dominicana y puede prestar consultoría, desarrollo e implementación remota a empresas de América Latina.',
  },
  {
    question: '¿Cómo comienza un proyecto de inteligencia artificial?',
    answer: 'Comenzamos con un diagnóstico del proceso, los datos y los objetivos. Luego priorizamos el caso de uso, definimos la arquitectura y establecemos un plan de implementación medible.',
  },
  {
    question: '¿Cómo puedo contactar a AUTONOMYX?',
    answer: 'Puede completar el formulario de contacto en autonomyxdr.com o escribir a alejandro@autonomyxdr.com para conversar sobre su proceso, necesidad o proyecto de inteligencia artificial.',
  },
]

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={inverse ? 'brand brand-inverse' : 'brand'} href="#inicio" aria-label="AUTONOMYX, ir al inicio">
      <span className="brand-symbol"><img src="/brand/autonomyx-logo-transparent.png" alt="" width="1024" height="1024" decoding="async" /></span>
      <span className="brand-word">AUTONOMYX</span>
    </a>
  )
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function HeroDiagram() {
  return (
    <div className="hero-diagram" aria-label="Diagrama de un sistema de inteligencia artificial integrado con infraestructura empresarial">
      <div className="diagram-grid" />
      <svg className="diagram-lines" viewBox="0 0 620 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M310 250 L145 120"/><path d="M310 250 L475 120"/><path d="M310 250 L100 300"/><path d="M310 250 L520 300"/><path d="M310 250 L310 440"/>
      </svg>
      <div className="orbit-node node-app"><Icon name="nodes"/><span>Aplicaciones<br/>internas</span></div>
      <div className="orbit-node node-data"><Icon name="database"/><span>Bases de datos<br/>privadas</span></div>
      <div className="orbit-node node-users"><Icon name="users"/><span>Usuarios<br/>internos</span></div>
      <div className="orbit-node node-cloud"><Icon name="lock"/><span>Almacenamiento<br/>seguro</span></div>
      <div className="orbit-node node-network"><Icon name="server"/><span>Red privada<br/>empresarial</span></div>
      <div className="server-platform" aria-hidden="true">
        <div className="platform-shadow" />
        <div className="server-stack">
          <div className="server-top" />
          <div className="server-layer"><i/><i/><i/></div>
          <div className="server-layer"><i/><i/><i/></div>
          <div className="server-layer"><i/><i/><i/></div>
          <div className="server-label"><span>AI</span> CORE</div>
        </div>
        <div className="platform-base"><span/></div>
      </div>
    </div>
  )
}

function LocalArchitecture() {
  const inputs = [
    ['nodes', 'Aplicaciones internas'],
    ['code', 'Sistemas legados'],
    ['database', 'Fuentes de datos'],
    ['file', 'Documentos internos'],
  ] as [IconName, string][]
  const outputs = [
    ['spark', 'Automatizaciones inteligentes'],
    ['users', 'Asistentes internos'],
    ['chart', 'Análisis y reportes'],
    ['target', 'Decisiones más rápidas'],
  ] as [IconName, string][]

  return (
    <div className="architecture" aria-label="Arquitectura de un LLM local conectado a sistemas internos">
      <div className="arch-column">
        {inputs.map(([icon, label]) => <div className="arch-node" key={label}><Icon name={icon} size={20}/><span>{label}</span><i/></div>)}
      </div>
      <div className="arch-core">
        <div className="core-cube">
          <div className="cube-top"/>
          <div className="cube-front">
            <span/><span/><span/><span/><span/>
          </div>
          <div className="cube-side"/>
        </div>
        <b>LLM LOCAL</b>
        <div className="on-premise"><Icon name="lock" size={17}/><span>Infraestructura<br/>on-premise</span></div>
      </div>
      <div className="arch-column arch-column-right">
        {outputs.map(([icon, label]) => <div className="arch-node" key={label}><i/><Icon name={icon} size={20}/><span>{label}</span></div>)}
      </div>
    </div>
  )
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!open) return

    setStatus('idle')
    setErrorMessage('')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const searchParams = new URLSearchParams(window.location.search)
    const payload = {
      ...Object.fromEntries(formData.entries()),
      utmSource: searchParams.get('utm_source') || '',
      utmMedium: searchParams.get('utm_medium') || '',
      utmCampaign: searchParams.get('utm_campaign') || '',
      utmContent: searchParams.get('utm_content') || '',
      landingPage: window.location.href,
      referrer: document.referrer,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json() as { ok?: boolean; error?: string }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'No pudimos enviar su solicitud.')
      }

      form.reset()
      setStatus('success')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No pudimos enviar su solicitud.')
      setStatus('error')
    }
  }

  return (
    <div className="contact-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="modal-close" type="button" aria-label="Cerrar formulario" onClick={onClose}>
          <Icon name="close" size={22}/>
        </button>

        {status === 'success' ? (
          <div className="form-success" aria-live="polite">
            <span aria-hidden="true">✓</span>
            <p className="form-kicker">Solicitud enviada</p>
            <h2 id="contact-title">Gracias por contactarnos.</h2>
            <p>Recibimos su información. Alejandro revisará el contexto y se comunicará con usted.</p>
            <button className="button button-dark contact-trigger" type="button" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <div className="form-heading">
              <span className="form-kicker">Conversación inicial</span>
              <h2 id="contact-title">Hablemos de su operación.</h2>
              <p>Comparta el área o la prioridad que desea evaluar. Revisaremos el contexto y le responderemos directamente.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>Nombre *</span>
                  <input name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required autoFocus />
                </label>
                <label>
                  <span>Empresa</span>
                  <input name="company" type="text" autoComplete="organization" maxLength={120} />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>Correo corporativo *</span>
                  <input name="email" type="email" autoComplete="email" maxLength={254} required />
                </label>
                <label>
                  <span>Teléfono</span>
                  <input name="phone" type="tel" autoComplete="tel" maxLength={50} />
                </label>
              </div>
              <label>
                <span>¿Qué área, proceso o prioridad desea evaluar? *</span>
                <textarea name="message" rows={5} minLength={20} maxLength={3000} required />
              </label>
              <label className="website-field" aria-hidden="true">
                <span>Sitio web</span>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="form-footer">
                <p>Usaremos sus datos únicamente para responder esta solicitud.</p>
                <button className="button button-dark contact-trigger" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Enviando…' : <>Enviar solicitud <Arrow/></>}
                </button>
              </div>
              <p className="form-status" role="alert" aria-live="polite">
                {status === 'error' ? errorMessage : ''}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const openContact = () => {
    closeMenu()
    setContactOpen(true)
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Navegación principal">
            <a href="#empresa" onClick={closeMenu}>Empresa</a>
            <a href="#consultoria" onClick={closeMenu}>Consultoría</a>
            <a href="#automatizacion" onClick={closeMenu}>Automatización</a>
            <a href="#soluciones-ia" onClick={closeMenu}>Soluciones de IA</a>
            <a href="#proceso" onClick={closeMenu}>Proceso</a>
          </nav>
          <button className="button button-dark header-cta contact-trigger" type="button" onClick={openContact}>Hablar con un consultor</button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-frame" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span/> Consultoría e implementación de IA · República Dominicana</div>
            <h1>IA empresarial, de la oportunidad a producción.</h1>
            <p>Ayudamos a empresas a identificar dónde la inteligencia artificial puede generar impacto económico real y a convertir esas oportunidades en sistemas funcionando.</p>
            <div className="hero-actions">
              <button className="button button-dark contact-trigger" type="button" onClick={openContact}>Explorar una oportunidad <Arrow/></button>
              <a className="button button-light" href="#evaluacion">Cómo comenzamos <Arrow/></a>
            </div>
          </div>
          <HeroDiagram />
        </section>

        <section className="entity-summary section-frame" id="empresa" aria-labelledby="entity-title">
          <div className="entity-intro">
            <span className="section-kicker">AUTONOMYX en breve</span>
            <h2 id="entity-title">¿Qué es AUTONOMYX?</h2>
          </div>
          <div className="entity-content">
            <p><strong>AUTONOMYX SRL es una firma dominicana de consultoría, ingeniería e implementación de inteligencia artificial para empresas.</strong> Identificamos casos de uso, construimos soluciones, las integramos con la operación y las llevamos a producción.</p>
            <dl className="entity-facts">
              <div>
                <dt>Base</dt>
                <dd>República Dominicana</dd>
              </div>
              <div>
                <dt>Cobertura</dt>
                <dd>República Dominicana y América Latina</dd>
              </div>
              <div>
                <dt>Especialidad</dt>
                <dd>IA empresarial y automatización de procesos</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="services-intro section-frame" id="consultoria">
          <div>
            <span className="section-kicker">Capacidades de AUTONOMYX</span>
            <h2>Consultoría, ingeniería e implementación en un solo equipo.</h2>
          </div>
          <p>Comenzamos con evidencia operativa, definimos la iniciativa correcta y, cuando existe una oportunidad viable, asumimos su diseño, integración y puesta en producción.</p>
        </section>

        <section className="services" aria-label="Servicios de consultoría, automatización e inteligencia artificial">
          {services.map((service, index) => (
            <article className="service-card" id={index === 1 ? 'automatizacion' : undefined} key={service.title}>
              <div className="icon-box"><Icon name={service.icon} size={29}/></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href={service.href}>Más información <Arrow/></a>
            </article>
          ))}
        </section>

        <section className="timeline section-block" id="proceso">
          <div className="section-heading centered">
            <span className="section-kicker">Método de implementación</span>
            <h2>Del diagnóstico a producción.</h2>
            <p>Un recorrido claro para convertir oportunidades en sistemas confiables.</p>
          </div>
          <div className="timeline-grid">
            {timeline.map((step, index) => (
              <article className="timeline-step" key={step.title}>
                <div className="timeline-icon"><Icon name={step.icon} size={30}/></div>
                {index < timeline.length - 1 && <div className="timeline-connector"><span>+</span></div>}
                <h3><span>{step.n}.</span> {step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="local-ai section-block" id="soluciones-ia">
          <div className="local-copy">
            <span className="section-kicker">Infraestructura flexible</span>
            <h2>La arquitectura correcta para cada operación.</h2>
            <p>No todas las empresas necesitan la misma infraestructura. Integramos servicios de IA en la nube y, cuando la privacidad o el control lo requieren, implementamos modelos locales, entornos híbridos y conexiones seguras con sus sistemas internos.</p>
            <ul>
              <li><Icon name="server" size={17}/>Despliegue cloud, híbrido o privado</li>
              <li><Icon name="nodes" size={17}/>Integración con datos y aplicaciones existentes</li>
              <li><Icon name="lock" size={17}/>Controles acordes con la sensibilidad de la información</li>
              <li><Icon name="chart" size={17}/>Rendimiento y costos alineados al caso de uso</li>
            </ul>
          </div>
          <LocalArchitecture />
        </section>

        <section className="diagnostic section-block" id="evaluacion" aria-labelledby="diagnostic-title">
          <div className="diagnostic-heading">
            <span className="section-kicker">Punto de partida</span>
            <h2 id="diagnostic-title">Primero, saber dónde vale la pena intervenir.</h2>
            <p>La evaluación operativa conecta procesos, sistemas, datos, equipos y objetivos para decidir qué iniciativas de IA merecen inversión y en qué orden.</p>
            <div className="diagnostic-meta">
              <div><span>Alcance</span><strong>Un área operativa prioritaria</strong></div>
              <div><span>Duración estimada</span><strong>5–10 días laborables</strong></div>
              <div><span>Inicio</span><strong>Conversación de 30–45 minutos</strong></div>
            </div>
            <button className="button button-dark contact-trigger" type="button" onClick={openContact}>Conversar sobre su operación <Arrow/></button>
          </div>
          <div className="diagnostic-deliverables" aria-label="Entregables del diagnóstico operativo de inteligencia artificial">
            {diagnosticDeliverables.map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq section-block" id="preguntas">
          <div className="faq-heading">
            <span className="section-kicker">Preguntas frecuentes</span>
            <h2>Antes de implementar IA.</h2>
            <p>Respuestas directas sobre cómo abordamos consultoría, automatización e integración de inteligencia artificial para empresas.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact" id="contacto">
          <div className="contact-grid left-grid" aria-hidden="true"/><div className="contact-grid right-grid" aria-hidden="true"/>
          <span className="contact-dot dot-one"/><span className="contact-dot dot-two"/>
          <div className="contact-content">
            <Brand inverse />
            <p>Identifiquemos dónde la IA puede generar impacto económico real.</p>
            <button className="button button-white contact-trigger" type="button" onClick={openContact}>Hablar con un consultor <Arrow/></button>
          </div>
        </section>
      </main>

      <footer>
        <Brand />
        <nav aria-label="Navegación del pie de página">
          <a href="#empresa">Empresa</a>
          <a href="#consultoria">Consultoría</a>
          <a href="#automatizacion">Automatización</a>
          <a href="#soluciones-ia">Soluciones de IA</a>
          <a href="#preguntas">Preguntas</a>
        </nav>
        <div className="footer-meta">
          <a href="mailto:alejandro@autonomyxdr.com">alejandro@autonomyxdr.com</a>
          <p>República Dominicana · © {new Date().getFullYear()} AUTONOMYX SRL</p>
        </div>
      </footer>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default App
