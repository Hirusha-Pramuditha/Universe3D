import React from 'react';

const COLORS = {
  m_top_1: '#4a5c44', m_top_2: '#e5ddd3', m_top_3: '#8fbce1', 
  m_top_4: '#284635', m_top_5: '#f2ebe2', m_top_6: '#222222',
  m_bot_1: '#5a8ebf', m_bot_2: '#305170', m_bot_3: '#525a41', 
  m_bot_4: '#c5523a', m_bot_5: '#2d3338', m_bot_6: '#224063',
  m_foot_1: '#ffffff', m_foot_2: '#5c3a21', m_foot_3: '#1a1a1a',

  f_top_1: '#E84342', f_top_2: '#FF7675', f_top_3: '#E17055', 
  f_top_4: '#6C5CE7', f_top_5: '#00B894', f_top_6: '#FDCB6E', f_top_7: '#E84342',
  f_bot_1: '#2D3436', f_bot_3: '#0984E3', 
  f_bot_4: '#E84342', f_bot_5: '#00CEC9', f_bot_6: '#6C5CE7',
  f_foot_1: '#2D3436', f_foot_2: '#636E72', f_foot_3: '#FF7675'
};

const SKIN_TONES = { light: '#f7cdb9', medium: '#f4caa7', tan: '#d3a484', dark: '#9e694b' };

const SharedDefs = ({ topItem = 'none', bottomItem = 'none' }) => {
  return <defs></defs>;
};

