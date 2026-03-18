import React, { useState } from 'react';
import '../../styles/game-dresscode.css';

// --- SVG Clothing Components ---

const GreenTee = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Sleeves */}
    <path d="M 12 24 L 6 36 L 16 40 L 22 30" fill="#a0e05e" />
    <path d="M 52 24 L 58 36 L 48 40 L 42 30" fill="#a0e05e" />
    {/* Body */}
    <path d="M 18 20 L 46 20 L 48 50 L 16 50 Z" fill="#75d131" />
    {/* Stripes */}
    <rect x="18" y="24" width="28" height="6" fill="#a0e05e" />
    <rect x="16" y="44" width="32" height="6" fill="#a0e05e" />
    {/* Neck */}
    <path d="M 26 20 Q 32 26 38 20 Z" fill="#58b31d" />
  </svg>
);

const BlueStriped = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Sleeves */}
    <path d="M 16 20 C 10 20 6 35 8 48 L 18 46 C 18 35 22 25 22 25" fill="#66a3ff" />
    <path d="M 48 20 C 54 20 58 35 56 48 L 46 46 C 46 35 42 25 42 25" fill="#66a3ff" />
    {/* Body */}
    <path d="M 18 20 L 46 20 L 48 50 L 16 50 Z" fill="#80b3ff" />
    {/* Vertical Stripes */}
    <rect x="22" y="20" width="2" height="30" fill="#3366cc" />
    <rect x="28" y="20" width="2" height="30" fill="#3366cc" />
    <rect x="34" y="20" width="2" height="30" fill="#3366cc" />
    <rect x="40" y="20" width="2" height="30" fill="#3366cc" />
    {/* Tie */}
    <path d="M 30 20 L 34 20 L 35 40 L 32 46 L 29 40 Z" fill="#333399" />
    {/* Collar */}
    <path d="M 24 20 L 32 26 L 30 20 Z" fill="#ffffff" />
    <path d="M 40 20 L 32 26 L 34 20 Z" fill="#ffffff" />
  </svg>
);

const TanJacket = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Sleeves */}
    <path d="M 14 24 L 8 42 L 18 44 L 22 30" fill="#e0b988" />
    <path d="M 50 24 L 56 42 L 46 44 L 42 30" fill="#e0b988" />
    {/* Shirt underneath */}
    <path d="M 26 20 L 38 20 L 38 48 L 26 48 Z" fill="#f4ebd9" />
    {/* Jacket Body Left */}
    <path d="M 16 20 L 30 20 L 28 50 L 14 50 Z" fill="#eac79b" />
    {/* Jacket Body Right */}
    <path d="M 48 20 L 34 20 L 36 50 L 50 50 Z" fill="#eac79b" />
    {/* Lapels */}
    <path d="M 22 20 L 30 35 L 26 20 Z" fill="#d4a873" />
    <path d="M 42 20 L 34 35 L 38 20 Z" fill="#d4a873" />
    {/* Buttons */}
    <circle cx="28" cy="38" r="2" fill="#8a6132" />
    <circle cx="28" cy="44" r="2" fill="#8a6132" />
  </svg>
);

const GreenShorts = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left Leg */}
    <path d="M 16 10 L 30 10 L 28 42 L 14 40 Z" fill="#4ade80" />
    <path d="M 14 36 L 28 38 L 28 42 L 14 40 Z" fill="#22c55e" /> {/* Hem */}
    {/* Right Leg */}
    <path d="M 34 10 L 48 10 L 50 40 L 36 42 Z" fill="#4ade80" />
    <path d="M 36 38 L 50 36 L 50 40 L 36 42 Z" fill="#22c55e" /> {/* Hem */}
    {/* Waistband */}
    <rect x="15" y="10" width="34" height="6" fill="#86efac" rx="2" />
    {/* Strings */}
    <path d="M 30 16 Q 28 24 26 28" stroke="#ffffff" strokeWidth="2" fill="none" />
    <path d="M 34 16 Q 36 24 38 28" stroke="#ffffff" strokeWidth="2" fill="none" />
  </svg>
);

