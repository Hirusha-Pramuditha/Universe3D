import React, { useState, useEffect } from 'react';
import '../../styles/game-dresscode.css';
import AvatarPreview from './AvatarPreview';

// ==========================================
// 1. MALE SVGS
// ==========================================

import { AvatarItemThumbnail } from './AvatarPreview';

// Tops
const LongSleeveShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_1" />;
const TShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_2" />;
const FormalShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_3" />;
const PoloShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_4" />;
const SleevelessTop = () => <AvatarItemThumbnail type="top" itemId="m_top_5" />;
const TankTop = () => <AvatarItemThumbnail type="top" itemId="m_top_6" />;

// Bottoms
const RippedJeans = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_1" />;
const RegularJeans = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_2" />;
const CargoPants = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_3" />;
const BeachShorts = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_4" />;
const SportsCapri = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_5" />;
const ClassicFitJeans = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_6" />;

// Footwear - Real shoe images
const OrangeSneakers = () => (
  <img src="/assets/footwear/shoe1.png" alt="Orange Sneakers" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);
const FormalShoes = () => (
  <img src="/assets/footwear/shoe2.png" alt="Black Formal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);
const Crocs = () => (
  <img src="/assets/footwear/shoe3.png" alt="Black Crocs" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);
const FlipFlops = () => (
  <img src="/assets/footwear/shoe4.png" alt="Flip Flops" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);
const RedSneakers = () => (
  <img src="/assets/footwear/shoe5.png" alt="Red Sneakers" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);
// ==========================================
// 2. FEMALE SVGS
// ==========================================

const FrockTop = () => (
  // Floral pastel, flared at waist
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Body */}
    <path d="M 22 18 L 42 18 L 50 56 L 14 56 Z" fill="#f8bbd0" />
    {/* Thin straps */}
    <rect x="24" y="10" width="2" height="10" fill="#f48fb1" />
    <rect x="38" y="10" width="2" height="10" fill="#f48fb1" />
    {/* Waist belt */}
    <rect x="18" y="32" width="28" height="4" fill="#ec407a" rx="2" />
    {/* Simple floral pattern */}
    <circle cx="25" cy="45" r="2.5" fill="#fff" />
    <circle cx="39" cy="42" r="3" fill="#ec407a" />
    <circle cx="32" cy="50" r="2" fill="#fff" />
  </svg>
);
const FemaleLongSleeve = () => (
  // Cream fitted, cuffed
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 18 20 L 46 20 L 44 54 L 20 54 Z" fill="#fffdd0" />
    <path d="M 18 20 L 10 46 L 16 48 L 22 28" fill="#fffdd0" />
    <path d="M 46 20 L 54 46 L 48 48 L 42 28" fill="#fffdd0" />
    {/* Cuffs */}
    <rect x="8" y="44" width="10" height="4" fill="#eee8aa" transform="rotate(15 8 44)" />
    <rect x="46" y="46" width="10" height="4" fill="#eee8aa" transform="rotate(-15 46 46)" />
    {/* Neckline */}
    <path d="M 26 20 Q 32 30 38 20 Z" fill="#ffccbc" /> {/* Generic skin tone behind */}
    {/* Vertical seam */}
    <rect x="31.5" y="28" width="1" height="26" fill="#ccc" />
  </svg>
);
const FemaleSleeveless = () => (
  // Lavender solid, thin straps
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 22 24 L 42 24 L 42 54 L 22 54 Z" fill="#e6e6fa" />
    <path d="M 22 24 Q 32 32 42 24 Z" fill="#d8bfd8" /> {/* Neck drape/shadow */}
    <rect x="24" y="12" width="2" height="14" fill="#d8bfd8" />
    <rect x="38" y="12" width="2" height="14" fill="#d8bfd8" />
  </svg>
);
const OffShoulder = () => (
  // Sky blue ruffled
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Main body */}
    <path d="M 20 26 L 44 26 L 44 54 L 20 54 Z" fill="#87ceeb" />
    {/* Ruffles sweeping across shoulders */}
    <path d="M 12 28 Q 20 20 32 26 Q 44 20 52 28 Q 54 36 46 32 Q 32 40 18 32 Q 10 36 12 28 Z" fill="#b0e2ff" />
  </svg>
);
const FemaleTShirt = () => (
  // Coral crew neck
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 16 20 L 48 20 L 46 52 L 18 52 Z" fill="#ff7f50" />
    <path d="M 16 20 L 8 32 L 14 36 L 22 26" fill="#ff7f50" />
    <path d="M 48 20 L 56 32 L 50 36 L 42 26" fill="#ff7f50" />
    <path d="M 26 20 Q 32 26 38 20 Z" fill="#cd5b45" /> {/* Neck outline */}
  </svg>
);
const CropTop = () => (
  // Dark grey short hem
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 20 20 L 44 20 L 42 40 L 22 40 Z" fill="#34495e" />
    {/* Tight short sleeves */}
    <path d="M 20 20 L 14 28 L 20 32 Z" fill="#34495e" />
    <path d="M 44 20 L 50 28 L 44 32 Z" fill="#34495e" />
    <path d="M 28 20 Q 32 26 36 20 Z" fill="#2c3e50" />
  </svg>
);