const BaseAvatar = ({ gender, skinTone = 'medium' }) => {
  const SKIN = SKIN_TONES[skinTone] || SKIN_TONES.medium;
  const SHADOW = '#AD8A73';

  if (gender === 'male') {
    return (
      <g>
        {/* Ears */}
        <path d="M 36 22 C 30 20 31 28 36 28 Z" fill={SKIN} />
        <path d="M 34 23 C 31 23 32 27 34 26" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />
        <path d="M 64 22 C 70 20 69 28 64 28 Z" fill={SKIN} />
        <path d="M 66 23 C 69 23 68 27 66 26" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />

        {/* Neck */}
        <path d="M 45 35 L 45 46 L 55 46 L 55 35 Z" fill={SKIN} />
        <path d="M 45 36.5 L 55 36.5 L 55 41 L 45 37.5 Z" fill={SHADOW} />

        {/* Head */}
        <path d="M 36 20 C 36 6 64 6 64 20 C 64 34 56 38 50 38 C 44 38 36 34 36 20 Z" fill={SKIN} />
        
        {/* Eyes */}
        <ellipse cx="44" cy="20" rx="1.5" ry="2.2" fill="#111" />
        <ellipse cx="56" cy="20" rx="1.5" ry="2.2" fill="#111" />
        <circle cx="44.5" cy="19" r="0.5" fill="#fff" />
        <circle cx="56.5" cy="19" r="0.5" fill="#fff" />
        
        {/* Eyebrows */}
        <path d="M 41 16 Q 44 14 47 16" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 59 16 Q 56 14 53 16" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />

        {/* Nose */}
        <path d="M 50 22 L 48 26 L 50 27" fill="none" stroke="#111" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        
        {/* Mouth */}
        <path d="M 46 32 Q 50 35 54 31" fill="none" stroke="#111" strokeWidth="0.8" strokeLinecap="round" />

        {/* Hair - Base block that prevents gaps by covering scalp */}
        <path d="M 33 22 C 33 -2 67 -2 67 22 C 67 22 62 12 50 12 C 38 12 33 22 33 22 Z" fill="#1b1514" />
        {/* Hair - Swoops & Details */}
        <path d="M 45 10 C 42 12 40 18 38 18 C 39 12 43 8 45 8 Z" fill="#1b1514" />
        <path d="M 36 12 C 34 16 34 22 36 24 C 36 18 38 14 40 12 Z" fill="#1b1514" />
        <path d="M 64 12 C 66 16 66 22 64 24 C 64 18 62 14 60 12 Z" fill="#1b1514" />
        <path d="M 40 6 C 45 4 55 4 60 8 C 55 5 45 5 40 7 Z" fill="#3a2e2b" />
        <path d="M 46 6 L 48 2 L 52 4 Z" fill="#1b1514" />

        {/* Torso Base */}
        <path d="M 34 45 L 66 45 L 62 90 L 38 90 Z" fill={SKIN} />
        <path d="M 34 45 L 42 45 L 42 90 L 38 90 Z" fill={SHADOW} />

        {/* Left Arm */}
        <path d="M 34 45 L 24 95 L 30 95 L 38 45 Z" fill={SKIN} />
        <path d="M 34 45 L 28 95 L 30 95 L 38 45 Z" fill={SHADOW} />
        {/* Left Hand */}
        <path d="M 24 95 C 20 105 28 110 32 105 C 34 100 32 95 30 95 Z" fill={SKIN} />
        <path d="M 26 102 L 27 106 M 28 103 L 29 107 M 30 102 L 31 106" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />

        {/* Right Arm */}
        <path d="M 66 45 L 76 95 L 70 95 L 62 45 Z" fill={SKIN} />
        <path d="M 66 45 L 72 95 L 70 95 L 62 45 Z" fill={SHADOW} />
        {/* Right Hand */}
        <path d="M 76 95 C 80 105 72 110 68 105 C 66 100 68 95 70 95 Z" fill={SKIN} />
        <path d="M 74 102 L 73 106 M 72 103 L 71 107 M 70 102 L 69 106" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />

        {/* Legs base (Skin under pants - Tapered for fitted look) */}
        <path d="M 38 90 L 48 90 L 48 120 L 45 180 L 37 180 Z" fill={SKIN} />
        <path d="M 52 90 L 62 90 L 63 180 L 55 180 L 52 120 Z" fill={SKIN} />
      </g>
    );
  } else {
    return (
      <g>
        <ellipse cx="50" cy="26" rx="13" ry="14" fill={SKIN} />
        <circle cx="43" cy="23" r="3" fill="#FFFFFF" />
        <circle cx="43" cy="23" r="2" fill="#2C3E50" />
        <circle cx="43.8" cy="22.5" r="0.7" fill="#FFFFFF" />
        <circle cx="57" cy="23" r="3" fill="#FFFFFF" />
        <circle cx="57" cy="23" r="2" fill="#2C3E50" />
        <circle cx="57.8" cy="22.5" r="0.7" fill="#FFFFFF" />
        <path d="M 39 21 L 42 20" stroke="#2C3E50" strokeWidth="1" fill="none" />
        <path d="M 61 21 L 58 20" stroke="#2C3E50" strokeWidth="1" fill="none" />
        <path d="M 38 16 Q 43 14 48 17" stroke="#2C3E50" strokeWidth="1.2" fill="none" />
        <path d="M 52 17 Q 57 14 62 16" stroke="#2C3E50" strokeWidth="1.2" fill="none" />
        <path d="M 50 27 Q 51 29 50 31" stroke="#AD8A73" strokeWidth="1" fill="none" />
        <path d="M 45 34 Q 50 37 55 34" stroke="#D45D5D" strokeWidth="1.2" fill="none" />
        <path d="M 46 34 Q 50 36 54 34" fill="#E8A0A0" opacity="0.4" />
        <circle cx="36" cy="26" r="2.5" fill={SKIN} />
        <circle cx="64" cy="26" r="2.5" fill={SKIN} />
        <path d="M 30 12 Q 50 4 70 12 L 70 35 Q 50 45 30 35 Z" fill="#4A3728" />
        <path d="M 32 14 Q 50 8 68 14 L 68 32 Q 50 40 32 32 Z" fill="#5D4037" />
        <path d="M 35 18 Q 40 25 35 32" stroke="#8B5A2B" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M 65 18 Q 60 25 65 32" stroke="#8B5A2B" strokeWidth="1.5" fill="none" opacity="0.5" />
        <rect x="46" y="38" width="8" height="15" fill={SKIN} rx="2" />
        <path d="M 34 53 L 66 53 Q 58 70 62 110 L 38 110 Q 42 70 34 53 Z" fill={SKIN} />
        <path d="M 24 55 L 30 80 L 32 100 L 22 100 L 18 80 L 16 70 Z" fill={SKIN} />
        <path d="M 76 55 L 70 80 L 68 100 L 78 100 L 82 80 L 84 70 Z" fill={SKIN} />
        <path d="M 38 110 L 48 110 L 46 180 L 36 180 L 34 150 Z" fill={SKIN} />
        <path d="M 52 110 L 62 110 L 64 180 L 54 180 L 58 150 Z" fill={SKIN} />
        <path d="M 36 180 L 44 180 Q 42 186 36 186 Z" fill={SKIN} />
        <path d="M 56 180 L 64 180 Q 62 186 56 186 Z" fill={SKIN} />
      </g>
    );
  }
};

