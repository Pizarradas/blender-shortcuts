// ============================================
// STATS.JS - STATISTICS TRACKING SYSTEM
// ============================================

// ===== STATS STORAGE SCHEMA =====
const STATS_KEY = 'blender_stats';

function getStats() {
    const defaultStats = {
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        totalVisits: 1,
        consecutiveDays: 1,
        lastVisitDate: new Date().toDateString(),

        // Shortcuts interaction
        shortcutsViewed: [],
        shortcutsCopied: {},



        // Category progress
        categoryProgress: {}
    };

    const stored = localStorage.getItem(STATS_KEY);
    return stored ? { ...defaultStats, ...JSON.parse(stored) } : defaultStats;
}

function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// ===== TRACKING FUNCTIONS =====
function trackVisit() {
    const stats = getStats();
    const today = new Date().toDateString();

    if (stats.lastVisitDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (stats.lastVisitDate === yesterday.toDateString()) {
            stats.consecutiveDays++;
        } else {
            stats.consecutiveDays = 1;
        }

        stats.lastVisitDate = today;
        stats.totalVisits++;
    }

    stats.lastVisit = Date.now();
    saveStats(stats);
}

function trackShortcutView(shortcutId) {
    const stats = getStats();
    if (!stats.shortcutsViewed.includes(shortcutId)) {
        stats.shortcutsViewed.push(shortcutId);
        saveStats(stats);
    }
}

function trackShortcutCopy(shortcutId) {
    const stats = getStats();
    stats.shortcutsCopied[shortcutId] = (stats.shortcutsCopied[shortcutId] || 0) + 1;
    saveStats(stats);
}



// ===== STATS PANEL RENDER =====
function renderStatsPanel() {
    const stats = getStats();


    // Top shortcuts
    const topShortcuts = Object.entries(stats.shortcutsCopied)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, count]) => {
            const shortcut = SHORTCUTS.find(s => s.id == id);
            return shortcut ? { shortcut, count } : null;
        })
        .filter(Boolean);

    return `
        <div class="stats-panel">
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-calendar-check"></i>
                    <div class="stat-value">${stats.totalVisits}</div>
                    <div class="stat-label">${t('totalVisits')}</div>
                </div>
                <div class="stat-card ${stats.consecutiveDays >= 7 ? 'stat-card--fire' : ''}">
                    <i class="fas fa-fire"></i>
                    <div class="stat-value">${stats.consecutiveDays}</div>
                    <div class="stat-label">${t('consecutiveDays')}</div>
                </div>
            </div>
            
            ${topShortcuts.length > 0 ? `
                <div class="stats-section">
                    <h3>${t('topCategory') || 'Atajos Más Copiados'}</h3>
                    <div class="top-shortcuts">
                        ${topShortcuts.map((item, i) => `
                            <div class="top-shortcut">
                                <span class="top-rank">${i + 1}</span>
                                <div class="top-shortcut-info">
                                    <strong>${getLocalizedData(item.shortcut, 'action')}</strong>
                                    <small>${item.shortcut.shortcut}</small>
                                </div>
                                <span class="top-count">${item.count}x</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            

        </div>
    `;
}

// Initialize tracking on page load
trackVisit();
