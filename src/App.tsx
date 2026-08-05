import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

type Locale = 'es' | 'en'

type ImpactArea = {
  code: string
  label: string
  headline: string
  description: string
  image: string
  alt: string
}

type CapabilityGlyphType = 'diagnostic' | 'automation' | 'agents' | 'integration' | 'private'

type Capability = {
  title: string
  copy: string
  glyph: CapabilityGlyphType
}

const impactAreasByLocale: Record<Locale, ImpactArea[]> = {
  es: [
    { code: '01', label: 'Manufactura', headline: 'Producción con menos interrupciones.', description: 'La IA conecta mantenimiento, calidad y planificación para anticipar desvíos y mantener la operación en movimiento.', image: '/media/industry-manufacturing.webp', alt: 'Ingeniero supervisando una línea de manufactura automatizada' },
    { code: '02', label: 'Servicio al cliente', headline: 'Cada conversación con el contexto correcto.', description: 'Los equipos reciben respuestas, prioridades y próximos pasos basados en la información real del negocio.', image: '/media/industry-customer-service.webp', alt: 'Especialista de servicio al cliente asistida por sistemas empresariales' },
    { code: '03', label: 'Farmacéutica', headline: 'Trazabilidad desde el lote hasta la decisión.', description: 'Automatiza revisiones documentales y alertas de calidad sin perder control ni supervisión humana.', image: '/media/industry-pharmaceutical.webp', alt: 'Especialista de calidad supervisando una línea de producción farmacéutica' },
    { code: '04', label: 'Logística', headline: 'Inventario, rutas y excepciones en sincronía.', description: 'Anticipa demanda, prioriza incidencias y coordina el flujo de cada pedido con menos fricción.', image: '/media/industry-logistics.webp', alt: 'Gerente observando la operación de un centro de distribución automatizado' },
    { code: '05', label: 'Servicios financieros', headline: 'Decisiones más rápidas, con evidencia.', description: 'Agiliza revisiones, detecta anomalías y conserva trazabilidad para cada acción relevante.', image: '/media/industry-financial-services.webp', alt: 'Equipo de operaciones financieras revisando una excepción de riesgo' },
    { code: '06', label: 'Energía', headline: 'Activos críticos bajo vigilancia continua.', description: 'Detecta señales tempranas, prioriza mantenimiento y ayuda a coordinar operaciones con mayor resiliencia.', image: '/media/industry-energy.webp', alt: 'Ingenieros supervisando una instalación energética desde un centro de control' },
  ],
  en: [
    { code: '01', label: 'Manufacturing', headline: 'Production with fewer interruptions.', description: 'AI connects maintenance, quality, and planning to anticipate deviations and keep operations moving.', image: '/media/industry-manufacturing.webp', alt: 'Engineer supervising an automated manufacturing line' },
    { code: '02', label: 'Customer service', headline: 'Every conversation with the right context.', description: 'Teams receive answers, priorities, and next steps grounded in real business information.', image: '/media/industry-customer-service.webp', alt: 'Customer service specialist assisted by enterprise systems' },
    { code: '03', label: 'Pharmaceuticals', headline: 'Traceability from batch to decision.', description: 'Automate document reviews and quality alerts without losing control or human oversight.', image: '/media/industry-pharmaceutical.webp', alt: 'Quality specialist supervising a pharmaceutical production line' },
    { code: '04', label: 'Logistics', headline: 'Inventory, routes, and exceptions in sync.', description: 'Anticipate demand, prioritize incidents, and coordinate every order with less friction.', image: '/media/industry-logistics.webp', alt: 'Manager observing an automated distribution center' },
    { code: '05', label: 'Financial services', headline: 'Faster decisions, backed by evidence.', description: 'Accelerate reviews, detect anomalies, and preserve traceability for every relevant action.', image: '/media/industry-financial-services.webp', alt: 'Financial operations team reviewing a risk exception' },
    { code: '06', label: 'Energy', headline: 'Critical assets under continuous watch.', description: 'Detect early signals, prioritize maintenance, and coordinate operations with greater resilience.', image: '/media/industry-energy.webp', alt: 'Engineers supervising an energy facility from a control room' },
  ],
}