const renderTopLayer = (id) => {
  const color = COLORS[id] || '#7bb0db';

  if (id.startsWith('f_')) {
    // Female defaults
    if (id === 'f_top_1') return <g fill={color}><path d="M 38 53 L 62 53 Q 58 70 60 95 L 40 95 Q 42 70 38 53 Z" /><path d="M 35 95 L 65 95 Q 75 130 30 130 L 25 95 Z" /><path d="M 42 48 Q 50 42 58 48" fill="none" stroke="#FFF" strokeWidth="2" /><rect x="38" y="85" width="24" height="5" fill="#FFFFFF" opacity="0.3" /></g>;
    return <g fill={color}><path d="M 34 53 L 66 53 Q 62 70 62 110 L 38 110 Q 38 70 34 53 Z" /></g>;
  }

  const isFormal = id === 'm_top_3';
  const isPolo = id === 'm_top_4';
  const isSleeveless = id === 'm_top_5';
  const isTank = id === 'm_top_6';
  const isLong = id === 'm_top_1' || isFormal;

  return (
    <g>
      {/* Flat Vector Torso Base */}
      {isTank ? (
        <path d="M 38 46 L 43 46 Q 50 62 57 46 L 62 46 L 64 100 L 36 100 Z" fill={color} />
      ) : isSleeveless ? (
        <path d="M 34 46 Q 50 42 66 46 L 64 100 L 36 100 Z" fill={color} />
      ) : (
        <path d="M 33 46 Q 50 42 67 46 L 64 100 L 36 100 Z" fill={color} />
      )}

      {/* Flat Vector Left Torso Shadow */}
      {isTank ? (
        <path d="M 38 46 L 43 46 L 42 100 L 36 100 Z" fill="#111" opacity="0.15" />
      ) : (
        <path d="M 33 46 Q 40 44 42 46 L 42 100 L 36 100 Z" fill="#111" opacity="0.15" />
      )}

      {/* Flat Vector Sleeves */}
      {!isSleeveless && !isTank && (
        <g>
          {isLong ? (
            <g>
              <path d="M 34 45 L 23 96 L 31 96 L 38 45 Z" fill={color} />
              <path d="M 34 45 L 27 96 L 31 96 L 38 45 Z" fill="#111" opacity="0.15" />
              
              <path d="M 66 45 L 77 96 L 69 96 L 62 45 Z" fill={color} />
              <path d="M 66 45 L 73 96 L 69 96 L 62 45 Z" fill="#111" opacity="0.15" />
            </g>
          ) : (
            <g>
              <path d="M 34 45 L 27 75 L 34 75 L 38 45 Z" fill={color} />
              <path d="M 38 45 L 32 75 L 34 75 Z" fill="#111" opacity="0.15" />
              
              <path d="M 66 45 L 73 75 L 66 75 L 62 45 Z" fill={color} />
              <path d="M 62 45 L 68 75 L 66 75 Z" fill="#111" opacity="0.15" />
            </g>
          )}
        </g>
      )}

      {/* Clipart Stylized Wrinkles (Hard Edge) */}
      <path d="M 36 75 L 45 92 L 44 95 L 36 80 Z" fill="#111" opacity="0.1" />
      <path d="M 64 65 L 55 85 L 56 88 L 64 70 Z" fill="#111" opacity="0.1" />
      <path d="M 36 95 L 64 95 L 64 100 L 36 100 Z" fill="#111" opacity="0.15" />

      {/* Neck rings for non-formal */}
      {(!isFormal && !isPolo) && (
        <g>
          <path d="M 43 46 Q 50 52 57 46 L 55 45 Q 50 49 45 45 Z" fill={color} opacity="0.8" />
          <path d="M 43 46 Q 50 52 57 46 L 55 45 Q 50 49 45 45 Z" fill="#111" opacity="0.2" />
        </g>
      )}

      {isFormal && (
        <g>
          <path d="M 50 45 L 50 100" fill="none" stroke="#111" strokeWidth="1" opacity="0.3" />
          {[55,65,75,85,95].map(y => <circle key={y} cx="50" cy={y} r="1" fill="#fff" stroke="#888" strokeWidth="0.5" />)}
          <path d="M 43 42 L 50 49 L 57 42 L 50 40 Z" fill="#fff" />
          <path d="M 43 42 L 50 49 L 57 42" fill="none" stroke="#222" strokeWidth="1" opacity="0.2" />
        </g>
      )}
      
      {isPolo && (
        <g>
          <rect x="48" y="46" width="4" height="15" fill={color} stroke="#222" strokeWidth="0.5" opacity="0.8" />
          <circle cx="50" cy="52" r="0.8" fill="#fff" />
          <circle cx="50" cy="58" r="0.8" fill="#fff" />
          <path d="M 42 42 L 38 48 L 47 48 L 48 46 L 45 42 Z M 58 42 L 62 48 L 53 48 L 52 46 L 55 42 Z" fill="#111" opacity="0.8" />
        </g>
      )}
    </g>
  );
};

