// ============================================
// BLENDER SHORTCUTS V2 - VANILLA JAVASCRIPT
// ============================================
// Data is loaded from app_data.js

// ===== UTILITIES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function parseShortcutToKbd(shortcut) {
    // Split by common separators: + or /, trim spaces
    const parts = shortcut.split(/\s*[+/]\s*/);

    return parts.map(part => {
        // Handle special cases
        const trimmed = part.trim();
        if (trimmed === '') return '';
        return `<kbd class="key">${trimmed}</kbd>`;
    }).join('<span class="key-separator">+</span>');
}

// ===== STATE =====
const favorites = new Set(JSON.parse(localStorage.getItem('blender_favorites') || '[]'));
const filters = {
    category: '',
    difficulty: '',
    context: '',
    workflow: '',
    version: '',
    search: '',
    favoritesOnly: false
};
const viewState = {
    mode: localStorage.getItem('blender_view_mode') || 'table' // 'table' or 'cards'
};
let sortState = {
    column: null,
    direction: 'asc' // 'asc' or 'desc'
};
let keyboardNavigation = {
    selectedRowIndex: -1,
    enabled: true
};

// ===== DOM ELEMENTS =====
const elements = {
    search: document.getElementById('search'),
    categoryFilter: document.getElementById('categoryFilter'),
    difficultyFilter: document.getElementById('difficultyFilter'),
    contextFilter: document.getElementById('contextFilter'),
    workflowFilter: document.getElementById('workflowFilter'),
    versionFilter: document.getElementById('versionFilter'),
    favoritesOnly: document.getElementById('favoritesOnly'),
    resetBtn: document.getElementById('resetBtn'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),

    // Filter Redesign
    filterToggleBtn: document.getElementById('filterToggleBtn'),
    filterPanel: document.getElementById('filterPanel'),
    activeFilters: document.getElementById('activeFilters'),
    filterCountBadge: document.getElementById('filterCountBadge'),

    resultCount: document.getElementById('resultCount'),
    tableBody: document.getElementById('tableBody'),
    themeToggle: document.getElementById('themeToggle'),
    table: document.querySelector('.shortcuts-table'),
    // View toggle
    tableViewBtn: document.getElementById('tableViewBtn'),
    cardsViewBtn: document.getElementById('cardsViewBtn'),
    tableView: document.getElementById('tableView'),
    cardsView: document.getElementById('cardsView'),
    // Fase 4 elements
    toastContainer: document.getElementById('toastContainer'),

    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),
    relatedModal: document.getElementById('relatedModal'),
    relatedShortcutsList: document.getElementById('relatedShortcutsList'),

    // Fase 5 elements
    statsBtn: document.getElementById('statsBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    statsModal: document.getElementById('statsModal'),
    statsModalBody: document.getElementById('statsModalBody'),
    settingsModal: document.getElementById('settingsModal'),
    settingsModalBody: document.getElementById('settingsModalBody'),

    // Tips elements
    tipsBtn: document.getElementById('tipsBtn'),
    tipsModal: document.getElementById('tipsModal'),
    tipsList: document.getElementById('tipsList'),

    // Detail Modal
    detailModal: document.getElementById('detailModal'),
    detailTitle: document.getElementById('detailTitle'),
    detailContent: document.getElementById('detailContent')
};

// ===== INIT =====
function init() {
    console.log('🚀 Blender Shortcuts PWA v22 initialized');
    initTheme();
    initLanguage();
    populateCategoryFilter();
    bindEvents();
    bindSortingEvents();
    bindKeyboardNavigation();
    bindViewToggle();
    bindPhase4Features();
    bindPhase5Features();
    bindTipsFeature();
    applyView();
    render();
    initDragScroll();

    // Calculate sticky column offsets
    setTimeout(updateStickyColumns, 100);
    window.addEventListener('resize', updateStickyColumns);
}

// ===== STICKY COLUMNS =====
function updateStickyColumns() {
    const table = document.getElementById('shortcutsTable');
    if (!table) return;

    const headers = table.querySelectorAll('th');
    if (headers.length < 5) return;

    // Get widths
    const w1 = headers[0].offsetWidth;
    const w2 = headers[1].offsetWidth;
    const w3 = headers[2].offsetWidth;
    const w4 = headers[3].offsetWidth;

    // Set CSS variables for offsets
    table.style.setProperty('--col-w-1', `${w1}px`);
    table.style.setProperty('--col-w-2', `${w2}px`);
    table.style.setProperty('--col-w-3', `${w3}px`);
    table.style.setProperty('--col-w-4', `${w4}px`);
}

// ===== DRAG TO SCROLL =====
function initDragScroll() {
    const slider = document.querySelector('.table-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (!slider) return;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast factor
        slider.scrollLeft = scrollLeft - walk;
    });
}

// ===== THEME =====
function initTheme() {
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('blender_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);

    elements.themeToggle.addEventListener('click', toggleTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('blender_theme', theme);

    // Update icon
    const icon = elements.themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        elements.themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
    } else {
        icon.className = 'fas fa-moon';
        elements.themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ===== LANGUAGE =====
function initLanguage() {
    const languageToggle = document.getElementById('languageToggle');

    // Set saved language (or default)
    const savedLang = localStorage.getItem('blender_language') || 'es';

    // Apply translations & UI state
    if (typeof setLanguage === 'function') {
        setLanguage(savedLang);
    } // setLanguage triggers updateUITranslations which handles the toggle active class

    if (!languageToggle) return;

    // Language toggle click event
    languageToggle.addEventListener('click', () => {
        const current = localStorage.getItem('blender_language') || 'es';
        const newLang = current === 'es' ? 'en' : 'es';

        if (typeof setLanguage === 'function') {
            setLanguage(newLang);
        }
    });
}

// ===== POPULATE FILTERS =====
function populateCategoryFilter() {
    // Populate categories
    Object.keys(CATEGORIES).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = t(key);
        elements.categoryFilter.appendChild(option);
    });

    // Populate contexts
    Object.keys(CONTEXTS).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = t(key);
        elements.contextFilter.appendChild(option);
    });

    // Populate workflows
    Object.keys(WORKFLOWS).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = t(key);
        elements.workflowFilter.appendChild(option);
    });
}