const capabilitiesByLocale: Record<Locale, Capability[]> = {
  es: [
    { title: 'Diagnóstico operativo', copy: 'Identificamos dónde existe una oportunidad económica real antes de decidir qué construir.', glyph: 'diagnostic' },
    { title: 'Automatización inteligente', copy: 'Conectamos reglas, datos e inteligencia artificial para ejecutar procesos con menos fricción.', glyph: 'automation' },
    { title: 'Agentes y asistentes', copy: 'Creamos sistemas que investigan, recomiendan, responden y actúan dentro de límites definidos.', glyph: 'agents' },
    { title: 'Integración empresarial', copy: 'Llevamos la IA a las aplicaciones, documentos, APIs y bases de datos que la empresa ya utiliza.', glyph: 'integration' },
    { title: 'IA privada e híbrida', copy: 'Diseñamos la arquitectura según los requisitos de control, privacidad, rendimiento y costo.', glyph: 'private' },
  ],
  en: [
    { title: 'Operational assessment', copy: 'We identify where a real economic opportunity exists before deciding what to build.', glyph: 'diagnostic' },
    { title: 'Intelligent automation', copy: 'We connect rules, data, and artificial intelligence to execute processes with less friction.', glyph: 'automation' },
    { title: 'Agents and assistants', copy: 'We build systems that research, recommend, respond, and act within defined boundaries.', glyph: 'agents' },
    { title: 'Enterprise integration', copy: 'We bring AI into the applications, documents, APIs, and databases your company already uses.', glyph: 'integration' },
    { title: 'Private and hybrid AI', copy: 'We design the architecture around your control, privacy, performance, and cost requirements.', glyph: 'private' },
  ],
}

const principlesByLocale = {
  es: [
    ['A', 'El impacto guía la solución', 'La tecnología se elige después de entender el problema y el valor que puede producir.', '/media/principle-impact.webp', 'Equipo evaluando un proceso industrial antes de elegir una solución tecnológica'],
    ['B', 'Integración antes que reemplazo', 'La solución debe convivir con los sistemas y procesos que ya sostienen la operación.', '/media/principle-integration.webp', 'Ingeniero integrando infraestructura industrial existente con un sistema moderno'],
    ['C', 'Control y trazabilidad', 'Diseñamos supervisión humana, permisos y evidencia de cada acción relevante.', '/media/principle-control.webp', 'Supervisor humano monitoreando una operación industrial desde un centro de control'],
    ['D', 'Soluciones listas para operar', 'El objetivo es un sistema utilizable, medible y mantenible dentro del negocio.', '/media/principle-production.webp', 'Operador e ingeniero utilizando un sistema desplegado en una línea de producción activa'],
  ],
  en: [
    ['A', 'Impact guides the solution', 'Technology is selected only after understanding the problem and the value it can create.', '/media/principle-impact.webp', 'Team assessing an industrial process before selecting a technology solution'],
    ['B', 'Integration before replacement', 'The solution must coexist with the systems and processes that already support operations.', '/media/principle-integration.webp', 'Engineer integrating existing industrial infrastructure with a modern system'],
    ['C', 'Control and traceability', 'We design human oversight, permissions, and evidence for every relevant action.', '/media/principle-control.webp', 'Human supervisor monitoring an industrial operation from a control room'],
    ['D', 'Solutions ready to operate', 'The goal is a usable, measurable, and maintainable system inside the business.', '/media/principle-production.webp', 'Operator and engineer using a deployed system on an active production line'],
  ],
}

