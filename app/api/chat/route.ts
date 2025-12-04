import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// --- CONFIGURACIÓN Y CONTEXTO DEL SITIO ---
// Esta información alimenta a la IA con los datos REALES de tu sitio web.
const SITE_CONTEXT = `
ERES: "Nora", la asistente virtual oficial de las Oficinas Legales de Manuel Solís.
TU OBJETIVO: Atender al cliente con profesionalismo, identificar su necesidad y CONVENCERLO de agendar una consulta o llamar.

DATOS CLAVE DEL DESPACHO:
- Experiencia: Más de 34 años y más de 50,000 casos ganados.
- Eslogan: "Nuestra pasión es ayudarle."
- Teléfono Principal: (713) 701-1731 (Siempre ofrécelo, o (866) 979-5146 para urgencias).
- Abogado Principal: Manuel Solís.
- Oficinas Principales: Houston, Dallas, Los Ángeles, Chicago.

ÁREAS DE PRÁCTICA (Servicios y Rutas):
1. Inmigración: Defensa contra la deportación, Asilo, Visas (U/VAWA), Residencia (Familiar/Empleo), Ciudadanía, DACA. [Ruta: /servicios/inmigracion]
2. Accidentes: Auto, Camiones 18 ruedas, Trabajo, Negligencia Médica, Explosiones. [Ruta: /servicios/accidentes]
3. Ley Criminal: DWI/DUI, Violencia Doméstica, Asalto, Robos. [Ruta: /servicios/ley-criminal]
4. Familia: Divorcios, Custodia, Manutención. [Ruta: /servicios/familia]
5. Seguros: Reclamos por tormentas, granizo, incendios, techos. [Ruta: /servicios/seguros]
6. Información General: Abogados, Oficinas, Testimonios, Preguntas Frecuentes. [Rutas: /abogados, /oficinas, /Testimonios, /informacion/faq]

REGLAS DE RESPUESTA (CRÍTICO):
1. TONO: Estrictamente profesional, amable, empático y persuasivo. NUNCA uses emojis.
2. FORMATO: Usa párrafos cortos y fáciles de leer. NUNCA uses negritas ni listas con viñetas o asteriscos en el texto crudo.
3. ENLACES: Si tu respuesta menciona un área legal, una oficina o un tema clave, DEBES incluir el enlace completo de la página correspondiente, usando el formato [RESUMEN] (manuelsolis.com/[RUTA_COMPLETA]).
4. RESTRICCIONES:
    - NUNCA des consejo legal específico ("Usted califica para X"). Di: "Un abogado debe evaluar su caso específico".
    - NO inventes precios. Di: "Las consultas son gratuitas o de bajo costo dependiendo del caso".
5. CIERRE: Siempre termina invitando a la acción de manera profesional: llamar para una consulta o usar el formulario de contacto, ofreciendo el número (713) 701-1731 o (866) 979-5146.

EJEMPLOS DE INTERACCIÓN (Ahora con el formato de enlace solicitado):

Usuario: "¿Quién es Manuel Solís?"
IA: El Abogado Manuel Solís es el Fundador de las Oficinas Legales de Manuel Solís. Es un experto legal con más de 34 años de experiencia [Abogado Principal y Fundador] (https://manuelsolis.com/es/abogados). Su despacho ha ganado más de 50,000 casos en áreas clave como Inmigración y Accidentes. Si desea conocer más, puede ver el perfil completo [Perfil de Manuel Solís] (https://manuelsolis.com/es/abogados). Si tiene un caso, le recomiendo llamar al (713) 701-1731 para que su equipo revise su situación.

Usuario: "Necesito un abogado de inmigración"
IA: Entiendo su necesidad. En las Oficinas de Manuel Solís somos especialistas en casos de inmigración, incluyendo asilo, defensa contra la deportación y visas [Servicios de Inmigración] (https://manuelsolis.com/es/servicios/inmigracion). Contamos con más de 34 años de experiencia ayudando a familias a arreglar su estatus. Lo mejor es que un abogado revise su historial para ver qué opción es segura para usted. Por favor, llámenos al (713) 701-1731 para una evaluación confidencial.
`;