const FormalTrousers = () => (
  // Navy high waist straight cut
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 20 6 L 44 6 L 42 58 L 32 58 L 32 20 L 32 58 L 22 58 Z" fill="#1a237e" />
    <rect x="20" y="6" width="24" height="6" fill="#0d47a1" /> {/* High waistband */}
    {/* Crease line */}
    <rect x="26" y="12" width="1" height="46" fill="#283593" />
    <rect x="37" y="12" width="1" height="46" fill="#283593" />
  </svg>
);
const LongDress = () => (
  // Flowy long skirt + elegant top (Full Body)
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 28 15 L 36 15 L 42 35 L 22 35 Z" fill="#d8bfd8" /> {/* Top half */}
    <path d="M 22 35 L 42 35 L 52 58 L 12 58 Z" fill="#d8bfd8" /> {/* Bottom half */}
    {/* Straps */}
    <rect x="28" y="10" width="2" height="5" fill="#cca8cc" />
    <rect x="34" y="10" width="2" height="5" fill="#cca8cc" />
    {/* Drapery lines */}
    <path d="M 28 35 Q 30 45 24 58" stroke="#cca8cc" strokeWidth="1.5" fill="none" />
    <path d="M 36 35 Q 34 45 40 58" stroke="#cca8cc" strokeWidth="1.5" fill="none" />
    <rect x="22" y="33" width="20" height="4" fill="#cca8cc" />
  </svg>
);
const FemaleJeans = () => (
  // Mid-rise blue denim, straight leg
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 20 12 L 44 12 L 42 58 L 33 58 L 33 26 L 31 26 L 31 58 L 22 58 Z" fill="#5cacee" />
    <rect x="20" y="12" width="24" height="4" fill="#4fa3e8" />
    {/* Subtle fade */}
    <rect x="24" y="20" width="3" height="30" fill="#87cefa" rx="1.5" />
    <rect x="37" y="20" width="3" height="30" fill="#87cefa" rx="1.5" />
  </svg>
);