const faqsByLocale = {
  es: [
    { question: '¿Qué es AUTONOMYX?', answer: 'AUTONOMYX SRL es una firma dominicana de consultoría, ingeniería e implementación de inteligencia artificial para empresas. Identificamos casos de uso, construimos soluciones, las integramos con la operación y las llevamos a producción.' },
    { question: '¿Qué procesos puede automatizar AUTONOMYX?', answer: 'Evaluamos procesos operativos, administrativos, comerciales y de análisis para identificar dónde la automatización y la inteligencia artificial pueden reducir trabajo manual, errores y tiempos de respuesta.' },
    { question: '¿Trabajan solamente con inteligencia artificial local?', answer: 'No. Implementamos soluciones en la nube, híbridas o privadas según los requisitos de integración, seguridad, rendimiento y costo de cada empresa.' },
    { question: '¿La solución puede integrarse con nuestros sistemas?', answer: 'Sí. Diseñamos cada solución para conectarse con aplicaciones, bases de datos, documentos, APIs y herramientas que ya forman parte de la operación.' },
    { question: '¿AUTONOMYX trabaja fuera de República Dominicana?', answer: 'Sí. AUTONOMYX tiene base en República Dominicana y puede prestar consultoría, desarrollo e implementación remota a empresas de América Latina.' },
    { question: '¿Cómo comienza una iniciativa de inteligencia artificial?', answer: 'Comenzamos con un diagnóstico del proceso, los datos y los objetivos. Luego priorizamos el caso de uso, definimos la arquitectura y establecemos un plan de implementación medible.' },
    { question: '¿Cómo puedo contactar a AUTONOMYX?', answer: 'Puede completar el formulario de contacto en autonomyxdr.com o escribir a alejandro@autonomyxdr.com para conversar sobre su proceso, necesidad o proyecto de inteligencia artificial.' },
  ],
  en: [
    { question: 'What is AUTONOMYX?', answer: 'AUTONOMYX SRL is a Dominican consulting, engineering, and artificial intelligence implementation firm for businesses. We identify use cases, build solutions, integrate them with operations, and bring them into production.' },
    { question: 'What processes can AUTONOMYX automate?', answer: 'We assess operational, administrative, commercial, and analytical processes to identify where automation and artificial intelligence can reduce manual work, errors, and response times.' },
    { question: 'Do you only work with local artificial intelligence?', answer: 'No. We implement cloud, hybrid, or private solutions according to each company’s integration, security, performance, and cost requirements.' },
    { question: 'Can the solution integrate with our systems?', answer: 'Yes. We design every solution to connect with the applications, databases, documents, APIs, and tools already used in your operations.' },
    { question: 'Does AUTONOMYX work outside the Dominican Republic?', answer: 'Yes. AUTONOMYX is based in the Dominican Republic and provides remote consulting, development, and implementation services to companies across Latin America.' },
    { question: 'How does an artificial intelligence initiative begin?', answer: 'We begin with an assessment of the process, data, and objectives. We then prioritize the use case, define the architecture, and establish a measurable implementation plan.' },
    { question: 'How can I contact AUTONOMYX?', answer: 'Complete the contact form at autonomyxdr.com or email alejandro@autonomyxdr.com to discuss your process, need, or artificial intelligence project.' },
  ],
}

