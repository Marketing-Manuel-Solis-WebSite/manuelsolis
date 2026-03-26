import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    cpus: 4,
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comopuedoarreglar.com',
      },
      {
        protocol: 'https',
        hostname: 'manuelsolis.com',
      },
      {
        protocol: 'https',
        hostname: 'uenjwzjx3vckezns.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async redirects() {
    return [
      // Root / is handled by middleware (language detection + crawler logic)
      {
        source: '/:lang/informacion/nosotros',
        destination: '/:lang/nosotros',
        permanent: true,
      },
      // Blog slug redirects: old underscore/mixed-case → new lowercase-hyphen
      {
        source: '/:lang/blog/asilo_frontera_2026_puerto_entrada_vs_cruce',
        destination: '/:lang/blog/asilo-frontera-2026-puerto-entrada-vs-cruce',
        permanent: true,
      },
      {
        source: '/:lang/blog/entrevista_matrimonio_uscis_senales_alerta',
        destination: '/:lang/blog/entrevista-matrimonio-uscis-senales-alerta',
        permanent: true,
      },
      {
        source: '/:lang/blog/ciudadania_en_espanol_reglas_50_20_55_15',
        destination: '/:lang/blog/ciudadania-en-espanol-reglas-50-20-55-15',
        permanent: true,
      },
      {
        source: '/:lang/blog/marihuana_dui_buen_caracter_moral_inmigracion',
        destination: '/:lang/blog/marihuana-dui-buen-caracter-moral-inmigracion',
        permanent: true,
      },
      {
        source: '/:lang/blog/perdon_i601a_arreglar_papeles_entrada_ilegal',
        destination: '/:lang/blog/perdon-i601a-arreglar-papeles-entrada-ilegal',
        permanent: true,
      },
      {
        source: '/:lang/blog/estatus_juvenil_sijs_residencia_jovenes_abandonados',
        destination: '/:lang/blog/estatus-juvenil-sijs-residencia-jovenes-abandonados',
        permanent: true,
      },
      {
        source: '/:lang/blog/foia_migratoria_pedir_record_antes_de_aplicar',
        destination: '/:lang/blog/foia-migratoria-pedir-record-antes-de-aplicar',
        permanent: true,
      },
      {
        source: '/:lang/blog/residencia_laboral_eb3_ley_245i_entrada_indocumentada',
        destination: '/:lang/blog/residencia-laboral-eb3-ley-245i-entrada-indocumentada',
        permanent: true,
      },
      {
        source: '/:lang/blog/advance_parole_2026_viajar_con_daca_tps_visa_u',
        destination: '/:lang/blog/advance-parole-2026-viajar-con-daca-tps-visa-u',
        permanent: true,
      },
      {
        source: '/:lang/blog/ley_de_los_10_anos_cancelacion_de_deportacion',
        destination: '/:lang/blog/ley-de-los-10-anos-cancelacion-de-deportacion',
        permanent: true,
      },
      {
        source: '/:lang/blog/Visa_U_y_VAWA_incluir_hijos_y_nuevos_esposos_derivados',
        destination: '/:lang/blog/visa-u-y-vawa-incluir-hijos-y-nuevos-esposos-derivados',
        permanent: true,
      },
      {
        source: '/:lang/blog/Formulario_G28_Cambiar_Abogado_Inmigracion',
        destination: '/:lang/blog/formulario-g28-cambiar-abogado-inmigracion',
        permanent: true,
      },
      {
        source: '/:lang/blog/Frenar_deportacion_inminente_con_solicitud_de_Visa_Humanitaria',
        destination: '/:lang/blog/frenar-deportacion-inminente-con-solicitud-de-visa-humanitaria',
        permanent: true,
      },
      {
        source: '/:lang/blog/Visa_T_trabajo_forzado_por_deuda_con_coyote',
        destination: '/:lang/blog/visa-t-trabajo-forzado-por-deuda-con-coyote',
        permanent: true,
      },
      {
        source: '/:lang/blog/VAWA_para_hombres_maltratados_por_pareja_ciudadana_o_residente',
        destination: '/:lang/blog/vawa-para-hombres-maltratados-por-pareja-ciudadana-o-residente',
        permanent: true,
      },
      {
        source: '/:lang/blog/VAWA_para_padres_Maltrato_de_hijos_ciudadanos_estadounidenses',
        destination: '/:lang/blog/vawa-para-padres-maltrato-de-hijos-ciudadanos-estadounidenses',
        permanent: true,
      },
      {
        source: '/:lang/blog/perdon_i_192_como_arreglar_con_la_visa_u_si_tienes_deportaciones_previas',
        destination: '/:lang/blog/perdon-i-192-como-arreglar-con-la-visa-u-si-tienes-deportaciones-previas',
        permanent: true,
      },
      {
        source: '/:lang/blog/que_hacer_si_la_policia_no_firma_la_certificacion_visa_u',
        destination: '/:lang/blog/que-hacer-si-la-policia-no-firma-la-certificacion-visa-u',
        permanent: true,
      },
      {
        source: '/:lang/blog/permiso_de_trabajo_visa_u',
        destination: '/:lang/blog/permiso-de-trabajo-visa-u',
        permanent: true,
      },
      // Testimonios case redirect
      {
        source: '/:lang/Testimonios',
        destination: '/:lang/testimonios',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache optimized images aggressively
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache static assets in public folder
        source: '/:path*.(png|jpg|jpeg|gif|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache font files
        source: '/:path*.(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ];
  },
};

export default nextConfig;