// ===== EVENT BINDINGS =====
function bindEvents() {
    // Debounced search
    const debouncedSearch = debounce((value) => {
        filters.search = value.toLowerCase();
        render();
    }, 200);

    elements.search.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    elements.categoryFilter.addEventListener('change', (e) => {
        filters.category = e.target.value;
        render();
    });

    elements.difficultyFilter.addEventListener('change', (e) => {
        filters.difficulty = e.target.value;
        render();
    });

    elements.contextFilter.addEventListener('change', (e) => {
        filters.context = e.target.value;
        render();
    });

    elements.workflowFilter.addEventListener('change', (e) => {
        filters.workflow = e.target.value;
        render();
    });

    elements.favoritesOnly.addEventListener('change', (e) => {
        filters.favoritesOnly = e.target.checked;
        render();
    });

    elements.resetBtn.addEventListener('click', resetFilters);

    // Filter Redesign Events
    if (elements.filterToggleBtn) {
        elements.filterToggleBtn.addEventListener('click', toggleFilterPanel);
    }
}

// ===== FILTER REDESIGN LOGIC =====
function toggleFilterPanel() {
    const isHidden = elements.filterPanel.hidden;
    elements.filterPanel.hidden = !isHidden;
    elements.filterToggleBtn.setAttribute('aria-expanded', isHidden);
    elements.filterToggleBtn.classList.toggle('active', isHidden);
}

