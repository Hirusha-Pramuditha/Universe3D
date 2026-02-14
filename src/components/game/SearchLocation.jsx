import React, { useState, useEffect, useRef } from 'react'

// Location data for each building
const LOCATIONS = {
  'gp-square': [
    { id: 'gp-reception', name: 'Main Reception', floor: 1, type: 'Service', keywords: ['reception', 'help', 'info', 'entrance'], coordinates: { x: -15, y: 0, z: -10 } },
    { id: 'gp-library', name: 'Library', floor: 2, type: 'Facility', keywords: ['books', 'study', 'reading'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'gp-lab01', name: 'Computer Lab 01', floor: 3, type: 'Lab', keywords: ['computer', 'pc', 'lab'], coordinates: { x: -10, y: 8, z: -10 } },
    { id: 'gp-lab02', name: 'Computer Lab 02', floor: 3, type: 'Lab', keywords: ['computer', 'pc', 'lab'], coordinates: { x: -10, y: 8, z: -10 } },
    { id: 'gp-lab03', name: 'Network Lab', floor: 4, type: 'Lab', keywords: ['network', 'cisco', 'lab'], coordinates: { x: -10, y: 12, z: -10 } },
    { id: 'gp-cafeteria', name: 'Cafeteria', floor: 1, type: 'Facility', keywords: ['food', 'eat', 'canteen', 'lunch'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-sru', name: 'Student Resource Unit (SRU)', floor: 2, type: 'Service', keywords: ['student', 'help', 'support', 'sru'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'gp-lecturehall-a', name: 'Lecture Hall A', floor: 1, type: 'Academic', keywords: ['lecture', 'class', 'hall'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-lecturehall-b', name: 'Lecture Hall B', floor: 1, type: 'Academic', keywords: ['lecture', 'class', 'hall'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-staffroom', name: 'Academic Staff Room', floor: 5, type: 'Office', keywords: ['staff', 'lecturer', 'teacher'], coordinates: { x: -10, y: 16, z: -10 } },
    { id: 'gp-admin', name: 'Administration Office', floor: 2, type: 'Office', keywords: ['admin', 'office', 'management'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'gp-exam', name: 'Examination Unit', floor: 2, type: 'Service', keywords: ['exam', 'test', 'results'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'gp-washroom-m1', name: 'Washroom (Male)', floor: 1, type: 'Facility', keywords: ['toilet', 'washroom', 'bathroom', 'male'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-washroom-f1', name: 'Washroom (Female)', floor: 1, type: 'Facility', keywords: ['toilet', 'washroom', 'bathroom', 'female'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-elevator', name: 'Main Elevator', floor: 1, type: 'Facility', keywords: ['elevator', 'lift'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-stairs', name: 'Main Staircase', floor: 1, type: 'Facility', keywords: ['stairs', 'staircase'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'gp-emergency', name: 'Emergency Exit', floor: 1, type: 'Safety', keywords: ['emergency', 'exit', 'fire'], coordinates: { x: -10, y: 0, z: -10 } },
  ],
  'spencer': [
    { id: 'sp-reception', name: 'Reception', floor: 1, type: 'Service', keywords: ['reception', 'help', 'entrance'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'sp-tutorial1', name: 'Tutorial Room 1', floor: 2, type: 'Academic', keywords: ['tutorial', 'class'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'sp-tutorial2', name: 'Tutorial Room 2', floor: 2, type: 'Academic', keywords: ['tutorial', 'class'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'sp-tutorial3', name: 'Tutorial Room 3', floor: 3, type: 'Academic', keywords: ['tutorial', 'class'], coordinates: { x: -10, y: 8, z: -10 } },
    { id: 'sp-studyarea', name: 'Study Area', floor: 4, type: 'Facility', keywords: ['study', 'quiet', 'reading'], coordinates: { x: -10, y: 12, z: -10 } },
    { id: 'sp-meetingroom', name: 'Meeting Room', floor: 5, type: 'Office', keywords: ['meeting', 'conference'], coordinates: { x: -10, y: 16, z: -10 } },
    { id: 'sp-computerlab', name: 'Computer Lab', floor: 6, type: 'Lab', keywords: ['computer', 'pc', 'lab'], coordinates: { x: -10, y: 20, z: -10 } },
    { id: 'sp-elevator', name: 'Elevator', floor: 1, type: 'Facility', keywords: ['elevator', 'lift'], coordinates: { x: -10, y: 0, z: -10 } },
  ],
  'ramakrishna': [
    { id: 'rk-reception', name: 'Reception', floor: 1, type: 'Service', keywords: ['reception', 'help', 'entrance'], coordinates: { x: -10, y: 0, z: -10 } },
    { id: 'rk-classroom1', name: 'Classroom 1', floor: 2, type: 'Academic', keywords: ['class', 'room'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'rk-classroom2', name: 'Classroom 2', floor: 2, type: 'Academic', keywords: ['class', 'room'], coordinates: { x: -10, y: 4, z: -10 } },
    { id: 'rk-staffarea', name: 'Staff Area', floor: 3, type: 'Office', keywords: ['staff', 'office'], coordinates: { x: -10, y: 8, z: -10 } },
    { id: 'rk-storage', name: 'Storage Room', floor: 1, type: 'Facility', keywords: ['storage', 'store'], coordinates: { x: -10, y: 0, z: -10 } },
  ],
}

// Type icons and colors
const TYPE_CONFIG = {
  'Service': { icon: '🛎️', color: '#60a5fa' },
  'Facility': { icon: '🏢', color: '#a78bfa' },
  'Lab': { icon: '💻', color: '#34d399' },
  'Academic': { icon: '📚', color: '#fbbf24' },
  'Office': { icon: '🚪', color: '#f472b6' },
  'Safety': { icon: '🚨', color: '#f87171' },
}

function SearchLocation({ isOpen, onClose, selectedBuilding, currentFloor, onTeleport }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState([])
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  const locations = LOCATIONS[selectedBuilding] || []

  // Filter locations based on search query
  const filteredLocations = searchQuery.trim() === ''
    ? locations.slice(0, 6) // Show first 6 when no search
    : locations.filter(loc => {
      const query = searchQuery.toLowerCase()
      return (
        loc.name.toLowerCase().includes(query) ||
        loc.type.toLowerCase().includes(query) ||
        loc.keywords.some(kw => kw.includes(query)) ||
        (loc.floor === 1 ? 'ground floor' : `floor ${loc.floor - 1}`).includes(query)
      )
    })

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setSearchQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev =>
            prev < filteredLocations.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
          break
        case 'Enter':
          e.preventDefault()
          if (filteredLocations[selectedIndex]) {
            handleTeleport(filteredLocations[selectedIndex])
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredLocations, selectedIndex])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex]
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [selectedIndex])

  const handleTeleport = (location) => {
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(l => l.id !== location.id)
      return [location, ...filtered].slice(0, 3)
    })

    onTeleport?.(location)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        {/* Search Header */}
        <div className="search-header">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectedIndex(0)
              }}
            />
            <div className="search-shortcut">
              <kbd>ESC</kbd>
              <span>to close</span>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="search-filters">
          {Object.entries(TYPE_CONFIG).map(([type, config]) => (
            <button
              key={type}
              className={`filter-chip ${searchQuery === type.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSearchQuery(type.toLowerCase())}
            >
              <span>{config.icon}</span>
              <span>{type}</span>
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && searchQuery === '' && (
          <div className="search-section">
            <div className="search-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Recent
            </div>
            <div className="search-results" ref={resultsRef}>
              {recentSearches.map((location, index) => (
                <SearchResultItem
                  key={location.id}
                  location={location}
                  isSelected={index === selectedIndex}
                  currentFloor={currentFloor}
                  onClick={() => handleTeleport(location)}
                  onMouseEnter={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="search-section">
          <div className="search-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {searchQuery ? `Results for "${searchQuery}"` : 'All Locations'}
          </div>

          {filteredLocations.length > 0 ? (
            <div className="search-results" ref={resultsRef}>
              {filteredLocations.map((location, index) => (
                <SearchResultItem
                  key={location.id}
                  location={location}
                  isSelected={recentSearches.length > 0 && searchQuery === ''
                    ? false
                    : index === selectedIndex}
                  currentFloor={currentFloor}
                  onClick={() => handleTeleport(location)}
                  onMouseEnter={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <span>No locations found</span>
              <span className="search-empty-hint">Try a different search term</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="search-footer">
          <div className="search-footer-hint">
            <kbd>↑</kbd><kbd>↓</kbd> to navigate
          </div>
          <div className="search-footer-hint">
            <kbd>Enter</kbd> to teleport
          </div>
        </div>
      </div>
    </div>
  )
}

// Search Result Item Component
function SearchResultItem({ location, isSelected, currentFloor, onClick, onMouseEnter }) {
  const typeConfig = TYPE_CONFIG[location.type] || { icon: '📍', color: '#94a3b8' }
  const isCurrentFloor = location.floor === currentFloor
  const floorDiff = Math.abs(location.floor - currentFloor)

  return (
    <div
      className={`search-result-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="result-icon" style={{ background: `${typeConfig.color}20`, color: typeConfig.color }}>
        {typeConfig.icon}
      </div>

      <div className="result-info">
        <div className="result-name">{location.name}</div>
        <div className="result-meta">
          <span className="result-type" style={{ color: typeConfig.color }}>{location.type}</span>
          <span className="result-divider">•</span>
          <span className={`result-floor ${isCurrentFloor ? 'current' : ''}`}>
            {location.floor === 1 ? 'Ground Floor' : `Floor ${location.floor - 1}`}
            {isCurrentFloor && <span className="floor-badge">Current</span>}
          </span>
        </div>
      </div>

      <div className="result-action">
        {!isCurrentFloor && (
          <span className="floor-distance">
            {floorDiff} floor{floorDiff > 1 ? 's' : ''} {location.floor > currentFloor ? 'up' : 'down'}
          </span>
        )}
        <div className="teleport-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Go
        </div>
      </div>
    </div>
  )
}

export default SearchLocation