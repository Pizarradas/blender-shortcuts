# Blender Shortcuts Reference

> 🚀 **Progressive Web App** para aprender atajos de teclado de Blender 3D

[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](.) 
[![Offline](https://img.shields.io/badge/Offline-Capable-blue.svg)](.)
[![Version](https://img.shields.io/badge/Version-1.0.0-purple.svg)](.)

## ✨ Features

- 📚 **157 atajos** organizados por categoría
- 🔍 **Búsqueda inteligente** con filtros avanzados
- 🎯 **Quiz interactivo** para practicar
- ⭐ **Favoritos** con export/import
- 📊 **Estadísticas** de aprendizaje
- ⚙️ **Customizable** (tema, vista, preferencias)
- 📱 **Responsive** (móvil + desktop)
- 🔌 **Offline-first** PWA
- ♿ **Accesible** (ARIA, keyboard navigation)

## 🚀 Quick Start

### Online
Visita: [https://tu-dominio.com/blender-shortcuts](#) _(reemplazar con tu URL)_

### Instalar como App

**Desktop (Chrome/Edge):**
1. Click en el icono ➕ en la barra de direcciones
2. O: Menú → "Instalar Blender Shortcuts"

**Mobile (iOS Safari):**
1. Tap Share → "Add to Home Screen"

**Mobile (Android Chrome):**
1. Menú → "Add to Home Screen"

## 🎓 Cómo Usar

### Búsqueda y Filtros
- Busca por nombre de acción o tecla
- Filtra por categoría, dificultad, contexto, workflow
- Toggle "Solo favoritos"
- Cambia entre vista Tabla y Cards

### Modo Quiz
1. Click botón **Quiz** en header
2. Responde 10 preguntas de opción múltiple
3. Ve tu score y estadísticas
4. ¡Repite para mejorar!

### Estadísticas
- Track de progreso de aprendizaje
- Histórico de quizzes
- Atajos más copiados
- Racha de días consecutivos

### Atajos de Teclado
- `/` → Focus en búsqueda
- `Ctrl+K` → Quick search
- `ESC` → Limpiar búsqueda
- `↑` `↓` → Navegar con teclado
- `?` → Mostrar ayuda

## 🛠️ Tech Stack

### Frontend
- **Vanilla JavaScript** (ES6+)
- **CSS3** (Grid, Flexbox, Custom Properties)
- **HTML5 Semantic**

### PWA
- **Service Worker** API (offline caching)
- **Web App Manifest**
- **LocalStorage** API

### Features
- **No frameworks** - Zero dependencies
- **No build step** - Directo al browser
- **Lighthouse 100** - Performance optimizada

## 📂 Estructura del Proyecto

```
BLENDER-TOOL/
├── index.html
├── manifest.json
├── sw.js
├── css/
│   ├── styles.css        # Estilos base + tema
│   ├── responsive.css    # Media queries móvil
│   ├── features.css      # Toast, modal, quiz
│   └── polish.css        # Stats, settings, tooltips
├── js/
│   ├── app_data.js       # 157 shortcuts data
│   ├── stats.js          # Statistics tracking
│   ├── settings.js       # User preferences
│   └── app.js            # Main application logic
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## 🎨 Features Detalladas

### 1. Búsqueda Avanzada
- Búsqueda en tiempo real (debounced)
- Múltiples filtros simultáneos
- Contador de resultados
- State persistence (localStorage)

### 2. Vista Dual
- **Tabla**: Información densa, sorteable
- **Cards**: Mobile-friendly, visual

### 3. Quiz Interactivo
- 10 preguntas aleatorias
- 4 opciones múltiple
- Feedback inmediato (✓/✗)
- Score tracking
- Estadísticas detalladas

### 4. Gestión de Favoritos
- Toggle favorito (★)
- Export como JSON
- Import con merge/replace
- Persistencia local

### 5. Estadísticas
- Quizzes completados
- Precisión promedio
- Top shortcuts copiados
- Racha de días
- Historial visual

### 6. Configuración
- Tema (light/dark/auto)
- Vista por defecto
- Número de preguntas quiz
- Tamaño de fuente
- Reducir animaciones

## 🔧 Development

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP local (opcional, para development)

### Desarrollo Local

```bash
# Opción 1: Python server
python -m http.server 8000

# Opción 2: Node.js http-server
npx http-server

# Opción 3: VSCode Live Server extension
```

Abre: `http://localhost:8000`

### Modificar Data

Edita `js/app_data.js`:

```javascript
{
    id: 158,
    shortcut: "Ctrl+N",
    action: "New File",
    category: "file",
    difficulty: "beginner",
    context: "general",
    workflow: "basic",
    notes: "Creates a new Blender file",
    relatedShortcuts: [1, 5, 12]
}
```

### Personalizar Tema

Edita variables CSS en `css/styles.css`:

```css
:root {
    --accent: #6366f1;           /* Color principal */
    --bg-primary: #0f172a;       /* Fondo principal */
    --text-primary: #f1f5f9;     /* Texto principal */
}
```

## 📊 Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse PWA**: 100
- **Lighthouse Performance**: 95+
- **Offline**: ✅ Fully functional

## ♿ Accessibility

- **ARIA Labels**: Completos
- **Keyboard Navigation**: Full support
- **Screen Reader**: Optimizado
- **Focus Indicators**: Visibles
- **Color Contrast**: WCAG AA

## 📝 Changelog

### v1.0.0 - 2026-02-12

**Fase 1: Base**
- 65 atajos iniciales
- Búsqueda y filtros
- Sorting columns
- Tema dark/light
- Copy to clipboard

**Fase 2: Expansión**
- 157 atajos totales
- Metadata rica (difficulty, context, workflow)
- Filtros avanzados
- Related shortcuts

**Fase 3: Responsive + PWA**
- Diseño responsive
- Vista cards móvil
- Service Worker offline
- PWA manifest
- Instalable

**Fase 4: Features Avanzadas**
- Toast notifications
- Modal system
- Quiz interactivo
- Export/Import favoritos
- Related shortcuts modal
- Update notifications

**Fase 5: Polish Final**
- Estadísticas de aprendizaje
- Panel de configuración
- Tooltips
- Keyboard shortcuts
- Loading states
- Accessibility improvements

## 🤝 Contribuir

¿Encontraste un error? ¿Quieres agregar atajos?

1. Abre un issue
2. O envía un PR con tus cambios
3. Sigue el formato de `app_data.js`

## 📄 License

MIT License - Siente libre de usar y modificar este proyecto.

## 🙏 Créditos

- Datos de atajos: Blender Official Documentation
- Iconos: Font Awesome
- Inspiración: Comunidad de Blender

---

**Made with ❤️ for the Blender community**

⭐ Si te resultó útil, dame una estrella!