const BlueJeans = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left Leg */}
    <path d="M 18 10 L 31 10 L 28 58 L 16 58 Z" fill="#3b82f6" />
    {/* Right Leg */}
    <path d="M 33 10 L 46 10 L 48 58 L 36 58 Z" fill="#3b82f6" />
    {/* Waistband */}
    <rect x="17" y="10" width="30" height="5" fill="#2563eb" />
    {/* Highlight */}
    <rect x="22" y="18" width="4" height="30" fill="#60a5fa" rx="2" />
    <rect x="38" y="18" width="4" height="30" fill="#60a5fa" rx="2" />
    {/* Cuffs */}
    <rect x="15" y="54" width="14" height="4" fill="#60a5fa" rx="1" />
    <rect x="35" y="54" width="14" height="4" fill="#60a5fa" rx="1" />
  </svg>
);

const BrownShoes = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left Shoe */}
    <path d="M 10 40 C 10 32 24 32 26 40 L 28 48 L 10 48 Z" fill="#8b4513" />
    <path d="M 10 46 L 28 46 L 28 48 L 10 48 Z" fill="#5c2e0b" />
    {/* Right Shoe */}
    <path d="M 38 40 C 38 32 52 32 54 40 L 56 48 L 38 48 Z" fill="#8b4513" />
    <path d="M 38 46 L 56 46 L 56 48 L 38 48 Z" fill="#5c2e0b" />
  </svg>
);

const PurpleSneakers = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left */}
    <path d="M 12 36 L 24 40 L 26 48 L 10 48 C 8 42 10 38 12 36 Z" fill="#b19cd9" />
    <path d="M 10 46 L 26 46 L 26 48 L 10 48 Z" fill="#ffffff" />
    {/* Right */}
    <path d="M 40 40 L 52 36 C 54 38 56 42 54 48 L 38 48 L 40 40 Z" fill="#b19cd9" />
    <path d="M 38 46 L 54 46 L 54 48 L 38 48 Z" fill="#ffffff" />
  </svg>
);

const OrangeBoots = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left offset for realism */}
    <path d="M 12 32 L 24 32 L 26 48 L 10 48 Z" fill="#f08c00" />
    <rect x="12" y="30" width="12" height="4" fill="#b06600" rx="2" />
    <path d="M 10 44 L 26 44 L 26 48 L 10 48 Z" fill="#333333" />
    
    {/* Right offset */}
    <path d="M 40 32 L 52 32 L 54 48 L 38 48 Z" fill="#f08c00" />
    <rect x="40" y="30" width="12" height="4" fill="#b06600" rx="2" />
    <path d="M 38 44 L 54 44 L 54 48 L 38 48 Z" fill="#333333" />
  </svg>
);


// --- Data Mapping ---
const TOPS = [
  { id: 'top_1', Comp: GreenTee },
  { id: 'top_2', Comp: BlueStriped },
  { id: 'top_3', Comp: TanJacket },
  { id: 'top_4', Comp: GreenTee }, 
  { id: 'top_5', Comp: TanJacket },
  { id: 'top_6', Comp: BlueStriped }
];

const BOTTOMS = [
  { id: 'bot_1', Comp: GreenShorts },
  { id: 'bot_2', Comp: BlueJeans },
  { id: 'bot_3', Comp: BlueJeans },
  { id: 'bot_4', Comp: BlueJeans },
  { id: 'bot_5', Comp: BlueJeans },
  { id: 'bot_6', Comp: GreenShorts }
];

const FOOTWEAR = [
  { id: 'foot_1', Comp: BrownShoes },
  { id: 'foot_2', Comp: PurpleSneakers },
  { id: 'foot_3', Comp: OrangeBoots }
];

