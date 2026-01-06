'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  lang: 'es' | 'en';
}

export default function SearchBar({ value, onChange, lang }: SearchBarProps) {
  const placeholder = lang === 'es' 
    ? 'Buscar artículos...' 
    : 'Search articles...';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="relative group">
        {/* Icono de búsqueda */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="text-white/40 group-focus-within:text-[#B2904D] transition-colors" size={20} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-14 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#B2904D]/50 focus:bg-white/10 transition-all duration-300 text-base"
        />

        {/* Botón de limpiar */}
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="text-white/60" size={16} />
          </motion.button>
        )}
      </div>

      {/* Borde animado en foco */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D] opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
    </motion.div>
  );
}