const renderBottomLayer = (id) => {
  const color = COLORS[id] || '#5d3936';
  if (id.startsWith('f_')) {
    if (id === 'f_bot_1') return <g fill={color}><path d="M 36 110 L 49 110 L 47 181 L 34 181 L 32 150 Z" /><path d="M 51 110 L 64 110 L 66 181 L 53 181 L 55 150 Z" /></g>;
    return <g fill={color}><path d="M 37 110 L 48 110 L 46.5 180 L 36 180 L 35 150 Z" /><path d="M 52 110 L 63 110 L 64 180 L 53.5 180 L 55 150 Z" /></g>;
  }

  const isShorts = id === 'm_bot_4' || id === 'm_bot_5';
  const isCargo = id === 'm_bot_3';
  const isRipped = id === 'm_bot_1';
  const length = isShorts ? 150 : 180;

  return (
    <g>
      {/* Flat Vector Base Pants (Custom mapped to legs correctly) */}
      <path d={`M 36 100 L 50 100 L 50 120 L 49 ${length} L 31 ${length} Z`} fill={color} />
      <path d={`M 50 100 L 64 100 L 69 ${length} L 51 ${length} L 50 120 Z`} fill={color} />
      
      {/* Pants Shadows (flat block) */}
      {/* Left leg left-side shadow */}
      <path d={`M 36 100 L 42 100 L 37 ${length} L 31 ${length} Z`} fill="#111" opacity="0.15" />
      {/* Left leg inner shadow */}
      <path d={`M 50 120 L 49 ${length} L 47 ${length} L 49 125 Z`} fill="#111" opacity="0.2" />
      {/* Right leg inner shadow */}
      <path d={`M 50 120 L 51 ${length} L 53 ${length} L 51 125 Z`} fill="#111" opacity="0.2" />
      {/* Pelvis/crotch shadow */}
      <path d="M 45 100 L 55 100 L 50 120 Z" fill="#111" opacity="0.15" />

      {/* Wrinkles */}
      <path d="M 36 140 L 42 155 L 43 150 Z" fill="#111" opacity="0.1" />
      <path d="M 64 140 L 58 155 L 57 150 Z" fill="#111" opacity="0.1" />
      
      {/* Flat waist shadow under shirt */}
      <path d="M 36 100 L 64 100 L 64 105 L 36 105 Z" fill="#111" opacity="0.25" />

      {isCargo && (
        <g>
          <path d="M 30 135 L 42 135 L 41 155 L 32 155 Z M 70 135 L 58 135 L 59 155 L 68 155 Z" fill={color} stroke="#111" strokeWidth="1" />
          <path d="M 30 135 L 42 135 L 41 140 L 31 140 Z M 70 135 L 58 135 L 59 140 L 69 140 Z" fill="#111" opacity="0.2" />
        </g>
      )}

      {isRipped && (
        <g>
          <path d="M 37 140 Q 40 136 46 141 Q 45 143 43 145 Q 38 143 37 140 Z M 54 136 Q 58 134 62 137 Q 60 142 56 139 Z" fill="#d3a484" />
        </g>
      )}

      {isShorts && (
        <g>
          {/* Drop shadow on bare legs under the shorts */}
          <path d="M 37.3 150 L 46.5 150 L 46 160 L 37.2 160 Z" fill="#111" opacity="0.15" />
          <path d="M 53.5 150 L 62.7 150 L 62.8 160 L 54 160 Z" fill="#111" opacity="0.15" />
        </g>
      )}
    </g>
  );
};

