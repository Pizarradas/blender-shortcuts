// ============================================
// i18n - INTERNATIONALIZATION SYSTEM
// ============================================

const translations = {
    es: {
        // Header
        title: "⌨️ Atajos Blender",
        subtitle: "Referencia completa de shortcuts para Blender 3D",

        // Search
        searchPlaceholder: "Buscar atajos (ej: mover, rotar...)",

        // Filters
        filterFtoggle: "Filtros",
        filterCategory: "Todas las categorías",
        filterDifficulty: "Todas las dificultades",
        filterContext: "Todos los contextos",
        filterWorkflow: "Todos los flujos",
        filterVersion: "Todas las versiones",
        showFavorites: "Solo favoritos",
        resetFilters: "Resetear",

        // Categories (Data labels)
        transform: "Transformación",
        selection: "Selección",
        modeling: "Modelado",
        view: "Vista",
        animation: "Animación",
        rendering: "Renderizado",
        general: "General",
        interface: "Interfaz",
        sculpting: "Esculpido",
        shading: "Shading",
        utilities: "Utilidades",
        topology: "Topología",
        navigation: "Navegación",

        // Difficulties
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",

        // Contexts
        object_mode: "Modo Objeto",
        edit_mode: "Modo Edición",
        sculpt_mode: "Modo Esculpido",
        pose_mode: "Modo Pose",
        shader_editor: "Shader Editor",
        any: "Cualquier modo",

        // Workflows
        modeling_workflow: "Modelado",
        animation_workflow: "Animación",
        rendering_workflow: "Renderizado",
        general_workflow: "General",
        sculpting_workflow: "Esculpido",
        texturing: "Texturizado",
        retopo: "Retopología",

        // View Toggle
        tableView: "Tabla",
        cardsView: "Cards",

        // Results
        showing: "Mostrando",
        of: "de",
        shortcuts: "atajos",
        noResultsTitle: "No se encontraron atajos",
        noResultsDesc: "Intenta ajustar los filtros de búsqueda",

        // Table Headers
        favorite: "Favorito",
        category: "Categoría",
        shortcut: "Atajo",
        action: "Acción",
        details: "Detalles",
        tags: "Etiquetas",
        notes: "Notas",

        // Card Labels
        tip: "Tip:",
        related: "Ver Relacionados:",
        copy: "Copiar",
        copied: "Copiado",
        new: "Nuevo",

        // Modals
        statsTitle: "Estadísticas",
        settingsTitle: "Configuración",
        tipsTitle: "💡 Tips & Trucos",
        close: "Cerrar",

        // Stats
        totalVisits: "Visitas Totales",
        consecutiveDays: "Días Consecutivos",
        topCategory: "Categoría Favorita",

        // Settings
        themeLabel: "Tema",
        themeLight: "Claro",
        themeDark: "Oscuro",
        themeAuto: "Auto (Sistema)",
        languageLabel: "Idioma",

        // Footer
        // Footer
        footerText: "Hecho con ❤️ por José Luis Pizarro para la comunidad de Blender",

        // Accessibility & Aria
        skipToContent: "Saltar al contenido principal",
        changeTheme: "Cambiar tema",
        selectLanguage: "Seleccionar idioma",
        toggleFavorite: "Marcar como favorito",
        expandRow: "Expandir fila",
        openDetails: "Ver detalles",

        // Tips Modal
        didYouKnow: "¿Sabías qué?",
    },
    en: {
        // Header
        title: "⌨️ Blender Shortcuts",
        subtitle: "Complete shortcut reference for Blender 3D",

        // Search
        searchPlaceholder: "Search shortcuts (e.g: move, rotate...)",

        // Filters
        filterFtoggle: "Filters",
        filterCategory: "All categories",
        filterDifficulty: "All difficulties",
        filterContext: "All contexts",
        filterWorkflow: "All workflows",
        filterVersion: "All versions",
        showFavorites: "Favorites only",
        resetFilters: "Reset",

        // Categories (Data labels)
        transform: "Transform",
        selection: "Selection",
        modeling: "Modeling",
        view: "View",
        animation: "Animation",
        rendering: "Rendering",
        general: "General",
        interface: "Interface",
        sculpting: "Sculpting",
        shading: "Shading",
        utilities: "Utilities",
        topology: "Topology",
        navigation: "Navigation",

        // Difficulties
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",

        // Contexts
        object_mode: "Object Mode",
        edit_mode: "Edit Mode",
        sculpt_mode: "Sculpt Mode",
        pose_mode: "Pose Mode",
        shader_editor: "Shader Editor",
        any: "Any mode",

        // Workflows
        modeling_workflow: "Modeling",
        animation_workflow: "Animation",
        rendering_workflow: "Rendering",
        general_workflow: "General",
        sculpting_workflow: "Sculpting",
        texturing: "Texturing",
        retopo: "Retopology",

        // View Toggle
        tableView: "Table",
        cardsView: "Cards",

        // Results
        showing: "Showing",
        of: "of",
        shortcuts: "shortcuts",
        noResultsTitle: "No shortcuts found",
        noResultsDesc: "Try adjusting search filters",

        // Table Headers
        favorite: "Favorite",
        category: "Category",
        shortcut: "Shortcut",
        action: "Action",
        details: "Details",
        tags: "Tags",
        notes: "Notes",

        // Card Labels
        tip: "Tip:",
        related: "See Related:",
        copy: "Copy",
        copied: "Copied",
        new: "New",

        // Modals
        statsTitle: "Statistics",
        settingsTitle: "Settings",
        tipsTitle: "💡 Tips & Tricks",
        close: "Close",

        // Stats
        totalVisits: "Total Visits",
        consecutiveDays: "Consecutive Days",
        topCategory: "Top Category",

        // Settings
        themeLabel: "Theme",
        themeLight: "Light",
        themeDark: "Dark",
        themeAuto: "Auto (System)",
        languageLabel: "Language",

        // Footer
        // Footer
        footerText: "Made with ❤️ by José Luis Pizarro for the Blender community",

        // Accessibility & Aria
        skipToContent: "Skip to main content",
        changeTheme: "Change theme",
        selectLanguage: "Select language",
        toggleFavorite: "Toggle favorite",
        expandRow: "Expand row",
        openDetails: "View details",

        // Tips Modal
        didYouKnow: "Did you know?",
    }
};

