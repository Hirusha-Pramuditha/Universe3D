import React, { useState, useEffect } from 'react';
import '../../styles/game-dresscode.css';
import AvatarPreview from './AvatarPreview';

// ==========================================
// 1. MALE SVGS
// ==========================================
const LongSleeveShirt = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 16 20 L 48 20 L 50 54 L 14 54 Z" fill="#2c3e50" />
    <path d="M 16 20 L 8 42 L 18 44 L 22 30" fill="#2c3e50" />
    <path d="M 48 20 L 56 42 L 46 44 L 42 30" fill="#2c3e50" />
    <path d="M 6 40 L 20 45 L 18 48 L 4 43 Z" fill="#34495e" />
    <path d="M 58 40 L 44 45 L 46 48 L 60 43 Z" fill="#34495e" />
    <path d="M 24 20 L 32 28 L 22 26 Z" fill="#1a252f" />
    <path d="M 40 20 L 32 28 L 42 26 Z" fill="#1a252f" />
    <rect x="31" y="28" width="2" height="26" fill="#1a252f" />
    <circle cx="32" cy="34" r="1.5" fill="#ecf0f1" />
    <circle cx="32" cy="42" r="1.5" fill="#ecf0f1" />
  </svg>
);
const TShirt = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 14 20 L 4 34 L 12 38 L 20 28" fill="#e74c3c" />
    <path d="M 50 20 L 60 34 L 52 38 L 44 28" fill="#e74c3c" />
    <path d="M 18 20 L 46 20 L 48 52 L 16 52 Z" fill="#e74c3c" />
    <path d="M 26 20 Q 32 28 38 20 Z" fill="#c0392b" />
    <circle cx="40" cy="30" r="2" fill="#fff" />
  </svg>
);
const FormalShirt = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 18 20 L 46 20 L 48 52 L 16 52 Z" fill="#87CEEB" />
    <path d="M 16 20 L 8 36 L 16 40 L 22 28" fill="#87CEEB" />
    <path d="M 48 20 L 56 36 L 48 40 L 42 28" fill="#87CEEB" />
    <path d="M 24 20 L 32 26 L 30 20 Z" fill="#ffffff" />
    <path d="M 40 20 L 32 26 L 34 20 Z" fill="#ffffff" />
    <rect x="31" y="26" width="2" height="26" fill="#ffffff" />
    <circle cx="32" cy="32" r="1" fill="#333" />
    <circle cx="32" cy="40" r="1" fill="#333" />
    <circle cx="32" cy="48" r="1" fill="#333" />
    <path d="M 38 30 L 44 30 L 44 36 L 41 38 L 38 36 Z" fill="#ffffff" />
  </svg>
);
const PoloShirt = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 14 20 L 6 36 L 14 40 L 22 28" fill="#27ae60" />
    <path d="M 50 20 L 58 36 L 50 40 L 42 28" fill="#27ae60" />
    <rect x="10" y="37" width="6" height="3" fill="#ffffff" transform="rotate(25 10 37)" />
    <rect x="48" y="39" width="6" height="3" fill="#ffffff" transform="rotate(-25 48 39)" />
    <path d="M 18 20 L 46 20 L 48 54 L 16 54 Z" fill="#2ecc71" />
    <path d="M 24 20 L 32 30 L 30 20 Z" fill="#ffffff" />
    <path d="M 40 20 L 32 30 L 34 20 Z" fill="#ffffff" />
    <rect x="31" y="20" width="2" height="12" fill="#ffffff" />
    <circle cx="32" cy="27" r="1" fill="#27ae60" />
  </svg>
);
const SleevelessTop = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 22 18 L 42 18 L 46 54 L 18 54 Z" fill="#f39c12" />
    <path d="M 22 18 L 26 18 L 18 30 Z" fill="#e67e22" />
    <path d="M 42 18 L 38 18 L 46 30 Z" fill="#e67e22" />
    <path d="M 26 18 Q 32 30 38 18 Z" fill="rgba(0,0,0,0.1)" />
  </svg>
);
const TankTop = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 24 30 L 40 30 L 44 54 L 20 54 Z" fill="#222222" />
    <rect x="23" y="16" width="3" height="15" fill="#222222" />
    <rect x="38" y="16" width="3" height="15" fill="#222222" />
    <path d="M 26 30 Q 32 36 38 30 Z" fill="rgba(0,0,0,0.1)" />
    <rect x="28" y="36" width="8" height="2" fill="#e74c3c" />
    <rect x="28" y="40" width="8" height="2" fill="#e74c3c" />
  </svg>
);
const RippedJeans = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 18 10 L 31 10 L 28 58 L 16 58 Z" fill="#5dade2" />
    <path d="M 33 10 L 46 10 L 48 58 L 36 58 Z" fill="#5dade2" />
    <path d="M 20 28 L 27 28 L 26 30 L 19 30 Z" fill="#ffffff" />
    <path d="M 22 32 L 26 32 L 25 34 L 21 34 Z" fill="#ffffff" />
    <path d="M 38 35 L 43 35 L 44 37 L 37 37 Z" fill="#ffffff" />
    <path d="M 23 46 L 27 46 L 26 48 L 22 48 Z" fill="#ffffff" />
    <rect x="17" y="10" width="30" height="5" fill="#2e86c1" />
  </svg>
);
const RegularJeans = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 18 10 L 31 10 L 28 58 L 15 58 Z" fill="#1f618d" />
    <path d="M 33 10 L 46 10 L 49 58 L 36 58 Z" fill="#1f618d" />
    <rect x="22" y="16" width="4" height="36" fill="#2980b9" rx="2" />
    <rect x="38" y="16" width="4" height="36" fill="#2980b9" rx="2" />
    <rect x="17" y="10" width="30" height="5" fill="#154360" />
    <rect x="18" y="56" width="9" height="1" fill="#d4ac0d" />
    <rect x="37" y="56" width="9" height="1" fill="#d4ac0d" />
  </svg>
);
const CargoPants = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 16 10 L 31 10 L 29 58 L 12 58 Z" fill="#556b2f" />
    <path d="M 33 10 L 48 10 L 52 58 L 35 58 Z" fill="#556b2f" />
    <rect x="11" y="28" width="12" height="14" fill="#6b8e23" rx="2" stroke="#333" strokeWidth="0.5" />
    <rect x="11" y="28" width="12" height="4" fill="#808000" rx="1" />
    <rect x="41" y="28" width="12" height="14" fill="#6b8e23" rx="2" stroke="#333" strokeWidth="0.5" />
    <rect x="41" y="28" width="12" height="4" fill="#808000" rx="1" />
    <rect x="15" y="10" width="34" height="5" fill="#4b5d27" />
  </svg>
);
const BeachShorts = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 15 10 L 30 10 L 28 42 L 13 40 Z" fill="#ffb74d" />
    <path d="M 34 10 L 49 10 L 51 40 L 36 42 Z" fill="#ffb74d" />
    <polygon points="20,15 25,25 15,25" fill="#e11d48" />
    <polygon points="40,20 45,30 35,30" fill="#2563eb" />
    <polygon points="25,35 30,45 20,45" fill="#10b981" />
    <polygon points="45,35 50,45 40,45" fill="#e11d48" />
    <circle cx="20" cy="30" r="3" fill="#ffffff" />
    <circle cx="45" cy="20" r="3" fill="#ffffff" />
    <rect x="14" y="10" width="36" height="6" fill="#f97316" rx="2" />
    <path d="M 32 16 Q 30 24 26 28" stroke="#fff" strokeWidth="1.5" fill="none" />
    <path d="M 32 16 Q 34 24 38 28" stroke="#fff" strokeWidth="1.5" fill="none" />
  </svg>
);
const SportsCapri = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 17 10 L 31 10 L 28 48 L 18 48 Z" fill="#374151" />
    <path d="M 33 10 L 47 10 L 46 48 L 36 48 Z" fill="#374151" />
    <rect x="18" y="15" width="3" height="33" fill="#10b981" />
    <rect x="43" y="15" width="3" height="33" fill="#10b981" />
    <rect x="16" y="10" width="32" height="5" fill="#1f2937" rx="1" />
  </svg>
);
const ClassicFitJeans = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 19 10 L 31 10 L 30 58 L 20 58 Z" fill="#1e3a8a" />
    <path d="M 33 10 L 45 10 L 44 58 L 34 58 Z" fill="#1e3a8a" />
    <rect x="18" y="10" width="28" height="5" fill="#8b4513" />
    <rect x="30" y="10" width="4" height="5" fill="#facc15" />
    <rect x="25" y="15" width="1" height="43" fill="#3b82f6" opacity="0.5" />
    <rect x="38" y="15" width="1" height="43" fill="#3b82f6" opacity="0.5" />
  </svg>
);
const Sneakers = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 12 36 L 24 36 L 26 48 L 8 48 C 8 40 10 38 12 36 Z" fill="#cbd5e1" />
    <path d="M 14 36 L 20 44 L 26 44" stroke="#3b82f6" strokeWidth="3" fill="none" />
    <path d="M 8 46 L 26 46 L 26 48 L 8 48 Z" fill="#ffffff" />
    <circle cx="14" cy="42" r="1.5" fill="#ef4444" />
    <path d="M 40 36 L 52 36 C 54 38 56 40 56 48 L 38 48 L 40 36 Z" fill="#cbd5e1" />
    <path d="M 50 36 L 44 44 L 38 44" stroke="#3b82f6" strokeWidth="3" fill="none" />
    <path d="M 38 46 L 56 46 L 56 48 L 38 48 Z" fill="#ffffff" />
    <circle cx="50" cy="42" r="1.5" fill="#ef4444" />
  </svg>
);
const Loafers = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 10 42 C 10 36 24 34 28 42 L 28 48 L 8 48 C 8 46 9 44 10 42 Z" fill="#111111" />
    <path d="M 8 46 L 28 46 L 28 48 L 8 48 Z" fill="#000000" />
    <path d="M 16 38 L 22 38" stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 36 42 C 40 34 54 36 54 42 C 55 44 56 46 56 48 L 36 48 L 36 42 Z" fill="#111111" />
    <path d="M 36 46 L 56 46 L 56 48 L 36 48 Z" fill="#000000" />
    <path d="M 42 38 L 48 38" stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);
