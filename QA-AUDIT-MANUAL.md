# Manual de Auditoria QA — manuelsolis.com

**Objetivo:** Validar visualmente que cada pagina, componente, enlace y funcionalidad del sitio opera correctamente en ambos idiomas antes de publicar.

**Fecha de creacion:** Abril 2026
**Total de URLs unicas:** 121 rutas x 2 idiomas = 242 paginas
**Tiempo estimado de auditoria completa:** 6-8 horas (puede dividirse en sesiones)

---

## INSTRUCCIONES GENERALES

### Herramientas necesarias
- Navegador Chrome (para DevTools y Lighthouse)
- Extension "JSON-LD Schema Validator" o similar
- Extension "Meta SEO Inspector" o similar
- Conexion a internet estable
- Hoja de calculo o copia de este documento para marcar checks

### Como auditar cada pagina
Para CADA pagina listada abajo, verificar:

1. **Carga:** La pagina carga sin errores visibles (no pantalla blanca, no 404 inesperado)
2. **Idioma:** El contenido aparece en el idioma correcto segun la URL (/es o /en)
3. **Header:** Logo visible, navegacion funcional, telefono visible, boton de idioma funciona
4. **Footer:** Links visibles, redes sociales, disclaimer SMS, copyright actual
5. **Responsive:** Revisar en mobile (375px) y desktop (1440px) minimo
6. **Links internos:** Hacer clic en 2-3 links por pagina, verificar que llevan al destino correcto
7. **CTAs:** Botones de contacto, telefono y WhatsApp funcionan
8. **Imagenes:** No hay imagenes rotas (cuadros grises o iconos de imagen rota)

### Convenciones de este documento
- [ ] = Pendiente de revisar
- [x] = Revisado y correcto
- [!] = Tiene un problema (anotar detalle al lado)

---

## FASE 1: PAGINAS CRITICAS (Prioridad maxima)

Estas son las paginas con mas trafico y conversion. Revisarlas primero.

### 1.1 Homepage
- [ ] `/es` — Carga completa, hero con video/imagen, animaciones fluidas
- [ ] `/en` — Mismo contenido traducido al ingles
- [ ] Hero: titulo, subtitulo, CTA "Contactarnos" funciona
- [ ] Seccion About: video de YouTube reproduce, historia de Eva visible
- [ ] Seccion Servicios: 6 tarjetas visibles con iconos, links funcionan
- [ ] Seccion Testimonios: video y citas visibles
- [ ] Seccion Equipo: fotos y nombres de abogados
- [ ] Seccion Oficinas: mapa o listado de oficinas
- [ ] Formulario de contacto: campos visibles, envio funciona (probar con datos de prueba)
- [ ] Boton WhatsApp flotante visible y abre chat
- [ ] Boton de chat IA (Nora) visible y abre conversacion
- [ ] Barra sticky mobile: visible en celular con boton de llamada
- [ ] Cambio de idioma: boton ES/EN cambia todo el contenido

### 1.2 Pagina de Servicios Hub
- [ ] `/es/servicios` — 6 categorias visibles con descripcion y CTA
- [ ] `/en/servicios` — Traduccion completa
- [ ] Cada tarjeta de servicio enlaza a la pagina correcta

### 1.3 Formulario de Contacto (en cualquier pagina)
- [ ] Campos: nombre, email, telefono, servicio, mensaje
- [ ] Validacion: no permite enviar vacio
- [ ] Envio exitoso: muestra confirmacion (no error)
- [ ] Telefono clickeable: abre app de llamada

---

## FASE 2: PAGINAS DE SERVICIO (10 paginas x 2 idiomas = 20)

Para cada una verificar: breadcrumbs visibles, contenido completo, CTA funcional, formulario al final.

### Servicios principales
- [ ] `/es/servicios/inmigracion` — Breadcrumb: Inicio > Servicios > Inmigracion
- [ ] `/en/servicios/inmigracion`
- [ ] `/es/servicios/accidentes` — Breadcrumb: Inicio > Servicios > Accidentes
- [ ] `/en/servicios/accidentes`
- [ ] `/es/servicios/defensa-deportacion`
- [ ] `/en/servicios/defensa-deportacion`
- [ ] `/es/servicios/visa-u`
- [ ] `/en/servicios/visa-u`
- [ ] `/es/servicios/vawa`
- [ ] `/en/servicios/vawa`
- [ ] `/es/servicios/asilo`
- [ ] `/en/servicios/asilo`
- [ ] `/es/servicios/ley-criminal`
- [ ] `/en/servicios/ley-criminal`
- [ ] `/es/servicios/familia`
- [ ] `/en/servicios/familia`
- [ ] `/es/servicios/seguros`
- [ ] `/en/servicios/seguros`
- [ ] `/es/servicios/visa-e2`
- [ ] `/en/servicios/visa-e2`

