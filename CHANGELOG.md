# CHANGELOG

## [1.0.0] - 2026-02-12

### Fase 5: Polish & Final Features ✨

#### Added
- 📊 **Sistema de Estadísticas**
  - Tracking automático de visitas y racha de días consecutivos
  - Historial de quizzes con gráfico visual
  - Top 5 shortcuts más copiados
  - Precisión promedio y mejor score
  - Almacenamiento en localStorage

- ⚙️ **Panel de Configuración**
  - Selector de tema (light/dark/auto)
  - Vista por defecto (tabla/cards)
  - Opciones de quiz (número de preguntas, feedback)
  - Configuración de accesibilidad (tamaño fuente, reducir animaciones)
  - Restaurar configuración por defecto

- ⌨️ **Keyboard Shortcuts**
  - `/` → Focus en búsqueda
  - `Ctrl+K` / `Cmd+K` → Quick search
  - `?` → Mostrar ayuda de atajos
  - `ESC` → Limpiar búsqueda (existing)

- 🎨 **CSS Polish**
  - Tooltips con `[data-tooltip]`
  - Loading states (skeleton, spinner)
  - Focus indicators mejorados
  - Skip link para accesibilidad
  - Screen reader support (`.sr-only`, live regions)
  - Soporte `prefers-reduced-motion`

- 📚 **Documentación**
  - README.md completo con guía de uso
  - Información de tech stack y arquitectura
  - Guía de development
  - Este CHANGELOG

#### Removed
- ❌ Update banner y sistema de notificaciones de actualizaciones
  - Removido HTML, JS y CSS relacionado
  - Service Worker simplificado a registro básico

---

### Fase 4: Advanced Features 🚀

#### Added
- 🔔 Toast notification system (4 tipos: info, success, warning, error)
- 🖼️ Sistema de modales reutilizable
- 🎯 Quiz interactivo con 10 preguntas aleatorias
- 💾 Export/Import favoritos como JSON
- 🔗 Modal de shortcuts relacionados
- 🔄 Auto-dismiss y animaciones smooth

---

### Fase 3: Responsive + PWA 📱

#### Added
- 📱 Diseño completamente responsive
- 🎴 Vista cards para móvil
- 📡 Service Worker para funcionalidad offline
- 📲 PWA manifest (instalable)
- 🎨 Mejoras de UI mobile-first
- 📴 Funcionalidad offline-first completa

---

### Fase 2: Data Expansion 📊

#### Added
- 🎯 157 shortcuts totales (vs 65 iniciales)
- 🏷️ Metadata enriquecida:
  - Difficulty (beginner/intermediate/advanced)
  - Context (general/modeling/sculpting/UV/etc)
  - Workflow (basic/productivity/specific tools)
- 🔗 Related shortcuts linking
- 🎛️ Filtros avanzados multi-criterio
- 📈 Mejora significativa en contenido

---

### Fase 1: Foundation 🏗️

#### Added
- ✅ 65 atajos iniciales de Blender
- 🔍 Búsqueda en tiempo real
- 🏷️ Filtrado por categoría
- ↕️ Sorting por columna
- ⭐ Sistema de favoritos
- 📋 Copy to clipboard
- 🌓 Dark/Light theme toggle
- 🎨 UI moderna con CSS custom properties

---

## Estadísticas Finales

- **Total Código**: ~3600 líneas
- **Archivos**: 18 files
- **CSS**: 4 archivos (~2000 líneas)
- **JavaScript**: 4 archivos (~1600 líneas)
- **Atajos**: 157 shortcuts completos
- **Categorías**: 12 categorías organizadas

---

## Tech Stack

- Vanilla JavaScript (ES6+)
- HTML5 Semantic
- CSS3 (Grid, Flexbox, Custom Properties)
- Service Worker API
- LocalStorage API
- Web App Manifest

---

## Contributors

Desarrollado para la comunidad Blender 🎨

MIT License © 2026
