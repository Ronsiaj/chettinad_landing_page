import React from 'react';

/**
 * PORTAL MASK COMPONENT
 * 
 * Clips incoming architectural scenes inside physical doorways/archways
 * before expanding to fill 100% of the viewport.
 * 
 * Z-INDEX ARCHITECTURE:
 * z-index 10 = Background Scene (Outgoing active space)
 * z-index 20 = Incoming Scene (Nested inside PortalMask)
 * z-index 30 = Architectural Arch Frame / Portal Mask Overlay
 * z-index 40 = Foreground Teak Door Panels (Left & Right 3D swing doors)
 * z-index 50 = UI / Editorial Text Overlay
 */
export function PortalMask({ type = 'arch', children, maskRef, style = {}, className = '' }) {
  const getClipStyle = () => {
    switch (type) {
      case 'arch':
        return 'inset(22% 38% 12% 38% round 160px 160px 0 0)';
      case 'door':
        return 'inset(16% 32% 10% 32% round 140px 140px 0 0)';
      case 'floor':
        return 'inset(55% 15% 5% 15% round 12px)';
      default:
        return 'none';
    }
  };

  return (
    <div
      ref={maskRef}
      className={`portal-mask portal-mask--${type} ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        willChange: 'clip-path, transform, opacity',
        clipPath: getClipStyle(),
        visibility: 'hidden',
        opacity: 0,
        zIndex: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