const ClosedHeels = () => (
  // Black stiletto
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left */}
    <path d="M 12 40 L 26 44 L 26 48 L 8 48 C 8 42 10 40 12 40 Z" fill="#111" />
    <path d="M 24 44 L 26 44 L 26 56 L 24 56 Z" fill="#333" /> {/* Stiletto */}
    <path d="M 14 42 Q 22 40 26 44" fill="#ffccbc" /> {/* Exposed foot */}
    {/* Right */}
    <path d="M 40 44 L 52 40 C 54 40 56 42 56 48 L 38 48 L 38 44 Z" fill="#111" />
    <path d="M 38 44 L 40 44 L 40 56 L 38 56 Z" fill="#333" /> /* Stiletto Right */
    <path d="M 40 44 Q 44 40 50 42" fill="#ffccbc" />
  </svg>
);
const FemaleSneakers = () => (
  // White low top minimal
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left */}
    <path d="M 10 40 L 26 40 L 26 48 L 8 48 C 8 44 9 42 10 40 Z" fill="#fff" />
    <path d="M 8 46 L 26 46" stroke="#ddd" strokeWidth="2" fill="none" />
    <path d="M 12 40 L 22 43" stroke="#eee" strokeWidth="1" fill="none" />
    {/* Right */}
    <path d="M 38 40 L 54 40 C 55 42 56 44 56 48 L 38 48 Z" fill="#fff" />
    <path d="M 38 46 L 56 46" stroke="#ddd" strokeWidth="2" fill="none" />
    <path d="M 42 43 L 52 40" stroke="#eee" strokeWidth="1" fill="none" />
  </svg>
);
const FemaleSlippers = () => (
  // Coral open flat
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    {/* Left */}
    <rect x="8" y="46" width="20" height="2" fill="#d2b48c" /> {/* Sole */}
    <path d="M 12 40 Q 18 36 24 44" stroke="#ff7f50" strokeWidth="4" fill="none" /> {/* Strap */}
    {/* Right */}
    <rect x="36" y="46" width="20" height="2" fill="#d2b48c" />
    <path d="M 40 44 Q 46 36 52 40" stroke="#ff7f50" strokeWidth="4" fill="none" />
  </svg>
);
const ShortSkirt = () => (
  // Pastel pink flared short skirt
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 22 10 L 42 10 L 52 40 L 12 40 Z" fill="#ffb6c1" />
    <rect x="22" y="10" width="20" height="4" fill="#ff99cc" />
    {/* Pleats / folds */}
    <path d="M 28 14 L 24 40" stroke="#ff99cc" strokeWidth="1" fill="none" />
    <path d="M 36 14 L 40 40" stroke="#ff99cc" strokeWidth="1" fill="none" />
  </svg>
);
const DenimShorts = () => (
  // Light blue short denim cut-offs
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 20 12 L 44 12 L 46 36 L 33 36 L 33 26 L 31 26 L 31 36 L 18 36 Z" fill="#5cacee" />
    <rect x="20" y="12" width="24" height="4" fill="#2e86c1" />
    {/* Distressed edge */}
    <path d="M 18 36 Q 22 34 25 37 T 31 36" stroke="#fff" strokeWidth="1" fill="none" />
    <path d="M 33 36 Q 37 34 41 37 T 46 36" stroke="#fff" strokeWidth="1" fill="none" />
  </svg>
);
const HighTornJeans = () => (
  // High waisted, light blue, heavily ripped
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 20 6 L 44 6 L 42 58 L 33 58 L 33 26 L 31 26 L 31 58 L 22 58 Z" fill="#87cefa" />
    <rect x="20" y="6" width="24" height="6" fill="#4682b4" /> {/* High waist */}
    {/* Rips */}
    <path d="M 24 24 L 30 24 L 28 26 L 23 26 Z" fill="#fff" />
    <path d="M 35 34 L 41 34 L 40 36 L 34 36 Z" fill="#fff" />
    <path d="M 23 44 L 28 44 L 27 46 L 22 46 Z" fill="#fff" />
    <path d="M 35 20 L 40 20 L 39 22 L 34 22 Z" fill="#fff" />
  </svg>
);

// ==========================================
// DATA MAPPING
// ==========================================

