/**
 * CENTRALIZED PLACEHOLDER ASSET SYSTEM
 * 
 * When final client photographs and videos are delivered, replace the asset URLs
 * in this file. The component and animation logic references these identifiers.
 */

import heroMansionSvg from '../assets/images/hero/hero_mansion.svg';
import athangudiTileSvg from '../assets/images/materials/athangudi_tile.svg';
import woodenDoorSvg from '../assets/images/craftsmanship/wooden_door.svg';

// Dynamic SVG fallback generator for remaining placeholders
const generateSvgPlaceholder = (title, subtitle, bgColor = '#2C1A14', accentColor = '#C85A32') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <rect width="1200" height="800" fill="${bgColor}"/>
    <defs>
      <pattern id="athangudi-grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="none" stroke="${accentColor}" stroke-opacity="0.15" stroke-width="1"/>
        <circle cx="40" cy="40" r="16" fill="none" stroke="${accentColor}" stroke-opacity="0.2" stroke-width="1.5"/>
        <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#C68B34" stroke-opacity="0.2" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#athangudi-grid)" />
    <rect x="30" y="30" width="1140" height="740" fill="none" stroke="#C68B34" stroke-opacity="0.4" stroke-width="2"/>
    <g transform="translate(600, 360)">
      <circle r="90" fill="#180D09" stroke="#C68B34" stroke-width="2"/>
      <polygon points="0,-60 15,-15 60,0 15,15 0,60 -15,15 -60,0 -15,-15" fill="${accentColor}" opacity="0.8"/>
    </g>
    <text x="600" y="520" text-anchor="middle" fill="#F7F3E9" font-family="serif" font-size="32" font-weight="600" letter-spacing="4">
      ${title.toUpperCase()}
    </text>
    <text x="600" y="565" text-anchor="middle" fill="#D5C4A1" font-family="sans-serif" font-size="18" letter-spacing="2">
      ${subtitle}
    </text>
  </svg>`;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const PLACEHOLDER_ASSETS = {
  // 01 — Hero & Mansion Architecture
  mansionExterior: {
    id: 'mansion-exterior',
    title: 'Chettinad Mansion Exterior',
    subtitle: 'Kanadukathan Grand Façade & Stately Entrance',
    url: heroMansionSvg,
    alt: 'Grand Chettinad Mansion exterior architectural view',
    category: 'architecture'
  },
  
  // 02 — Entrance & Craftsmanship Doors
  woodenDoor: {
    id: 'wooden-door',
    title: 'Hand-Carved Burma Teak Door',
    subtitle: 'Traditional Crafted Entrance Doorway',
    url: woodenDoorSvg,
    alt: 'Intricately carved traditional Chettinad wooden door',
    category: 'craftsmanship'
  },

  // 03 — Heritage Corridors & Pillars
  corridorView: {
    id: 'corridor-view',
    title: 'Heritage Mansion Corridor',
    subtitle: 'Columned Walkway & Terracotta Roof Tiles',
    url: generateSvgPlaceholder('Mansion Corridor', 'Columned Walkway & Terracotta Roof Tiles', '#251510', '#D96B27'),
    alt: 'Chettinad columned corridor with teak pillars',
    category: 'architecture'
  },

  // 04 — Central Courtyard (Thinnai & Valavu)
  centralCourtyard: {
    id: 'central-courtyard',
    title: 'Central Sunlit Courtyard',
    subtitle: 'Open-to-Sky Rainwater Courtyard (Valavu)',
    url: generateSvgPlaceholder('Central Valavu Courtyard', 'Open-to-Sky Rainwater Harvesting Courtyard', '#1C1B19', '#C68B34'),
    alt: 'Traditional Chettinad open-to-sky central courtyard',
    category: 'architecture'
  },

  // 05 — Athangudi Hand-Crafted Tiles
  athangudiTile: {
    id: 'athangudi-tile',
    title: 'Athangudi Handmade Tiles',
    subtitle: 'Artisanal Geometric & Floral Floor Tiles',
    url: athangudiTileSvg,
    alt: 'Authentic Athangudi patterned handmade tile',
    category: 'materials'
  },

  // 06 — Lime Plaster Walls (Egg-White Polish)
  limePlaster: {
    id: 'lime-plaster',
    title: 'Egg-White Lime Plaster',
    subtitle: 'Smooth Silky Breathable Natural Walls',
    url: generateSvgPlaceholder('Lime Plaster Finish', 'Smooth Breathable Egg-White Mirror Finish', '#EFEBE1', '#7E7870'),
    alt: 'Smooth egg-white polished lime plaster wall texture',
    category: 'materials'
  },

  // 07 — Wooden Pillars & Granite Bases
  woodenPillars: {
    id: 'wooden-pillars',
    title: 'Carved Teak Pillars',
    subtitle: 'Polished Wood Columns with Granite Bases',
    url: generateSvgPlaceholder('Carved Teak Pillars', 'Carved Wood Columns with Sculpted Stone Pedestals', '#2C1A14', '#C85A32'),
    alt: 'Chettinad carved teak wood pillars with stone bases',
    category: 'craftsmanship'
  },

  // 08 — Wood Carving & Brass Details
  woodCarving: {
    id: 'wood-carving',
    title: 'Mythological Wood Relief',
    subtitle: 'Hand-chiselled Ceiling & Pillar Bracket Details',
    url: generateSvgPlaceholder('Wood Relief Carving', 'Hand-chiselled Ceiling Brackets & Panels', '#180D09', '#C68B34'),
    alt: 'Detailed hand wood carving motif',
    category: 'craftsmanship'
  },

  // 09 — Natural Cooling & Windows
  traditionalWindows: {
    id: 'traditional-windows',
    title: 'Louvered Teak Windows',
    subtitle: 'Cross-Ventilation & Passive Air Cooling',
    url: generateSvgPlaceholder('Louvered Vent Windows', 'Passive Ventilation & Thermal Comfort', '#1F3A5F', '#D5C4A1'),
    alt: 'Traditional louvered windows for natural cooling',
    category: 'architecture'
  },

  // 10 — Heritage House Interiors
  heritageInteriors: {
    id: 'heritage-interiors',
    title: 'Palatial Interior Hall',
    subtitle: 'Double-Height Living Spaces & Vintage Brass Lamps',
    url: generateSvgPlaceholder('Palatial Interior Hall', 'Double-Height Living Spaces & Brass Accents', '#2C1A14', '#6B1D2F'),
    alt: 'Chettinad heritage house interior hall',
    category: 'projects'
  },

  // Video Placeholder Metadata
  heroVideoPlaceholder: {
    id: 'hero-video-placeholder',
    title: 'Chettinad Atmosphere Reel',
    subtitle: 'Cinematic Ambient Flythrough (Placeholder)',
    url: null,
    poster: generateSvgPlaceholder('Cinematic Atmosphere Reel', 'Placeholder Video Track', '#1C1B19', '#C85A32'),
    alt: 'Ambient cinematic video placeholder of Chettinad mansion'
  }
};