function updateActiveFilterChips() {
    if (!elements.activeFilters) return;

    const activeChips = [];
    let count = 0;

    // Check each filter and create chip data
    if (filters.category) {
        activeChips.push({ key: 'category', label: `${t('category')}: ${t(filters.category)}` });
        count++;
    }
    if (filters.difficulty) {
        activeChips.push({ key: 'difficulty', label: t(filters.difficulty) });
        count++;
    }
    if (filters.context) {
        activeChips.push({ key: 'context', label: `${t('filterContext')}: ${t(filters.context)}` });
        count++;
    }
    if (filters.workflow) {
        activeChips.push({ key: 'workflow', label: `${t('filterWorkflow')}: ${t(filters.workflow)}` });
        count++;
    }
    if (filters.version) {
        activeChips.push({ key: 'version', label: `v${filters.version}+` });
        count++;
    }
    if (filters.favoritesOnly) {
        activeChips.push({ key: 'favoritesOnly', label: `⭐ ${t('showFavorites')}` });
        count++;
    }

    // Update Badge
    if (elements.filterCountBadge) {
        elements.filterCountBadge.textContent = count;
        elements.filterCountBadge.hidden = count === 0;
    }

    // Render Chips
    if (activeChips.length > 0) {
        elements.activeFilters.hidden = false;
        elements.activeFilters.innerHTML = activeChips.map(chip => `
            <div class="filter-chip">
                <span>${chip.label}</span>
                <button onclick="removeFilter('${chip.key}')" aria-label="${t('close')}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    } else {
        elements.activeFilters.hidden = true;
        elements.activeFilters.innerHTML = '';
    }
}

// Make removeFilter global so onclick works
window.removeFilter = function (key) {
    if (key === 'favoritesOnly') {
        filters.favoritesOnly = false;
        elements.favoritesOnly.checked = false;
    } else {
        filters[key] = '';
        if (elements[`${key}Filter`]) {
            elements[`${key}Filter`].value = '';
        }
    }

    // Update UI
    const filtered = getFilteredShortcuts();
    renderTable(filtered);
    updateResultCount(filtered.length);
    updateActiveFilterChips();
};

// ===== SORTING =====
function bindSortingEvents() {
    const sortableHeaders = document.querySelectorAll('th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            handleSort(column);
        });

        // Allow Enter/Space on header
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const column = header.getAttribute('data-column');
                handleSort(column);
            }
        });
    });
}

function handleSort(column) {
    if (sortState.column === column) {
        sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
        sortState.column = column;
        sortState.direction = 'asc';
    }

    updateSortIndicators();
    render();
}

function updateSortIndicators() {
    // Remove all sorting classes
    document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.remove('sorting', 'desc');
        th.removeAttribute('aria-sort');
    });

    // Add to active column
    if (sortState.column) {
        const activeHeader = document.querySelector(`th[data-column="${sortState.column}"]`);
        if (activeHeader) {
            activeHeader.classList.add('sorting');
            if (sortState.direction === 'desc') {
                activeHeader.classList.add('desc');
                activeHeader.setAttribute('aria-sort', 'descending');
            } else {
                activeHeader.setAttribute('aria-sort', 'ascending');
            }
        }
    }
}

function sortShortcuts(shortcuts) {
    if (!sortState.column) return shortcuts;

    return [...shortcuts].sort((a, b) => {
        let aVal, bVal;

        if (sortState.column === 'category') {
            aVal = t(a.category);
            bVal = t(b.category);
        } else if (sortState.column === 'difficulty') {
            const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
            aVal = difficultyOrder[a.difficulty] || 0;
            bVal = difficultyOrder[b.difficulty] || 0;
        } else if (sortState.column === 'action') {
            aVal = getLocalizedData(a, 'action');
            bVal = getLocalizedData(b, 'action');
        }

        if (aVal < bVal) return sortState.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
    });
}

// ===== KEYBOARD NAVIGATION =====
function bindKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+F for search focus
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            elements.search.focus();
            elements.search.select();
            return;
        }

        // Esc to clear search when focused
        if (e.key === 'Escape' && document.activeElement === elements.search) {
            elements.search.value = '';
            filters.search = '';
            render();
            return;
        }

        // Arrow navigation in table
        const rows = Array.from(elements.tableBody.querySelectorAll('tr:not(.empty-state-row)'));
        if (rows.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateRows(rows, 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateRows(rows, -1);
        } else if ((e.key === 'Enter' || e.key === ' ') && keyboardNavigation.selectedRowIndex >= 0) {
            // Toggle favorite on selected row
            e.preventDefault();
            const row = rows[keyboardNavigation.selectedRowIndex];
            if (row) {
                const starBtn = row.querySelector('.star-btn');
                if (starBtn) starBtn.click();
            }
        }
    });
}

function navigateRows(rows, direction) {
    // Remove current highlight
    if (keyboardNavigation.selectedRowIndex >= 0 && keyboardNavigation.selectedRowIndex < rows.length) {
        rows[keyboardNavigation.selectedRowIndex].classList.remove('keyboard-focus');
    }

    // Move selection
    keyboardNavigation.selectedRowIndex += direction;

    // Clamp to bounds
    if (keyboardNavigation.selectedRowIndex < 0) {
        keyboardNavigation.selectedRowIndex = 0;
    } else if (keyboardNavigation.selectedRowIndex >= rows.length) {
        keyboardNavigation.selectedRowIndex = rows.length - 1;
    }

    // Add highlight
    const selectedRow = rows[keyboardNavigation.selectedRowIndex];
    if (selectedRow) {
        selectedRow.classList.add('keyboard-focus');
        selectedRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== FILTERING =====
function getFilteredShortcuts() {
    return SHORTCUTS.filter(shortcut => {
        // Category filter
        if (filters.category && shortcut.category !== filters.category) return false;

        // Difficulty filter
        if (filters.difficulty && shortcut.difficulty !== filters.difficulty) return false;

        // Context filter
        if (filters.context && shortcut.context && !shortcut.context.includes(filters.context)) return false;

        // Workflow filter
        if (filters.workflow && shortcut.workflow && !shortcut.workflow.includes(filters.workflow)) return false;

        // Favorites filter
        if (filters.favoritesOnly && !favorites.has(shortcut.id)) return false;

        // Search filter
        if (filters.search) {
            const searchLower = filters.search;
            return shortcut.action.toLowerCase().includes(searchLower) ||
                shortcut.shortcut.toLowerCase().includes(searchLower) ||
                shortcut.notes.toLowerCase().includes(searchLower) ||
                (shortcut.tips && shortcut.tips.toLowerCase().includes(searchLower)) ||
                (shortcut.useCases && shortcut.useCases.some(uc => uc.toLowerCase().includes(searchLower))) ||
                (shortcut.tags && shortcut.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        }

        return true;
    });
}

// ===== RENDER =====
function render() {
    const filtered = getFilteredShortcuts();
    const sorted = sortShortcuts(filtered);

    // Update count
    elements.resultCount.textContent = `${t('showing')} ${sorted.length} ${t('of')} ${SHORTCUTS.length} ${t('shortcuts')}`;

    // Update active filter chips
    updateActiveFilterChips();

    // Reset keyboard navigation
    keyboardNavigation.selectedRowIndex = -1;

    // Delegate to appropriate view
    if (viewState.mode === 'cards') {
        renderCards(sorted);
    } else {
        renderTable(sorted);
    }
}

// ===== VIEW: TABLE =====
function renderTable(shortcuts) {
    elements.tableBody.innerHTML = '';

    if (shortcuts.length === 0) {
        renderEmptyState();
    } else {
        shortcuts.forEach(shortcut => {
            elements.tableBody.appendChild(createRow(shortcut));
        });
    }
}

// ===== VIEW: CARDS =====
function renderCards(shortcuts) {
    elements.cardsView.innerHTML = '';

    if (shortcuts.length === 0) {
        elements.cardsView.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>${t('noResultsTitle')}</h3>
                <small>${t('noResultsDesc')}</small>
            </div>
        `;
    } else {
        shortcuts.forEach(shortcut => {
            elements.cardsView.appendChild(createCard(shortcut));
        });
    }
}

// ===== CREATE CARD =====
function createCard(shortcut) {
    const card = document.createElement('div');
    card.className = 'shortcut-card';

    // Favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'shortcut-card__favorite' + (favorites.has(shortcut.id) ? ' active' : '');
    favoriteBtn.innerHTML = favorites.has(shortcut.id) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    favoriteBtn.setAttribute('aria-label', t('toggleFavorite'));
    favoriteBtn.onclick = () => toggleFavorite(shortcut.id);

    // Header with meta
    const header = document.createElement('div');
    header.className = 'shortcut-card__header';

    const meta = document.createElement('div');
    meta.className = 'shortcut-card__meta';

    // Category badge
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = t(shortcut.category);

    // New Badge
    if (shortcut.isNew || (shortcut.since && parseFloat(shortcut.since) >= 4.0)) {
        const newBadge = document.createElement('span');
        newBadge.className = 'difficulty-badge'; // Reuse class for style
        newBadge.style.backgroundColor = 'var(--accent)';
        newBadge.style.color = 'white';
        newBadge.textContent = `New ${shortcut.since}`;
        meta.appendChild(newBadge);
    }

    // Difficulty badge
    const difficultyBadge = document.createElement('span');
    difficultyBadge.className = `difficulty-badge difficulty-${shortcut.difficulty}`;
    difficultyBadge.textContent = t(shortcut.difficulty);
    difficultyBadge.setAttribute('aria-label', `Dificultad: ${t(shortcut.difficulty)}`);

    meta.appendChild(categoryBadge);
    meta.appendChild(difficultyBadge);
    header.appendChild(meta);

    // Action
    const action = document.createElement('div');
    action.className = 'shortcut-card__action';
    action.textContent = getLocalizedData(shortcut, 'action');

    // Shortcut keys
    const shortcutKeys = document.createElement('div');
    shortcutKeys.className = 'shortcut-card__shortcut';
    shortcutKeys.innerHTML = parseShortcutToKbd(shortcut.shortcut);
    shortcutKeys.title = t('copy');
    shortcutKeys.style.cursor = 'pointer';
    shortcutKeys.onclick = () => copyToClipboard(shortcut.shortcut);

    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'shortcut-card__media';
    // mediaContainer.style.marginTop = '1rem'; // REMOVED for top placement consistency
    mediaContainer.style.marginBottom = '1rem'; // Added spacing below image
    mediaContainer.style.textAlign = 'center';
    mediaContainer.style.minHeight = '200px'; // Enforce consistency
    mediaContainer.style.display = 'flex';
    mediaContainer.style.alignItems = 'center';
    mediaContainer.style.justifyContent = 'center';

    const container = document.createElement('div');
    container.className = 'shortcut-media-container';
    mediaContainer.appendChild(container);

    let mediaUrl = shortcut.media ? shortcut.media.url : null;
    let fallbackId = null;

    if (!mediaUrl) {
        // Map categories to generic SVGs
        const categoryMap = {
            'modeling': 'category_modeling.svg',
            'topology': 'category_modeling.svg',
            'modifiers': 'category_modeling.svg',
            'transform': 'category_transform.svg',
            'selection': 'category_selection.svg',
            'navigation': 'category_transform.svg',
            'animation': 'category_animation.svg',
            'rigging': 'category_animation.svg',
            'shading': 'category_render.svg',
            'camera_render': 'category_render.svg',
            'uv_editing': 'category_render.svg',
            'utilities': 'category_general.svg',
            'interface': 'category_general.svg',
            'text_editor': 'category_text_editor.svg',
            'sculpting': 'category_sculpting.svg',
            'grease_pencil': 'category_grease_pencil.svg',
            'modifiers': 'category_modifiers.svg',
            'node_editor': 'category_node_editor.svg',
            'shading': 'category_node_editor.svg', // Reuse Node Editor for Shading as it's node based
            'uv_editing': 'category_uv_editing.svg',
            'rigging': 'category_general.svg' // Still fallback for rigging unless I make one
        };

        // Special case for Navigation, use generic transform or orbit?
        if (shortcut.category === 'navigation') {
            categoryMap['navigation'] = 'category_transform.svg';
        }

        const filename = categoryMap[shortcut.category] || 'category_general.svg';
        mediaUrl = `./assets/previews/${filename}`;
        fallbackId = 'category_' + (categoryMap[shortcut.category] ? shortcut.category : 'general');
    }

    // Load SVG
    // Load Media (Hybrid Strategy: Img First -> SVG Upgrade)
    // 1. Always render an <img> tag first. This guarantees something is visible immediately.
    const imgData = document.createElement('img');
    imgData.src = mediaUrl;
    imgData.className = 'shortcut-media-img';
    imgData.alt = shortcut.media ? shortcut.media.alt : `${getLocalizedData(shortcut, 'action')}`;
    imgData.loading = 'lazy';
    container.appendChild(imgData);

    // 2. If it's an SVG, try to upgrade it to inline SVG for animation
    if (mediaUrl.endsWith('.svg')) {
        // Add a small delay to prioritize layout rendering
        setTimeout(() => {
            fetch(mediaUrl)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.text();
                })
                .then(svgText => {
                    if (svgText.trim().startsWith('<svg')) {
                        // Smooth transition
                        container.style.opacity = '0';

                        setTimeout(() => {
                            container.innerHTML = svgText;
                            container.style.opacity = '1';

                            // Initialize animation
                            if (window.Animations) {
                                const animId = shortcut.media ? shortcut.id : fallbackId;
                                window.Animations.init(container, animId);
                            }
                        }, 200);
                    }
                })
                .catch(err => {
                    console.log(`Keeping static image for ${mediaUrl} (Animation upgrade skipped):`, err);
                    // No action needed, <img> is already there
                });
        }, 100);
    }




    // Notes
    const notes = document.createElement('div');
    notes.className = 'shortcut-card__notes';
    notes.textContent = getLocalizedData(shortcut, 'notes');

    // Tags
    if (shortcut.tags && shortcut.tags.length > 0) {
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags-container';
        tagsContainer.style.marginTop = '0.75rem';

        shortcut.tags.forEach(tag => {
            // Filter out tags that are already displayed as badges (e.g. version tags)
            if (tag.startsWith('new-') || tag.startsWith('since') || tag === 'new' || tag === '4.0') return;

            const tagBadge = document.createElement('span');
            tagBadge.className = `tag-badge tag-${tag}`;
            tagBadge.textContent = tag.replace(/_/g, ' ').replace('-', ' ');
            tagBadge.title = `Filtrar por: ${tag}`;
            tagBadge.onclick = (e) => {
                e.stopPropagation();
                filterByTag(tag);
            };
            tagsContainer.appendChild(tagBadge);
        });

        notes.appendChild(tagsContainer);
    }

    // Tips (if available)
    if (shortcut.tips) {
        const tipsSection = document.createElement('div');
        tipsSection.style.marginTop = '1rem';
        tipsSection.style.padding = '0.75rem';
        tipsSection.style.background = 'var(--bg-primary)';
        tipsSection.style.borderRadius = '4px';
        tipsSection.style.borderLeft = '3px solid var(--accent)';

        const tipsTitle = document.createElement('div');
        tipsTitle.innerHTML = `<i class="fas fa-lightbulb"></i> <strong>${t('tip')}</strong>`;
        tipsTitle.style.fontSize = '0.85rem';
        tipsTitle.style.marginBottom = '0.5rem';
        tipsTitle.style.color = 'var(--accent)';

        const tipsContent = document.createElement('div');
        tipsContent.textContent = getLocalizedData(shortcut, 'tips');
        tipsContent.style.fontSize = '0.85rem';
        tipsContent.style.color = 'var(--text-secondary)';

        tipsSection.appendChild(tipsTitle);
        tipsSection.appendChild(tipsContent);
        card.appendChild(tipsSection);
    }

    // Related shortcuts button (moved to bottom)
    let relatedBtn;
    if (shortcut.relatedShortcuts && shortcut.relatedShortcuts.length > 0) {
        relatedBtn = document.createElement('button');
        relatedBtn.className = 'btn btn--small';
        relatedBtn.style.marginTop = '1rem';
        relatedBtn.style.width = '100%';
        relatedBtn.innerHTML = `<i class="fas fa-link"></i> ${shortcut.relatedShortcuts.length} ${t('related')}`;
        relatedBtn.onclick = (e) => {
            e.stopPropagation();
            openRelatedModal(shortcut.id);
        };
    }

    // Assemble card
    card.appendChild(mediaContainer);
    card.appendChild(favoriteBtn);
    card.appendChild(header);
    card.appendChild(action);
    card.appendChild(shortcutKeys);
    card.appendChild(notes);
    if (relatedBtn) card.appendChild(relatedBtn);

    return card;
}

