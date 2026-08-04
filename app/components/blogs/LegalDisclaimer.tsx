import React from 'react';
import { Info } from 'lucide-react';

/**
 * Aviso YMYL para contenido legal. Se monta desde RelatedContent (presente en
 * los 35 posts) para que ningún artículo quede sin él.
 */
interface LegalDisclaimerProps {
  lang: 'es' | 'en';
}

export default function LegalDisclaimer({ lang }: LegalDisclaimerProps) {
  const t = lang === 'es'
    ? {
        title: 'Aviso legal',
        body: 'Esta información es educativa y de carácter general: no constituye asesoría legal ni crea una relación abogado-cliente, y no sustituye la consulta con un abogado. Cada caso es distinto y las leyes, los plazos y los criterios de las agencias cambian. Antes de tomar cualquier decisión sobre su caso, consulte con un abogado sobre su situación específica.',
      }
    : {
        title: 'Legal disclaimer',
        body: 'This information is educational and general in nature: it is not legal advice, does not create an attorney-client relationship, and is not a substitute for consulting an attorney. Every case is different, and laws, deadlines and agency policies change. Before making any decision about your case, consult an attorney about your specific situation.',
      };

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-xs font-bold text-white/50 uppercase mb-3 tracking-widest flex items-center gap-2">
        <Info size={12} className="text-[#B2904D]" />
        {t.title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
        {t.body}
      </p>
    </div>
  );
}
