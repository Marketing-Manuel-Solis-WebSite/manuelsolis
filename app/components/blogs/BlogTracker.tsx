'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics/react';
import { usePathname } from 'next/navigation';

interface BlogTrackerProps {
    title: string;
    author: string;
    category: string;
}

export default function BlogTracker({ title, author, category }: BlogTrackerProps) {
    const pathname = usePathname();

    // 1. RASTREO DE VISITA AL CARGAR (PAGE VIEW)
    // Depende solo de la ruta: los hitos de scroll viven en un ref para que
    // marcarlos no vuelva a ejecutar este efecto (una vista = un evento).
    useEffect(() => {
        track('Blog Post View', {
            slug: pathname || 'unknown',
            title,
            category,
            author,
            timestamp: new Date().toISOString()
        });
    }, [pathname, title, category, author]);

    // 2. RASTREO DE PROFUNDIDAD (SCROLL DEPTH)
    const milestones = useRef({ p25: false, p50: false, p75: false, p100: false });

    useEffect(() => {
        milestones.current = { p25: false, p50: false, p75: false, p100: false };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            // Protección contra división por cero
            if (docHeight <= 0) return;

            const scrollPercent = (scrollTop / docHeight) * 100;

            const commonData = {
                slug: pathname || 'unknown',
                title,
                timestamp: new Date().toISOString()
            };

            if (scrollPercent > 25 && !milestones.current.p25) {
                milestones.current.p25 = true;
                track('Blog Scroll 25%', commonData);
            }
            if (scrollPercent > 50 && !milestones.current.p50) {
                milestones.current.p50 = true;
                track('Blog Scroll 50%', commonData);
            }
            if (scrollPercent > 75 && !milestones.current.p75) {
                milestones.current.p75 = true;
                track('Blog Scroll 75%', commonData);
            }
            if (scrollPercent > 95 && !milestones.current.p100) {
                milestones.current.p100 = true;
                track('Blog Read Complete (100%)', commonData);
            }
        };

        // Optimizamos el evento scroll (throttling)
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        const throttledScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = null;
            }, 200);
        };

        window.addEventListener('scroll', throttledScroll);

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [pathname, title]);

    return null; // Este componente es invisible, solo lógica
}