// ===== VIEW TOGGLE =====
function bindViewToggle() {
    elements.tableViewBtn.addEventListener('click', () => {
        setView('table');
    });

    elements.cardsViewBtn.addEventListener('click', () => {
        setView('cards');
    });
}

function setView(mode) {
    viewState.mode = mode;
    localStorage.setItem('blender_view_mode', mode);
    applyView();
    render();
}

function applyView() {
    if (viewState.mode === 'cards') {
        elements.tableView.style.display = 'none';
        elements.cardsView.style.display = 'grid';
        elements.tableViewBtn.classList.remove('active');
        elements.cardsViewBtn.classList.add('active');
    } else {
        elements.tableView.style.display = 'block';
        elements.cardsView.style.display = 'none';
        elements.tableViewBtn.classList.add('active');
        elements.cardsViewBtn.classList.remove('active');
    }
}

// ===== CREATE ROW =====
function createRow(shortcut) {
    const tr = document.createElement('tr');
    tr.className = 'expandable';
    tr.dataset.shortcutId = shortcut.id;

    // Star (favorite)
    // Star (favorite)
    const tdStar = document.createElement('td');
    tdStar.style.textAlign = 'center';
    const starBtn = document.createElement('button');
    starBtn.className = 'star-btn' + (favorites.has(shortcut.id) ? ' active' : '');
    starBtn.innerHTML = favorites.has(shortcut.id) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    starBtn.setAttribute('aria-label', t('toggleFavorite'));
    starBtn.setAttribute('aria-pressed', favorites.has(shortcut.id) ? 'true' : 'false');
    starBtn.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(shortcut.id);
    };
    tdStar.appendChild(starBtn);
    tr.appendChild(tdStar);

    // Action (Moved to 2nd pos)
    const tdAction = document.createElement('td');
    const actionContainer = document.createElement('div');
    actionContainer.style.display = 'flex';
    actionContainer.style.alignItems = 'center';

    // Only show detail icon if there's enhanced info
    if (shortcut.tips || shortcut.useCases || shortcut.media) {
        const expandIcon = document.createElement('span');
        expandIcon.className = 'detail-icon'; // Renamed from expand-icon
        expandIcon.innerHTML = '<i class="fas fa-info-circle"></i>'; // Changed to info-circle
        expandIcon.style.color = 'var(--text-secondary)';
        expandIcon.style.marginRight = '0.5rem';
        expandIcon.style.fontSize = '0.9rem';
        expandIcon.style.cursor = 'pointer';
        expandIcon.title = t('openDetails');
        expandIcon.onclick = (e) => {
            e.stopPropagation();
            openDetailModal(shortcut);
        };
        actionContainer.appendChild(expandIcon);
    }

    const actionText = document.createElement('span');
    actionText.textContent = getLocalizedData(shortcut, 'action');
    actionContainer.appendChild(actionText);
    tdAction.appendChild(actionContainer);
    tr.appendChild(tdAction);

    // Shortcut (Moved to 3rd pos)
    const tdShortcut = document.createElement('td');
    const shortcutContainer = document.createElement('div');
    shortcutContainer.className = 'shortcut-keys';
    shortcutContainer.innerHTML = parseShortcutToKbd(shortcut.shortcut);
    shortcutContainer.title = t('copy');
    shortcutContainer.style.cursor = 'pointer';
    shortcutContainer.onclick = (e) => {
        e.stopPropagation();
        copyToClipboard(shortcut.shortcut);
    };
    tdShortcut.appendChild(shortcutContainer);
    tr.appendChild(tdShortcut);

    // Category (Moved to 4th pos)
    const tdCategory = document.createElement('td');
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = t(shortcut.category);
    tdCategory.appendChild(categoryBadge);
    tr.appendChild(tdCategory);

    // Difficulty (Moved to 5th pos)
    const tdDifficulty = document.createElement('td');
    tdDifficulty.style.textAlign = 'center';
    const difficultyBadge = document.createElement('span');
    difficultyBadge.className = `difficulty-badge difficulty-${shortcut.difficulty}`;
    difficultyBadge.textContent = t(shortcut.difficulty);
    difficultyBadge.setAttribute('aria-label', `Nivel: ${t(shortcut.difficulty)}`);
    tdDifficulty.appendChild(difficultyBadge);
    tr.appendChild(tdDifficulty);

    // Notes (without tags)
    const tdNotes = document.createElement('td');
    const notesContainer = document.createElement('div');

    const notesText = document.createElement('div');
    notesText.textContent = getLocalizedData(shortcut, 'notes');
    notesText.style.color = 'var(--text-secondary)';
    notesText.style.fontSize = '0.9rem';
    notesContainer.appendChild(notesText);

    tdNotes.appendChild(notesContainer);
    tr.appendChild(tdNotes);

    // Tags (New Column)
    const tdTags = document.createElement('td');
    if (shortcut.tags && shortcut.tags.length > 0) {
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags-container';

        shortcut.tags.forEach(tag => {
            const tagBadge = document.createElement('span');
            tagBadge.className = `tag-badge tag-${tag}`;
            tagBadge.textContent = tag.replace(/_/g, ' ').replace('-', ' ');
            tagBadge.title = `Filtrar por: ${tag}`;
            tagBadge.onclick = (e) => {
                e.stopPropagation();
                filterByTag(tag);
            };
            tagsContainer.appendChild(tagBadge);
        });
        tdTags.appendChild(tagsContainer);
    }
    tr.appendChild(tdTags);

    // Add click handler for detail modal (instead of expansion)
    if (shortcut.tips || shortcut.useCases || shortcut.media) {
        tr.style.cursor = 'pointer';
        tr.onclick = () => openDetailModal(shortcut);
    }

    return tr;
}

