# Reporte Chatly — Contexto completo del despacho y sus oficinas

> **Propósito de este documento.** Reunir, de forma exhaustiva y verificable contra el código fuente del sitio, toda la información de negocio del despacho: identidad legal, sedes (físicas y virtuales) con dirección exacta y ZIP, áreas de práctica, equipo, idiomas y contacto. Está pensado como contexto para alimentar un asistente conversacional ("Chatly") u otros consumidores que necesiten datos fiables y sin ambigüedades sobre la firma.
>
> Todas las afirmaciones llevan referencia `archivo:línea` para que puedan re-verificarse en el repositorio. Fecha de compilación: **2026-06-18**.

---

## 0. Resumen ejecutivo

**Law Offices of Manuel Solís** (usado también como marca **Manuel Solis Law Firm**) es un despacho de abogados con sede central (headquarters) en **Houston, Texas**, con más de 35 años de trayectoria. Opera:

- **10 oficinas físicas con personal** en 5 estados: Texas, Illinois, California, Colorado y Tennessee.
- **5 sedes virtuales** (centros de negocios Regus / IWG / WeWork) en el área metropolitana de Houston y League City, que solo se atienden **con cita previa** y **no tienen personal permanente en sitio**.

Especialización principal: **inmigración y defensa de deportación, accidentes y lesiones personales, asilo, Visa U y VAWA**. Equipo de **19+ abogados** distribuidos por sede, todos bilingües español-inglés, con atención adicional en chino en Houston Bellaire.

Teléfono central: **(832) 598-0914**. Sitio: **https://www.manuelsolis.com**.

> ⚠️ **Aviso importante sobre el nombre "James Global".** El usuario reportó que el código mezcla "James Global" y "Law Offices of Manuel Solis". En la exploración del repositorio **no se encontró ninguna entidad legal llamada "James Global"** en la capa de datos/presentación actual del sitio. El nombre legal vigente es **Law Offices of Manuel Solís / Manuel Solis Law Firm**. Si "James Global" aparece en algún punto, es probablemente una marca histórica/secundaria fuera de la presencia digital actual. Ver §1.

---

## 1. Identidad legal del despacho

| Concepto | Valor | Referencia |
|---|---|---|
| Nombre legal principal | **Law Offices of Manuel Solís** | `app/[lang]/nosotros/NosotrosClient.tsx:29` |
| Nombre de organización (schema SEO) | **Manuel Solis Law Firm** | `app/lib/officeSchema.ts:25` (`ORG_NAME`) |
| Copyright en el pie de página | © **Manuel Solis Law Firm** | `app/components/Footer.tsx:210` |
| Handle de marca (LinkedIn) | `manuel-solis-law-firm` | `app/lib/collaboratorData.ts:45` |

**Conclusión sobre la mezcla de nombres:**
- "Law Offices of Manuel Solís" y "Manuel Solis Law Firm" se usan **indistintamente**: el primero como nombre legal/formal y el segundo como nombre de organización en marketing, redes y schema SEO.
- **"James Global" no figura** como entidad en los archivos del sitio. Recomendación: si el negocio efectivamente usa "James Global" en algún contrato, factura o marca, debe documentarse explícitamente y unificarse; hoy el sitio NO lo refleja.

**Datos corporativos adicionales:**
- Año de fundación: **1990** — `app/lib/cityServiceData.ts:410`
- Experiencia declarada: **30+ años** (perfil del fundador, `app/lib/attorneyData.ts:76`) y **35+ años** (landing pages, `app/lib/cityServiceData.ts:406-407`).
- Casos ganados (cifra de marketing): **50,000+** a nivel nacional — `app/lib/cityServiceData.ts:434`.
- Cobertura declarada en "Nosotros": **8 oficinas físicas** en estados clave — `app/[lang]/nosotros/NosotrosClient.tsx:41` (nota: la capa de datos de oficinas lista 10 sedes con personal; ver §2).

---

## 2. Oficinas físicas (con personal)

> La **sede principal / headquarters** es **Houston Principal (6657 Navigation Blvd)**. Place ID de Google de la firma: `ChIJaQljAiS8QIYR47Wqon6VsLo` — `app/lib/officesRegistry.ts:17`.

### 2.1 Houston Principal — **SEDE PRINCIPAL / HEADQUARTERS**
- **Ciudad:** Houston, Texas
- **Dirección exacta:** 6657 Navigation Blvd, Houston, **TX 77011**
- **Teléfono:** +1-713-701-1731
- **GPS:** 29.7426, -95.3156
- **Horario:** Lun–Vie 09:00–19:00; Sáb 09:00–16:00
- **Nota:** Edificio propiedad de la familia Solís, contiguo a la oficina de accidentes.
- **Google Business:** https://share.google/ZErZNzC4y9PtCrEJm
- **Ref.:** `app/[lang]/oficinas/houston-principal/page.tsx:16-20,75-76`; `app/lib/officesRegistry.ts:70`

