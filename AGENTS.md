# AutonomyX Landing

Este proyecto contiene la landing page publica de AUTONOMYX SRL.

## Memoria Del Proyecto

Actualizar este `AGENTS.md` cuando aparezcan cambios relevantes para el proyecto, especialmente:

- Preferencias visuales, tono de marca, copy, posicionamiento o publico objetivo.
- Decisiones de stack, estructura, deploy, dominios, analytics, formularios o integraciones.
- Assets elegidos, moodboards aprobados, referencias visuales y restricciones de diseno.
- Cambios de alcance, secciones necesarias, oferta comercial, servicios, precios o CTA.
- Instrucciones operativas para iniciar, probar, construir o desplegar el proyecto.

No guardar secretos, tokens, passwords ni llaves privadas aqui. Si aparece algo sensible, documentar solo donde debe vivir y usar variables de entorno.

## Oferta Inicial

La landing comenzara presentando a AUTONOMYX como una firma de consultoria e implementacion de inteligencia artificial para empresas. La oferta inicial se concentra en:

- Consultoria estrategica de IA aplicada al negocio.
- Diseno y desarrollo de automatizaciones con IA.
- Implementacion de soluciones de IA, asistentes, agentes y modelos en arquitecturas cloud, hibridas o privadas segun la necesidad del cliente.

El posicionamiento debe enfatizar resultados operativos, integracion con procesos reales, control de los datos y privacidad. AUTONOMYX no debe percibirse como una empresa dedicada solo a IA local: los LLMs locales son una capacidad especializada para escenarios que requieren mayor privacidad o control. Evitar presentar IA como novedad decorativa o prometer autonomia, metricas o resultados no demostrables.

## Vision Inicial

AutonomyX debe sentirse como una empresa de tecnologia, IA y automatizacion seria, ejecutiva y premium. El estilo deseado por Alejandro es:

- Futurista minimalista.
- Profesional ejecutivo.
- Blanco y negro como base dominante.
- Limpio, sobrio, tecnologico y con autoridad.
- Mas "quiet futurism / corporate future" que cyberpunk llamativo.

Evitar:

- Gradientes morados o azul-morados dominantes.
- Estetica gamer, neon excesivo o cyberpunk recargado.
- Ilustraciones infantiles o startup generica.
- Paletas beige, cafe, arena o marron dominantes.
- Layouts tipo landing generica con cards decorativas sin necesidad.

## Moodboards Iniciales

Generados con `imagegen` el 5 de junio de 2026:

- `moodboards/01-executive-monochrome-command-center.png`: direccion oscura, monocromatica, ejecutiva, tipo centro de mando premium.
- `moodboards/02-white-space-autonomous-systems.png`: direccion clara, SaaS premium, mucho espacio blanco y sistemas autonomos abstractos.
- `moodboards/03-carbon-precision-ai-infrastructure.png`: direccion carbon/infraestructura, mas potente, industrial, segura y high-performance.

Estos moodboards son exploracion inicial, no identidad final. Cuando Alejandro elija una direccion o combine elementos, actualizar esta seccion.

## Conceptos De Landing

Generados con `imagegen` el 5 de junio de 2026, basados en la mezcla de moodboards 1 y 2:

- `landing-concepts/01-dark-command-center-landing.png`: concepto principal oscuro, mas ejecutivo, con hero tipo command center, metricas y secciones alternando negro/blanco. Se siente mas fuerte y premium.
- `landing-concepts/02-bright-autonomous-systems-landing.png`: concepto claro, mas SaaS editorial, con hero blanco, sistema autonomo 3D y secciones muy limpias. Se siente mas comercial, moderno y facil de vender.

Lectura inicial: usar el primer concepto como base de tono premium/autoridad y tomar del segundo la claridad visual, espacio blanco y diagramas de sistemas autonomos.

### Conceptos De Oferta Inicial — 18 Julio 2026

Se generaron tres nuevas versiones de pagina completa con `imagegen`, ya enfocadas en consultoria, automatizaciones con IA e implementacion local de LLMs:

- `landing-concepts/03-dark-ai-command-center.png`: centro de mando oscuro, ejecutivo y tecnico. Es la opcion con mayor sensacion de autoridad, infraestructura y seguridad.
- `landing-concepts/04-bright-private-ai-infrastructure.png`: direccion blanca, clara y comercial. Explica mejor la oferta y el proceso, con diagramas de infraestructura privada.
- `landing-concepts/05-editorial-monochrome-automation.png`: direccion editorial monocromatica, mas audaz y diferenciada. Usa tipografia de gran escala y contraste fuerte sin caer en cyberpunk.

Los tres conceptos evitan logos de clientes, testimonios, precios y metricas inventadas. Son referencias de direccion visual y estructura; el copy final y la identidad definitiva todavia no estan aprobados.

## Implementacion Actual - 18 Julio 2026

Alejandro eligio la version clara `landing-concepts/04-bright-private-ai-infrastructure.png`. La landing se implemento tomando esa referencia como direccion aprobada:

