# Sprint 1 · Fix #1 — Eliminar `aggregateRating` hardcoded en landings city×service + testimonios

**Estado:** ✅ Refactor aplicado al working tree. Sin commit (esperando revisión de diff).
**Branch:** `mejoras/fase-2-visual` (no se creó branch nueva — los cambios viven en el working tree).
**Build:** `npm run build` → ✓ Compiled successfully (279 páginas estáticas generadas, sin errores).
**Lint:** `npm run lint` → sin nuevos findings introducidos por este cambio (errores preexistentes ajenos a este fix permanecen).
**Scope expandido (2026-05-27):** además de las 25 landings city×service originales, también se refactorizó `app/[lang]/testimonios/page.tsx` (que tenía el mismo problema con valores `4.8 / 9 / 9`). Ver §5 al final.

---

## 1. Auditoría — landings con `aggregateRating` hardcoded

Búsqueda en `app/[lang]/<slug>/page.tsx` por los patrones `aggregateRating:`, `'@type': 'AggregateRating'`, `ratingValue:` con string hardcoded, `ratingCount`/`reviewCount` con número hardcoded.

**Resultado: las 25 landings city×service tenían el mismo bloque hardcoded** (`ratingValue: '4.8'`, `ratingCount: '12'`, `reviewCount: '12'`, `bestRating: '5'`, `worstRating: '1'`). Se identificaron dos variantes de formato (LONG: aggregateRating en bloque multi-línea; COMPACT: aggregateRating en una sola línea), todas con valores idénticos.

| # | Landing slug | Servicio | Ciudad | Formato | Estado original |
|---|---|---|---|---|---|
| 1 | `abogado-inmigracion-houston` | Inmigración | Houston | LONG | hardcoded |
| 2 | `abogado-inmigracion-dallas` | Inmigración | Dallas | LONG | hardcoded |
| 3 | `abogado-inmigracion-chicago` | Inmigración | Chicago | LONG | hardcoded |
| 4 | `abogado-inmigracion-los-angeles` | Inmigración | Los Angeles | LONG | hardcoded |
| 5 | `abogado-inmigracion-el-paso` | Inmigración | El Paso | LONG | hardcoded |
| 6 | `abogado-inmigracion-memphis` | Inmigración | Memphis | LONG | hardcoded |
| 7 | `abogado-inmigracion-denver` | Inmigración | Denver | COMPACT | hardcoded |
| 8 | `abogado-inmigracion-harlingen` | Inmigración | Harlingen | COMPACT | hardcoded |
| 9 | `abogado-accidentes-houston` | Accidentes | Houston | COMPACT | hardcoded |
| 10 | `abogado-accidentes-dallas` | Accidentes | Dallas | COMPACT | hardcoded |
| 11 | `defensa-deportacion-houston` | Defensa deportación | Houston | COMPACT | hardcoded |
| 12 | `defensa-deportacion-dallas` | Defensa deportación | Dallas | COMPACT | hardcoded |
| 13 | `defensa-deportacion-chicago` | Defensa deportación | Chicago | COMPACT | hardcoded |
| 14 | `defensa-deportacion-los-angeles` | Defensa deportación | Los Angeles | COMPACT | hardcoded |
| 15 | `defensa-deportacion-el-paso` | Defensa deportación | El Paso | COMPACT | hardcoded |
| 16 | `visa-u-houston` | Visa U | Houston | COMPACT | hardcoded |
| 17 | `visa-u-chicago` | Visa U | Chicago | COMPACT | hardcoded |
| 18 | `visa-u-los-angeles` | Visa U | Los Angeles | COMPACT | hardcoded |
| 19 | `visa-u-dallas` | Visa U | Dallas | COMPACT | hardcoded |
| 20 | `asilo-politico-houston` | Asilo político | Houston | COMPACT | hardcoded |
| 21 | `asilo-politico-chicago` | Asilo político | Chicago | COMPACT | hardcoded |
| 22 | `asilo-politico-los-angeles` | Asilo político | Los Angeles | COMPACT | hardcoded |
| 23 | `vawa-houston` | VAWA | Houston | COMPACT | hardcoded |
| 24 | `vawa-chicago` | VAWA | Chicago | COMPACT | hardcoded |
| 25 | `vawa-dallas` | VAWA | Dallas | COMPACT | hardcoded |