const MALE_DATA = {
  tops: [
    { id: 'm_top_1', label: 'long sleeve shirt', Comp: LongSleeveShirt },
    { id: 'm_top_2', label: 't shirt', Comp: TShirt },
    { id: 'm_top_3', label: 'formal shirt', Comp: FormalShirt },
    { id: 'm_top_4', label: 'polo t shirt', Comp: PoloShirt }, 
    { id: 'm_top_5', label: 'sleeveless top', Comp: SleevelessTop },
    { id: 'm_top_6', label: 'tank top', Comp: TankTop }
  ],
  bottoms: [
    { id: 'm_bot_1', label: 'ripped jeans', Comp: RippedJeans },
    { id: 'm_bot_2', label: 'regular jeans', Comp: RegularJeans },
    { id: 'm_bot_3', label: 'cargo jeans', Comp: CargoPants },
    { id: 'm_bot_4', label: 'beach shorts', Comp: BeachShorts },
    { id: 'm_bot_5', label: 'sports capri', Comp: SportsCapri },
    { id: 'm_bot_6', label: 'classic fit jeans', Comp: ClassicFitJeans }
  ],
  footwear: [
    { id: 'm_foot_1', label: 'orange sneakers', Comp: OrangeSneakers },
    { id: 'm_foot_2', label: 'black formal', Comp: FormalShoes },
    { id: 'm_foot_3', label: 'black crocs', Comp: Crocs },
    { id: 'm_foot_4', label: 'flip flops', Comp: FlipFlops },
    { id: 'm_foot_5', label: 'red sneakers', Comp: RedSneakers }
  ]
};

const FEMALE_DATA = {
  tops: [
    { id: 'f_top_1', label: 'frock', Comp: FrockTop },
    { id: 'f_top_2', label: 'long sleeve shirt', Comp: FemaleLongSleeve },
    { id: 'f_top_3', label: 'sleeveless top', Comp: FemaleSleeveless },
    { id: 'f_top_4', label: 'off shoulder top', Comp: OffShoulder }, 
    { id: 'f_top_5', label: 't shirt', Comp: FemaleTShirt },
    { id: 'f_top_6', label: 'crop top', Comp: CropTop },
    { id: 'f_top_7', label: 'long dress', Comp: LongDress }
  ],
  bottoms: [
    { id: 'f_bot_1', label: 'formal trousers', Comp: FormalTrousers },
    { id: 'f_bot_3', label: 'regular jeans', Comp: FemaleJeans },
    { id: 'f_bot_4', label: 'short skirt', Comp: ShortSkirt },
    { id: 'f_bot_5', label: 'denim shorts', Comp: DenimShorts },
    { id: 'f_bot_6', label: 'high torn jeans', Comp: HighTornJeans }
  ],
  footwear: [
    { id: 'f_foot_1', label: 'closed heels', Comp: ClosedHeels },
    { id: 'f_foot_2', label: 'sneakers', Comp: FemaleSneakers },
    { id: 'f_foot_3', label: 'slippers', Comp: FemaleSlippers }
  ]
};

// --- VALIDATION RULES ---
const dressRules = {
  male: {
    tops: {
      'm_top_5': { message: "Sleeveless tops are not allowed. Shoulders must be covered.", suggestion: "Try: T-Shirt, Polo Shirt, Long Sleeve Shirt" },
      'm_top_6': { message: "Tank tops are not allowed. Wear a proper shirt or t-shirt.", suggestion: "Try: T-Shirt, Polo Shirt, Formal Shirt" }
    },
    bottoms: {
      'm_bot_1': { message: "Ripped jeans are not allowed. Clothing must not be torn.", suggestion: "Try: Regular Jeans, Cargo Pants, Classic Fit Jeans" },
      'm_bot_4': { message: "Beach shorts are not allowed. Wear full-length trousers.", suggestion: "Try: Regular Jeans, Cargo Pants, Classic Fit Jeans" },
      'm_bot_5': { message: "Sports capris are not allowed. Wear full-length pants.", suggestion: "Try: Regular Jeans, Classic Fit Jeans" }
    },
    footwear: {
      'm_foot_3': { message: "Crocs are too casual for university dress code. Please wear appropriate closed footwear.", suggestion: "Try: Sneakers, Formal Shoes" },
      'm_foot_4': { message: "Flip flops are strictly prohibited on campus. Appropriate closed footwear is required.", suggestion: "Try: Sneakers, Formal Shoes" }
    }
  },
  female: {
    tops: {
      'f_top_3': { message: "Sleeveless tops are not allowed. Shoulders must be covered.", suggestion: "Try: T-Shirt, Long Sleeve Shirt" },
      'f_top_4': { message: "Off-shoulder tops are not allowed. Shoulders must be covered.", suggestion: "Try: T-Shirt, Long Sleeve Shirt, Frock" },
      'f_top_6': { message: "Crop tops are not allowed. Midriff must be covered.", suggestion: "Try: T-Shirt, Long Dress" }
    },
    bottoms: {
      'f_bot_4': { message: "Short skirts are not allowed. Skirts or shorts must be knee-length or longer.", suggestion: "Try: Formal Trousers, Regular Jeans" },
      'f_bot_5': { message: "Denim shorts are not allowed. Wear full-length or knee-length pants/skirts.", suggestion: "Try: Formal Trousers, Regular Jeans" },
      'f_bot_6': { message: "High torn jeans are not allowed. Clothing must not be torn.", suggestion: "Try: Regular Jeans, Formal Trousers" }
    },
    footwear: {
      'f_foot_3': { message: "Slippers are not allowed. Closed or formal footwear is preferred.", suggestion: "Try: Sneakers, Closed Heels" }
    }
  }
};