// ===== OPEN DETAIL MODAL =====
function openDetailModal(shortcut) {
    if (elements.detailTitle) {
        elements.detailTitle.innerHTML = `<span class="category-badge">${t(shortcut.category)}</span> ${getLocalizedData(shortcut, 'action')}`;
    }

    const content = elements.detailContent;
    content.innerHTML = ''; // Clear previous content

    const enhancedInfo = document.createElement('div');
    enhancedInfo.className = 'enhanced-info';

    // Media section (Moved to top for modal)
    if (shortcut.media) {
        const mediaSection = document.createElement('div');
        mediaSection.className = 'info-section media-section';
        // mediaSection.style.marginBottom = '1.5rem';

        const mediaContent = document.createElement('div');
        mediaContent.className = 'info-section-content media-content';

        if (shortcut.media.type === 'image') {
            const container = document.createElement('div');
            container.className = 'shortcut-media-container';
            // Increase height for modal view
            container.style.height = '240px';
            mediaContent.appendChild(container);

            if (shortcut.media.url.endsWith('.svg')) {
                fetch(shortcut.media.url)
                    .then(response => response.text())
                    .then(svgText => {
                        container.innerHTML = svgText;
                        if (window.Animations) {
                            window.Animations.init(container, shortcut.id);
                        }
                    })
                    .catch(e => {
                        // Fallback
                        const img = document.createElement('img');
                        img.src = shortcut.media.url;
                        img.className = 'shortcut-media-img';
                        container.appendChild(img);
                    });
            } else {
                const img = document.createElement('img');
                img.src = shortcut.media.url;
                img.alt = shortcut.media.alt;
                img.className = 'shortcut-media-img';
                container.appendChild(img);
            }
        }
        mediaSection.appendChild(mediaContent);
        enhancedInfo.appendChild(mediaSection);
    }

    // Shortcut Key Display
    const keyDisplay = document.createElement('div');
    keyDisplay.style.textAlign = 'center';
    keyDisplay.style.margin = '1.5rem 0';
    keyDisplay.style.fontSize = '1.5rem';
    keyDisplay.innerHTML = parseShortcutToKbd(shortcut.shortcut);
    enhancedInfo.appendChild(keyDisplay);

    // Description / Notes
    if (shortcut.notes) {
        const notesSection = document.createElement('p');
        notesSection.style.textAlign = 'center';
        notesSection.style.color = 'var(--text-secondary)';
        notesSection.style.marginBottom = '1.5rem';
        notesSection.textContent = getLocalizedData(shortcut, 'notes');
        enhancedInfo.appendChild(notesSection);
    }

    // Tips section
    if (shortcut.tips) {
        const tipsSection = document.createElement('div');
        tipsSection.className = 'info-section';

        const tipsTitle = document.createElement('div');
        tipsTitle.className = 'info-section-title';
        tipsTitle.innerHTML = `<i class="fas fa-lightbulb"></i> ${t('tipsTitle')}`;

        const tipsContent = document.createElement('div');
        tipsContent.className = 'info-section-content';
        tipsContent.textContent = getLocalizedData(shortcut, 'tips');

        tipsSection.appendChild(tipsTitle);
        tipsSection.appendChild(tipsContent);
        enhancedInfo.appendChild(tipsSection);
    }

    // Use cases section
    if (shortcut.useCases && shortcut.useCases.length > 0) {
        const useCasesSection = document.createElement('div');
        useCasesSection.className = 'info-section';

        const useCasesTitle = document.createElement('div');
        useCasesTitle.className = 'info-section-title';
        useCasesTitle.innerHTML = `<i class="fas fa-tasks"></i> ${t('useCases')}`;

        const useCasesList = document.createElement('ul');
        useCasesList.className = 'use-cases-list';

        const localizedUseCases = getLocalizedData(shortcut, 'useCases');
        // Handle array if getLocalizedData returns it, or fallback
        const useCasesArray = Array.isArray(localizedUseCases) ? localizedUseCases : shortcut.useCases;

        useCasesArray.forEach(useCase => {
            const li = document.createElement('li');
            li.textContent = useCase;
            useCasesList.appendChild(li);
        });

        useCasesSection.appendChild(useCasesTitle);
        useCasesSection.appendChild(useCasesList);
        enhancedInfo.appendChild(useCasesSection);
    }

    // Related shortcuts section
    if (shortcut.relatedShortcuts && shortcut.relatedShortcuts.length > 0) {
        const relatedSection = document.createElement('div');
        relatedSection.className = 'info-section';

        const relatedTitle = document.createElement('div');
        relatedTitle.className = 'info-section-title';
        relatedTitle.innerHTML = `<i class="fas fa-link"></i> ${t('related')}`;

        const relatedContent = document.createElement('div');
        relatedContent.className = 'info-section-content';

        // Use chips or links
        const relatedLinks = document.createElement('div');
        relatedLinks.style.display = 'flex';
        relatedLinks.style.gap = '0.5rem';
        relatedLinks.style.flexWrap = 'wrap';

        shortcut.relatedShortcuts.forEach(id => {
            const related = SHORTCUTS.find(s => s.id === id);
            if (related) {
                const chip = document.createElement('span');
                chip.className = 'tag-badge'; // Reuse tag style
                chip.style.cursor = 'pointer';
                chip.innerHTML = `<i class="fas fa-external-link-alt" style="font-size:0.8em; margin-right:4px;"></i> ${getLocalizedData(related, 'action')}`;
                chip.onclick = () => openDetailModal(related); // Recursively open detail
                relatedLinks.appendChild(chip);
            }
        });

        relatedContent.appendChild(relatedLinks);
        relatedSection.appendChild(relatedTitle);
        relatedSection.appendChild(relatedContent);
        enhancedInfo.appendChild(relatedSection);
    }

    content.appendChild(enhancedInfo);
    openModal(elements.detailModal);
}

