// Scalable data structure for Blender shortcuts
// Each shortcut has: id, name, keys, description, and category
const SHORTCUTS_DATA = [
    // General shortcuts
    {
        id: 1,
        name: "Save",
        keys: ["Ctrl", "S"],
        description: "Save the current file",
        category: "General"
    },
    {
        id: 2,
        name: "Save As",
        keys: ["Shift", "Ctrl", "S"],
        description: "Save the current file with a new name",
        category: "General"
    },
    {
        id: 3,
        name: "Open File",
        keys: ["Ctrl", "O"],
        description: "Open an existing Blender file",
        category: "General"
    },
    {
        id: 4,
        name: "New File",
        keys: ["Ctrl", "N"],
        description: "Create a new Blender file",
        category: "General"
    },
    {
        id: 5,
        name: "Quit",
        keys: ["Ctrl", "Q"],
        description: "Exit Blender application",
        category: "General"
    },
    {
        id: 6,
        name: "Undo",
        keys: ["Ctrl", "Z"],
        description: "Undo the last action",
        category: "General"
    },
    {
        id: 7,
        name: "Redo",
        keys: ["Shift", "Ctrl", "Z"],
        description: "Redo the previously undone action",
        category: "General"
    },
    {
        id: 8,
        name: "Search Menu",
        keys: ["F3"],
        description: "Open the search menu to quickly find any command",
        category: "General"
    },

    // Selection shortcuts
    {
        id: 9,
        name: "Select All",
        keys: ["A"],
        description: "Select all objects or elements",
        category: "Selection"
    },
    {
        id: 10,
        name: "Deselect All",
        keys: ["Alt", "A"],
        description: "Deselect all objects or elements",
        category: "Selection"
    },
    {
        id: 11,
        name: "Invert Selection",
        keys: ["Ctrl", "I"],
        description: "Invert the current selection",
        category: "Selection"
    },
    {
        id: 12,
        name: "Select Linked",
        keys: ["L"],
        description: "Select all linked vertices, edges, or faces",
        category: "Selection"
    },
    {
        id: 13,
        name: "Box Select",
        keys: ["B"],
        description: "Select objects or elements with a box selection",
        category: "Selection"
    },
    {
        id: 14,
        name: "Circle Select",
        keys: ["C"],
        description: "Select objects or elements with a circular brush",
        category: "Selection"
    },

    // View and Navigation shortcuts
    {
        id: 15,
        name: "Frame Selected",
        keys: ["Numpad", "."],
        description: "Center the viewport on the selected object",
        category: "View & Navigation"
    },
    {
        id: 16,
        name: "View All",
        keys: ["Home"],
        description: "Frame all objects in the viewport",
        category: "View & Navigation"
    },
    {
        id: 17,
        name: "Front View",
        keys: ["Numpad", "1"],
        description: "Switch to front orthographic view",
        category: "View & Navigation"
    },
    {
        id: 18,
        name: "Right View",
        keys: ["Numpad", "3"],
        description: "Switch to right orthographic view",
        category: "View & Navigation"
    },
    {
        id: 19,
        name: "Top View",
        keys: ["Numpad", "7"],
        description: "Switch to top orthographic view",
        category: "View & Navigation"
    },
    {
        id: 20,
        name: "Camera View",
        keys: ["Numpad", "0"],
        description: "Toggle camera view",
        category: "View & Navigation"
    },
    {
        id: 21,
        name: "Toggle Quad View",
        keys: ["Ctrl", "Alt", "Q"],
        description: "Toggle quad view layout",
        category: "View & Navigation"
    },

    // Transform shortcuts
    {
        id: 22,
        name: "Move",
        keys: ["G"],
        description: "Grab and move the selected object",
        category: "Transform"
    },
    {
        id: 23,
        name: "Rotate",
        keys: ["R"],
        description: "Rotate the selected object",
        category: "Transform"
    },
    {
        id: 24,
        name: "Scale",
        keys: ["S"],
        description: "Scale the selected object",
        category: "Transform"
    },
    {
        id: 25,
        name: "Confirm Transform",
        keys: ["Enter"],
        description: "Confirm the current transformation",
        category: "Transform"
    },
    {
        id: 26,
        name: "Cancel Transform",
        keys: ["Esc"],
        description: "Cancel the current transformation",
        category: "Transform"
    },
    {
        id: 27,
        name: "Proportional Editing",
        keys: ["O"],
        description: "Toggle proportional editing mode",
        category: "Transform"
    },

    // Modeling shortcuts
    {
        id: 28,
        name: "Extrude",
        keys: ["E"],
        description: "Extrude selected faces, edges, or vertices",
        category: "Modeling"
    },
    {
        id: 29,
        name: "Inset Faces",
        keys: ["I"],
        description: "Inset selected faces",
        category: "Modeling"
    },
    {
        id: 30,
        name: "Loop Cut",
        keys: ["Ctrl", "R"],
        description: "Create edge loops in mesh",
        category: "Modeling"
    },
    {
        id: 31,
        name: "Knife Tool",
        keys: ["K"],
        description: "Cut new edges in a mesh",
        category: "Modeling"
    },
    {
        id: 32,
        name: "Merge",
        keys: ["M"],
        description: "Merge selected vertices",
        category: "Modeling"
    },
    {
        id: 33,
        name: "Separate",
        keys: ["P"],
        description: "Separate selected geometry into a new object",
        category: "Modeling"
    },
    {
        id: 34,
        name: "Subdivide",
        keys: ["Right Click", "Subdivide"],
        description: "Subdivide selected edges or faces",
        category: "Modeling"
    },
    {
        id: 35,
        name: "Delete",
        keys: ["X"],
        description: "Delete selected elements with menu options",
        category: "Modeling"
    },

    // Mode switching shortcuts
    {
        id: 36,
        name: "Object Mode",
        keys: ["Ctrl", "Tab"],
        description: "Switch between object modes",
        category: "Modes"
    },
    {
        id: 37,
        name: "Edit Mode",
        keys: ["Tab"],
        description: "Toggle between Object and Edit mode",
        category: "Modes"
    },
    {
        id: 38,
        name: "Sculpt Mode",
        keys: ["Ctrl", "Tab", "Sculpt"],
        description: "Enter sculpt mode for mesh sculpting",
        category: "Modes"
    },

    // Rendering shortcuts
    {
        id: 39,
        name: "Render Image",
        keys: ["F12"],
        description: "Render the current frame",
        category: "Rendering"
    },
    {
        id: 40,
        name: "Render Animation",
        keys: ["Ctrl", "F12"],
        description: "Render the entire animation sequence",
        category: "Rendering"
    },
    {
        id: 41,
        name: "Toggle Viewport Shading",
        keys: ["Z"],
        description: "Open shading menu (Solid, Material, Rendered)",
        category: "Rendering"
    },

    // Animation shortcuts
    {
        id: 42,
        name: "Insert Keyframe",
        keys: ["I"],
        description: "Insert a keyframe for selected property",
        category: "Animation"
    },
    {
        id: 43,
        name: "Play Animation",
        keys: ["Spacebar"],
        description: "Play or pause animation playback",
        category: "Animation"
    },
    {
        id: 44,
        name: "Next Frame",
        keys: ["Right Arrow"],
        description: "Move to the next frame in timeline",
        category: "Animation"
    },
    {
        id: 45,
        name: "Previous Frame",
        keys: ["Left Arrow"],
        description: "Move to the previous frame in timeline",
        category: "Animation"
    },

    // Object operations
    {
        id: 46,
        name: "Duplicate",
        keys: ["Shift", "D"],
        description: "Duplicate selected objects",
        category: "Objects"
    },
    {
        id: 47,
        name: "Link Duplicate",
        keys: ["Alt", "D"],
        description: "Create a linked duplicate of the object",
        category: "Objects"
    },
    {
        id: 48,
        name: "Join Objects",
        keys: ["Ctrl", "J"],
        description: "Join selected objects into one",
        category: "Objects"
    },
    {
        id: 49,
        name: "Parent",
        keys: ["Ctrl", "P"],
        description: "Make selected object parent of others",
        category: "Objects"
    },
    {
        id: 50,
        name: "Clear Parent",
        keys: ["Alt", "P"],
        description: "Clear parent relationship",
        category: "Objects"
    },

    // Modifiers and operators
    {
        id: 51,
        name: "Add Modifier",
        keys: ["Ctrl", "A"],
        description: "Apply transformation to object",
        category: "Modifiers"
    },
    {
        id: 52,
        name: "Shade Smooth",
        keys: ["Right Click", "Shade Smooth"],
        description: "Apply smooth shading to object",
        category: "Modifiers"
    },
    {
        id: 53,
        name: "Shade Flat",
        keys: ["Right Click", "Shade Flat"],
        description: "Apply flat shading to object",
        category: "Modifiers"
    },

    // Materials and textures
    {
        id: 54,
        name: "New Material",
        keys: ["Shift", "A", "Material"],
        description: "Add a new material to the object",
        category: "Materials"
    },

    // UV Editing
    {
        id: 55,
        name: "Unwrap",
        keys: ["U"],
        description: "Unwrap selected faces for UV mapping",
        category: "UV Editing"
    },
    {
        id: 56,
        name: "Smart UV Project",
        keys: ["U", "Smart UV Project"],
        description: "Automatically create UV layout",
        category: "UV Editing"
    },

    // Preferences and UI
    {
        id: 57,
        name: "Preferences",
        keys: ["Edit", "Preferences"],
        description: "Open Blender preferences",
        category: "UI"
    },
    {
        id: 58,
        name: "Toggle Fullscreen",
        keys: ["Ctrl", "Spacebar"],
        description: "Toggle fullscreen area",
        category: "UI"
    },
    {
        id: 59,
        name: "Toggle Sidebar",
        keys: ["N"],
        description: "Toggle the properties sidebar",
        category: "UI"
    },
    {
        id: 60,
        name: "Toggle Tool Shelf",
        keys: ["T"],
        description: "Toggle the tool shelf",
        category: "UI"
    }
];

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHORTCUTS_DATA;
}
