# Blender Keyboard Shortcuts

Interactive reference of Blender keyboard shortcuts built with HTML, CSS and JavaScript. Searchable, filterable and optimized as a quick-access tool for 3D artists and learners.

## Features

- **🔍 Real-time Search**: Quickly find shortcuts by name, description, or key combination
- **📂 Category Filtering**: Filter by 14 categories (General, Modeling, Animation, etc.)
- **♿ Fully Accessible**: WCAG compliant with ARIA labels, keyboard navigation, and screen reader support
- **📱 Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **⚡ High Performance**: Optimized with debouncing and efficient DOM rendering
- **🎨 Clean UI**: Modern card-based design with Blender's signature orange color scheme

## Getting Started

Simply open `index.html` in any modern web browser. No build process or dependencies required!

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Pizarradas/blender-shortcuts.git
   cd blender-shortcuts
   ```

2. Open with a local server (optional but recommended):
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js
   npx http-server
   ```

3. Navigate to `http://localhost:8080` in your browser

## Usage

- **Search**: Type in the search box to filter shortcuts by name or description
- **Filter by Category**: Use the dropdown to show only shortcuts from a specific category
- **Keyboard Shortcut**: Press `Ctrl+F` to quickly focus the search box
- **Navigate**: Use Tab key to navigate through cards and Enter to interact

## Project Structure

```
blender-shortcuts/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── shortcuts-data.js   # Shortcut data in scalable JSON format
├── app.js             # Application logic and interactions
└── README.md          # Project documentation
```

## Shortcut Categories

- General
- Selection
- View & Navigation
- Transform
- Modeling
- Modes
- Rendering
- Animation
- Objects
- Modifiers
- Materials
- UV Editing
- UI

## Adding New Shortcuts

To add new shortcuts, edit `shortcuts-data.js` and add entries to the `SHORTCUTS_DATA` array:

```javascript
{
    id: 61,
    name: "Your Shortcut Name",
    keys: ["Ctrl", "Shift", "A"],
    description: "Description of what the shortcut does",
    category: "Category Name"
}
```

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Accessibility

This project follows web accessibility best practices:
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Screen reader announcements
- Reduced motion support

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.