// ===== FILTER BY TAG =====
function filterByTag(tag) {
    // Set search to the tag
    filters.search = tag.replace(/_/g, ' ').replace('-', ' ');
    elements.search.value = filters.search;
    render();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ===== EMPTY STATE =====
function renderEmptyState() {
    const tr = document.createElement('tr');
    tr.className = 'empty-state-row';
    const td = document.createElement('td');
    td.colSpan = 6;
    td.className = 'empty-state';
    td.innerHTML = `
    <i class="fas fa-search"></i>
    <p>${t('noResultsTitle')}</p>
    <small>${t('noResultsDesc')}</small>
  `;
    tr.appendChild(td);
    elements.tableBody.appendChild(tr);
}

// ===== FAVORITES =====
function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    localStorage.setItem('blender_favorites', JSON.stringify([...favorites]));
    render();
}

// ===== RESET FILTERS =====
function resetFilters() {
    filters.search = '';
    filters.category = '';
    filters.difficulty = '';
    filters.context = '';
    filters.workflow = '';
    filters.favoritesOnly = false;

    elements.search.value = '';
    elements.categoryFilter.value = '';
    elements.difficultyFilter.value = '';
    elements.contextFilter.value = '';
    elements.workflowFilter.value = '';
    elements.versionFilter.value = '';
    elements.favoritesOnly.checked = false;

    render();
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const toast = document.createElement('div');
        toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
        toast.innerHTML = `<i class="fas fa-check"></i> ${t('copied')}: <strong>${text}</strong>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ============================================
// FASE 4: ADVANCED FEATURES
// ============================================

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info', duration = 3000) {
    const icons = { info: 'info-circle', success: 'check-circle', warning: 'exclamation-triangle', error: 'times-circle' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${message}</span>`;

    elements.toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('toast--show'), 10);

    setTimeout(() => {
        toast.classList.remove('toast--show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== MODAL MANAGEMENT =====
function openModal(modalElement) {
    modalElement.hidden = false;
    document.body.style.overflow = 'hidden';
    const closeBtn = modalElement.querySelector('.modal__close');
    const overlay = modalElement.querySelector('.modal__overlay');

    closeBtn.onclick = () => closeModal(modalElement);
    overlay.onclick = () => closeModal(modalElement);

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalElement);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function closeModal(modalElement) {
    modalElement.hidden = true;
    document.body.style.overflow = '';
}

// ===== EXPORT/IMPORT FAVORITES =====
function exportFavorites() {
    if (favorites.size === 0) {
        showToast('No hay favoritos para exportar', 'warning');
        return;
    }

    const data = {
        version: '1.0',
        timestamp: Date.now(),
        favorites: [...favorites],
        appVersion: 'v1.0.0',
        count: favorites.size
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blender-shortcuts-favorites-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`${favorites.size} favoritos exportados exitosamente`, 'success');
}

function importFavorites(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (!data.favorites || !Array.isArray(data.favorites)) {
                throw new Error('Invalid format');
            }

            const shouldReplace = confirm(`¿Reemplazar ${favorites.size} favoritos actuales con ${data.favorites.length} importados?\n\nCancelar = Combinar`);

            if (shouldReplace) {
                favorites.clear();
            }

            data.favorites.forEach(id => favorites.add(id));
            saveFavorites();
            render();

            showToast(`${data.favorites.length} favoritos importados exitosamente`, 'success');
        } catch (error) {
            showToast('Error: Archivo inválido', 'error');
        }
    };
    reader.readAsText(file);
}

// ===== RELATED SHORTCUTS MODAL =====
function openRelatedModal(shortcutId) {
    const shortcut = SHORTCUTS.find(s => s.id === shortcutId);
    if (!shortcut || !shortcut.relatedShortcuts || shortcut.relatedShortcuts.length === 0) {
        showToast('Este atajo no tiene relacionados', 'info');
        return;
    }

    const relatedList = shortcut.relatedShortcuts
        .map(id => SHORTCUTS.find(s => s.id === id))
        .filter(Boolean);

    elements.relatedShortcutsList.innerHTML = `
        <div class="related-list">
            ${relatedList.map(related => `
                <div class="related-item" onclick="openRelatedModal('${related.id}')">
                    <div class="related-item__shortcut">${parseShortcutToKbd(related.shortcut)}</div>
                    <div class="related-item__info">
                        <div class="related-item__action">${getLocalizedData(related, 'action')}</div>
                        <div class="related-item__notes">${getLocalizedData(related, 'notes')}</div>
                    </div>
                    <span class="related-item__badge category-badge">${t(related.category)}</span>
                </div>
            `).join('')}
        </div>
    `;

    openModal(elements.relatedModal);
}

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('[PWA] Service Worker registered:', registration.scope);
            })
            .catch((error) => {
                console.error('[PWA] Service Worker registration failed:', error);
            });
    });
}

