'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics/react';
import { usePathname } from 'next/navigation';

interface BlogTrackerProps {
    title: string;
    author: string;
    category: string;
}

export default function BlogTracker({ title, author, category }: BlogTrackerProps) {
    const pathname = usePathname();
    const [scrolled25, setScrolled25] = useState(false);
    const [scrolled50, setScrolled50] = useState(false);
    const [scrolled75, setScrolled75] = useState(false);
    const [scrolled100, setScrolled100] = useState(false);

    // Intentar obtener el nombre del usuario si se guardó previamente
    // (Por ejemplo, al enviar un formulario de contacto)
    const getUserName = () => {
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('user_first_name'); 
            return savedName || 'Anónimo';
        }
        return 'Anónimo';
    };

    useEffect(() => {
        const userName = getUserName();

        // 1. RASTREO DE VISTA (Al cargar el componente)
        track('Blog Post View', {
            slug: pathname,
            title: title,
            category: category,
            author: author,
            visitorName: userName, // Envía el nombre si existe
            timestamp: new Date().toISOString()
        });

        const handleScroll = () => {
            // Calcular porcentaje de scroll
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            const commonData = {
                slug: pathname,
                title: title,
                visitorName: userName,
                timestamp: new Date().toISOString()
            };

            // 2. RASTREO DE SCROLL DEPTH (Solo dispara una vez por porcentaje)
            if (scrollPercent > 25 && !scrolled25) {
                track('Blog Scroll 25%', commonData);
                setScrolled25(true);
            }
            if (scrollPercent > 50 && !scrolled50) {
                track('Blog Scroll 50%', commonData);
                setScrolled50(true);
            }
            if (scrollPercent > 75 && !scrolled75) {
                track('Blog Scroll 75%', commonData);
                setScrolled75(true);
            }
            if (scrollPercent > 95 && !scrolled100) {
                track('Blog Read Complete (100%)', commonData);
                setScrolled100(true);
            }
        };

        // Agregar listener con un pequeño delay para performance (throttling básico)
        let timeoutId: NodeJS.Timeout;
        const throttledScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = undefined as any;
            }, 200);
        };

        window.addEventListener('scroll', throttledScroll);

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if(timeoutId) clearTimeout(timeoutId);
        };
    }, [pathname, title, category, author, scrolled25, scrolled50, scrolled75, scrolled100]);

    // Este componente no renderiza nada visible, es solo lógica
    return null; 
}