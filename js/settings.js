// ============================================
// SETTINGS.JS - CONFIGURATION MANAGEMENT
// ============================================

const SETTINGS_KEY = 'blender_settings';

function getSettings() {
    const defaultSettings = {
        theme: 'auto', // 'light' | 'dark' | 'auto'
        view: 'table', // 'table' | 'cards'

        accessibility: {
            reducedMotion: false,
            fontSize: 'normal' // 'small' | 'normal' | 'large'
        }
    };

    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
}

function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    applySettings(settings);
}

function applySettings(settings) {
    // Theme
    if (settings.theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.body.setAttribute('data-theme', settings.theme);
    }

    // Font size
    document.documentElement.style.fontSize = {
        small: '14px',
        normal: '16px',
        large: '18px'
    }[settings.accessibility.fontSize];

    // Reduced motion
    if (settings.accessibility.reducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    } else {
        document.documentElement.style.removeProperty('--animation-duration');
    }
}

function renderSettingsPanel() {
    const settings = getSettings();

    return `
        <div class="settings-panel">
            <div class="settings-section">
                <h3><i class="fas fa-palette"></i> Apariencia</h3>
                <div class="setting-group">
                    <label>Tema</label>
                    <div class="theme-selector">
                        <button class="theme-option ${settings.theme === 'light' ? 'active' : ''}" data-theme="light">
                            <i class="fas fa-sun"></i> Claro
                        </button>
                        <button class="theme-option ${settings.theme === 'auto' ? 'active' : ''}" data-theme="auto">
                            <i class="fas fa-adjust"></i> Auto
                        </button>
                        <button class="theme-option ${settings.theme === 'dark' ? 'active' : ''}" data-theme="dark">
                            <i class="fas fa-moon"></i> Oscuro
                        </button>
                    </div>
                </div>
                
                <div class="setting-group">
                    <label>Vista por Defecto</label>
                    <div class="toggle-group">
                        <button class="toggle-option ${settings.view === 'table' ? 'active' : ''}" data-view="table">
                            <i class="fas fa-table"></i> Tabla
                        </button>
                        <button class="toggle-option ${settings.view === 'cards' ? 'active' : ''}" data-view="cards">
                            <i class="fas fa-th-large"></i> Cards
                        </button>
                    </div>
                </div>
            </div>
            

            
            <div class="settings-section">
                <h3><i class="fas fa-universal-access"></i> Accesibilidad</h3>
                <div class="setting-group">
                    <label for="fontSize">Tamaño de Fuente</label>
                    <select id="fontSize" class="settings-select">
                        <option value="small" ${settings.accessibility.fontSize === 'small' ? 'selected' : ''}>Pequeño</option>
                        <option value="normal" ${settings.accessibility.fontSize === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="large" ${settings.accessibility.fontSize === 'large' ? 'selected' : ''}>Grande</option>
                    </select>
                </div>
                
                <div class="setting-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="reducedMotion" ${settings.accessibility.reducedMotion ? 'checked' : ''}>
                        <span>Reducir animaciones</span>
                    </label>
                </div>
            </div>
            
            <div class="settings-actions">
                <button class="btn btn--secondary" id="resetSettings">
                    <i class="fas fa-undo"></i> Restaurar defaults
                </button>
                <button class="btn" id="saveSettings">
                    <i class="fas fa-check"></i> Guardar
                </button>
            </div>
        </div>
    `;
}

function bindSettingsEvents(modal) {
    const settings = getSettings();

    // Theme selector
    modal.querySelectorAll('.theme-option').forEach(btn => {
        btn.onclick = () => {
            modal.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            settings.theme = btn.dataset.theme;
        };
    });

    // View toggle
    modal.querySelectorAll('.toggle-option').forEach(btn => {
        btn.onclick = () => {
            modal.querySelectorAll('.toggle-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            settings.view = btn.dataset.view;
        };
    });

    // Save settings
    modal.querySelector('#saveSettings').onclick = () => {

        settings.accessibility.fontSize = modal.querySelector('#fontSize').value;
        settings.accessibility.reducedMotion = modal.querySelector('#reducedMotion').checked;

        saveSettings(settings);
        showToast('Configuración guardada exitosamente', 'success');
        closeModal(modal);
    };

    // Reset settings
    modal.querySelector('#resetSettings').onclick = () => {
        if (confirm('¿Restaurar configuración por defecto?')) {
            localStorage.removeItem(SETTINGS_KEY);
            showToast('Configuración restaurada', 'info');
            closeModal(modal);
            window.location.reload();
        }
    };
}

// Apply settings on load
applySettings(getSettings());
