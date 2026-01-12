'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Share2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  uiShareText: string;
}

export default function ShareButtons({ title, uiShareText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // URL actual (se obtiene del navegador)
  const getCurrentUrl = () => typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = {
    facebook: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getCurrentUrl())}`,
    twitter: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getCurrentUrl())}`,
    linkedin: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getCurrentUrl())}`
  };

  const handleShare = (network: keyof typeof shareLinks) => {
    window.open(shareLinks[network](), '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getCurrentUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ml-auto hidden md:flex items-center gap-3">
      <span className="text-xs font-bold text-white/40 uppercase tracking-widest mr-2">{uiShareText}</span>
      
      <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white transition-colors text-white/60">
        <Facebook size={18} />
      </button>
      
      <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white transition-colors text-white/60">
        <Twitter size={18} />
      </button>
      
      <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white transition-colors text-white/60">
        <Linkedin size={18} />
      </button>
      
      <button onClick={handleCopyLink} className="p-2 rounded-full bg-white/5 hover:bg-[#B2904D] hover:text-[#001540] transition-colors text-white/60 relative">
        {copied ? <Check size={18} /> : <Share2 size={18} />}
      </button>
    </div>
  );
}