### 2.2 Houston Accidentes
- **Ciudad:** Houston, Texas
- **Dirección exacta:** 6705 Navigation Blvd, Houston, **TX 77011**
- **Teléfono:** +1-713-231-5384
- **GPS:** 29.7426, -95.3156
- **Horario:** 24/7 (atención de emergencias)
- **Nota:** Edificio contiguo al principal, propiedad de la familia Solís; especializado en accidentes.
- **Google Business:** https://share.google/wEP84RY0RqTOqR787
- **Ref.:** `app/[lang]/oficinas/houston-accidentes/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:29`

### 2.3 Houston Bellaire
- **Ciudad:** Houston (zona Bellaire), Texas
- **Dirección exacta:** 9188 Bellaire Blvd, Suite E, Houston, **TX 77036**
- **Teléfono:** +1-713-903-7875
- **GPS:** 29.7051, -95.5459
- **Horario:** Lun–Vie 09:00–19:00; Sáb 08:00–16:00
- **Idiomas:** Inglés, Español, **Chino** (Abogada Ni Yan)
- **Atención especializada:** comunidad asiática (principalmente china)
- **Google Business:** https://share.google/QsSM7vMPmZpPNFPRM
- **Ref.:** `app/[lang]/oficinas/houston-bellaire/page.tsx:16-20,74-77`; `app/lib/attorneyData.ts:173-193`

### 2.4 Dallas
- **Ciudad:** Dallas, Texas
- **Dirección exacta:** 1120 Empire Central Pl, Dallas, **TX 75247**
- **Teléfono:** +1-214-753-8315
- **GPS:** 32.8122, -96.8728
- **Horario:** Lun–Vie 09:00–19:00; Sáb 08:00–16:00
- **Cobertura:** Dallas, Fort Worth, Arlington, Irving, Plano y norte de Texas.
- **Google Business:** https://share.google/sotBoLXMzRVJcTVJ5
- **Ref.:** `app/[lang]/oficinas/dallas/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:42,428-429`

### 2.5 Chicago (Cicero)
- **Ciudad:** Cicero, Illinois (área metropolitana de Chicago)
- **Dirección exacta:** 6000 W Cermak Rd, Cicero, **IL 60804**
- **Teléfono:** +1-312-477-0389
- **GPS:** 41.8517, -87.7745
- **Horario:** Lun–Vie 09:00–18:00; Sáb 08:00–16:00
- **Nota:** ubicación en el corazón de la comunidad latina de Cicero.
- **Google Business:** https://share.google/IwdeP5BMwUKl3rB9G
- **Ref.:** `app/[lang]/oficinas/chicago/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:52,448-449`

### 2.6 Los Ángeles (Pico Rivera)
- **Ciudad:** Pico Rivera, California (área metropolitana de Los Ángeles)
- **Dirección exacta:** 8337 Telegraph Rd, Suite 115, Pico Rivera, **CA 90660**
- **Teléfono:** +1-213-784-1554
- **GPS:** 33.9575, -118.1065
- **Horario:** Lun–Vie 09:00–18:00; Sáb 09:00–14:00
- **Cobertura:** Condado de Los Ángeles, East LA, Downey, Whittier, Montebello, Valle de San Gabriel.
- **Google Business:** https://share.google/VnrxOpNfWDbNYkwjP
- **Ref.:** `app/[lang]/oficinas/losangeles/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:62,467-468`

### 2.7 El Paso
- **Ciudad:** El Paso, Texas
- **Dirección exacta:** 3632 Admiral St, El Paso, **TX 79925**
- **Teléfono:** +1-915-233-7127
- **GPS:** 31.7770, -106.3932
- **Horario:** Lun–Vie 09:00–17:00; Sáb 09:00–14:00
- **Especialización:** asuntos migratorios fronterizos, asilo, miedo creíble.
- **Google Business:** https://share.google/uVjOe9OdhnatA0rr6
- **Ref.:** `app/[lang]/oficinas/el-paso/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:72,485-487`

### 2.8 Memphis
- **Ciudad:** Memphis, Tennessee
- **Dirección exacta:** 3385 Airways Blvd, Suite 320, Memphis, **TN 38116**
- **Teléfono:** +1-901-557-8357
- **GPS:** 35.0673, -89.9928
- **Horario:** Lun–Vie 09:00–17:00; Sáb 09:00–13:00
- **Abogadas destacadas:** Lupita Valenzuela Martinez, Sara James, Roberto García.
- **Google Business:** https://share.google/Fc3ISgQAihcayfmws
- **Ref.:** `app/[lang]/oficinas/memphis/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:82`

