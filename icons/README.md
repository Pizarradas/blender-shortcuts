# PWA Icons

Esta carpeta debe contener los iconos para la Progressive Web App.

## Iconos Requeridos

1. **icon-192.png** (192x192 píxeles)
2. **icon-512.png** (512x512 píxeles)

## Diseño Sugerido

- **Fondo**: Gradiente moderno de púrpura (#6c5ce7) a índigo (#5b4fcc)
- **Icono**: Símbolo de teclado ⌨️ o letra "B" estilizada en blanco
- **Estilo**: Flat, minimalista, profesional
- **Esquinas**: Redondeadas apropiadas para PWA
- **Alto contraste**: Para buena visibilidad

## Herramientas para Generar Iconos

### Opción 1: Generadores Online
- [Favicon.io](https://favicon.io/) - Generador simple de iconos
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) - PWABuilder
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Generador completo

### Opción 2: Diseño Manual
1. Crear diseño en Figma, Photoshop o Illustrator
2. Exportar como PNG:
   - 192x192px (icon-192.png)
   - 512x512px (icon-512.png)

### Opción 3: Placeholder Rápido
Si solo quieres probar rápido, puedes usar un icono simple:
1. Ir a [Emoji to PNG](https://emojitopng.com/)
2. Descargar emoji ⌨️ en tamaño 512x512
3. Redimensionar a 192x192 para el segundo icono

## Colocación de Archivos

Coloca los archivos en esta carpeta:
```
BLENDER-TOOL/
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

Los archivos ya están referenciados en:
- `manifest.json`
- `index.html` (apple-touch-icon)
