/**
 * Icono de TikTok.
 *
 * Va a mano porque `lucide-react` no lo trae: de marcas solo exporta Facebook,
 * Instagram, Linkedin, Twitter y Youtube, que son restos de cuando la librería
 * incluía logos. No hay `Tiktok` ni lo va a haber.
 *
 * La firma imita la de un icono de lucide —`size` y `className`, 24×24 por
 * defecto— para que entre en los mismos sitios donde hoy va un `icon:
 * Facebook`, sin envoltorios ni condicionales en quien lo pinta.
 *
 * A diferencia de los de lucide, el logo de TikTok es una silueta rellena y no
 * un trazo: usa `fill="currentColor"` y `stroke="none"`. Hereda el color del
 * texto igual que los demás, así que los `hover:` del pie siguen funcionando.
 */
export default function TikTok({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12v-3.2a5.72 5.72 0 0 0-.77-.05A5.73 5.73 0 0 0 4.13 15.3a5.73 5.73 0 0 0 9.55 4.28 5.7 5.7 0 0 0 1.86-4.23V9.01a7.35 7.35 0 0 0 4.33 1.4V7.32a4.29 4.29 0 0 1-3.27-1.5z" />
    </svg>
  );
}