const DressCodeSelection = ({ onComplete }) => {
  const [gender, setGender] = useState('male');
  
  // Single selection state
  const [selections, setSelections] = useState({
    top: 'top_1',
    bottom: 'bot_2',
    footwear: 'foot_3'
  });

  const handleSelect = (category, id) => {
    setSelections(prev => ({
      ...prev,
      [category]: id
    }));
  };

  const handleNextClick = () => {
    const finalConfig = {
      gender,
      top: selections.top,
      bottom: selections.bottom,
      footwear: selections.footwear
    };
    if (onComplete) onComplete(finalConfig);
  };

  // Helper to render the currently selected SVG component
  const SelectedTop = TOPS.find(t => t.id === selections.top)?.Comp || (() => null);
  const SelectedBottom = BOTTOMS.find(b => b.id === selections.bottom)?.Comp || (() => null);
  const SelectedFootwear = FOOTWEAR.find(f => f.id === selections.footwear)?.Comp || (() => null);

  return (
    <div className="dresscode-container">
      <h1 className="title">University Dress Code - {gender === 'male' ? 'Male' : 'Female'}</h1>

      <div className="main-content">
        
        {/* LEFT SIDE: Grids */}
        <div className="left-panels">
          <div className="top-row">
            
            {/* TOPS PANEL */}
            <div className="panel">
              <h3 className="panel-title">Top</h3>
              <div className="grid-3x2">
                {TOPS.map(item => (
                  <div 
                    key={item.id} 
                    className={`card ${selections.top === item.id ? 'active' : ''}`}
                    onClick={() => handleSelect('top', item.id)}
                  >
                    <div className="card-inner">
                      <item.Comp />
                    </div>
                    {selections.top === item.id && (
                      <div className="check-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOMS PANEL */}
            <div className="panel">
              <h3 className="panel-title">Bottom</h3>
              <div className="grid-3x2">
                {BOTTOMS.map(item => (
                  <div 
                    key={item.id} 
                    className={`card ${selections.bottom === item.id ? 'active' : ''}`}
                    onClick={() => handleSelect('bottom', item.id)}
                  >
                    <div className="card-inner">
                      <item.Comp />
                    </div>
                    {selections.bottom === item.id && (
                      <div className="check-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FOOTWEAR PANEL */}
          <div className="panel panel-bottom">
            <h3 className="panel-title">Footwear</h3>
            <div className="grid-3x1">
              {FOOTWEAR.map(item => (
                <div 
                  key={item.id} 
                  className={`card ${selections.footwear === item.id ? 'active' : ''}`}
                  onClick={() => handleSelect('footwear', item.id)}
                >
                  <div className="card-inner">
                    <item.Comp />
                  </div>
                  {selections.footwear === item.id && (
                    <div className="check-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Preview pane */}
        <div className="preview-panel">
          
          <div className="toggle-container">
            <div className="toggle-bg">
              <div 
                className={`toggle-option ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                Male
              </div>
              <div 
                className={`toggle-option ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                Female
              </div>
            </div>
          </div>

          <div className="avatar-wrapper">
            <div className="avatar-dummy">
              {/* Dummy body parts underneath */}
              <div className="dummy-head"></div>
              <div className="dummy-neck"></div>
              <div className="dummy-arms"></div>
              <div className="dummy-legs"></div>
              
              {/* Overlay the chosen SVGs */}
              <div className="avatar-layer avatar-footwear"><SelectedFootwear /></div>
              <div className="avatar-layer avatar-bottom"><SelectedBottom /></div>
              <div className="avatar-layer avatar-top"><SelectedTop /></div>
            </div>
          </div>

          <p className="preview-text">Preview</p>
          
          <div className="mini-thumbnails">
            <div className="thumbnail"><SelectedTop /></div>
            <div className="thumbnail"><SelectedBottom /></div>
            <div className="thumbnail"><SelectedFootwear /></div>
          </div>

        </div>

      </div>

      <button className="next-btn" onClick={handleNextClick}>NEXT</button>

    </div>
  );
};

export default DressCodeSelection;