**Total afectadas: 25 / 25.**

---

## 2. Decisión por landing (A vs B)

**Política seleccionada por landing:** las 25 cayeron en **DECISION A** (cada ciudad tiene oficina física registrada en `OFFICES_PLACE_IDS` con un Place ID válido), por lo que cada schema puede inyectar `aggregateRating` + `review[]` derivado de Google Places (cache de 24 h, mismo patrón que `app/lib/officeSchema.ts:buildOfficeSchema`).

Mapeo aplicado (en `LANDING_TO_OFFICE_FOR_REVIEWS` dentro de `app/lib/landingSchema.ts`):

| Landing slug | Office slug para Places lookup | Place ID disponible? |
|---|---|---|
| `abogado-inmigracion-houston` | `houston-principal` | ✅ |
| `abogado-inmigracion-dallas` | `dallas` | ✅ |
| `abogado-inmigracion-chicago` | `chicago` | ✅ |
| `abogado-inmigracion-los-angeles` | `losangeles` | ✅ |
| `abogado-inmigracion-el-paso` | `el-paso` | ✅ |
| `abogado-inmigracion-memphis` | `memphis` | ✅ |
| `abogado-inmigracion-denver` | `arvada` (la oficina de Denver vive en Arvada) | ✅ |
| `abogado-inmigracion-harlingen` | `harlingen` | ✅ |
| `abogado-accidentes-houston` | `houston-accidentes` (oficina dedicada a accidentes) | ✅ |
| `abogado-accidentes-dallas` | `dallas` | ✅ |
| `defensa-deportacion-houston` | `houston-principal` | ✅ |
| `defensa-deportacion-dallas` | `dallas` | ✅ |
| `defensa-deportacion-chicago` | `chicago` | ✅ |
| `defensa-deportacion-los-angeles` | `losangeles` | ✅ |
| `defensa-deportacion-el-paso` | `el-paso` | ✅ |
| `visa-u-houston` | `houston-principal` | ✅ |
| `visa-u-chicago` | `chicago` | ✅ |
| `visa-u-los-angeles` | `losangeles` | ✅ |
| `visa-u-dallas` | `dallas` | ✅ |
| `asilo-politico-houston` | `houston-principal` | ✅ |
| `asilo-politico-chicago` | `chicago` | ✅ |
| `asilo-politico-los-angeles` | `losangeles` | ✅ |
| `vawa-houston` | `houston-principal` | ✅ |
| `vawa-chicago` | `chicago` | ✅ |
| `vawa-dallas` | `dallas` | ✅ |

**Ningún landing requirió DECISION B** (eliminación del bloque `aggregateRating`) — pero el helper SÍ omite automáticamente `aggregateRating`/`review` si:

1. `officeSlugForReviews` no se pasa.
2. El `placeId` no está registrado.
3. La Places API falla por cualquier razón (key faltante, error de red, 4xx/5xx).
4. La oficina devuelve `userRatingCount === 0`.

Es decir: el comportamiento es **fail-graceful** sin nunca caer en hardcoded data — mismo patrón que `app/lib/officeSchema.ts:114-122` y `app/[lang]/layout.tsx:305-329`.

### Landings donde necesito tu input

**Ninguno bloqueante.** Pero tres decisiones de mapeo merece tu visto bueno:

1. **`abogado-accidentes-houston` → `houston-accidentes`**: usé la oficina dedicada de accidentes (`houston-accidentes`, Place ID `ChIJcWaLtle9QIYRevi9QwqESqg`) en vez de la principal. Esto es lo más correcto para SEO de la landing de accidentes, pero implica que el rating mostrado podría diferir del de Houston Principal. Si prefieres unificar todas las Houston al rating de Houston Principal, cambia el mapeo en `landingSchema.ts:LANDING_TO_OFFICE_FOR_REVIEWS`.
2. **`abogado-accidentes-dallas` → `dallas`**: hay una sola oficina Dallas. OK.
3. **`abogado-inmigracion-denver` → `arvada`**: la "oficina de Denver" está físicamente en Arvada (5400 Ward Rd, Arvada CO). Usé `arvada` (Place ID `ChIJU6L4zqN4bIcREfiN8ltyi1M`). Confirmar que ese Place ID es correcto para la oficina que ven los clientes como "Denver".