### Checklist por pagina de servicio
- [ ] Breadcrumbs visibles debajo del header (Inicio > Servicios > Nombre)
- [ ] Titulo H1 visible y correcto
- [ ] Contenido de secciones completo (no texto cortado o placeholder)
- [ ] Tabs o pestanas de sub-servicios funcionan
- [ ] Lista de oficinas que ofrecen el servicio
- [ ] Formulario de contacto al final
- [ ] CTA de telefono funciona

---

## FASE 3: OFICINAS (15 paginas x 2 idiomas = 30)

### Listado de oficinas
- [ ] `/es/oficinas` — Todas las oficinas agrupadas por estado
- [ ] `/en/oficinas`

### Paginas individuales
Para cada oficina verificar: direccion, telefono, horario, mapa, equipo, servicios.

**Texas - Houston:**
- [ ] `/es/oficinas/houston-principal`
- [ ] `/es/oficinas/houston-bellaire`
- [ ] `/es/oficinas/houston-accidentes`
- [ ] `/es/oficinas/north-loop`
- [ ] `/es/oficinas/northchase`
- [ ] `/es/oficinas/kirby`
- [ ] `/es/oficinas/main-st`
- [ ] `/es/oficinas/league-city`

**Texas - Otras ciudades:**
- [ ] `/es/oficinas/dallas`
- [ ] `/es/oficinas/el-paso`
- [ ] `/es/oficinas/harlingen`

**Otros estados:**
- [ ] `/es/oficinas/chicago` (Illinois)
- [ ] `/es/oficinas/losangeles` (California)
- [ ] `/es/oficinas/arvada` (Colorado)
- [ ] `/es/oficinas/memphis` (Tennessee)

### Checklist por pagina de oficina
- [ ] Direccion completa visible
- [ ] Telefono clickeable y correcto
- [ ] Horario de atencion visible
- [ ] Link a Google Maps funciona (abre en nueva pestana)
- [ ] Fotos del equipo visibles
- [ ] Servicios disponibles listados
- [ ] Formulario de contacto presente
- [ ] Version en ingles (`/en/oficinas/...`) tiene contenido traducido

---

## FASE 4: BLOG (29 articulos x 2 idiomas = 58)

### Pagina principal del blog
- [ ] `/es/blog` — Lista de articulos visible, filtro de categorias funciona
- [ ] `/en/blog` — Traduccion completa
- [ ] Articulo destacado (featured) aparece arriba
- [ ] Filtro por categoria funciona (Visa U, Procesos Migratorios, etc.)
- [ ] Paginacion o scroll infinito funciona

### 10 Blogs NUEVOS (verificar con especial atencion)
Estos son los recien creados. Revisar que el contenido sea completo y no haya placeholders.

- [ ] `/es/blog/tps-2026-paises-elegibles-renovacion` — TPS 2026
- [ ] `/es/blog/crimenes-deportacion-vileza-moral` — Crimenes y deportacion
- [ ] `/es/blog/rfe-responder-evidencia-uscis` — RFE de USCIS
- [ ] `/es/blog/barras-3-10-anos-presencia-ilegal` — Barras 3/10 anos
- [ ] `/es/blog/accidente-auto-indocumentado-derechos` — Accidente indocumentado
- [ ] `/es/blog/i-864-patrocinador-ingreso-minimo` — I-864 patrocinio
- [ ] `/es/blog/visa-k1-prometido-requisitos` — Visa K-1
- [ ] `/es/blog/entrevista-inmigracion-errores-evitar` — Entrevista errores
- [ ] `/es/blog/familias-estatus-mixto-opciones` — Familias estatus mixto
- [ ] `/es/blog/fraude-notarios-inmigracion` — Fraude de notarios