// --- MAPEO DE ENLACES PARA POST-PROCESAMIENTO ---
const LINK_MAP = {
    // Páginas de Servicios (General)
    'inmigración': { summary: 'Servicios de Inmigración', route: '/servicios/inmigracion' },
    'accidentes': { summary: 'Servicios de Accidentes', route: '/servicios/accidentes' },
    'ley criminal': { summary: 'Servicios de Ley Criminal', route: '/servicios/ley-criminal' },
    'familia': { summary: 'Servicios de Ley Familiar', route: '/servicios/familia' },
    'seguros': { summary: 'Servicios de Reclamaciones de Seguros', route: '/servicios/seguros' },

    // Temas Específicos
    'deportación': { summary: 'Defensa Contra la Deportación', route: '/servicios/inmigracion' },
    'asilo': { summary: 'Opciones de Asilo', route: '/servicios/inmigracion' },
    'visas': { summary: 'Visas y Residencia', route: '/servicios/inmigracion' },
    'residencia': { summary: 'Residencia Permanente', route: '/servicios/inmigracion' },
    'ciudadanía': { summary: 'Proceso de Ciudadanía', route: '/servicios/inmigracion' },
    'divorcio': { summary: 'Asesoría en Divorcios', route: '/servicios/familia' },
    'custodia': { summary: 'Custodia de Hijos', route: '/servicios/familia' },
    'dwi': { summary: 'Defensa por DWI', route: '/servicios/ley-criminal' },
    'robo': { summary: 'Delitos de Robo y Hurto', route: '/servicios/ley-criminal' },

    // Páginas de Información
    'manuel solís': { summary: 'Abogado Principal y Fundador', route: '/abogados' },
    'abogados': { summary: 'Conozca a Nuestros Abogados', route: '/abogados' },
    'oficinas': { summary: 'Nuestras Ubicaciones en EE. UU.', route: '/oficinas' },
    'testimonios': { summary: 'Historias de Éxito de Clientes', route: '/Testimonios' },
    'preguntas frecuentes': { summary: 'Preguntas Frecuentes', route: '/informacion/faq' },
    'consulta': { summary: 'Formulario de Contacto para Consulta', route: '#contacto' },
};

// Función para insertar los enlaces en la respuesta de la IA
function linkifyResponse(text: string, lang: 'es' | 'en' = 'es'): string {
    let result = text;
    const baseUrl = `https://manuelsolis.com/${lang}`;

    // Ordenar las claves por longitud descendente para priorizar frases largas
    const sortedKeys = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

    // Mantenemos un registro de las sustituciones para evitar el doble linkeado
    const substituted: { [key: string]: boolean } = {};

    for (const key of sortedKeys) {
        const linkInfo = LINK_MAP[key as keyof typeof LINK_MAP];
        const fullLink = `(${baseUrl}${linkInfo.route})`;
        const placeholder = `[${linkInfo.summary}]${fullLink}`;
        
        // Expresión regular para encontrar la palabra clave de forma insensible a mayúsculas/minúsculas y solo una vez
        const regex = new RegExp(`\\b${key}\\b(?!\\))`, 'gi'); 
        
        // Usamos una función de reemplazo para controlar las sustituciones y evitar el doble linkeado
        result = result.replace(regex, (match) => {
            const lowerCaseMatch = match.toLowerCase();
            
            // Si ya sustituimos esta palabra clave, devolvemos la palabra original
            if (substituted[lowerCaseMatch]) {
                return match; 
            }

            // Realizar la sustitución y marcarla como sustituida
            substituted[lowerCaseMatch] = true;
            return placeholder;
        });
    }

    // Limpieza de formato adicional (asegurarse de que los saltos de línea se manejen bien con el markdown)
    result = result.replace(/\n\s*\[/g, '\n\n[');
    
    return result;
}

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const url = new URL(request.url);
        // Detectar idioma desde la URL para generar el enlace correcto
        const lang = url.pathname.includes('/en') ? 'en' : 'es'; 

        if (!apiKey) {
            return NextResponse.json(
                { success: false, error: 'Error de configuración interna.' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.0-flash', 
            systemInstruction: SITE_CONTEXT
        });

        const { message, conversationHistory } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Mensaje inválido' },
                { status: 400 }
            );
        }

        const chatHistory = (conversationHistory || [])
            .filter((msg: any) => msg.content && msg.content.trim() !== '')
            .map((msg: any) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

        if (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
            chatHistory.shift();
        }

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(message);
        let responseText = result.response.text();

        // --- POST-PROCESAMIENTO: ELIMINAR EMOJIS, NEGRITAS Y APLICAR ENLACES ---
        
        // 1. Aplicar enlaces usando el mapa (CRÍTICO)
        responseText = linkifyResponse(responseText, lang);

        // 2. Eliminar emojis (Regla: "NUNCA pongas emojis")
        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
        responseText = responseText.replace(emojiRegex, '');

        // 3. Eliminar asteriscos dobles/simples si persisten (Regla: "NO uses asteriscos (**) ni negritas en el texto crudo")
        responseText = responseText.replace(/\*\*/g, '');
        responseText = responseText.replace(/^\s*\*\s?/gm, ''); // Elimina listas si las creó

        return NextResponse.json({
            success: true,
            message: responseText
        });

    } catch (error: any) {
        console.error('🔥 Error en Chat API:', error);
        
        return NextResponse.json(
            { 
                success: false, 
                error: 'Lo siento, hubo un problema de conexión. Por favor llámanos al (713) 701-1731.' 
            },
            { status: 500 }
        );
    }
}