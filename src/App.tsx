import { useState, type ReactNode } from 'react'

type IconName =
  | 'target'
  | 'nodes'
  | 'server'
  | 'search'
  | 'code'
  | 'chart'
  | 'users'
  | 'tools'
  | 'rocket'
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
    tools: <><path d="M14.7 6.3a4 4 0 0 0-5-5L7.4 3.6l3 3 2.3-2.3a4 4 0 0 0 2 2Z"/><path d="m4 14-2 2 6 6 2-2M12 12l8.5 8.5M3.5 3.5l6 6"/></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2M9 17l-2-2 1-4.5C10 6 14 2.5 21.5 2.5 21.5 10 18 14 13.5 16L9 17Z"/><circle cx="15.5" cy="8.5" r="2"/><path d="m8 11-4-.5L2 12l5 5"/></>,
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
    copy: 'Analizamos sus procesos, datos y tecnología para diseñar una ruta clara, priorizada y alineada a sus objetivos de negocio.',
    href: '#proceso',
  },
  {
    icon: 'nodes' as IconName,
    title: 'Automatización con IA',
    copy: 'Diseñamos y desarrollamos automatizaciones inteligentes que optimizan tareas, reducen errores y liberan tiempo para lo que realmente importa.',
    href: '#automatizacion',
  },
  {
    icon: 'server' as IconName,
    title: 'Soluciones de IA',
    copy: 'Implementamos asistentes, agentes y modelos de IA en la arquitectura que mejor encaje con su operación: nube, híbrida o privada.',
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

const delivery = [
  { icon: 'users' as IconName, title: 'Entendemos', copy: 'Escuchamos, analizamos y alineamos expectativas.' },
  { icon: 'target' as IconName, title: 'Planificamos', copy: 'Priorizamos iniciativas y definimos el plan de trabajo.' },
  { icon: 'tools' as IconName, title: 'Construimos', copy: 'Desarrollamos, integramos y validamos la solución.' },
  { icon: 'rocket' as IconName, title: 'Desplegamos', copy: 'Implementamos con seguridad y mínima disrupción.' },
  { icon: 'chart' as IconName, title: 'Evolucionamos', copy: 'Medimos, aprendemos y mejoramos continuamente.' },
]

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={inverse ? 'brand brand-inverse' : 'brand'} href="#inicio" aria-label="AUTONOMYX, ir al inicio">
      <span className="brand-symbol"><img src="/brand/autonomyx-logo-transparent.png" alt="" /></span>
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Navegación principal">
            <a href="#consultoria" onClick={closeMenu}>Consultoría</a>
            <a href="#automatizacion" onClick={closeMenu}>Automatización</a>
            <a href="#soluciones-ia" onClick={closeMenu}>Soluciones de IA</a>
            <a href="#proceso" onClick={closeMenu}>Proceso</a>
          </nav>
          <a className="button button-dark header-cta" href="#contacto">Hablar con un consultor</a>
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
            <div className="eyebrow"><span/> IA aplicada a operaciones reales</div>
            <h1>Convierta procesos en sistemas inteligentes.</h1>
            <p>Diseñamos e implementamos soluciones y automatizaciones con IA para operar con más velocidad, control y claridad.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contacto">Hablar con un consultor <Arrow/></a>
              <a className="button button-light" href="#consultoria">Ver soluciones <Arrow/></a>
            </div>
          </div>
          <HeroDiagram />
        </section>

        <section className="services" id="consultoria" aria-label="Servicios de AUTONOMYX">
          {services.map((service, index) => (
            <article className="service-card" id={index === 1 ? 'automatizacion' : undefined} key={service.title}>
              <div className="icon-box"><Icon name={service.icon} size={29}/></div>
              <h2>{service.title}</h2>
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
            <h2>IA privada, cuando el control importa.</h2>
            <p>Cada operación exige una arquitectura distinta. Podemos integrar servicios en la nube o implementar LLMs locales para que la información sensible permanezca dentro de su infraestructura.</p>
            <ul>
              <li><Icon name="lock" size={17}/>Datos que permanecen en su entorno</li>
              <li><Icon name="server" size={17}/>Despliegue local, híbrido o conectado a la nube</li>
              <li><Icon name="file" size={17}/>Cumplimiento y auditoría simplificados</li>
              <li><Icon name="chart" size={17}/>Rendimiento y costos predecibles</li>
            </ul>
          </div>
          <LocalArchitecture />
        </section>

        <section className="delivery section-block">
          <div className="section-heading centered">
            <span className="section-kicker">Cómo trabajamos</span>
            <h2>Nuestro proceso de entrega</h2>
            <p>Un enfoque pragmático para entregar soluciones de IA que generan impacto real.</p>
          </div>
          <div className="delivery-grid">
            {delivery.map((step, index) => (
              <article className="delivery-step" key={step.title}>
                <Icon name={step.icon} size={28}/>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                {index < delivery.length - 1 && <span className="delivery-arrow">›</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contacto">
          <div className="contact-grid left-grid" aria-hidden="true"/><div className="contact-grid right-grid" aria-hidden="true"/>
          <span className="contact-dot dot-one"/><span className="contact-dot dot-two"/>
          <div className="contact-content">
            <Brand inverse />
            <p>Convierta procesos en sistemas inteligentes.</p>
            <a className="button button-white" href="mailto:rainiercf66@gmail.com?subject=Consultoría%20AUTONOMYX">Hablar con un consultor <Arrow/></a>
          </div>
        </section>
      </main>

      <footer>
        <Brand />
        <nav aria-label="Navegación del pie de página">
          <a href="#consultoria">Consultoría</a>
          <a href="#automatizacion">Automatización</a>
          <a href="#soluciones-ia">Soluciones de IA</a>
          <a href="#proceso">Proceso</a>
        </nav>
        <p>© {new Date().getFullYear()} AUTONOMYX SRL</p>
      </footer>
    </>
  )
}

export default App
