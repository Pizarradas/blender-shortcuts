// Main application logic for Blender Shortcuts
(function() {
    'use strict';

    // Application state
    const state = {
        shortcuts: [],
        filteredShortcuts: [],
        searchTerm: '',
        selectedCategory: 'all',
        categories: new Set()
    };

    // DOM elements
    const elements = {
        searchInput: null,
        categoryFilter: null,
        shortcutsContainer: null,
        visibleCount: null,
        totalCount: null
    };

    // Debounce function for performance optimization
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

    // Initialize the application
    function init() {
        // Cache DOM elements
        elements.searchInput = document.getElementById('search-input');
        elements.categoryFilter = document.getElementById('category-filter');
        elements.shortcutsContainer = document.getElementById('shortcuts-container');
        elements.visibleCount = document.getElementById('visible-count');
        elements.totalCount = document.getElementById('total-count');

        // Load shortcuts data
        loadShortcuts();

        // Set up event listeners
        setupEventListeners();

        // Set up keyboard shortcuts
        setupKeyboardShortcuts();
    }

    // Load shortcuts from data file
    function loadShortcuts() {
        if (typeof SHORTCUTS_DATA === 'undefined') {
            console.error('Shortcuts data not loaded');
            showError('Failed to load shortcuts data');
            return;
        }

        state.shortcuts = SHORTCUTS_DATA;
        state.filteredShortcuts = [...state.shortcuts];

        // Extract unique categories
        state.shortcuts.forEach(shortcut => {
            state.categories.add(shortcut.category);
        });

        // Populate category filter
        populateCategoryFilter();

        // Render shortcuts
        renderShortcuts();

        // Update counts
        updateCounts();
    }

    // Populate category filter dropdown
    function populateCategoryFilter() {
        const sortedCategories = Array.from(state.categories).sort();
        
        sortedCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            elements.categoryFilter.appendChild(option);
        });
    }

    // Set up event listeners
    function setupEventListeners() {
        // Search input with debouncing for performance
        elements.searchInput.addEventListener('input', debounce(handleSearch, 300));

        // Category filter
        elements.categoryFilter.addEventListener('change', handleCategoryFilter);

        // Clear search on Escape
        elements.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                elements.searchInput.value = '';
                handleSearch();
            }
        });
    }

    // Set up keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+F to focus search (prevent default browser search)
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                elements.searchInput.focus();
                elements.searchInput.select();
            }
        });
    }

    // Handle search input
    function handleSearch() {
        state.searchTerm = elements.searchInput.value.toLowerCase().trim();
        filterShortcuts();
    }

    // Handle category filter
    function handleCategoryFilter() {
        state.selectedCategory = elements.categoryFilter.value;
        filterShortcuts();
    }

    // Filter shortcuts based on search and category
    function filterShortcuts() {
        state.filteredShortcuts = state.shortcuts.filter(shortcut => {
            // Category filter
            const categoryMatch = state.selectedCategory === 'all' || 
                                 shortcut.category === state.selectedCategory;

            // Search filter
            const searchMatch = state.searchTerm === '' ||
                               shortcut.name.toLowerCase().includes(state.searchTerm) ||
                               shortcut.description.toLowerCase().includes(state.searchTerm) ||
                               shortcut.category.toLowerCase().includes(state.searchTerm) ||
                               shortcut.keys.some(key => key.toLowerCase().includes(state.searchTerm));

            return categoryMatch && searchMatch;
        });

        renderShortcuts();
        updateCounts();
        announceResults();
    }

    // Render shortcuts to the DOM
    function renderShortcuts() {
        // Clear container
        elements.shortcutsContainer.innerHTML = '';

        if (state.filteredShortcuts.length === 0) {
            showEmptyState();
            return;
        }

        // Create a document fragment for better performance
        const fragment = document.createDocumentFragment();

        state.filteredShortcuts.forEach(shortcut => {
            const card = createShortcutCard(shortcut);
            fragment.appendChild(card);
        });

        elements.shortcutsContainer.appendChild(fragment);
    }

    // Create a shortcut card element
    function createShortcutCard(shortcut) {
        const card = document.createElement('article');
        card.className = 'shortcut-card';
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', `Shortcut: ${shortcut.name}`);

        // Category badge
        const category = document.createElement('span');
        category.className = 'shortcut-category';
        category.textContent = shortcut.category;

        // Name
        const name = document.createElement('h2');
        name.className = 'shortcut-name';
        name.textContent = shortcut.name;

        // Description
        const description = document.createElement('p');
        description.className = 'shortcut-description';
        description.textContent = shortcut.description;

        // Keys container
        const keysContainer = document.createElement('div');
        keysContainer.className = 'shortcut-keys';
        keysContainer.setAttribute('role', 'list');
        keysContainer.setAttribute('aria-label', 'Keyboard shortcut keys');

        const keysLabel = document.createElement('span');
        keysLabel.className = 'shortcut-label';
        keysLabel.textContent = 'Keys:';
        keysContainer.appendChild(keysLabel);

        // Add keys
        shortcut.keys.forEach((key, index) => {
            const kbd = document.createElement('kbd');
            kbd.textContent = key;
            kbd.setAttribute('role', 'listitem');
            keysContainer.appendChild(kbd);

            // Add separator between keys (except for last key)
            if (index < shortcut.keys.length - 1) {
                const separator = document.createElement('span');
                separator.className = 'key-separator';
                separator.textContent = '+';
                separator.setAttribute('aria-hidden', 'true');
                keysContainer.appendChild(separator);
            }
        });

        // Assemble card
        card.appendChild(category);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(keysContainer);

        return card;
    }

    // Show empty state when no results
    function showEmptyState() {
        elements.shortcutsContainer.innerHTML = `
            <div class="empty-message">
                <p>No shortcuts found matching your search criteria.</p>
                <p>Try adjusting your search or filter settings.</p>
            </div>
        `;
    }

    // Show error message
    function showError(message) {
        elements.shortcutsContainer.innerHTML = `
            <div class="empty-message">
                <p>❌ ${message}</p>
            </div>
        `;
    }

    // Update visible and total counts
    function updateCounts() {
        elements.visibleCount.textContent = state.filteredShortcuts.length;
        elements.totalCount.textContent = state.shortcuts.length;
    }

    // Announce results for screen readers
    function announceResults() {
        const count = state.filteredShortcuts.length;
        const message = count === 1 
            ? '1 shortcut found' 
            : `${count} shortcuts found`;
        
        // Update aria-live region
        const stats = document.querySelector('.stats');
        if (stats) {
            stats.setAttribute('aria-label', message);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for testing purposes (if needed)
    if (typeof window !== 'undefined') {
        window.BlenderShortcuts = {
            getState: () => ({ ...state }),
            getFilteredShortcuts: () => [...state.filteredShortcuts]
        };
    }
})();
