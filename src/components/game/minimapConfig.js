export const CALIBRATION_MODE = false

export const MINIMAP_CONFIG = {
    1: { minY: -1,  maxY: 3.5, minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/gruond_floor.PNG' },
    2: { minY: 3.5, maxY: 8.5, minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/1st_floor.PNG' },
    3: { minY: 8.5, maxY: 11,  minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/2nd_floor.PNG' },
    4: { minY: 11,  maxY: 14,  minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/3rd_floor.PNG' },
    5: { minY: 14,  maxY: 18,  minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/4th_floor.PNG' },
    6: { minY: 18,  maxY: 22,  minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/5th_floor.PNG' },
    7: { minY: 22,  maxY: 26,  minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/6th_floor.PNG' },
    8: { minY: 26,  maxY: 99,  minX: -15, maxX: 20, minZ: -22, maxZ: 13, image: '/floor-maps/7th_floor.PNG' },
}

// ─── Floor detection ────────────────────────────────────────────────────────
export function getFloorConfig(playerY) {
    for (const cfg of Object.values(MINIMAP_CONFIG)) {
        if (playerY >= cfg.minY && playerY < cfg.maxY) return cfg
    }
    // Fallback: closest floor by midpoint
    let best = MINIMAP_CONFIG[1]
    let bestDist = Infinity
    for (const cfg of Object.values(MINIMAP_CONFIG)) {
        const d = Math.abs(playerY - (cfg.minY + cfg.maxY) / 2)
        if (d < bestDist) { bestDist = d; best = cfg }
    }
    return best
}