### 19 Blogs EXISTENTES
- [ ] `/es/blog/asilo-frontera-2026-puerto-entrada-vs-cruce`
- [ ] `/es/blog/entrevista-matrimonio-uscis-senales-alerta`
- [ ] `/es/blog/ciudadania-en-espanol-reglas-50-20-55-15`
- [ ] `/es/blog/marihuana-dui-buen-caracter-moral-inmigracion`
- [ ] `/es/blog/perdon-i601a-arreglar-papeles-entrada-ilegal`
- [ ] `/es/blog/estatus-juvenil-sijs-residencia-jovenes-abandonados`
- [ ] `/es/blog/foia-migratoria-pedir-record-antes-de-aplicar`
- [ ] `/es/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada`
- [ ] `/es/blog/advance-parole-2026-viajar-con-daca-tps-visa-u`
- [ ] `/es/blog/ley-de-los-10-anos-cancelacion-de-deportacion`
- [ ] `/es/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados`
- [ ] `/es/blog/formulario-g28-cambiar-abogado-inmigracion`
- [ ] `/es/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria`
- [ ] `/es/blog/visa-t-trabajo-forzado-por-deuda-con-coyote`
- [ ] `/es/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente`
- [ ] `/es/blog/vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses`
- [ ] `/es/blog/perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas`
- [ ] `/es/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u`
- [ ] `/es/blog/permiso-de-trabajo-visa-u`

### Checklist por articulo de blog
- [ ] Titulo H1 visible y completo (no cortado)
- [ ] Badge de categoria visible (ej: "Procesos Migratorios")
- [ ] Fecha y tiempo de lectura visibles
- [ ] Foto y nombre del autor en hero
- [ ] Caja de resumen (fondo dorado) con texto completo
- [ ] Introduccion con parrafos formateados
- [ ] Todas las secciones H2 visibles con iconos
- [ ] Listas con checks verdes o alertas rojas segun corresponda
- [ ] Seccion de FAQ con preguntas y respuestas (si aplica)
- [ ] Caja de conclusion dorada con boton CTA
- [ ] Fuentes citadas al final
- [ ] Sidebar con perfil del autor y link "Ver Perfil"
- [ ] Articulos relacionados (3 cards debajo del articulo)
- [ ] Botones de compartir funcionan
- [ ] Barra de progreso de lectura visible al hacer scroll
- [ ] Formulario de contacto despues del articulo
- [ ] Version en ingles tiene contenido traducido (no espanol mezclado)

---

## FASE 5: ABOGADOS (21 paginas x 2 idiomas = 42)

### Listado de abogados
- [ ] `/es/abogados` — Grid de abogados con fotos, nombres y roles
- [ ] `/en/abogados`

### Perfiles individuales (verificar al menos 5)
- [ ] `/es/abogados/manuel-solis` — Foto, bio, especialidades, articulos escritos
- [ ] `/es/abogados/manuel-solis-iii`
- [ ] `/es/abogados/juan-solis`
- [ ] `/es/abogados/andrew-fink`
- [ ] `/es/abogados/ni-yan`

### Checklist por perfil de abogado
- [ ] Foto profesional visible
- [ ] Nombre y titulo/rol
- [ ] Biografia o descripcion
- [ ] Especialidades o areas de practica
- [ ] Articulos escritos (si es Manuel Solis, deben aparecer los 29 blogs)
- [ ] CTA de contacto

---

## FASE 6: LANDING PAGES CIUDAD x SERVICIO (25 paginas x 2 idiomas = 50)

Estas paginas son criticas para SEO local. Verificar que el contenido sea unico por ciudad.

### Inmigracion (8)
- [ ] `/es/abogado-inmigracion-houston`
- [ ] `/es/abogado-inmigracion-dallas`
- [ ] `/es/abogado-inmigracion-chicago`
- [ ] `/es/abogado-inmigracion-los-angeles`
- [ ] `/es/abogado-inmigracion-el-paso`
- [ ] `/es/abogado-inmigracion-memphis`
- [ ] `/es/abogado-inmigracion-denver`
- [ ] `/es/abogado-inmigracion-harlingen`

### Accidentes (2)
- [ ] `/es/abogado-accidentes-houston`
- [ ] `/es/abogado-accidentes-dallas`

### Defensa de Deportacion (5)
- [ ] `/es/defensa-deportacion-houston`
- [ ] `/es/defensa-deportacion-dallas`
- [ ] `/es/defensa-deportacion-chicago`
- [ ] `/es/defensa-deportacion-los-angeles`
- [ ] `/es/defensa-deportacion-el-paso`

### Visa U (4)
- [ ] `/es/visa-u-houston`
- [ ] `/es/visa-u-chicago`
- [ ] `/es/visa-u-los-angeles`
- [ ] `/es/visa-u-dallas`

### Asilo (3)
- [ ] `/es/asilo-politico-houston`
- [ ] `/es/asilo-politico-chicago`
- [ ] `/es/asilo-politico-los-angeles`

### VAWA (3)
- [ ] `/es/vawa-houston`
- [ ] `/es/vawa-chicago`
- [ ] `/es/vawa-dallas`