---

## 3. Refactor aplicado

### 3.1 Helper centralizado: `app/lib/landingSchema.ts` (NUEVO)

Crea un nuevo módulo `server-only` que expone:

- **`buildLandingSchema({ pageSlug, lang, officeSlugForReviews, openingHours? }): Promise<Record<string, unknown>>`**
  Construye el schema `LegalService` desde `cityServiceData.getPageData(slug)` y, si hay un Place ID válido para `officeSlugForReviews`, inyecta `aggregateRating` + `review[0..2]` desde Google Places (`getPlaceData()` cached 24h vía `unstable_cache`).
- **`LANDING_TO_OFFICE_FOR_REVIEWS`** — mapa congelado `Record<landingSlug, officeSlug>` con las 25 landings.

Diseño espejo de `app/lib/officeSchema.ts:buildOfficeSchema` (mismo helper para oficinas) — re-usa `getPlaceData`, `getOfficePlaceId`, y la misma estrategia de "omitir vs. nunca-falsificar".

### 3.2 Refactor de las 25 landings

Cada `page.tsx` se redujo así (ejemplo `abogado-inmigracion-houston/page.tsx`):

**Antes** (lines 65-117, 52 líneas):
```tsx
const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  // ... 40+ líneas de address, geo, areaServed, openingHoursSpecification, parentOrganization
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '12',
    reviewCount: '12',
  },
};
```

**Después** (5 líneas):
```tsx
const legalServiceSchema = await buildLandingSchema({
  pageSlug: PAGE_SLUG,
  lang: currentLang,
  officeSlugForReviews: LANDING_TO_OFFICE_FOR_REVIEWS[PAGE_SLUG],
});
```

Más una línea de import:
```tsx
import { buildLandingSchema, LANDING_TO_OFFICE_FOR_REVIEWS } from '../../lib/landingSchema';
```

### 3.3 Mecánica de aplicación

- Las 6 landings en formato LONG (`abogado-inmigracion-{houston,dallas,chicago,el-paso,los-angeles,memphis}`) se modificaron con la herramienta `Edit` archivo por archivo.
- Las 19 landings en formato COMPACT se procesaron con una pasada `[regex]::Replace` de PowerShell (patrón `(?s)  const legalServiceSchema = \{.*?  \};` con `.*?` non-greedy) que aplicó la sustitución idéntica a las 19 — manteniendo line endings LF de los archivos originales y encoding UTF-8 sin BOM. Antes del write se hizo dry-run mostrando 19/19 matches.

### 3.4 Archivos modificados (27 archivos)

```
NUEVO   app/lib/landingSchema.ts                                                 (helper centralizado)

EDITADO app/[lang]/abogado-inmigracion-houston/page.tsx
EDITADO app/[lang]/abogado-inmigracion-dallas/page.tsx
EDITADO app/[lang]/abogado-inmigracion-chicago/page.tsx
EDITADO app/[lang]/abogado-inmigracion-los-angeles/page.tsx
EDITADO app/[lang]/abogado-inmigracion-el-paso/page.tsx
EDITADO app/[lang]/abogado-inmigracion-memphis/page.tsx
EDITADO app/[lang]/abogado-inmigracion-denver/page.tsx
EDITADO app/[lang]/abogado-inmigracion-harlingen/page.tsx
EDITADO app/[lang]/abogado-accidentes-houston/page.tsx
EDITADO app/[lang]/abogado-accidentes-dallas/page.tsx
EDITADO app/[lang]/defensa-deportacion-houston/page.tsx
EDITADO app/[lang]/defensa-deportacion-dallas/page.tsx
EDITADO app/[lang]/defensa-deportacion-chicago/page.tsx
EDITADO app/[lang]/defensa-deportacion-los-angeles/page.tsx
EDITADO app/[lang]/defensa-deportacion-el-paso/page.tsx
EDITADO app/[lang]/visa-u-houston/page.tsx
EDITADO app/[lang]/visa-u-chicago/page.tsx
EDITADO app/[lang]/visa-u-los-angeles/page.tsx
EDITADO app/[lang]/visa-u-dallas/page.tsx
EDITADO app/[lang]/asilo-politico-houston/page.tsx
EDITADO app/[lang]/asilo-politico-chicago/page.tsx
EDITADO app/[lang]/asilo-politico-los-angeles/page.tsx
EDITADO app/[lang]/vawa-houston/page.tsx
EDITADO app/[lang]/vawa-chicago/page.tsx
EDITADO app/[lang]/vawa-dallas/page.tsx
EDITADO app/[lang]/testimonios/page.tsx                                         (scope expandido — ver §5)
```