const renderFootwearLayer = (id) => {
  const color = COLORS[id] || '#fff';
  if (id.startsWith('f_')) {
    if (id === 'f_foot_1') return <g fill={color}><path d="M 35 181 L 45 181 Q 43 188 35 188 Z M 55 181 L 65 181 Q 63 188 55 188 Z" /></g>;
    return <g fill={color}><path d="M 34 180 L 45 180 Q 43 188 34 188 Z M 55 180 L 66 180 Q 64 188 55 188 Z" /></g>;
  }

  return (
    <g>
      {/* clipPath to constrain shoes within the foot area */}
      <defs>
        <clipPath id="footClip">
          <rect x="25" y="170" width="50" height="30" />
        </clipPath>
      </defs>

      {id === 'm_foot_1' && (
        <image href="/assets/footwear/shoe1.png" x="25" y="170" width="50" height="28" preserveAspectRatio="xMidYMid meet" clipPath="url(#footClip)" />
      )}
      {id === 'm_foot_2' && (
        <image href="/assets/footwear/shoe2.png" x="25" y="170" width="50" height="28" preserveAspectRatio="xMidYMid meet" clipPath="url(#footClip)" />
      )}
      {id === 'm_foot_3' && (
        <image href="/assets/footwear/shoe3.png" x="25" y="170" width="50" height="28" preserveAspectRatio="xMidYMid meet" clipPath="url(#footClip)" />
      )}
      {id === 'm_foot_4' && (
        <image href="/assets/footwear/shoe4.png" x="25" y="172" width="50" height="26" preserveAspectRatio="xMidYMid meet" clipPath="url(#footClip)" />
      )}
      {id === 'm_foot_5' && (
        <image href="/assets/footwear/shoe5.png" x="25" y="170" width="50" height="28" preserveAspectRatio="xMidYMid meet" clipPath="url(#footClip)" />
      )}
    </g>
  );
};

export const AvatarItemThumbnail = ({ type, itemId }) => {
  // Using custom scalable viewBox containers tailored to cleanly center items of different shapes in 100x100
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <SharedDefs topItem={type === 'top' ? itemId : 'none'} bottomItem={type === 'bottom' ? itemId : 'none'} />
      {type === 'top' && (
        <g transform="translate(-15, -45) scale(1.3)">
          {renderTopLayer(itemId)}
        </g>
      )}
      {type === 'bottom' && (
        <g transform="translate(-5, -100) scale(1.1)">
          {renderBottomLayer(itemId)}
        </g>
      )}
      {type === 'footwear' && (
        <g transform="translate(-75, -417) scale(2.5)">
          {renderFootwearLayer(itemId)}
        </g>
      )}
    </svg>
  );
};

const AvatarPreview = ({ gender, topItem, bottomItem, footwearItem }) => {
  return (
    <svg viewBox="0 0 100 200" className="avatar-preview-canvas w-full h-full" style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }}>
      <SharedDefs topItem={topItem} bottomItem={bottomItem} />
      <BaseAvatar gender={gender} skinTone="medium" />
      {bottomItem && <g className="layer-animated">{renderBottomLayer(bottomItem)}</g>}
      {topItem && <g className="layer-animated">{renderTopLayer(topItem)}</g>}
      {footwearItem && <g className="layer-animated">{renderFootwearLayer(footwearItem)}</g>}
    </svg>
  );
};

export default AvatarPreview;