// ===== BIND PHASE 4 FEATURES =====
function bindPhase4Features() {
    // Export/Import
    if (elements.exportBtn) elements.exportBtn.onclick = exportFavorites;
    if (elements.importBtn) elements.importBtn.onclick = () => elements.importFile.click();
    if (elements.importFile) {
        elements.importFile.onchange = (e) => {
            if (e.target.files[0]) {
                importFavorites(e.target.files[0]);
                e.target.value = '';
            }
        };
    }

    // Quiz Button
    if (elements.quizBtn) {
        elements.quizBtn.onclick = startQuiz;
    }
}

// ============================================
// FASE 5: POLISH & FINAL FEATURES
// ============================================

// ===== BIND PHASE 5 FEATURES =====
function bindPhase5Features() {
    // Stats modal
    if (elements.statsBtn) {
        elements.statsBtn.onclick = () => {
            elements.statsModalBody.innerHTML = renderStatsPanel();
            openModal(elements.statsModal);
        };
    }

    // Settings modal
    if (elements.settingsBtn) {
        elements.settingsBtn.onclick = () => {
            elements.settingsModalBody.innerHTML = renderSettingsPanel();
            bindSettingsEvents(elements.settingsModal);
            openModal(elements.settingsModal);
        };
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // / = Focus search
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            elements.search.focus();
            elements.search.select();
        }

        // Ctrl+K = Quick search (same as /)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            elements.search.focus();
            elements.search.select();
        }

        // ? = Show keyboard shortcuts help
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            showToast(
                'Atajos: / = Buscar, Ctrl+K = Buscar, ESC = Limpiar, ↑↓ = Navegar',
                'info',
                5000
            );
        }
    });
}