const pageCopy = {
  es: {
    start: 'Comenzar', capabilities: 'Capacidades', company: 'Empresa',
    heroLine1: 'Automatización impulsada por IA', heroLine2: 'para cada decisión', scroll: 'Desplácese para explorar', impactTitle: 'Industrias', viewCapabilities: 'Ver capacidades',
    manifestoBefore: 'Convertimos ', manifestoStrong: 'datos, procesos y conocimiento', manifestoMiddle: ' disperso en sistemas que ayudan a su ', manifestoCompany: 'empresa', manifestoAfter: ' a decidir y actuar con mayor claridad.',
    capabilitiesTitle: 'De la oportunidad a producción.',
    evaluationAlt: 'Centro de operaciones supervisando sistemas industriales', evaluationEyebrow: 'Evaluación operativa', evaluationTitle: 'Primero encontramos la decisión correcta.', evaluationBody: 'En 5–10 días laborables analizamos un área concreta, priorizamos oportunidades y definimos un piloto viable con una hoja de ruta de 4 semanas.', explore: 'Explorar una oportunidad',
    principlesTitle: 'La tecnología al servicio del resultado.', faqEyebrow: 'Preguntas frecuentes', faqTitle: 'Lo que necesita saber.', nextSteps: 'Próximos pasos', evaluate: 'Evaluar una oportunidad', discover: 'Conocer capacidades',
    footerDescription: 'Consultoría, ingeniería e implementación de inteligencia artificial.', footerLabel: 'Enlaces del pie', operationalAssessment: 'Diagnóstico operativo', automation: 'Automatización con IA', agents: 'Agentes y asistentes', privateAi: 'IA privada e híbrida', whatIs: 'Qué es AUTONOMYX', howWeStart: 'Cómo comenzamos', contact: 'Contacto', coverage: 'Cobertura', dominicanRepublic: 'República Dominicana', latinAmerica: 'América Latina', backToTop: 'Volver arriba',
  },
  en: {
    start: 'Get started', capabilities: 'Capabilities', company: 'Company',
    heroLine1: 'AI-Powered Automation', heroLine2: 'for Every Decision', scroll: 'Scroll to explore', impactTitle: 'Industries', viewCapabilities: 'View capabilities',
    manifestoBefore: 'We turn scattered ', manifestoStrong: 'data, processes, and knowledge', manifestoMiddle: ' into systems that help your ', manifestoCompany: 'company', manifestoAfter: ' decide and act with greater clarity.',
    capabilitiesTitle: 'From opportunity to production.',
    evaluationAlt: 'Operations center supervising industrial systems', evaluationEyebrow: 'Operational assessment', evaluationTitle: 'First, we find the right decision.', evaluationBody: 'In 5–10 business days, we analyze a specific area, prioritize opportunities, and define a viable pilot with a 4-week roadmap.', explore: 'Explore an opportunity',
    principlesTitle: 'Technology in service of outcomes.', faqEyebrow: 'Frequently asked questions', faqTitle: 'What you need to know.', nextSteps: 'Next steps', evaluate: 'Evaluate an opportunity', discover: 'Explore capabilities',
    footerDescription: 'Artificial intelligence consulting, engineering, and implementation.', footerLabel: 'Footer links', operationalAssessment: 'Operational assessment', automation: 'AI automation', agents: 'Agents and assistants', privateAi: 'Private and hybrid AI', whatIs: 'What is AUTONOMYX', howWeStart: 'How we begin', contact: 'Contact', coverage: 'Coverage', dominicanRepublic: 'Dominican Republic', latinAmerica: 'Latin America', backToTop: 'Back to top',
  },
}