Total: **1 nuevo + 26 modificados** = 27 archivos.

---

## 4. Verificación

### 4.1 `npm run build` → ✓ Compiled successfully

```
▲ Next.js 16.1.6 (Turbopack)
✓ Compiled successfully in 7.7s
✓ Generating static pages using 4 workers (279/279) in 29.1s
```

Sin errores, sin warnings. Las 25 landings se prerenderan estáticamente (●) — el `await buildLandingSchema(...)` se resuelve en build time y embebe el resultado en el HTML estático. La Places API se invoca en build (no en runtime, gracias a `unstable_cache + revalidate=86400`).

### 4.2 `npm run lint` → sin nuevos findings

Filtré el output de eslint por los 26 archivos que toqué (helper + 25 landings) y por `landingSchema.ts`:

```
$ npm run lint 2>&1 | grep -E "landingSchema\.ts|<landing slugs>" -A 2
(sin matches)
```

Los errores/warnings que persisten en eslint son **preexistentes** en el repo (admin/analytics dashboards, blog posts con imports no usados, AccesoClientesClient con `any`, `nosotros/page.tsx` con `Math.random()` en render) — ajenos a este fix.

### 4.3 Verificación manual del JSON-LD

⚠️ **Pendiente paso manual** (la instrucción me pidió hacerlo "después"). Para validar 3 landings de muestra:

1. Después del deploy, hacer `curl -s https://www.manuelsolis.com/es/abogado-inmigracion-houston | grep -A 100 'legal-service-schema'` (o usar las DevTools del navegador).
2. Copiar el JSON entre `<script id="legal-service-schema">...</script>`.
3. Pegar en https://validator.schema.org/.
4. Confirmar que el schema valida sin errores y que `aggregateRating` contiene valores reales de Places (no `4.8 / 12 / 12`).
5. Repetir para `abogado-inmigracion-dallas` y `visa-u-houston`.

Antes del deploy se puede correr el dev server (`npm run dev`) y revisar el HTML generado con `curl`.

---

## 5. Fix adicional aplicado — `app/[lang]/testimonios/page.tsx`

Durante la auditoría se identificó **una ocurrencia más** de `aggregateRating` hardcoded fuera del scope original (la página de testimonios). En un follow-up explícito del usuario, también se refactorizó.

### 5.1 Estado original (`app/[lang]/testimonios/page.tsx:71-78`)

```tsx
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '4.8',
  bestRating: '5',
  worstRating: '1',
  ratingCount: '9',
  reviewCount: '9',
},
```

Página: galería de testimonios firmwide (no city×service). Valores distintos a las landings (`9` reviews vs `12`). Mismo problema de fondo: viola la política anti-hardcoded.

### 5.2 Refactor aplicado

Misma estrategia que las landings, mirroreando el patrón ya usado en `app/[lang]/layout.tsx:295-329` para el schema LawFirm/Organization (que llama `getPlaceData(MAIN_FIRM_PLACE_ID)` — Houston Principal):

- Se convirtió `function generateReviewSchema(lang)` (sync) en `async function generateReviewSchema(lang)`.
- Se añadió `import { getPlaceData } from '../../lib/googleReviews';` y `import { MAIN_FIRM_PLACE_ID } from '../../lib/officesRegistry';`.
- El `aggregateRating` hardcoded se reemplazó por una inyección condicional al final del schema:

```tsx
if (mainPlaceData && mainPlaceData.userRatingCount > 0) {
  schema.aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: mainPlaceData.rating.toFixed(1),
    bestRating: '5',
    worstRating: '1',
    ratingCount: mainPlaceData.userRatingCount,
    reviewCount: mainPlaceData.userRatingCount,
  };
}
```