const RubberSlides = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <path d="M 8 42 C 8 36 28 36 28 42 L 28 48 L 8 48 Z" fill="#9ca3af" />
    <rect x="8" y="44" width="20" height="4" fill="#374151" />
    <path d="M 10 34 Q 18 28 26 34" stroke="#1f2937" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M 36 42 C 36 36 56 36 56 42 L 56 48 L 36 48 Z" fill="#9ca3af" />
    <rect x="36" y="44" width="20" height="4" fill="#374151" />
    <path d="M 38 34 Q 46 28 54 34" stroke="#1f2937" strokeWidth="8" fill="none" strokeLinecap="round" />
  </svg>
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
    { id: 'm_top_1', Comp: LongSleeveShirt },
    { id: 'm_top_2', Comp: TShirt },
    { id: 'm_top_3', Comp: FormalShirt },
    { id: 'm_top_4', Comp: PoloShirt }, 
    { id: 'm_top_5', Comp: SleevelessTop },
    { id: 'm_top_6', Comp: TankTop }
  ],
  bottoms: [
    { id: 'm_bot_1', Comp: RippedJeans },
    { id: 'm_bot_2', Comp: RegularJeans },
    { id: 'm_bot_3', Comp: CargoPants },
    { id: 'm_bot_4', Comp: BeachShorts },
    { id: 'm_bot_5', Comp: SportsCapri },
    { id: 'm_bot_6', Comp: ClassicFitJeans }
  ],
  footwear: [
    { id: 'm_foot_1', Comp: Sneakers },
    { id: 'm_foot_2', Comp: Loafers },
    { id: 'm_foot_3', Comp: RubberSlides }
  ]
};

