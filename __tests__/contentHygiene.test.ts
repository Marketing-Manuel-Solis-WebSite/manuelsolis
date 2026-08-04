import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Higiene de contenido: impide que vuelvan los placeholders y las referencias
 * rotas que la auditoría de agosto de 2026 encontró en producción.
 *
 * El caso que motiva este archivo: dos plantillas de correo del boletín
 * enviaban "Lorem ipsum dolor sit amet" como primer párrafo a toda la
 * audiencia, y tres ediciones apuntaban su imagen a un directorio que no
 * existe. Nada en el build fallaba por eso.
 */

const ROOT = path.resolve(__dirname, '..');
const SCANNED_DIRS = ['app', 'emails'];
const CODE_EXT = /\.(ts|tsx)$/;

function collect(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      out.push(...collect(full));
    } else if (CODE_EXT.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const FILES = SCANNED_DIRS.flatMap((d) => collect(path.join(ROOT, d))).map((full) => ({
  rel: path.relative(ROOT, full).split(path.sep).join('/'),
  src: readFileSync(full, 'utf8'),
}));

describe('higiene de contenido', () => {
  it('no queda texto de relleno lorem ipsum', () => {
    const hits = FILES.filter((f) => /lorem\s+ipsum/i.test(f.src)).map((f) => f.rel);
    expect(hits, 'texto de muestra que puede acabar en un correo o en una página real').toEqual([]);
  });

  it('no quedan placeholders de valores sin rellenar', () => {
    // Marcadores del tipo `your_map_link_here` que se colaron en datos de
    // oficina y llegaron a producción. Se buscan como valor de cadena, no en
    // comentarios ni en las guardas defensivas que los detectan en runtime.
    const pattern = /['"`][^'"`]*your_[a-z0-9]+_here[^'"`]*['"`]/i;
    const hits = FILES.filter((f) => {
      const withoutGuards = f.src
        .split('\n')
        .filter((line) => !line.includes('includes(') && !line.trimStart().startsWith('//'))
        .join('\n');
      return pattern.test(withoutGuards);
    }).map((f) => f.rel);
    expect(hits).toEqual([]);
  });

  it('no quedan anclas muertas href="#"', () => {
    const hits = FILES.filter((f) => /href="#"/.test(f.src)).map((f) => f.rel);
    expect(hits, 'un enlace a "#" no lleva a ninguna parte y rompe la navegación por teclado').toEqual([]);
  });

  it('toda ruta de asset del código existe en public/', () => {
    // Excepción justificada: la ayuda del panel muestra un comando de ejemplo
    // para crear un artículo NUEVO, así que su imagen todavía no existe.
    const EXPECTED_MISSING = new Set(['/blog/blog_37/AGO_B1.png']);

    const assetRef =
      /['"`](\/(?!api\/|_next\/|es\/|en\/)[A-Za-z0-9_\-./]+\.(?:png|jpe?g|webp|avif|svg|gif|mp4|pdf|ico))['"`]/g;

    const broken: string[] = [];
    for (const { rel, src } of FILES) {
      for (const match of src.matchAll(assetRef)) {
        const asset = match[1];
        if (EXPECTED_MISSING.has(asset)) continue;
        if (!existsSync(path.join(ROOT, 'public', asset))) broken.push(`${asset} ← ${rel}`);
      }
    }
    expect([...new Set(broken)]).toEqual([]);
  });

  it('ninguna página se anuncia como no terminada en sus metadatos', () => {
    // "En construcción" o "coming soon" en un title/description los indexa
    // Google y los muestra en los resultados.
    const pattern = /(en construcci[óo]n|coming soon|pr[óo]ximamente)/i;
    const hits = FILES.filter((f) => {
      if (!/\/page\.tsx$/.test(f.rel)) return false;
      const metadata = f.src.match(/generateMetadata[\s\S]*?\n}/)?.[0] ?? '';
      // "Lesiones en construcción" es un tipo de accidente laboral, no un aviso
      // de página incompleta: se exige que el término esté en title/description.
      return pattern.test(metadata) && /title|description/.test(metadata);
    }).map((f) => f.rel);
    expect(hits).toEqual([]);
  });
});