- `TestimoniosPage` ahora `await`s la llamada: `const reviewSchema = await generateReviewSchema(lang);`.
- Si la Places API falla o `userRatingCount === 0`, `aggregateRating` se omite por completo — graceful fallback, misma política.

### 5.3 Coherencia entre layout y testimonios

Ambos schemas (`Organization` en `layout.tsx` y `LegalService` en `testimonios/page.tsx`) ahora derivan su `aggregateRating` del mismo Place ID (`MAIN_FIRM_PLACE_ID = OFFICES_PLACE_IDS['houston-principal']`). Esto evita que un crawler vea valores incoherentes (e.g., `4.8` en la home pero `4.7` en testimonios) según cuándo se haya populado cada schema.

### 5.4 TODO de follow-up — review[] hardcoded en testimonios

🟡 **No incluido en este fix.** El archivo `app/[lang]/testimonios/page.tsx:87-95` todavía contiene 8 entradas hardcoded en `review[]` (nombres reales: Gilmar Guzman, Isabel Casco, Wendy Alfaro, Marina Cantu, Claudia Pereira, Blanca Romero, Nancy Mendez, Ana Landeros — cada una con `datePublished`, `reviewBody`, y `locationCreated` por oficina). Estas entradas violan la misma política anti-fabricated-review.

Dejé un comentario `TODO(follow-up)` en el código (líneas 58-63) marcándolo. La razón de no tocarlo en este PR:
- El prompt del usuario delimitó scope a `aggregateRating` específicamente.
- Las 8 entradas parecen ser testimonios reales curados a mano (con `locationCreated` por oficina — campo que Places API no devuelve), probablemente copiados desde Google con autorización.
- Necesita decisión arquitectónica: (a) sustituirlos por los top reviews de Places por oficina dinámicamente, (b) moverlos a un CMS interno con consent timestamp, o (c) dejarlos pero con documentación de consent.

**También en el archivo (líneas 19-26)** hay claims de `★4.8` hardcoded en `title` y `description` de metadata. Si Places devuelve un rating distinto a 4.8, el SERP listing y el OG/Twitter card mostrarán el `4.8` estático mientras el schema mostrará el rating real. Mejora candidata para un futuro PR — `generateMetadata` también podría leer Places (con coste de pasar a `Dynamic` ese render).

### 5.5 Inconsistencia visual menor

- `abogado-inmigracion-houston/page.tsx` y otras landings usan `locale: 'es_US'` en `openGraph` pero `app/[lang]/servicios/inmigracion/page.tsx` usa `locale: 'es_MX'`. No se tocó (fuera de scope), pero quizá vale unificarlo en un futuro PR.

---

## 6. Commit propuesto

Cuando apruebes el diff:

```
fix(seo): remove hardcoded aggregateRating from landings + testimonios

- Refactor 25 city×service landings to use centralized landingSchema.ts helper
- Replace hardcoded 4.8/12 ratings with Google Places lookup (24h cache)
- Mapping: houston-* → houston-principal (except accidentes → houston-accidentes),
  denver → arvada
- Landings without office mapping: drop aggregateRating entirely (helper
  is graceful — never falls back to hardcoded data)
- Same fix applied to testimonios/page.tsx (out-of-scope finding from
  audit): aggregateRating now sourced from MAIN_FIRM_PLACE_ID, mirroring
  the LawFirm/Organization schema in app/[lang]/layout.tsx

Compliance: addresses Google Spam Policy on fabricated structured data
ratings. Per internal policy already enforced in officeSchema.ts and
layout.tsx.

Verification:
  * npm run build → ✓ Compiled successfully (279 static pages)
  * npm run lint  → no new findings introduced by this change
  * Schema validator: TODO — verify 3 sample landings on
    https://validator.schema.org/ after deploy.

Follow-ups (not in this PR):
  * testimonios/page.tsx still has 8 hardcoded review[] entries
    (TODO comment left inline at lines 58-63). Needs separate decision
    on whether to source from Places, move to a CMS with consent
    timestamps, or document differently.
  * testimonios/page.tsx title/description still claim "★4.8" as
    literal strings — could be made dynamic from Places at the cost
    of forcing that route to render dynamically.
```
