import React from 'react';

/**
 * ImagePlaceholder component designed to work seamlessly with both temporary SVGs
 * and future high-resolution client photos/videos without changing animation markup.
 */
export function ImagePlaceholder({ asset, className = '', style = {}, aspect = '16/9' }) {
  if (!asset) return null;

  return (
    <div 
      className={`relative overflow-hidden rounded-sm group ${className}`}
      style={{
        aspectRatio: aspect,
        backgroundColor: 'var(--color-dark-teak)',
        border: '1px solid rgba(213, 196, 161, 0.15)',
        ...style
      }}
    >
      <img
        src={asset.url}
        alt={asset.alt || asset.title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.8s var(--ease-cinematic)',
        }}
      />

      {/* Subtle Asset Identifier Tag for Developer & Client Clarity */}
      <div 
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          padding: '4px 8px',
          backgroundColor: 'rgba(24, 13, 9, 0.75)',
          border: '1px solid rgba(198, 139, 52, 0.3)',
          color: 'var(--color-sand)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          borderRadius: '2px',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'none'
        }}
      >
        ASSET: {asset.id}
      </div>
    </div>
  );
}