// ===== TIPS FEATURE =====
function bindTipsFeature() {
    if (elements.tipsBtn) {
        elements.tipsBtn.onclick = () => {
            // Check if TIPS exists (from app_data.js)
            if (typeof TIPS === 'undefined' || !TIPS) {
                console.error("TIPS data not found");
                return;
            }
            elements.tipsList.innerHTML = renderTipsPanel();
            openModal(elements.tipsModal);
        };
    }
}

function renderTipsPanel() {
    return TIPS.map(tip => `
        <div class="tip-card">
            <div class="tip-card__header">
                <div class="tip-card__icon">
                    <i class="fas fa-${tip.icon}"></i>
                </div>
                <div class="tip-card__title">${tip.title}</div>
            </div>
            <div class="tip-card__content">
                ${tip.content}
            </div>
            <div class="tip-card__footer">
                ${tip.tags.map(tag => `<span class="tip-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Track shortcuts copied (override original copyToClipboard)
const originalCopy = copyToClipboard;
copyToClipboard = function (text) {
    originalCopy(text);
    // Track which shortcut was copied
    const shortcut = SHORTCUTS.find(s => s.shortcut === text);
    if (shortcut && typeof trackShortcutCopy === 'function') {
        trackShortcutCopy(shortcut.id);
    }
};

// ===== INIT APP =====
window.addEventListener('DOMContentLoaded', init);