- Stack: React, TypeScript y Vite.
- Estilos: CSS propio, responsive, sin libreria de componentes.
- Direccion visual: blanco dominante, tipografia negra, lineas tecnicas y acento rojo minimo.
- Los diagramas de infraestructura y procesos son HTML, CSS y SVG reales; no se usa el mockup como una captura estatica.
- Secciones actuales: hero, servicios, diagnostico a produccion, soluciones de IA, capacidad de IA privada/local, proceso de entrega, CTA y footer.
- La navegacion interna y el menu movil estan implementados.
- El tercer servicio se presenta como `Soluciones de IA`; la implementacion local aparece como una opcion dentro de una arquitectura flexible, no como la oferta completa.
- Logo oficial original: `public/brand/autonomyx-logo.png`, copiado sin modificar desde `C:\Users\raini\Desktop\No importantes\AUTONOMYX\logo autonomyx.png`.
- Logo usado por la web: `public/brand/autonomyx-logo-transparent.png`, con el fondo removido y la geometria original preservada. Se usa en header, cierre y footer mediante recorte visual CSS.
- El favicon usa el isotipo recortado del logo oficial en `public/favicon.png`.
- Todos los CTA `Hablar con un consultor` abren un formulario modal responsive con nombre, empresa, correo, telefono y descripcion de la necesidad.
- El formulario envia mediante `POST /api/contact`; el backend valida los datos, incluye honeypot y limite basico por IP, y entrega el mensaje real a `alejandro@autonomyxdr.com` mediante SMTP de Zoho.
- Variables requeridas en produccion: `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASSWORD` y `CONTACT_TO_EMAIL`. `ZOHO_SMTP_PASSWORD` es secreto y debe vivir solo en Coolify; nunca guardarlo en Git, logs o este archivo.

## Dominio Y Correo

- El dominio actual de AUTONOMYX es `autonomyxdr.com`.
- `automatadr.com` es el dominio anterior y no debe usarse para nuevas configuraciones de marca o correo.
- Zoho aloja el correo corporativo. Desde el 18 de julio de 2026, `alejandro@autonomyxdr.com` es la dirección principal real del buzón (no un alias). El antiguo alias `info@retratai.com` fue eliminado de ese buzón.
- El formulario usa una contraseña especifica de aplicacion de Zoho llamada `AUTONOMYX Landing Form`. El valor vive solo como secreto bloqueado en Coolify.
- SMTP de Zoho debe usar `smtp.zoho.com:587` con STARTTLS en este servidor; el puerto 465 no completa la conexion desde el VPS.

- Al modificar DNS para la landing, cambiar solamente los registros web necesarios. No alterar MX, SPF/TXT ni otros registros de correo existentes sin una instruccion explicita.

## Repositorio Y Despliegue - 18 Julio 2026

- Repositorio publico: `https://github.com/Arconte112/autonomyx-landing`.
- Rama de produccion: `main`.
- Coolify: proyecto `Autonomyx`, ambiente `production`, aplicacion `landing`.
- UUID del proyecto Coolify: `qifbfmqoc5d4csc0r5k3r0is`.
- UUID de la aplicacion Coolify: `x5tidn5uo4vttpwhpvx52pz2`.
- Servidor de despliegue: `5.78.120.77`.
- Build de produccion: Nixpacks ejecuta `npm ci` y `npm run build`; luego `npm start` levanta el servidor Node que sirve `dist` y expone `/api/contact`.
- Node requerido por el proyecto: `>=22.12.0`, declarado en `package.json` para que Coolify no seleccione Node 18, incompatible con Vite 8.
- Dominios configurados en Coolify: `https://autonomyxdr.com` y `https://www.autonomyxdr.com`, con HTTPS forzado y redireccion a la version sin `www`.
- El despliegue con formulario conectado a Zoho termino correctamente. Se verificaron la landing, el favicon oficial, `/api/health`, una entrega SMTP real y la llegada del mensaje de prueba a la bandeja de `alejandro@autonomyxdr.com`.
- DNS aplicado y verificado el 18 de julio de 2026: el registro A raiz de `autonomyxdr.com` apunta a `5.78.120.77` y `www` permanece como CNAME hacia el dominio raiz.
- Incidente de propagacion del 18 de julio de 2026: aunque el DNS autoritativo y los resolvers publicos ya devolvian `5.78.120.77`, Windows conservaba en paralelo las IP antiguas de GoDaddy (`13.248.243.5` y `76.223.105.230`). La caché DNS local se vacio y la resolucion quedo verificada solo contra `5.78.120.77`. Si la pagina antigua reaparece en un equipo, comprobar primero la caché DNS/del navegador antes de modificar registros.
- HTTPS esta activo para ambos hosts; `www.autonomyxdr.com` redirige a `https://autonomyxdr.com`.
- Los MX de Zoho (`mx.zoho.com`, `mx2.zoho.com` y `mx3.zoho.com`) se conservaron sin cambios durante la configuracion de la landing.

La implementacion fue verificada en escritorio a 1440x900 y en movil a 390x844, sin overflow horizontal ni errores de consola. El build de produccion tambien fue verificado.

## Operacion Local

- Instalar dependencias: `npm install`.
- Iniciar frontend: `npm run dev`.
- Crear build de produccion: `npm run build`.

Cuando Alejandro diga "iniciar proyecto", levantar solo este frontend y abrirlo en el navegador integrado de Codex. Actualmente no requiere login ni credenciales.

## Trato Y Preferencias Relevantes

- Dirigirse a Alejandro como "Senor" por defecto en conversaciones.
- Mantener comunicacion directa, objetiva y sin halagos innecesarios.
- Priorizar simplicidad practica por encima de burocracia o perfeccionismo excesivo.
