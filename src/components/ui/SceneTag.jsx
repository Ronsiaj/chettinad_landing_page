import React from 'react';

export function SceneTag({ number, text }) {
  return (
    <div className="scene-tag">
      {number && <span style={{ fontWeight: 700, color: 'var(--color-terracotta)' }}>{number}</span>}
      {number && <span>•</span>}
      <span>{text}</span>
    </div>
  );
}
