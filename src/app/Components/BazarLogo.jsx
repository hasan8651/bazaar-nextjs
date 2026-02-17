import React from 'react';
import { ShoppingCart, Box } from 'lucide-react';

export default function BazaarLogo({ size = 28, showText = true, textColor = 'var(--primary)' }) {
  return (
    <div className="flex items-center space-x-2" style={{ color: textColor }}>
      <div className="relative">
        <ShoppingCart 
          size={size} 
          className="text-[var(--secondary)]" 
          strokeWidth={2.25} 
        />
        <Box 
          size={size / 2.5}
          className="absolute -bottom-1 -right-1 text-[var(--accent)] rotate-12" 
          strokeWidth={3}
        />
      </div>
      {showText && (
        <span 
          className="font-extrabold text-3xl tracking-tight" 
          style={{ 
            fontSize: size * 1.2 + 'px', 
            color: 'var(--primary)'
          }}
        >
          BAZAAR
        </span>
      )}
    </div>
  );
}