### Checklist por landing page
- [ ] H1 incluye ciudad + servicio (ej: "Abogado de Inmigracion en Houston")
- [ ] Direccion de oficina local visible
- [ ] Telefono local (no el generico)
- [ ] Contenido especifico a la ciudad (no copia exacta de otra ciudad)
- [ ] Formulario de contacto funcional
- [ ] Version en ingles disponible y traducida

---

## FASE 7: PAGINAS DE INFORMACION Y LEGALES

### Informacion
- [ ] `/es/informacion/faq` — Preguntas frecuentes visibles y expandibles
- [ ] `/es/informacion/noticias`
- [ ] `/es/informacion/recursos`
- [ ] `/es/informacion/nosotros`

### Legales
- [ ] `/es/privacidad` — Politica de privacidad completa
- [ ] `/es/terminos` — Terminos de uso
- [ ] `/en/terms` — Terms in English
- [ ] `/es/sms-terminos` — Terminos SMS
- [ ] `/es/politica-editorial` — Politica editorial

### Otras paginas
- [ ] `/es/testimonios` — Videos y testimonios de clientes
- [ ] `/es/acceso-clientes` — Portal de clientes (`/es/clientes` era un placeholder: se retiró y redirige aquí con 308)
- [ ] `/es/clientes-detenidos` — Info para clientes detenidos
- [ ] `/es/join-in` — Pagina de reclutamiento
- [ ] `/es/inversionistas` — Pagina de inversionistas / E-2

### Categorias
- [ ] `/es/category/derechos-de-migrantes`
- [ ] `/es/category/proteccion-legal-para-migrantes`

---

## FASE 8: FUNCIONALIDADES GLOBALES

Estas funcionalidades deben verificarse desde multiples paginas.

### 8.1 Navegacion (Header)
- [ ] Logo enlaza al home
- [ ] Menu de servicios despliega dropdown con 6+ opciones
- [ ] Menu de oficinas despliega con agrupacion por estado
- [ ] Links de "Clientes Detenidos", "Testimonios", "Blog" funcionan
- [ ] Boton de telefono visible y funcional
- [ ] Boton de idioma (ES/EN) cambia idioma sin perder la pagina actual
- [ ] Header se vuelve opaco al hacer scroll
- [ ] En mobile: hamburger menu abre y cierra correctamente
- [ ] En mobile: submenus se expanden dentro del menu

### 8.2 Footer
- [ ] Logo visible
- [ ] Links de navegacion funcionan
- [ ] Iconos de redes sociales (5): Facebook, Twitter, Instagram, YouTube, LinkedIn
- [ ] Cada red social abre en nueva pestana el perfil correcto
- [ ] Disclaimer de SMS visible
- [ ] Links legales (Privacidad, Terminos, etc.) funcionan
- [ ] Ano de copyright es 2026
- [ ] Boton "Volver arriba" funciona

### 8.3 Boton de WhatsApp
- [ ] Visible en esquina inferior (desktop y mobile)
- [ ] Abre WhatsApp con numero correcto (713-855-7219)
- [ ] Incluye mensaje pre-escrito

### 8.4 Chat IA (Nora)
- [ ] Boton visible
- [ ] Al hacer clic abre ventana de chat
- [ ] Enviar un mensaje y verificar que responde
- [ ] Se puede cerrar el chat

### 8.5 Barra Sticky Mobile
- [ ] Solo visible en mobile
- [ ] Boton de llamada funciona
- [ ] No tapa contenido importante

### 8.6 Cambio de Idioma
Probar desde al menos 5 paginas diferentes:
- [ ] Homepage: `/es` <-> `/en`
- [ ] Servicio: `/es/servicios/inmigracion` <-> `/en/servicios/inmigracion`
- [ ] Blog: `/es/blog/tps-2026-paises-elegibles-renovacion` <-> `/en/blog/...`
- [ ] Oficina: `/es/oficinas/dallas` <-> `/en/oficinas/dallas`
- [ ] Landing: `/es/abogado-inmigracion-houston` <-> `/en/abogado-inmigracion-houston`

---

## FASE 9: SEO Y METADATA

Usar la extension "Meta SEO Inspector" o DevTools > Elements > head.

### 9.1 Verificar en 10 paginas representativas
Para cada una, abrir DevTools y revisar el `<head>`:

| Pagina | title | description | canonical | og:image | hreflang es | hreflang en |
|---|---|---|---|---|---|---|
| `/es` (home) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/es/servicios/inmigracion` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/es/oficinas/houston-principal` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/es/blog/tps-2026-paises-elegibles-renovacion` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/es/abogados/manuel-solis` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/es/abogado-inmigracion-houston` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/en` (home EN) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/en/servicios/accidentes` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/en/blog/fraude-notarios-inmigracion` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| `/en/oficinas/chicago` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### 9.2 Structured Data (JSON-LD)
En DevTools > Elements, buscar `<script type="application/ld+json">`:

- [ ] Homepage: tiene Organization schema + Website schema
- [ ] Blog post: tiene BlogPosting schema + BreadcrumbList
- [ ] Servicio: tiene LegalService schema + BreadcrumbList
- [ ] Oficina: tiene LocalBusiness schema + BreadcrumbList
- [ ] Servicio con FAQ: tiene FAQPage schema (inmigracion, accidentes, familia, ley-criminal, seguros)

### 9.3 Sitemap
- [ ] `https://www.manuelsolis.com/sitemap.xml` — Carga y lista todas las URLs
- [ ] Contiene los 10 blogs nuevos
- [ ] Cada URL tiene version /es y /en

### 9.4 Robots.txt
- [ ] `https://www.manuelsolis.com/robots.txt` — Permite Googlebot
- [ ] Apunta al sitemap correcto

---

## FASE 10: RENDIMIENTO Y ACCESIBILIDAD

### 10.1 Lighthouse (Chrome DevTools > Lighthouse)
Correr Lighthouse en al menos 3 paginas:

| Pagina | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Homepage `/es` | [ ] >70 | [ ] >85 | [ ] >85 | [ ] >90 |
| Blog post | [ ] >70 | [ ] >85 | [ ] >85 | [ ] >90 |
| Servicio | [ ] >70 | [ ] >85 | [ ] >85 | [ ] >90 |

### 10.2 Accesibilidad basica
- [ ] Tab navigation: se puede navegar con Tab por el header y contenido
- [ ] Skip-to-content: al presionar Tab en la primera carga, aparece "Saltar al contenido"
- [ ] Focus visible: los elementos enfocados tienen borde dorado
- [ ] Imagenes: no hay imagenes sin alt text (revisar en Lighthouse)
- [ ] Contraste: texto legible sobre fondo oscuro

### 10.3 Mobile
- [ ] Homepage se ve bien en iPhone SE (375px)
- [ ] Homepage se ve bien en iPad (768px)
- [ ] Menu hamburger funciona
- [ ] Formularios se pueden llenar en mobile
- [ ] Botones tienen tamano minimo tactil (no son muy chicos)

---

## FASE 11: PAGINA 404

- [ ] Visitar una URL inexistente (ej: `/es/pagina-que-no-existe`)
- [ ] Aparece pagina 404 personalizada (no la default de Next.js)
- [ ] Muestra "404" en grande con gradiente dorado
- [ ] Tiene 3 botones: Ir al Inicio, Ver Servicios, Llamar
- [ ] Los 3 botones funcionan

---

## FASE 12: CROSS-BROWSER (Opcional pero recomendado)

Verificar las paginas criticas (home, 1 servicio, 1 blog, 1 oficina) en:
- [ ] Chrome (desktop)
- [ ] Safari (desktop o iOS)
- [ ] Firefox (desktop)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

---

## REGISTRO DE PROBLEMAS ENCONTRADOS

| # | Pagina | Idioma | Problema | Severidad | Estado |
|---|---|---|---|---|---|
| 1 | | | | Alta/Media/Baja | Pendiente |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

### Niveles de severidad
- **Alta:** La pagina no carga, link roto, formulario no envia, contenido en idioma incorrecto
- **Media:** Imagen rota, texto cortado, alineacion desajustada, traduccion incompleta
- **Baja:** Typo, espaciado menor, animacion lenta, detalle visual

---

## NOTAS FINALES

1. **Los 10 blogs nuevos no tienen imagenes de portada todavia.** Usaran la imagen generica del sitio (`/home-image.jpg`). Cuando se creen las imagenes, se actualizaran en el codigo.

2. **Prioridad de revision:** Fase 1 > Fase 4 (blogs nuevos) > Fase 2 > Fase 8 > Fase 9 > resto.

3. **Cada pagina debe revisarse en ambos idiomas.** Si el tiempo es limitado, priorizar espanol (es el idioma principal del publico).

4. **Si encuentras contenido en espanol dentro de una pagina /en (o viceversa),** es un bug de alta severidad. Anotarlo inmediatamente.

5. **Para los blogs nuevos,** prestar especial atencion a que las secciones de FAQ rendericen correctamente como tarjetas con pregunta y respuesta.