// --- FULL BODY LOGIC ---
const FULL_BODY_TOPS = ['f_top_1', 'f_top_7']; // Frock, Long Dress

const validateOutfit = (gender, selectedOutfit) => {
  let errors = [];
  const rules = dressRules[gender];
  const currentData = gender === 'male' ? MALE_DATA : FEMALE_DATA;

  // check top
  if (selectedOutfit.top && rules.tops[selectedOutfit.top]) {
    const itemLabel = currentData.tops.find(t => t.id === selectedOutfit.top)?.label || selectedOutfit.top;
    errors.push({
      type: "Top",
      item: itemLabel,
      message: rules.tops[selectedOutfit.top].message,
      suggestion: rules.tops[selectedOutfit.top].suggestion
    });
  }

  // check bottom
  if (selectedOutfit.bottom && rules.bottoms[selectedOutfit.bottom]) {
    const itemLabel = currentData.bottoms.find(b => b.id === selectedOutfit.bottom)?.label || selectedOutfit.bottom;
    errors.push({
      type: "Bottom",
      item: itemLabel,
      message: rules.bottoms[selectedOutfit.bottom].message,
      suggestion: rules.bottoms[selectedOutfit.bottom].suggestion
    });
  }

  // check footwear
  if (selectedOutfit.footwear && rules.footwear[selectedOutfit.footwear]) {
    const itemLabel = currentData.footwear.find(f => f.id === selectedOutfit.footwear)?.label || selectedOutfit.footwear;
    errors.push({
      type: "Footwear",
      item: itemLabel,
      message: rules.footwear[selectedOutfit.footwear].message,
      suggestion: rules.footwear[selectedOutfit.footwear].suggestion
    });
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors
    };
  }
  
  return { isValid: true, errors: [] };
};