const contactCopy = {
  es: { close: 'Cerrar formulario', sent: 'Solicitud enviada', thanks: 'Gracias por contactarnos.', response: 'Alejandro revisará el contexto y se comunicará con usted.', closeButton: 'Cerrar', kicker: 'Conversación inicial', title: 'Hablemos de su operación.', intro: 'Comparta el área o la prioridad que desea evaluar. Revisaremos el contexto y le responderemos directamente.', name: 'Nombre *', company: 'Empresa', email: 'Correo corporativo *', phone: 'Teléfono', message: '¿Qué área, proceso o prioridad desea evaluar? *', website: 'Sitio web', privacy: 'Usaremos sus datos únicamente para responder esta solicitud.', sending: 'Enviando…', submit: 'Enviar solicitud', error: 'No pudimos enviar su solicitud.' },
  en: { close: 'Close form', sent: 'Request sent', thanks: 'Thank you for contacting us.', response: 'Alejandro will review the context and contact you.', closeButton: 'Close', kicker: 'Initial conversation', title: 'Let’s talk about your operations.', intro: 'Share the area or priority you would like to assess. We will review the context and respond directly.', name: 'Name *', company: 'Company', email: 'Business email *', phone: 'Phone', message: 'What area, process, or priority would you like to assess? *', website: 'Website', privacy: 'We will use your information only to respond to this request.', sending: 'Sending…', submit: 'Send request', error: 'We could not send your request.' },
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function CapabilityGlyph({ type }: { type: CapabilityGlyphType }) {
  const glyphs: Record<CapabilityGlyphType, ReactNode> = {
    diagnostic: (
      <>
        <path className="glyph-line glyph-trace" d="M18 60V22h40M30 32l24 19 27-28 28 24" />
        <circle className="glyph-node" cx="30" cy="32" r="4" />
        <circle className="glyph-node" cx="54" cy="51" r="4" />
        <circle className="glyph-node" cx="81" cy="23" r="4" />
        <circle className="glyph-node glyph-accent" cx="109" cy="47" r="5" />
        <circle className="glyph-line glyph-orbit" cx="109" cy="47" r="15" />
        <path className="glyph-line" d="M109 25v7M109 62v7M87 47h7M124 47h7" />
      </>
    ),
    automation: (
      <>
        <path className="glyph-line glyph-trace" d="M14 44h24c8 0 8-18 16-18h25c8 0 8 36 16 36h29" />
        <path className="glyph-line" d="m116 54 9 8-9 8" />
        <circle className="glyph-node" cx="38" cy="44" r="4" />
        <circle className="glyph-node glyph-accent" cx="79" cy="26" r="5" />
        <circle className="glyph-node" cx="95" cy="62" r="4" />
        <path className="glyph-line" d="M54 26V14M79 26V14M95 62v12" />
      </>
    ),
    agents: (
      <>
        <circle className="glyph-line glyph-orbit" cx="70" cy="44" r="18" />
        <circle className="glyph-node glyph-accent" cx="70" cy="44" r="6" />
        <path className="glyph-line glyph-trace" d="M54 35 29 20M86 35l25-15M54 53 29 68M86 53l25 15" />
        <circle className="glyph-node" cx="25" cy="18" r="5" />
        <circle className="glyph-node" cx="115" cy="18" r="5" />
        <circle className="glyph-node" cx="25" cy="70" r="5" />
        <circle className="glyph-node" cx="115" cy="70" r="5" />
      </>
    ),
    integration: (
      <>
        <rect className="glyph-line" x="12" y="17" width="38" height="54" rx="3" />
        <rect className="glyph-line" x="90" y="17" width="38" height="54" rx="3" />
        <path className="glyph-line glyph-trace" d="M50 29h40M50 44h40M50 59h40" />
        <circle className="glyph-node" cx="31" cy="29" r="4" />
        <circle className="glyph-node glyph-accent" cx="31" cy="44" r="5" />
        <circle className="glyph-node" cx="31" cy="59" r="4" />
        <circle className="glyph-node" cx="109" cy="29" r="4" />
        <circle className="glyph-node glyph-accent" cx="109" cy="44" r="5" />
        <circle className="glyph-node" cx="109" cy="59" r="4" />
      </>
    ),
    private: (
      <>
        <rect className="glyph-line glyph-boundary" x="22" y="11" width="96" height="66" rx="8" />
        <path className="glyph-line glyph-trace" d="M8 44h27l17-17 18 34 18-23 17 6h27" />
        <circle className="glyph-node" cx="52" cy="27" r="4" />
        <circle className="glyph-node glyph-accent" cx="70" cy="61" r="5" />
        <circle className="glyph-node" cx="88" cy="38" r="4" />
        <path className="glyph-line" d="M43 18h54M43 70h54" />
      </>
    ),
  }

  return <span className={`capability-glyph capability-glyph-${type}`} aria-hidden="true"><svg viewBox="0 0 140 88">{glyphs[type]}</svg></span>
}

function Brand({ inverse = false, locale = 'es' }: { inverse?: boolean; locale?: Locale }) {
  return (
    <a className={`brand${inverse ? ' brand-inverse' : ''}`} href="#inicio" aria-label={locale === 'es' ? 'AUTONOMYX, ir al inicio' : 'AUTONOMYX, go to the top'}>
      <span className="brand-symbol">
        <img src="/brand/autonomyx-logo-transparent.png" alt="" width="1024" height="1024" decoding="async" />
      </span>
      <span>AUTONOMYX</span>
    </a>
  )
}

function ContactModal({ open, onClose, locale }: { open: boolean; onClose: () => void; locale: Locale }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const copy = contactCopy[locale]

  useEffect(() => {
    if (!open) return
    setStatus('idle')
    setErrorMessage('')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
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
      if (!response.ok || !result.ok) throw new Error(result.error || copy.error)
      form.reset()
      setStatus('success')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : copy.error)
      setStatus('error')
    }
  }

  return (
    <div className="contact-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="modal-close" type="button" aria-label={copy.close} onClick={onClose}>×</button>
        {status === 'success' ? (
          <div className="form-success" aria-live="polite">
            <span className="success-mark" aria-hidden="true">✓</span>
            <p className="form-kicker">{copy.sent}</p>
            <h2 id="contact-title">{copy.thanks}</h2>
            <p>{copy.response}</p>
            <button className="solid-button" type="button" onClick={onClose}>{copy.closeButton}</button>
          </div>
        ) : (
          <>
            <div className="form-heading">
              <p className="form-kicker">{copy.kicker}</p>
              <h2 id="contact-title">{copy.title}</h2>
              <p>{copy.intro}</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label><span>{copy.name}</span><input name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required autoFocus /></label>
                <label><span>{copy.company}</span><input name="company" type="text" autoComplete="organization" maxLength={120} /></label>
              </div>
              <div className="form-row">
                <label><span>{copy.email}</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                <label><span>{copy.phone}</span><input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
              </div>
              <label><span>{copy.message}</span><textarea name="message" rows={5} minLength={20} maxLength={3000} required /></label>
              <label className="website-field" aria-hidden="true"><span>{copy.website}</span><input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
              <div className="form-footer">
                <p>{copy.privacy}</p>
                <button className="solid-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? copy.sending : <>{copy.submit} <Arrow/></>}</button>
              </div>
              <p className="form-status" role="alert" aria-live="polite">{status === 'error' ? errorMessage : ''}</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('es')
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [industryDirection, setIndustryDirection] = useState<1 | -1>(1)
  const [industryPaused, setIndustryPaused] = useState(false)
  const copy = pageCopy[locale]
  const impactAreas = impactAreasByLocale[locale]
  const capabilities = capabilitiesByLocale[locale]
  const principles = principlesByLocale[locale]
  const faqs = faqsByLocale[locale]

  useEffect(() => {
    const browserLanguage = window.navigator.languages?.[0] ?? window.navigator.language
    setLocale(browserLanguage.toLowerCase().startsWith('es') ? 'es' : 'en')
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    if (industryPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => {
      setActiveIndustry((current) => {
        if (current === impactAreas.length - 1) {
          setIndustryDirection(-1)
          return current - 1
        }
        if (current === 0 && industryDirection === -1) {
          setIndustryDirection(1)
          return current + 1
        }
        return current + industryDirection
      })
    }, 6500)
    return () => window.clearTimeout(timer)
  }, [activeIndustry, impactAreas.length, industryDirection, industryPaused])

  const openContact = () => {
    setContactOpen(true)
  }
  const showIndustry = (index: number) => {
    const target = Math.max(0, Math.min(index, impactAreas.length - 1))
    if (target !== activeIndustry) setIndustryDirection(target > activeIndustry ? 1 : -1)
    setActiveIndustry(target)
  }

  return (
    <>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-video-slot" aria-hidden="true">
            <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
              <source src="/media/autonomyx-hero.mp4" type="video/mp4" />
            </video>
          </div>

          <header className="site-header">
            <Brand inverse locale={locale} />
            <div className="header-actions">
              <button className="header-contact" type="button" onClick={openContact}>{copy.start}</button>
            </div>
          </header>

          <div className={`hero-content hero-content-${locale}`}>
            <h1><span>{copy.heroLine1}</span>{' '}<span>{copy.heroLine2}</span></h1>
          </div>
          <a className="scroll-cue" href="#oportunidades"><span>↓</span> {copy.scroll}</a>
        </section>

        <section
          className={`impact-strip${industryPaused ? ' is-paused' : ''}`}
          id="oportunidades"
          aria-label={copy.impactTitle}
          onMouseEnter={() => setIndustryPaused(true)}
          onMouseLeave={() => setIndustryPaused(false)}
          onFocusCapture={() => setIndustryPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIndustryPaused(false)
          }}
        >
          <div className="industry-header">
            <div className="industry-tabs" role="tablist" aria-label={copy.impactTitle}>
              {impactAreas.map((area, index) => (
                <button
                  className={index === activeIndustry ? 'is-active' : ''}
                  type="button"
                  role="tab"
                  id={`industry-tab-${area.code}`}
                  aria-selected={index === activeIndustry}
                  aria-controls={`industry-panel-${area.code}`}
                  key={area.code}
                  onClick={() => showIndustry(index)}
                >
                  <span>{area.label}</span>
                  {index === activeIndustry ? <i className="industry-tab-progress" key={`${locale}-${activeIndustry}`} aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
          </div>
          <div className="industry-stage">
            {impactAreas.map((area, index) => (
              <article
                className={`industry-card${index === activeIndustry ? ' is-active' : ''}`}
                id={`industry-panel-${area.code}`}
                role="tabpanel"
                aria-labelledby={`industry-tab-${area.code}`}
                aria-hidden={index !== activeIndustry}
                key={area.code}
                style={{ transform: `translate3d(${(index - activeIndustry) * 104}%, 0, 0)` }}
              >
                <img className="industry-photo" src={area.image} alt={index === activeIndustry ? area.alt : ''} width="1792" height="1024" loading="eager" decoding="async" />
                <div className="industry-copy">
                  <p>{area.label}</p>
                  <h2>{area.headline}</h2>
                  <span>{area.description}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto page-width" id="empresa">
          <p>{copy.manifestoBefore}<strong>{copy.manifestoStrong}</strong>{copy.manifestoMiddle}<strong>{copy.manifestoCompany}</strong>{copy.manifestoAfter}</p>
        </section>

        <section className="capabilities page-width" id="capacidades" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title">{copy.capabilitiesTitle}</h2>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability-row" key={capability.title}>
                <p>{capability.copy}</p>
                <CapabilityGlyph type={capability.glyph} />
                <h3>{capability.title}</h3>
                <Arrow/>
              </article>
            ))}
          </div>
        </section>

        <section className="evaluation" id="enfoque">
          <div className="evaluation-inner page-width">
            <div className="evaluation-visual">
              <img className="evaluation-photo" src="/media/operations-control-room-color.webp" alt={copy.evaluationAlt} loading="lazy" decoding="async" />
            </div>
            <div className="evaluation-copy">
              <p className="eyebrow">{copy.evaluationEyebrow}</p>
              <h2>{copy.evaluationTitle}</h2>
              <p>{copy.evaluationBody}</p>
              <button className="outline-button" type="button" onClick={openContact}>{copy.explore} <Arrow/></button>
            </div>
          </div>
        </section>

        <section className="principles page-width" aria-labelledby="principles-title">
          <h2 id="principles-title">{copy.principlesTitle}</h2>
          <div className="principles-grid">
            {principles.map(([letter, title, copy, image, alt]) => (
              <article key={letter}>
                <div className="principle-image">
                  <img src={image} alt={alt} width="1200" height="900" loading="lazy" decoding="async" />
                  <span className="principle-code">—— {letter}</span>
                </div>
                <div className="principle-copy">
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq page-width" aria-labelledby="faq-title">
          <div className="faq-heading">
            <p className="eyebrow">{copy.faqEyebrow}</p>
            <h2 id="faq-title">{copy.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span>+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="dual-cta page-width" aria-label={copy.nextSteps}>
          <button className="cta-panel cta-light" type="button" onClick={openContact}><span>{copy.evaluate}</span><Arrow/></button>
          <a className="cta-panel cta-dark" href="#capacidades"><span>{copy.discover}</span><Arrow/></a>
        </section>
      </main>

      <footer className="footer page-width">
        <div className="footer-main">
          <div>
            <Brand locale={locale} />
            <p>{copy.footerDescription}</p>
          </div>
          <nav aria-label={copy.footerLabel}>
            <div><b>{copy.capabilities}</b><a href="#capacidades">{copy.operationalAssessment}</a><a href="#capacidades">{copy.automation}</a><a href="#capacidades">{copy.agents}</a><a href="#capacidades">{copy.privateAi}</a></div>
            <div><b>{copy.company}</b><a href="#empresa">{copy.whatIs}</a><a href="#enfoque">{copy.howWeStart}</a><button type="button" onClick={openContact}>{copy.contact}</button></div>
            <div><b>{copy.coverage}</b><span>{copy.dominicanRepublic}</span><span>{copy.latinAmerica}</span><a href="mailto:alejandro@autonomyxdr.com">alejandro@autonomyxdr.com</a></div>
          </nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} AUTONOMYX SRL</span><a href="#inicio">{copy.backToTop} ↑</a></div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} locale={locale} />
    </>
  )
}

export default App
