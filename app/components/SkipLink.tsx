// Primer elemento enfocable de cada <body>: lo pintan los root layouts y la 404
// global, que no comparten layout entre sí.
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#B2904D] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
    >
      Saltar al contenido / Skip to content
    </a>
  );
}