const DressCodeSelection = ({ onComplete, isMuted, onToggleMute }) => {
  const [gender, setGender] = useState('male');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState([]);
  
  // Selection state structured by gender
  const [selections, setSelections] = useState({
    male: {
      top: 'm_top_2',
      bottom: 'm_bot_2',
      footwear: 'm_foot_1'
    },
    female: {
      top: 'f_top_1',
      bottom: 'f_bot_1',
      footwear: 'f_foot_1'
    }
  });

  const handleGenderSwitch = (newGender) => {
    if (gender === newGender) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setGender(newGender);
      // Reset selections to first item for new gender
      setSelections(prev => ({
        ...prev,
        [newGender]: {
          top: newGender === 'male' ? 'm_top_1' : 'f_top_1',
          bottom: newGender === 'male' ? 'm_bot_1' : 'f_bot_1',
          footwear: newGender === 'male' ? 'm_foot_1' : 'f_foot_1'
        }
      }));
      setIsTransitioning(false);
    }, 200);
  };

  const handleSelect = (category, id) => {
    // Check if selecting a bottom while a full-body outfit is active
    if (category === 'bottom' && gender === 'female' && FULL_BODY_TOPS.includes(selections.female.top)) {
      setWarningMessage([{
        type: "Selection",
        item: "Bottoms",
        message: "You cannot select a bottom with a frock or long dress.",
        suggestion: "Change your top first to wear bottoms."
      }]);
      setShowWarning(true);
      return; 
    }

    setSelections(prev => {
      const nextState = { 
        ...prev,
        [gender]: { ...prev[gender], [category]: id }
      };

      // Dependency resolution
      if (gender === 'female' && category === 'top') {
        if (FULL_BODY_TOPS.includes(id)) {
          nextState.female.bottom = null; // Clear bottom when full body top selected
        } else if (!FULL_BODY_TOPS.includes(id) && nextState.female.bottom === null) {
          nextState.female.bottom = 'f_bot_1'; // Re-establish default bottom when switching to normal top
        }
      }

      return nextState;
    });
  };

  const handleNextClick = () => {
    const activeSelections = selections[gender];
    const finalConfig = {
      gender,
      top: activeSelections.top,
      bottom: activeSelections.bottom,
      footwear: activeSelections.footwear
    };

    // Run Validation
    const validationResult = validateOutfit(gender, activeSelections);
    
    if (!validationResult.isValid) {
      setWarningMessage(validationResult.errors);
      setShowWarning(true);
      return; // Stop navigation
    }

    if (onComplete) onComplete(finalConfig);
  };

  const currentData = gender === 'male' ? MALE_DATA : FEMALE_DATA;
  const activeSelections = selections[gender];

  const SelectedTop = currentData.tops.find(t => t.id === activeSelections.top)?.Comp || (() => null);
  const SelectedBottom = currentData.bottoms.find(b => b.id === activeSelections.bottom)?.Comp || (() => null);
  const SelectedFootwear = currentData.footwear.find(f => f.id === activeSelections.footwear)?.Comp || (() => null);

  const getBottomGridClass = () => {
    return 'grid-3x2';
  };

  const isBottomsDisabled = gender === 'female' && FULL_BODY_TOPS.includes(activeSelections.top);

  return (
    <div className="dresscode-container">
      {/* Animated Sky Background */}
      <div className="dc-background"></div>
      <div className="dc-gradient"></div>
      
      {/* Light Rays */}
      <div className="dc-rays">
        <div className="dc-ray dc-ray-1"></div>
        <div className="dc-ray dc-ray-2"></div>
        <div className="dc-ray dc-ray-3"></div>
        <div className="dc-ray dc-ray-4"></div>
        <div className="dc-ray dc-ray-5"></div>
      </div>

      {/* Clouds */}
      <div className="dc-clouds">
        <div className="dc-cloud dc-cloud-1">
          <div className="dc-cloud-puff dc-puff-1"></div>
          <div className="dc-cloud-puff dc-puff-2"></div>
          <div className="dc-cloud-puff dc-puff-3"></div>
          <div className="dc-cloud-puff dc-puff-4"></div>
        </div>
        <div className="dc-cloud dc-cloud-2">
          <div className="dc-cloud-puff dc-puff-1"></div>
          <div className="dc-cloud-puff dc-puff-2"></div>
          <div className="dc-cloud-puff dc-puff-3"></div>
          <div className="dc-cloud-puff dc-puff-4"></div>
        </div>
        <div className="dc-cloud dc-cloud-3">
          <div className="dc-cloud-puff dc-puff-1"></div>
          <div className="dc-cloud-puff dc-puff-2"></div>
          <div className="dc-cloud-puff dc-puff-3"></div>
        </div>
      </div>

      {/* CORNER MUTE BUTTON */}
      <button className="mute-btn-corner" onClick={onToggleMute} title={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </button>

      <h1 className="title">University Dress Code — {gender === 'male' ? 'Male' : 'Female'}</h1>

      <div className={`main-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        
        {/* LEFT SIDE: Grids */}
        <div className="left-panels">
          <div className="top-row">
            
            {/* TOPS PANEL */}
            <div className="panel">
              <h3 className="panel-title">{gender === 'male' ? "Men's Tops" : "Women's Tops"}</h3>
              <div className="grid-3x2">
                {currentData.tops.map(item => (
                  <div 
                    key={item.id} 
                    className={`card ${activeSelections.top === item.id ? 'active' : ''}`}
                    onClick={() => handleSelect('top', item.id)}
                  >
                    <div className="card-inner">
                      <item.Comp />
                    </div>
                    <p className="item-label">{item.label}</p>
                    {activeSelections.top === item.id && (
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
            <div className={`panel ${isBottomsDisabled ? 'disabled-panel' : ''}`}>
              <h3 className="panel-title">{gender === 'male' ? "Men's Bottoms" : "Women's Bottoms"}</h3>
              {isBottomsDisabled && (
                <p className="helper-text">Frock or long dress already covers full outfit. Bottom selection is not required.</p>
              )}
              <div className={getBottomGridClass()}>
                {currentData.bottoms.map(item => (
                  <div 
                    key={item.id} 
                    className={`card ${activeSelections.bottom === item.id ? 'active' : ''}`}
                    onClick={() => handleSelect('bottom', item.id)}
                  >
                    <div className="card-inner">
                      <item.Comp />
                    </div>
                    <p className="item-label">{item.label}</p>
                    {activeSelections.bottom === item.id && (
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
            <h3 className="panel-title">{gender === 'male' ? "Men's Footwear" : "Women's Footwear"}</h3>
            <div className="grid-3x1">
              {currentData.footwear.map(item => (
                <div 
                  key={item.id} 
                  className={`card ${activeSelections.footwear === item.id ? 'active' : ''}`}
                  onClick={() => handleSelect('footwear', item.id)}
                >
                  <div className="card-inner">
                    <item.Comp />
                  </div>
                  <p className="item-label">{item.label}</p>
                  {activeSelections.footwear === item.id && (
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
                onClick={() => handleGenderSwitch('male')}
              >
                Male
              </div>
              <div 
                className={`toggle-option ${gender === 'female' ? 'active' : ''}`}
                onClick={() => handleGenderSwitch('female')}
              >
                Female
              </div>
            </div>
          </div>

          <div className="avatar-wrapper">
            <AvatarPreview 
              gender={gender} 
              topItem={activeSelections.top} 
              bottomItem={activeSelections.bottom} 
              footwearItem={activeSelections.footwear} 
            />
          </div>

          <p className="preview-text">Preview</p>
          
          <div className="mini-thumbnails">
            <div className="thumbnail"><SelectedTop /></div>
            <div className="thumbnail">
              {activeSelections.bottom ? <SelectedBottom /> : null}
            </div>
            <div className="thumbnail"><SelectedFootwear /></div>
          </div>

        </div>

      </div>

      <button className="next-btn" onClick={handleNextClick}>NEXT</button>

      {/* Validation Warning Modal */}
      {showWarning && (
        <div className="validation-modal-overlay">
          <div className="validation-modal">
            <div className="validation-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="validation-modal-title">Dress Code Violation</h2>
            <div className="validation-modal-message">
              {Array.isArray(warningMessage) ? (
                <div className="validation-error-list">
                  {warningMessage.map((err, idx) => (
                    <div key={idx} className="validation-error-item">
                      <div className="validation-error-title">{err.type} Issue: {err.item.toUpperCase()}</div>
                      <div className="validation-error-desc">{err.message}</div>
                      {err.suggestion && (
                        <div className="validation-error-suggestion">{err.suggestion}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{warningMessage}</p>
              )}
            </div>
            <button className="validation-modal-btn" onClick={() => setShowWarning(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DressCodeSelection;
