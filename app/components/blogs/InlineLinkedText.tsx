import { linkPlainText, type InlineLinkState } from '../../lib/blogInlineLinks';

/**
 * Pinta el cuerpo de una sección con su enlace contextual, si le toca.
 *
 * Sustituye a `{t.sections.whatIs.text}` en los 35 artículos escritos a mano.
 * Esos cuerpos nunca pasaban por el inyector —solo lo hacía `t.intro`— y ahí
 * es donde estaba el término vivo de la mayoría de los artículos que se
 * quedaban sin enlace. Lo midió la guía de clústeres para el español y lo
 * confirmó eSEOspace: el bloqueo era el conjunto escaneado, no la falta de
 * contenido.
 *
 * Devuelve elementos de React, no HTML: el texto sigue escapado por React
 * exactamente igual que antes de este cambio. Ver `linkPlainText`.
 *
 * El `state` es el MISMO objeto que usa `addInlineLinks` en el `intro` del
 * artículo, así que el tope de tres enlaces y el "un destino una sola vez"
 * cuentan sobre el artículo entero y no por sección.
 */
export default function InlineLinkedText({
  text,
  lang,
  state,
}: {
  text: string;
  lang: 'es' | 'en';
  state: InlineLinkState;
}) {
  const partes = linkPlainText(text, lang, state);

  // Sin enlace, se devuelve la cadena tal cual: ni un envoltorio de más en el
  // 90 % de los casos.
  if (partes.length === 1) return <>{partes[0].valor}</>;

  return (
    <>
      {partes.map((p, i) =>
        p.tipo === 'enlace' ? (
          <a
            key={i}
            href={p.href}
            className="text-[#B2904D] underline decoration-[#B2904D]/40 hover:decoration-[#B2904D] underline-offset-2"
          >
            {p.valor}
          </a>
        ) : (
          <span key={i}>{p.valor}</span>
        ),
      )}
    </>
  );
}