### 2.9 Arvada / Denver
- **Ciudad:** Arvada, Colorado (área metropolitana de Denver)
- **Dirección exacta:** 5400 Ward Rd, Building IV, Arvada, **CO 80002**
- **Teléfono:** +1-720-358-8973
- **GPS:** 39.7953, -105.1436
- **Horario:** Lun–Vie 09:00–19:00; Sáb 09:00–14:00
- **Abogados destacados:** Edwin Zavala, Alexis Alvarez.
- **Google Business:** https://share.google/QbeutobA9WchbNPcu
- **Ref.:** `app/[lang]/oficinas/arvada/page.tsx:16-20,73-74`; `app/lib/cityServiceData.ts:92`

### 2.10 Harlingen (Valle del Río Grande)
- **Ciudad:** Harlingen, Texas
- **Dirección exacta:** 320 E Jackson St, Harlingen, **TX 78550**
- **Teléfono:** +1-956-597-7090
- **GPS:** 26.1923, -97.6953
- **Horario:** Lun–Vie 09:00–18:00
- **Nota:** ubicación estratégica en frontera con México.
- **Google Business:** https://share.google/usYVNMsAK6c9gaUWs
- **Ref.:** `app/[lang]/oficinas/harlingen/page.tsx:16-20,73`; `app/lib/cityServiceData.ts:102`

---

## 3. Oficinas virtuales (Regus / IWG / WeWork — solo con cita previa)

> Según la documentación interna del repositorio (investigación OSINT), las siguientes direcciones son **centros de negocios de terceros** (marcas Regus, HQ, Spaces, WeWork). El despacho **sí puede atender clientes ahí, pero únicamente con cita previa**, usando salas compartidas. **No hay personal permanente del despacho en sitio** ni atención 24/7 real (el horario "24/7" publicado corresponde al enrutamiento del call-center central, no a presencia física).
>
> **Ref. maestra:** `app/lib/officesRegistry.ts:52-83` (`VIRTUAL_OFFICE_SLUGS`).

| # | Sede | Dirección exacta | ZIP | Teléfono | Operador | Ref. |
|---|---|---|---|---|---|---|
| 1 | Houston — North Loop | 2950 N Loop W, Suite 500, Houston, TX | 77092 | +1-713-429-0237 | Regus (Brookhollow Central III) | `north-loop/page.tsx:16-20`; `officesRegistry.ts:58` |
| 2 | Houston — Northchase | 16510 Northchase Dr, Houston, TX | 77060 | +1-346-522-4848 | Regus / HQ / IWG | `northchase/page.tsx:16-20`; `officesRegistry.ts:59` |
| 3 | Houston — Main St | 708 Main St, Houston, TX | 77002 | +1-713-842-9575 | WeWork / Spaces / Regus (Great Jones Bldg) | `main-st/page.tsx:16-20`; `officesRegistry.ts:60` |
| 4 | Houston — Kirby | 3730 Kirby Dr, Suite 1200, Houston, TX | 77098 | +1-713-903-7875 | Regus (River Oaks Tower) | `kirby/page.tsx:16-20`; `officesRegistry.ts:61` |
| 5 | League City | 2600 S Shore Blvd, Suite 300, League City, TX | 77573 | +1-832-598-3782 | Regus | `league-city/page.tsx:16-20`; `officesRegistry.ts:62` |

> ⚠️ **Inconsistencia detectada:** el teléfono de **Kirby** (+1-713-903-7875) coincide con el de **Houston Bellaire**, y el Google Business listado para Main St coincide con el de Memphis. Conviene revisar/depurar estos datos duplicados.

---

## 4. Áreas de práctica / servicios

Fuente: `app/lib/cityServiceData.ts:109-383`.

1. **Inmigración y defensa de deportación** — residencia permanente, ciudadanía, permisos de trabajo, peticiones familiares, visas humanitarias. (`:121-162`)
2. **Accidentes y lesiones personales** — accidentes de auto, de camión, laborales, negligencia médica. (`:163-206`)
3. **Defensa contra deportación** — cancelación de remoción, apelaciones ante la BIA, representación ante jueces de inmigración (EOIR). (`:207-250`)
4. **Visa U para víctimas de crimen** — estatus legal, permiso de trabajo, camino a residencia. (`:251-294`)
5. **Asilo político** — persecución por raza, religión, nacionalidad, opinión política o grupo social. (`:295-338`)
6. **VAWA (Violence Against Women Act)** — auto-petición para víctimas de violencia doméstica. (`:339-383`)