// Current language
let currentLanguage = localStorage.getItem('blender_language') || 'es';

// Get translation
function t(key) {
    if (!translations[currentLanguage]) return key;
    return translations[currentLanguage][key] || key;
}

// Get localized data from object (e.g. shortcut.action vs shortcut.action_en)
function getLocalizedData(obj, field) {
    if (!obj) return '';
    if (currentLanguage === 'es') {
        return obj[field];
    } else {
        // Try field_en, fallback to field
        return obj[`${field}_en`] || obj[field];
    }
}

// Set language and update UI
function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLanguage = lang;
    localStorage.setItem('blender_language', lang);
    document.documentElement.lang = lang; // Update html lang attribute

    // Update all translatable elements
    updateUITranslations();

    // Trigger a re-render if the function exists globally
    if (typeof window.render === 'function') {
        window.render();
    } else if (typeof window.renderTable === 'function') {
        // Fallback if generic render not available
        window.renderTable(window.filteredShortcuts || window.SHORTCUTS);
    }
}

// Update all UI text with current language
function updateUITranslations() {
    // 1. Elements with data-i18n (Text content)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = t(key);
    });

    // 2. Elements with data-i18n-placeholder (Inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) el.placeholder = t(key);
    });

    // 3. Elements with data-i18n-title (Tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) el.title = t(key);
    });

    // 4. Elements with data-i18n-aria (Accessibility)
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (key) el.setAttribute('aria-label', t(key));
    });

    // 5. Special HTML updates (buttons with icons)
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.innerHTML = `<i class="fas fa-redo" aria-hidden="true"></i> ${t('resetFilters')}`;

    const tableViewBtn = document.getElementById('tableViewBtn');
    if (tableViewBtn) tableViewBtn.innerHTML = `<i class="fas fa-table"></i> ${t('tableView')}`;

    const cardsViewBtn = document.getElementById('cardsViewBtn');
    if (cardsViewBtn) cardsViewBtn.innerHTML = `<i class="fas fa-th-large"></i> ${t('cardsView')}`;

    const filterToggleBtn = document.getElementById('filterToggleBtn');
    // Only update the text span inside toggle button, preserve badge
    if (filterToggleBtn) {
        const span = filterToggleBtn.querySelector('span:not(.filter-count)');
        if (span) span.textContent = t('filterFtoggle');
    }

    // Select dropdowns - First option (label) logic
    // We can use data-i18n on the first <option> directly in HTML now!

    // 6. Update Language Toggle State
    const toggle = document.getElementById('languageToggle');
    if (toggle) {
        const langGroups = {
            es: toggle.querySelector('.lang-es'),
            en: toggle.querySelector('.lang-en')
        };

        // Reset all
        if (langGroups.es) langGroups.es.classList.remove('active');
        if (langGroups.en) langGroups.en.classList.remove('active');

        // Set active
        if (langGroups[currentLanguage]) {
            langGroups[currentLanguage].classList.add('active');
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, setLanguage, currentLanguage, getLocalizedData };
}

// Expose to window for app.js
window.t = t;
window.setLanguage = setLanguage;
window.getLocalizedData = getLocalizedData;
window.currentLanguage = currentLanguage;