const FEMALE_DATA = {
  tops: [
    { id: 'f_top_1', Comp: FrockTop },
    { id: 'f_top_2', Comp: FemaleLongSleeve },
    { id: 'f_top_3', Comp: FemaleSleeveless },
    { id: 'f_top_4', Comp: OffShoulder }, 
    { id: 'f_top_5', Comp: FemaleTShirt },
    { id: 'f_top_6', Comp: CropTop },
    { id: 'f_top_7', Comp: LongDress }
  ],
  bottoms: [
    { id: 'f_bot_1', Comp: FormalTrousers },
    { id: 'f_bot_3', Comp: FemaleJeans },
    { id: 'f_bot_4', Comp: ShortSkirt },
    { id: 'f_bot_5', Comp: DenimShorts },
    { id: 'f_bot_6', Comp: HighTornJeans }
  ],
  footwear: [
    { id: 'f_foot_1', Comp: ClosedHeels },
    { id: 'f_foot_2', Comp: FemaleSneakers },
    { id: 'f_foot_3', Comp: FemaleSlippers }
  ]
};

// --- VALIDATION RULES ---
const RESTRICTED_MALE = ['m_top_5', 'm_top_6', 'm_bot_4', 'm_bot_5', 'm_bot_1', 'm_foot_3'];
const RESTRICTED_FEMALE = ['f_top_3', 'f_top_4', 'f_top_6', 'f_bot_4', 'f_bot_5', 'f_bot_6', 'f_foot_3'];
// --- FULL BODY LOGIC ---
const FULL_BODY_TOPS = ['f_top_1', 'f_top_7']; // Frock, Long Dress

const validateOutfit = (gender, selectedOutfit) => {
  const selectedItems = [selectedOutfit.top, selectedOutfit.bottom, selectedOutfit.footwear].filter(Boolean);
  const restrictedList = gender === 'male' ? RESTRICTED_MALE : RESTRICTED_FEMALE;
  
  // Check if any selected item exists in the restricted list
  const hasViolation = selectedItems.some(item => restrictedList.includes(item));
  
  if (hasViolation) {
    return {
      isValid: false,
      message: `Selected outfit violates campus dress code for ${gender} students. Please choose appropriate clothing.`
    };
  }
  
  return { isValid: true, message: "" };
};

const DressCodeSelection = ({ onComplete, isMuted, onToggleMute }) => {
  const [gender, setGender] = useState('male');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  
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
      setWarningMessage("You cannot select a bottom with a frock or long dress.");
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
      setWarningMessage(validationResult.message);
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
            <p className="validation-modal-message">{warningMessage}</p>
            <button className="validation-modal-btn" onClick={() => setShowWarning(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DressCodeSelection;