Áreas adicionales mencionadas sin detalle extenso: **Derecho de familia, Derecho penal/criminal, Seguros, Visa E-2 (inversionista)**.

---

## 5. Equipo

### 5.1 Fundador y socios principales
| Nombre | Rol | Sede | Especialidad | Ref. |
|---|---|---|---|---|
| **Manuel Solis** | Fundador y abogado principal (30+ años) | Houston | General / inmigración | `attorneyData.ts:54-78` |
| **Manuel E. Solis III** | Abogado | Houston | Inmigración | `:79-100` |
| **Juan Solis** | Abogado | Houston | Inmigración, litigios civiles y de seguros | `:101-122` |

### 5.2 Socios / litigios
| Nombre | Sede | Especialidad | Ref. |
|---|---|---|---|
| **Andrew Fink** | Chicago | Lesiones personales, negligencia médica (~50 juicios con jurado) | `:125-146` |
| **Gregory Finney** | Houston | Director de litigio civil; litigios comerciales complejos, fraude, energía | `:147-171` |
| **Ni Yan** | Bellaire (Houston) | Inmigración, comunidad asiática; 5,000+ casos; trilingüe (inglés/español/chino) | `:172-193` |

### 5.3 Abogados por sede
- **Dallas:** Mark McBroom (`:194-215`).
- **El Paso:** Victor Rojas (`:290-314`).
- **Chicago:** Andrew Fink, Ana Patricia Rueda (`:217-237`), Eduardo Garcia (`:394-418`).
- **Memphis:** Sara James (`:370-393`), Lupita Valenzuela Martinez (`:504-537`), Roberto García (`:539-562`).
- **Denver / Arvada:** Edwin Zavala (`:239-259`), Alexis Alvarez (`:420-443`).
- **Los Ángeles:** Edward S. Reisman (`:445-468`).
- **Houston (otras especialidades):** Gabriel Perez (lesiones/seguros, `:345-368`), Austen Gunnels (accidentes marítimos y de vehículos, `:316-343`), Alejandro Manzano (inmigración/EOIR, `:261-287`).

### 5.4 Equipo no abogado (colaboradores)
| Nombre | Cargo | Email | Ref. |
|---|---|---|---|
| **Jennifer Olvera** | Marketing Operations Manager | jolverag@manuelsolis.com | `collaboratorData.ts:125-152` |

---

## 6. Idiomas

- **Español e inglés:** en todas las sedes (soporte bilingüe).
- **Chino:** en Houston Bellaire (Abogada Ni Yan) — `houston-bellaire/page.tsx:77`; `attorneyData.ts:173-193`.

---

## 7. Contacto y presencia digital

| Canal | Valor | Ref. |
|---|---|---|
| Teléfono central | **(832) 598-0914** | `cityServiceData.ts:7` (`MAIN_PHONE`) |
| Sitio web | **https://www.manuelsolis.com** | `sitemapData.ts:15`; `collaboratorData.ts:23` |
| Facebook | https://www.facebook.com/AbogadoManuelSolisOficial/ | `collaboratorData.ts:40-47`; `Footer.tsx:28-34` |
| Instagram | https://www.instagram.com/abogadomanuelsolisoficial/ | idem |
| YouTube | https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg | idem |
| LinkedIn | https://www.linkedin.com/company/manuel-solis-law-firm/ | idem |
| X (Twitter) | https://twitter.com/AbogadoMSolis | idem |

---

## 8. Notas, inconsistencias y recomendaciones

1. **"James Global" ausente del sitio.** No aparece como entidad legal en el código. Aclarar con el negocio si es marca histórica; si se sigue usando, documentarla y unificar el naming.
2. **Conteo de oficinas inconsistente.** "Nosotros" dice 8 oficinas físicas, pero la capa de datos lista 10 sedes con personal. Alinear el copy.
3. **Datos de contacto duplicados** en oficinas virtuales (teléfono Kirby = Bellaire; Google Business Main St = Memphis). Depurar.
4. **Horario "24/7" en sedes virtuales** refleja el call-center, no presencia física. Evitar comunicar atención presencial 24/7 en esas direcciones.
5. **Dos cifras de experiencia** (30+ vs 35+ años) y de fundación (1990). Estandarizar el mensaje.

> Este documento es solo un **espejo del estado actual del código** a la fecha indicada. Cualquier cambio en `app/lib/*` o en las páginas `app/[lang]/oficinas/*` debe reflejarse aquí.
