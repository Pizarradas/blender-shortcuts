// ============================================
// BLENDER SHORTCUTS V2 - VANILLA JAVASCRIPT  
// ============================================

// ===== DATA =====
const SHORTCUTS = [
    // TRANSFORMACIÓN
    {
        id: "move", category: "transform", shortcut: "G",
        action: "Mover", action_en: "Move",
        notes: "Desplaza la selección. Combina con X/Y/Z para restringir eje", notes_en: "Moves the selection. Combine with X/Y/Z to constrain axis",
        tips: "Presiona G dos veces para edge/face slide. Usa MMB para restricción de plano", tips_en: "Press G twice for edge/face slide. Use MMB for plane constraint",
        useCases: ["Posicionar objetos", "Ajustar geometría", "Animación de movimiento"], useCases_en: ["Positioning objects", "Adjusting geometry", "Movement animation"],
        difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling", "animation"], relatedShortcuts: ["rotate", "scale"], version: "3.0+", since: "2.80", tags: ["essential", "frequently_used", "transform", "beginner-friendly"], media: { type: "image", url: "./assets/previews/move.svg", alt: "Esquema de Mover" }
    },
    {
        id: "rotate", category: "transform", shortcut: "R",
        action: "Rotar", action_en: "Rotate",
        notes: "Gira la selección. Presiona dos veces el eje para rotación trackball", notes_en: "Rotates the selection. Press axis twice for trackball rotation",
        tips: "Escribe valores numéricos para rotación exacta (ej: R 90 = 90 grados)", tips_en: "Type numbers for exact rotation (ex: R 90 = 90 degrees)",
        useCases: ["Orientar objetos", "Ajustar vista", "Crear variaciones"], useCases_en: ["Orienting objects", "Adjusting view", "Creating variations"],
        difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling", "animation"], relatedShortcuts: ["move", "scale"], version: "3.0+", since: "2.80", tags: ["essential", "frequently_used", "transform", "beginner-friendly"], media: { type: "image", url: "./assets/previews/rotate.svg", alt: "Esquema de Rotar" }
    },
    {
        id: "scale", category: "transform", shortcut: "S",
        action: "Escalar", action_en: "Scale",
        notes: "Escala la selección. Shift+Z escala en plano XY", notes_en: "Scales the selection. Shift+Z scales on XY plane",
        tips: "S + 0 = aplana al eje actual. S + número negativo = invierte", tips_en: "S + 0 = flattens to current axis. S + negative number = inverts",
        useCases: ["Redimensionar objetos", "Crear simetría inversa", "Ajustar proporciones"], useCases_en: ["Resizing objects", "Creating inverse symmetry", "Adjusting proportions"],
        difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling", "animation"], relatedShortcuts: ["move", "rotate"], version: "3.0+", since: "2.80", tags: ["essential", "frequently_used", "transform", "beginner-friendly"], media: { type: "image", url: "./assets/previews/scale.svg", alt: "Esquema de Escalar" }
    },
    {
        id: "extrude", category: "transform", shortcut: "E",
        action: "Extruir", action_en: "Extrude",
        notes: "Crea nueva geometría conectada. Alt+E para menú de extrusión", notes_en: "Creates new connected geometry. Alt+E for extrusion menu",
        tips: "E + S escala inmediatamente tras extruir. E + click derecho cancela movimiento pero mantiene geometría", tips_en: "E + S scales immediately after extruding. E + right click cancels movement but keeps geometry",
        useCases: ["Crear volumen desde caras", "Modelado arquitectónico", "Añadir detalles"], useCases_en: ["Creating volume from faces", "Architectural modeling", "Adding details"],
        difficulty: "beginner", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["inset", "loop_cut"], version: "3.0+", since: "2.80", tags: ["essential", "modeling", "geometry-creation", "beginner-friendly"], media: { type: "image", url: "./assets/previews/extrude.svg", alt: "Esquema de Extrusión" }
    },

    // NEW IN 4.0 EXAMPLES
    {
        id: "snap_base", category: "transform", shortcut: "B",
        action: "Snap Base", action_en: "Snap Base",
        notes: "Define punto base para snap durante transformación (G/R/S)", notes_en: "Defines base point for snap during transform (G/R/S)",
        tips: "Presiona B mientras mueves (G) para elegir desde dónde hacer snap", tips_en: "Press B while moving (G) to choose where to snap from",
        useCases: ["Alineación precisa", "Arquitectura", "Ensamblaje mecánico"], useCases_en: ["Precise alignment", "Architecture", "Mechanical assembly"],
        difficulty: "intermediate", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["move"], version: "4.0", since: "4.0", isNew: true, tags: ["precision", "new-4.0"]
    },
    {
        id: "collection_ops", category: "interface", shortcut: "M",
        action: "Mover a colección", action_en: "Move to Collection",
        notes: "Mueve objetos a una colección nueva o existente", notes_en: "Moves objects to a new or existing collection",
        difficulty: "beginner", context: ["object_mode"], workflow: ["general"], relatedShortcuts: [], version: "2.8+", since: "2.80", tags: ["organization"]
    },
    {
        id: "shrink_fatten", category: "transform", shortcut: "Alt + S",
        action: "Shrink/Fatten", action_en: "Shrink/Fatten",
        notes: "Empuja/tira según normales. Útil para dar grosor", notes_en: "Pushes/pulls along normals. Useful for thickness",
        tips: "Combina con O (proportional editing) para transiciones suaves", tips_en: "Combine with O (proportional editing) for smooth transitions",
        useCases: ["Dar grosor a superficies", "Crear deformaciones orgánicas", "Ajustar modelos"], useCases_en: ["Giving thickness", "Organic deformations", "Adjusting models"],
        difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["extrude"], version: "3.0+", tags: ["modeling", "transform", "organic"]
    },
    {
        id: "duplicate", category: "transform", shortcut: "Shift + D",
        action: "Duplicar", action_en: "Duplicate",
        notes: "Duplica la selección y entra en modo mover", notes_en: "Duplicates the selection and enters move mode",
        tips: "Alt + D crea linked duplicate (comparte mesh data)", tips_en: "Alt + D creates linked duplicate (shares mesh data)",
        useCases: ["Crear copias de objetos", "Repetir elementos", "Modelado simétrico"], useCases_en: ["Creating copies", "Repeating elements", "Symmetrical modeling"],
        difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["move"], version: "3.0+", tags: ["essential", "productivity", "beginner-friendly"], media: { type: "image", url: "./assets/previews/duplicate.svg", alt: "Esquema de Duplicar" }
    },
    {
        id: "mirror", category: "transform", shortcut: "Ctrl + M",
        action: "Mirror", action_en: "Mirror",
        notes: "Refleja la geometría. Presiona X/Y/Z para el eje", notes_en: "Mirrors geometry. Press X/Y/Z for axis",
        tips: "Útil combinado con modo edición proporcional para simetría perfecta", tips_en: "Useful combined with proportional editing for perfect symmetry",
        useCases: ["Modelado simétrico", "Invertir geometría", "Crear patrones espejo"], useCases_en: ["Symmetrical modeling", "Inverting geometry", "Mirror patterns"],
        difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["duplicate"], version: "3.0+", tags: ["modeling", "symmetry", "transform"]
    },

    // SELECCIÓN
    { id: "sel_modes", category: "selection", shortcut: "1 / 2 / 3", action: "Modo selección", notes: "Vértice / Arista / Cara. Shift+Click para múltiples", tips: "Shift+1/2/3 para combinar modos de selección simultáneamente", useCases: ["Cambiar contexto de edición", "Trabajar con diferentes elementos", "Selección híbrida"], difficulty: "beginner", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "selection", "beginner-friendly"] },
    { id: "select_all", category: "selection", shortcut: "A", action: "Seleccionar todo", notes: "Selecciona toda la geometría visible", tips: "Presiona A dos veces para deseleccionar todo", useCases: ["Seleccionar mesh completo", "Aplicar operaciones globales", "Reset de selección"], difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["deselect_all", "invert_selection"], version: "3.0+", tags: ["essential", "frequently_used", "selection", "beginner-friendly"], media: { type: "image", url: "./assets/previews/select_all.svg", alt: "Esquema de Select All" } },
    { id: "deselect_all", category: "selection", shortcut: "Alt + A", action: "Deseleccionar todo", notes: "Quita toda la selección actual", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["select_all"], version: "3.0+", tags: ["essential"] },
    { id: "invert_selection", category: "selection", shortcut: "Ctrl + I", action: "Invertir selección", notes: "Selecciona lo no seleccionado y viceversa", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["select_all"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/selection_invert.svg", alt: "Esquema de Invert Selection" } },
    { id: "box_select", category: "selection", shortcut: "B", action: "Selección caja", notes: "Selección rectangular. Click derecho para deseleccionar", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["circle_select", "lasso_select"], version: "3.0+", tags: ["frequently_used"], media: { type: "image", url: "./assets/previews/box_select.svg", alt: "Esquema de Selección de Caja" } },
    { id: "circle_select", category: "selection", shortcut: "C", action: "Selección circular", notes: "Selección por pincel. Rueda para tamaño", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["box_select"], version: "3.0+", tags: ["frequently_used"], media: { type: "image", url: "./assets/previews/circle_select.svg", alt: "Esquema de Selección Circular" } },
    { id: "edge_loop", category: "selection", shortcut: "Alt + Click", action: "Edge Loop", notes: "Selecciona bucle de aristas completo", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling", "retopo"], relatedShortcuts: ["edge_ring"], version: "3.0+", tags: ["useful", "topology"] },
    { id: "lasso_select", category: "selection", shortcut: "Ctrl + Right Click (drag)", action: "Lasso Select", notes: "Selección a mano alzada", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["box_select", "circle_select"], version: "3.0+", tags: ["useful"] },
    { id: "select_linked", category: "selection", shortcut: "L", action: "Select Linked", notes: "Selecciona geometría conectada", difficulty: "beginner", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["select_all"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/selection_linked.svg", alt: "Esquema de Select Linked" } },
    { id: "select_more", category: "selection", shortcut: "Ctrl + Numpad +", action: "Select More", notes: "Expande la selección", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["select_less"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/selection_more.svg", alt: "Esquema de Select More" } },
    { id: "select_less", category: "selection", shortcut: "Ctrl + Numpad -", action: "Select Less", notes: "Reduce la selección", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["select_more"], version: "3.0+", tags: ["useful"] },

    // TOPOLOGÍA
    { id: "loop_cut", category: "topology", shortcut: "Ctrl + R", action: "Loop Cut", notes: "Añade corte en loop. Rueda para múltiples cortes", tips: "Mueve el ratón antes de confirmar para deslizar el loop. E para posicionamiento exacto", useCases: ["Añadir subdivisión controlada", "Preparar para retopología", "Crear edge flows"], difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling", "retopo"], relatedShortcuts: ["knife", "inset"], version: "3.0+", tags: ["essential", "frequently_used", "topology", "edge-flow"], media: { type: "image", url: "./assets/previews/loop_cut.svg", alt: "Esquema de Loop Cut" } },
    { id: "knife", category: "topology", shortcut: "K", action: "Knife", notes: "Corte manual. C para corte a través, Z para corte recto", tips: "Presiona Enter para confirmar, Esc para cancelar. A para corte de ángulo", useCases: ["Cortes precisos custom", "División no uniforme", "Retopología manual"], difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling", "retopo"], relatedShortcuts: ["loop_cut"], version: "3.0+", tags: ["topology", "advanced", "precision"], media: { type: "image", url: "./assets/previews/knife.svg", alt: "Esquema de Knife Tool" } },
    { id: "inset", category: "topology", shortcut: "I", action: "Inset", notes: "Crea cara interna. O para individual, B para boundary", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["extrude", "bevel_edges"], version: "3.0+", tags: ["topology", "frequently_used"], media: { type: "image", url: "./assets/previews/inset.svg", alt: "Esquema de Inset" } },
    { id: "bevel_edges", category: "topology", shortcut: "Ctrl + B", action: "Bisel (aristas)", notes: "Redondea aristas. Rueda para segmentos, P para perfil", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["bevel_vertices", "inset"], version: "3.0+", tags: ["topology", "frequently_used"], media: { type: "image", url: "./assets/previews/bevel.svg", alt: "Esquema de Bisel" } },
    { id: "bevel_vertices", category: "topology", shortcut: "Ctrl + Shift + B", action: "Bisel (vértices)", notes: "Redondea vértices seleccionados", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["bevel_edges"], version: "3.0+", tags: ["topology"] },
    { id: "make_face", category: "topology", shortcut: "F", action: "Crear cara", notes: "Genera cara desde selección. Auto-rellena huecos", difficulty: "beginner", context: ["edit_mode"], workflow: ["modeling", "retopo"], relatedShortcuts: ["grid_fill"], version: "3.0+", tags: ["essential", "topology"], media: { type: "image", url: "./assets/previews/topology_make_face.svg", alt: "Esquema de Make Face" } },
    { id: "edge_slide", category: "topology", shortcut: "G + G", action: "Edge Slide", notes: "Desliza arista a lo largo de sus conexiones", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling", "retopo"], relatedShortcuts: ["vertex_slide"], version: "3.0+", tags: ["topology"] },
    { id: "subdivide", category: "topology", shortcut: "Right Click → Subdivide", action: "Subdivide", notes: "Subdivide la geometría seleccionada", difficulty: "beginner", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["loop_cut"], version: "3.0+", tags: ["topology"], media: { type: "image", url: "./assets/previews/topology_subdivide.svg", alt: "Esquema de Subdivide" } },

    // NAVEGACIÓN
    { id: "middle_mouse", category: "navigation", shortcut: "MMB (drag)", action: "Rotar vista", notes: "Arrastra con botón central para orbitar la cámara", tips: "Sin ratón de 3 botones: activa 'Emulate 3 Button Mouse' en preferencias", useCases: ["Inspeccionar modelo", "Cambiar perspectiva", "Navegar escena"], difficulty: "beginner", context: ["any"], workflow: ["modeling", "sculpting", "animation"], relatedShortcuts: ["shift_mmb"], version: "3.0+", tags: ["essential", "frequently_used", "navigation", "beginner-friendly"], media: { type: "image", url: "./assets/previews/view_orbit.svg", alt: "Esquema de Orbitar" } },
    { id: "shift_mmb", category: "navigation", shortcut: "Shift + MMB", action: "Pan vista", notes: "Desplaza la vista lateralmente", tips: "Combina con Ctrl+MMB para zoom en lugar de scroll", useCases: ["Reencuadrar vista", "Ajustar composición", "Navegar áreas grandes"], difficulty: "beginner", context: ["any"], workflow: ["modeling", "sculpting", "animation"], relatedShortcuts: ["middle_mouse"], version: "3.0+", tags: ["essential", "frequently_used", "navigation", "beginner-friendly"], media: { type: "image", url: "./assets/previews/view_pan.svg", alt: "Esquema de Pan" } },
    { id: "scroll", category: "navigation", shortcut: "Scroll", action: "Zoom", notes: "Rueda del ratón para acercar/alejar", difficulty: "beginner", context: ["any"], workflow: ["modeling", "sculpting", "animation"], relatedShortcuts: ["middle_mouse"], version: "3.0+", tags: ["essential", "frequently_used"], media: { type: "image", url: "./assets/previews/view_zoom.svg", alt: "Esquema de Zoom" } },
    { id: "numpad_view", category: "navigation", shortcut: "Numpad 1/3/7", action: "Vistas ortográficas", notes: "Frontal / Lateral / Superior", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation"], relatedShortcuts: ["camera_view"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/view_numpad_gizmo.svg", alt: "Esquema de Vistas Ortográficas" } },
    { id: "focus", category: "navigation", shortcut: "Numpad .", action: "Frame Selected", notes: "Encuadra la selección en la vista", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation"], relatedShortcuts: ["frame_all"], version: "3.0+", tags: ["frequently_used"], media: { type: "image", url: "./assets/previews/view_frame_selected.svg", alt: "Esquema de Frame Selected" } },
    { id: "frame_all", category: "navigation", shortcut: "Home", action: "Frame All", notes: "Encuadra todos los objetos en la vista", difficulty: "beginner", context: ["any"], workflow: ["modeling"], relatedShortcuts: ["focus"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/view_frame_all.svg", alt: "Esquema de Frame All" } },
    { id: "toggle_quad_view", category: "navigation", shortcut: "Ctrl + Alt + Q", action: "Toggle Quad View", notes: "Activa/desactiva vista dividida en 4", difficulty: "intermediate", context: ["any"], workflow: ["modeling"], relatedShortcuts: [], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/view_quad.svg", alt: "Esquema de Quad View" } },
    { id: "local_view", category: "navigation", shortcut: "Numpad /", action: "Local View", notes: "Aísla la selección en la vista", difficulty: "intermediate", context: ["any"], workflow: ["modeling"], relatedShortcuts: [], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/view_local.svg", alt: "Esquema de Local View" } },

    // MODELADO AVANZADO
    { id: "proportional", category: "modeling", shortcut: "O", action: "Proporcional Edit", notes: "Activa/desactiva edición proporcional", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: [], version: "3.0+", tags: ["advanced"], media: { type: "image", url: "./assets/previews/modeling_proportional.svg", alt: "Esquema de Proportional Edit" } },
    { id: "merge", category: "modeling", shortcut: "M", action: "Merge", notes: "Fusiona vértices. At Center, At First, At Last, etc.", difficulty: "beginner", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["remove_doubles"], version: "3.0+", tags: ["frequently_used"], media: { type: "image", url: "./assets/previews/modeling_merge.svg", alt: "Esquema de Merge" } },
    { id: "dissolve", category: "modeling", shortcut: "X → Dissolve", action: "Dissolve", notes: "Elimina geometría manteniendo la forma", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["delete"], version: "3.0+", tags: ["topology"] },
    { id: "delete", category: "modeling", shortcut: "X", action: "Delete", notes: "Menú de eliminación (Vertices, Edges, Faces, etc.)", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["dissolve"], version: "3.0+", tags: ["essential", "frequently_used"], media: { type: "image", url: "./assets/previews/delete.svg", alt: "Esquema de Menú Borrar" } },
    { id: "separate", category: "modeling", shortcut: "P", action: "Separar", notes: "Convierte selección en objeto independiente", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["join"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/modeling_separate.svg", alt: "Esquema de Separate" } },
    { id: "join", category: "modeling", shortcut: "Ctrl + J", action: "Join Objects", notes: "Une objetos seleccionados en uno solo", difficulty: "beginner", context: ["object_mode", "modeling"], workflow: ["modeling"], relatedShortcuts: ["separate"], version: "3.0+", tags: ["frequently_used"], media: { type: "image", url: "./assets/previews/modeling_join.svg", alt: "Esquema de Join" } },
    { id: "shade_smooth", category: "modeling", shortcut: "Right Click → Shade Smooth", action: "Shade Smooth", notes: "Suaviza el sombreado del objeto", difficulty: "beginner", context: ["object_mode"], workflow: ["modeling"], relatedShortcuts: ["shade_flat"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/modeling_shade_smooth.svg", alt: "Esquema de Shade Smooth" } },
    { id: "recalc_normals", category: "modeling", shortcut: "Shift + N", action: "Recalcular Normales", notes: "Recalcula dirección de normales hacia fuera", difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["flip_normals"], version: "3.0+", tags: ["useful"] },
    { id: "origin_to_geometry", category: "modeling", shortcut: "Right Click → Set Origin → Origin to Geometry", action: "Origin to Geometry", notes: "Centra el origen en la geometría", difficulty: "beginner", context: ["object_mode"], workflow: ["modeling"], relatedShortcuts: [], version: "3.0+", tags: ["useful"] },
    { id: "snap_cursor_to_selected", category: "modeling", shortcut: "Shift + S → Cursor to Selected", action: "Cursor to Selected", notes: "Mueve el cursor 3D a la selección", difficulty: "beginner", context: ["object_mode", "edit_mode"], workflow: ["modeling"], relatedShortcuts: ["snap_selected_to_cursor"], version: "3.0+", tags: ["useful"] },

    // SCULPTING
    { id: "sculpt_f", category: "sculpting", shortcut: "F", action: "Tamaño brush", notes: "Ajusta el tamaño del pincel", difficulty: "beginner", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: ["sculpt_shift_f"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "sculpt_shift_f", category: "sculpting", shortcut: "Shift + F", action: "Fuerza brush", notes: "Ajusta la fuerza del pincel", difficulty: "beginner", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: ["sculpt_f"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "sculpt_smooth", category: "sculpting", shortcut: "Shift (hold)", action: "Suavizar", notes: "Mantén Shift para suavizar mientras esculpes", difficulty: "beginner", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "sculpt_ctrl", category: "sculpting", shortcut: "Ctrl (hold)", action: "Invertir brush", notes: "Invierte la acción del pincel actual", difficulty: "beginner", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "sculpt_mask", category: "sculpting", shortcut: "M", action: "Mask", notes: "Pinta máscara en la geometría", difficulty: "intermediate", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: ["sculpt_clear_mask"], version: "3.0+", tags: ["useful"] },
    { id: "sculpt_clear_mask", category: "sculpting", shortcut: "Alt + M", action: "Clear Mask", notes: "Limpia toda la máscara", difficulty: "intermediate", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: ["sculpt_mask"], version: "3.0+", tags: ["useful"] },
    { id: "sculpt_hide", category: "sculpting", shortcut: "H", action: "Hide", notes: "Oculta geometría visible en el brush", difficulty: "intermediate", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: ["sculpt_unhide"], version: "3.0+", tags: ["useful"] },
    { id: "sculpt_unhide", category: "sculpting", shortcut: "Alt + H", action: "Unhide All", notes: "Muestra toda la geometría oculta", difficulty: "intermediate", context: ["sculpt_mode"], workflow: ["sculpting"], relatedShortcuts: ["sculpt_hide"], version: "3.0+", tags: ["useful"] },

    // SHADING
    { id: "shader_editor", category: "shading", shortcut: "Shift + A", action: "Add Node", notes: "Añade nodo en Shader Editor", difficulty: "beginner", context: ["shader_editor"], workflow: ["texturing"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "preview", category: "shading", shortcut: "Z", action: "Viewport Shading", notes: "Cambia entre Wireframe/Solid/Material/Rendered", difficulty: "beginner", context: ["any"], workflow: ["modeling", "texturing"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "toggle_x_ray", category: "shading", shortcut: "Alt + Z", action: "Toggle X-Ray", notes: "Activa/desactiva modo X-Ray", difficulty: "beginner", context: ["any"], workflow: ["modeling"], relatedShortcuts: ["preview"], version: "3.0+", tags: ["useful"], media: { type: "image", url: "./assets/previews/shading_xray.svg", alt: "Esquema de X-Ray" } },

    // ANIMATION
    { id: "insert_keyframe", category: "animation", shortcut: "I", action: "Insert Keyframe", notes: "Inserta keyframe en el frame actual", difficulty: "beginner", context: ["object_mode", "pose_mode"], workflow: ["animation"], relatedShortcuts: ["delete_keyframe"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "play", category: "animation", shortcut: "Space", action: "Play/Pause", notes: "Reproduce o pausa la animación", difficulty: "beginner", context: ["any"], workflow: ["animation"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "delete_keyframe", category: "animation", shortcut: "Alt + I", action: "Delete Keyframe", notes: "Elimina keyframe del frame actual", difficulty: "beginner", context: ["object_mode", "pose_mode"], workflow: ["animation"], relatedShortcuts: ["insert_keyframe"], version: "3.0+", tags: ["useful"] },
    { id: "clear_keyframes", category: "animation", shortcut: "Shift + Alt + I", action: "Clear Keyframes", notes: "Elimina todos los keyframes de la propiedad", difficulty: "intermediate", context: ["object_mode", "pose_mode"], workflow: ["animation"], relatedShortcuts: ["delete_keyframe"], version: "3.0+", tags: ["useful"] },
    { id: "next_frame", category: "animation", shortcut: "Right Arrow", action: "Next Frame", notes: "Avanza un frame", difficulty: "beginner", context: ["any"], workflow: ["animation"], relatedShortcuts: ["prev_frame"], version: "3.0+", tags: ["frequently_used"] },
    { id: "prev_frame", category: "animation", shortcut: "Left Arrow", action: "Previous Frame", notes: "Retrocede un frame", difficulty: "beginner", context: ["any"], workflow: ["animation"], relatedShortcuts: ["next_frame"], version: "3.0+", tags: ["frequently_used"] },
    { id: "first_frame", category: "animation", shortcut: "Shift + Left Arrow", action: "First Frame", notes: "Va al primer frame", difficulty: "beginner", context: ["any"], workflow: ["animation"], relatedShortcuts: ["last_frame"], version: "3.0+", tags: ["useful"] },
    { id: "last_frame", category: "animation", shortcut: "Shift + Right Arrow", action: "Last Frame", notes: "Va al último frame", difficulty: "beginner", context: ["any"], workflow: ["animation"], relatedShortcuts: ["first_frame"], version: "3.0+", tags: ["useful"] },

    // UTILIDADES
    { id: "search", category: "utilities", shortcut: "F3", action: "Search", notes: "Buscador de comandos universal", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation", "texturing"], relatedShortcuts: ["quick_favorites"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "quick_favorites", category: "utilities", shortcut: "Q", action: "Quick Favorites", notes: "Acceso rápido a favoritos personales", difficulty: "intermediate", context: ["any"], workflow: ["modeling", "animation"], relatedShortcuts: ["search"], version: "3.0+", tags: ["useful"] },
    { id: "undo", category: "utilities", shortcut: "Ctrl + Z", action: "Deshacer", notes: "Deshace la última acción", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation", "texturing"], relatedShortcuts: ["redo"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "redo", category: "utilities", shortcut: "Ctrl + Shift + Z", action: "Rehacer", notes: "Rehace la acción deshecha", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation", "texturing"], relatedShortcuts: ["undo"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "save", category: "utilities", shortcut: "Ctrl + S", action: "Guardar", notes: "Guarda el archivo actual", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation", "texturing"], relatedShortcuts: ["save_as"], version: "3.0+", tags: ["essential", "frequently_used"] },
    { id: "save_as", category: "utilities", shortcut: "Ctrl + Shift + S", action: "Guardar Como", notes: "Guarda el archivo con un nuevo nombre", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation"], relatedShortcuts: ["save"], version: "3.0+", tags: ["useful"] },
    { id: "open", category: "utilities", shortcut: "Ctrl + O", action: "Abrir", notes: "Abre un archivo existente", difficulty: "beginner", context: ["any"], workflow: ["modeling", "animation"], relatedShortcuts: ["save"], version: "3.0+", tags: ["useful"] },
    { id: "new_file", category: "utilities", shortcut: "Ctrl + N", action: "Nuevo Archivo", notes: "Crea un archivo nuevo", difficulty: "beginner", context: ["any"], workflow: ["modeling"], relatedShortcuts: ["open"], version: "3.0+", tags: ["useful"] },

    // UV EDITING
    { id: "uv_unwrap", category: "uv_editing", shortcut: "U", action: "UV Unwrap Menu", notes: "Menú de opciones de unwrap UV", difficulty: "intermediate", context: ["edit_mode", "uv_editor"], workflow: ["uv_mapping", "texturing"], relatedShortcuts: ["uv_smart_project"], version: "3.0+", tags: ["essential", "uv"] },
    { id: "uv_smart_project", category: "uv_editing", shortcut: "U → Smart UV Project", action: "Smart UV Project", notes: "Unwrap automático inteligente", difficulty: "beginner", context: ["edit_mode"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_unwrap"], version: "3.0+", tags: ["uv", "frequently_used"] },
    { id: "uv_pin", category: "uv_editing", shortcut: "P", action: "Pin UVs", notes: "Fija vértices UV en su posición", difficulty: "intermediate", context: ["uv_editor"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_unpin"], version: "3.0+", tags: ["uv"] },
    { id: "uv_unpin", category: "uv_editing", shortcut: "Alt + P", action: "Unpin UVs", notes: "Libera vértices UV fijados", difficulty: "intermediate", context: ["uv_editor"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_pin"], version: "3.0+", tags: ["uv"] },
    { id: "uv_select_linked", category: "uv_editing", shortcut: "L", action: "Select Linked UVs", notes: "Selecciona UVs conectados", difficulty: "beginner", context: ["uv_editor"], workflow: ["uv_mapping"], relatedShortcuts: ["select_linked"], version: "3.0+", tags: ["uv", "frequently_used"] },
    { id: "uv_stitch", category: "uv_editing", shortcut: "V", action: "Stitch", notes: "Une vértices UV seleccionados", difficulty: "intermediate", context: ["uv_editor"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_weld"], version: "3.0+", tags: ["uv"] },
    { id: "uv_mark_seam", category: "uv_editing", shortcut: "Ctrl + E → Mark Seam", action: "Mark Seam", notes: "Marca aristas como costuras UV", difficulty: "intermediate", context: ["edit_mode"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_clear_seam"], version: "3.0+", tags: ["uv", "frequently_used"] },
    { id: "uv_clear_seam", category: "uv_editing", shortcut: "Ctrl + E → Clear Seam", action: "Clear Seam", notes: "Limpia marcas de costuras UV", difficulty: "intermediate", context: ["edit_mode"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_mark_seam"], version: "3.0+", tags: ["uv"] },
    { id: "uv_split", category: "uv_editing", shortcut: "Y", action: "Split/Rip UVs", notes: "Divide/rompe UVs seleccionados", difficulty: "intermediate", context: ["uv_editor"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_weld"], version: "3.0+", tags: ["uv"] },
    { id: "uv_weld", category: "uv_editing", shortcut: "W", action: "Weld UVs", notes: "Fusiona UVs superpuestos", difficulty: "intermediate", context: ["uv_editor"], workflow: ["uv_mapping"], relatedShortcuts: ["uv_stitch"], version: "3.0+", tags: ["uv"] },

    // RIGGING
    { id: "parent_menu", category: "rigging", shortcut: "Ctrl + P", action: "Parent Menu", notes: "Menú de opciones de parentado", difficulty: "beginner", context: ["object_mode", "pose_mode"], workflow: ["rigging"], relatedShortcuts: ["clear_parent"], version: "3.0+", tags: ["essential", "rigging"] },
    { id: "clear_parent", category: "rigging", shortcut: "Alt + P", action: "Clear Parent", notes: "Elimina relación de parentado", difficulty: "beginner", context: ["object_mode"], workflow: ["rigging"], relatedShortcuts: ["parent_menu"], version: "3.0+", tags: ["rigging"] },
    { id: "toggle_pose_mode", category: "rigging", shortcut: "Ctrl + Tab", action: "Toggle Pose Mode", notes: "Alterna entre Object y Pose Mode", difficulty: "beginner", context: ["object_mode", "pose_mode"], workflow: ["rigging", "animation"], relatedShortcuts: [], version: "3.0+", tags: ["essential", "rigging", "frequently_used"] },
    { id: "clear_transform", category: "rigging", shortcut: "Alt + G/R/S", action: "Clear Transform", notes: "Limpia ubicación/rotación/escala", difficulty: "beginner", context: ["object_mode", "pose_mode"], workflow: ["rigging", "animation"], relatedShortcuts: [], version: "3.0+", tags: ["useful", "rigging"] },
    { id: "copy_pose", category: "rigging", shortcut: "Ctrl + C", action: "Copy Pose", notes: "Copia la pose actual al portapapeles", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging", "animation"], relatedShortcuts: ["paste_pose"], version: "3.0+", tags: ["rigging"] },
    { id: "paste_pose", category: "rigging", shortcut: "Ctrl + V", action: "Paste Pose", notes: "Pega la pose del portapapeles", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging", "animation"], relatedShortcuts: ["copy_pose"], version: "3.0+", tags: ["rigging"] },
    { id: "paste_pose_flipped", category: "rigging", shortcut: "Ctrl + Shift + V", action: "Paste Pose Flipped", notes: "Pega la pose reflejada", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging", "animation"], relatedShortcuts: ["paste_pose"], version: "3.0+", tags: ["rigging"] },
    { id: "create_bone", category: "rigging", shortcut: "E (in Edit Mode)", action: "Extrude Bone", notes: "Extruye y crea nuevo hueso", difficulty: "beginner", context: ["edit_mode"], workflow: ["rigging"], relatedShortcuts: ["subdivide_bone"], version: "3.0+", tags: ["rigging", "frequently_used"] },
    { id: "bone_roll", category: "rigging", shortcut: "Ctrl + R", action: "Bone Roll", notes: "Ajusta el roll del hueso", difficulty: "intermediate", context: ["edit_mode"], workflow: ["rigging"], relatedShortcuts: [], version: "3.0+", tags: ["rigging", "advanced"] },
    { id: "constraint_menu", category: "rigging", shortcut: "Ctrl + Shift + C", action: "Add Constraint", notes: "Menú para agregar constraint", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging"], relatedShortcuts: [], version: "3.0+", tags: ["rigging", "advanced"] },
    { id: "ik_constraint", category: "rigging", shortcut: "Shift + I", action: "IK Constraint", notes: "Agrega constraint de IK", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging"], relatedShortcuts: ["constraint_menu"], version: "3.0+", tags: ["rigging", "advanced"] },
    { id: "weight_paint_mode", category: "rigging", shortcut: "Ctrl + Tab → Weight Paint", action: "Weight Paint Mode", notes: "Entra en modo Weight Paint", difficulty: "intermediate", context: ["object_mode"], workflow: ["rigging"], relatedShortcuts: [], version: "3.0+", tags: ["rigging"] },
    { id: "bone_layers", category: "rigging", shortcut: "M (in Pose Mode)", action: "Move to Bone Layer", notes: "Mueve hueso a capa específica", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging"], relatedShortcuts: [], version: "3.0+", tags: ["rigging", "organization"] },
    { id: "select_hierarchy", category: "rigging", shortcut: "[ or ]", action: "Select Hierarchy", notes: "Selecciona padre/hijo en jerarquía", difficulty: "intermediate", context: ["pose_mode"], workflow: ["rigging", "animation"], relatedShortcuts: [], version: "3.0+", tags: ["rigging", "useful"] },
    { id: "propagate_pose", category: "rigging", shortcut: "Alt + D (in Pose Mode)", action: "Propagate Pose", notes: "Propaga pose a keyframes siguientes", difficulty: "advanced", context: ["pose_mode"], workflow: ["animation"], relatedShortcuts: [], version: "3.0+", tags: ["rigging", "animation", "advanced"] },

    // GREASE PENCIL
    { id: "gp_draw", category: "grease_pencil", shortcut: "D", action: "Draw Mode", notes: "Activa modo de dibujo", difficulty: "beginner", context: ["object_mode"], workflow: ["2d_animation"], relatedShortcuts: ["gp_edit", "gp_sculpt"], version: "3.0+", tags: ["grease_pencil", "essential"] },
    { id: "gp_edit", category: "grease_pencil", shortcut: "Tab", action: "Edit Mode", notes: "Entra en modo edición de Grease Pencil", difficulty: "beginner", context: ["object_mode"], workflow: ["2d_animation"], relatedShortcuts: ["gp_draw"], version: "3.0+", tags: ["grease_pencil", "essential"] },
    { id: "gp_sculpt", category: "grease_pencil", shortcut: "Ctrl + Tab → Sculpt", action: "Sculpt Mode", notes: "Modo de escultura para Grease Pencil", difficulty: "intermediate", context: ["object_mode"], workflow: ["2d_animation"], relatedShortcuts: ["gp_draw"], version: "3.0+", tags: ["grease_pencil"] },
    { id: "gp_duplicate", category: "grease_pencil", shortcut: "Shift + D", action: "Duplicate Stroke", notes: "Duplica el trazo seleccionado", difficulty: "beginner", context: ["edit_mode"], workflow: ["2d_animation"], relatedShortcuts: ["duplicate"], version: "3.0+", tags: ["grease_pencil"] },
    { id: "gp_duplicate_frame", category: "grease_pencil", shortcut: "Ctrl + D", action: "Duplicate Frame", notes: "Duplica el frame actual", difficulty: "intermediate", context: ["draw_mode"], workflow: ["2d_animation"], relatedShortcuts: ["gp_duplicate"], version: "3.0+", tags: ["grease_pencil", "useful"] },
    { id: "gp_next_frame", category: "grease_pencil", shortcut: "Page Up", action: "Next Frame", notes: "Avanza al siguiente keyframe", difficulty: "beginner", context: ["draw_mode"], workflow: ["2d_animation"], relatedShortcuts: ["gp_prev_frame"], version: "3.0+", tags: ["grease_pencil", "frequently_used"] },
    { id: "gp_prev_frame", category: "grease_pencil", shortcut: "Page Down", action: "Previous Frame", notes: "Retrocede al keyframe anterior", difficulty: "beginner", context: ["draw_mode"], workflow: ["2d_animation"], relatedShortcuts: ["gp_next_frame"], version: "3.0+", tags: ["grease_pencil", "frequently_used"] },
    { id: "gp_insert_blank", category: "grease_pencil", shortcut: "Shift + I", action: "Insert Blank Frame", notes: "Inserta frame vacío", difficulty: "intermediate", context: ["draw_mode"], workflow: ["2d_animation"], relatedShortcuts: [], version: "3.0+", tags: ["grease_pencil"] },
    { id: "gp_simplify", category: "grease_pencil", shortcut: "Shift + Alt + S", action: "Simplify Stroke", notes: "Simplifica el trazo seleccionado", difficulty: "intermediate", context: ["edit_mode"], workflow: ["2d_animation"], relatedShortcuts: [], version: "3.0+", tags: ["grease_pencil", "optimization"] },
    { id: "gp_join", category: "grease_pencil", shortcut: "Ctrl + J", action: "Join Strokes", notes: "Une trazos seleccionados", difficulty: "intermediate", context: ["edit_mode"], workflow: ["2d_animation"], relatedShortcuts: ["join"], version: "3.0+", tags: ["grease_pencil"] },

    // MODIFIERS
    { id: "apply_modifier", category: "modifiers", shortcut: "Ctrl + A → Apply Modifier", action: "Apply Modifier", notes: "Aplica el modificador seleccionado", difficulty: "beginner", context: ["object_mode"], workflow: ["modeling"], relatedShortcuts: ["apply_all_modifiers"], version: "3.0+", tags: ["modifiers", "frequently_used"] },
    { id: "apply_all_modifiers", category: "modifiers", shortcut: "Ctrl + A → Visual Transform", action: "Apply All Modifiers", notes: "Aplica todos los modificadores del objeto", difficulty: "intermediate", context: ["object_mode"], workflow: ["modeling"], relatedShortcuts: ["apply_modifier"], version: "3.0+", tags: ["modifiers"] },
    { id: "duplicate_modifier", category: "modifiers", shortcut: "Shift + D (on modifier)", action: "Duplicate Modifier", notes: "Duplica el modificador", difficulty: "beginner", context: ["object_mode"], workflow: ["modeling"], relatedShortcuts: [], version: "3.0+", tags: ["modifiers"] },

    // CAMERA & RENDER
    { id: "camera_view", category: "camera_render", shortcut: "Numpad 0", action: "Camera View", notes: "Cambia a vista de cámara", difficulty: "beginner", context: ["any"], workflow: ["rendering"], relatedShortcuts: ["set_camera_to_view"], version: "3.0+", tags: ["essential", "frequently_used", "camera"] },
    { id: "set_camera_to_view", category: "camera_render", shortcut: "Ctrl + Alt + Numpad 0", action: "Set Camera to View", notes: "Mueve la cámara a la vista actual", difficulty: "intermediate", context: ["any"], workflow: ["rendering"], relatedShortcuts: ["camera_view"], version: "3.0+", tags: ["camera", "useful"] },
    { id: "align_camera_to_view", category: "camera_render", shortcut: "Ctrl + Numpad 0", action: "Align Camera to View", notes: "Alinea la cámara con la vista actual", difficulty: "intermediate", context: ["any"], workflow: ["rendering"], relatedShortcuts: ["camera_view"], version: "3.0+", tags: ["camera"] },
    { id: "render_image", category: "camera_render", shortcut: "F12", action: "Render Image", notes: "Renderiza la imagen actual", difficulty: "beginner", context: ["any"], workflow: ["rendering"], relatedShortcuts: ["render_animation"], version: "3.0+", tags: ["essential", "frequently_used", "render"] },
    { id: "render_animation", category: "camera_render", shortcut: "Ctrl + F12", action: "Render Animation", notes: "Renderiza toda la animación", difficulty: "beginner", context: ["any"], workflow: ["rendering", "animation"], relatedShortcuts: ["render_image"], version: "3.0+", tags: ["render", "frequently_used"] },
    { id: "show_render", category: "camera_render", shortcut: "F11", action: "Show Last Render", notes: "Muestra el último render", difficulty: "beginner", context: ["any"], workflow: ["rendering"], relatedShortcuts: ["render_image"], version: "3.0+", tags: ["render", "useful"] },
    { id: "cancel_render", category: "camera_render", shortcut: "Esc", action: "Cancel Render", notes: "Cancela el render en progreso", difficulty: "beginner", context: ["render_window"], workflow: ["rendering"], relatedShortcuts: ["render_image"], version: "3.0+", tags: ["render"] },
    { id: "render_region", category: "camera_render", shortcut: "Ctrl + B", action: "Set Render Border", notes: "Define área de render (border)", difficulty: "intermediate", context: ["camera_view"], workflow: ["rendering"], relatedShortcuts: ["clear_render_border"], version: "3.0+", tags: ["render", "optimization"] },
    { id: "clear_render_border", category: "camera_render", shortcut: "Ctrl + Alt + B", action: "Clear Render Border", notes: "Limpia el área de render", difficulty: "intermediate", context: ["camera_view"], workflow: ["rendering"], relatedShortcuts: ["render_region"], version: "3.0+", tags: ["render"] },

    // TEXT EDITOR
    { id: "run_script", category: "text_editor", shortcut: "Alt + P", action: "Run Script", notes: "Ejecuta el script actual", difficulty: "intermediate", context: ["text_editor"], workflow: ["scripting"], relatedShortcuts: [], version: "3.0+", tags: ["scripting", "essential"] },
    { id: "autocomplete", category: "text_editor", shortcut: "Ctrl + Space", action: "Autocomplete", notes: "Muestra opciones de autocompletado", difficulty: "intermediate", context: ["text_editor"], workflow: ["scripting"], relatedShortcuts: [], version: "3.0+", tags: ["scripting", "useful"] },
    { id: "toggle_docs", category: "text_editor", shortcut: "Ctrl + D", action: "Toggle Documentation", notes: "Muestra/oculta documentación", difficulty: "intermediate", context: ["text_editor"], workflow: ["scripting"], relatedShortcuts: [], version: "3.0+", tags: ["scripting"] },
    { id: "indent", category: "text_editor", shortcut: "Tab", action: "Indent", notes: "Indenta código seleccionado", difficulty: "beginner", context: ["text_editor"], workflow: ["scripting"], relatedShortcuts: ["unindent"], version: "3.0+", tags: ["scripting", "frequently_used"] },
    { id: "unindent", category: "text_editor", shortcut: "Shift + Tab", action: "Unindent", notes: "Reduce indentación", difficulty: "beginner", context: ["text_editor"], workflow: ["scripting"], relatedShortcuts: ["indent"], version: "3.0+", tags: ["scripting", "frequently_used"] },
    { id: "comment_toggle", category: "text_editor", shortcut: "Ctrl + /", action: "Toggle Comment", notes: "Comenta/descomenta líneas", difficulty: "beginner", context: ["text_editor"], workflow: ["scripting"], relatedShortcuts: [], version: "3.0+", tags: ["scripting", "useful"] },

    // NODE EDITOR
    { id: "node_duplicate", category: "node_editor", shortcut: "Shift + D", action: "Duplicate Nodes", notes: "Duplica nodos seleccionados", difficulty: "beginner", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: ["duplicate"], version: "3.0+", tags: ["nodes", "frequently_used"] },
    { id: "node_cut_links", category: "node_editor", shortcut: "Ctrl + Right Click (drag)", action: "Cut Links", notes: "Corta conexiones entre nodos", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: [], version: "3.0+", tags: ["nodes", "useful"] },
    { id: "node_add_reroute", category: "node_editor", shortcut: "Shift + Right Click (on link)", action: "Add Reroute", notes: "Añade punto de reenvío en conexión", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: [], version: "3.0+", tags: ["nodes", "organization"] },
    { id: "node_delete_reconnect", category: "node_editor", shortcut: "Ctrl + X", action: "Delete with Reconnect", notes: "Elimina nodo y reconecta automáticamente", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: ["delete"], version: "3.0+", tags: ["nodes", "useful"] },
    { id: "node_frame", category: "node_editor", shortcut: "Ctrl + J", action: "Join in Frame", notes: "Agrupa nodos en frame", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: [], version: "3.0+", tags: ["nodes", "organization"] },
    { id: "node_parent", category: "node_editor", shortcut: "Ctrl + P", action: "Make Parent", notes: "Hace el nodo padre del frame", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: ["node_detach"], version: "3.0+", tags: ["nodes", "organization"] },
    { id: "node_detach", category: "node_editor", shortcut: "Alt + P", action: "Detach from Frame", notes: "Desvincula nodo del frame", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: ["node_parent"], version: "3.0+", tags: ["nodes"] },
    { id: "node_mute", category: "node_editor", shortcut: "M", action: "Mute/Unmute Node", notes: "Silencia/activa nodo", difficulty: "beginner", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: [], version: "3.0+", tags: ["nodes", "useful"] },
    { id: "node_hide", category: "node_editor", shortcut: "H", action: "Hide/Show Sockets", notes: "Oculta/muestra sockets no conectados", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: [], version: "3.0+", tags: ["nodes", "organization"] },
    { id: "node_preview", category: "node_editor", shortcut: "Shift + Ctrl + Left Click", action: "Connect to Viewer", notes: "Conecta nodo a visor", difficulty: "intermediate", context: ["shader_editor", "compositor"], workflow: ["texturing", "compositing"], relatedShortcuts: [], version: "3.0+", tags: ["nodes", "debugging"] },
    // EXTRA / HIDDEN GEMS
    { id: "edge_crease", category: "modeling", shortcut: "Shift + E", action: "Edge Crease", notes: "Define nitidez de aristas para Subdivision Surface", tips: "Valor 1.0 = arista totalmente dura. Valor 0.0 = suave. Útil para Hard Surface sin loops de soporte", useCases: ["Hard Surface", "Subdivision Modeling", "Controlar suavizado"], difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["subdivide"], version: "3.0+", tags: ["essential", "modeling", "modifiers", "pro_tip"] },
    { id: "repeat_last", category: "utilities", shortcut: "Shift + R", action: "Repeat Last", notes: "Repite la última acción realizada", tips: "Ideal para duplicar transformaciones idénticas o repetir operaciones repetitivas", useCases: ["Duplicado en serie", "Aplicar misma operación múltiple veces"], difficulty: "beginner", context: ["any"], workflow: ["general"], relatedShortcuts: ["undo"], version: "3.0+", tags: ["productivity", "essential", "frequently_used"] },
    { id: "adjust_last_op", category: "utilities", shortcut: "F9", action: "Adjust Last Operation", notes: "Reabre el panel de ajustes de la última operación", tips: "Si hiciste click fuera y perdiste el panel, F9 lo recupera (si no has hecho otra acción)", useCases: ["Ajustar segmentos tras crear cilindro", "Modificar bevel después de aplicar"], difficulty: "intermediate", context: ["any"], workflow: ["general"], relatedShortcuts: [], version: "3.0+", tags: ["productivity", "lifesaver"] },
    { id: "connect_vertex_path", category: "topology", shortcut: "J", action: "Connect Vertex Path", notes: "Conecta vértices cortando la cara (Knife)", tips: "A diferencia de F que crea una arista encima, J corta la geometría existente correctamente", useCases: ["Limpiar topología", "Crear quads", "Resolver n-gons"], difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling", "topology"], relatedShortcuts: ["make_face", "knife"], version: "3.0+", tags: ["topology", "essential", "pro_tip"] },
    { id: "rename_active", category: "utilities", shortcut: "F2", action: "Rename Active", notes: "Renombra el objeto o nodo activo", tips: "Funciona en Outliner, Viewport y Node Editor. Más rápido que buscar en propiedades", useCases: ["Organización de escena", "Nombrar nodos"], difficulty: "beginner", context: ["any"], workflow: ["general", "organization"], relatedShortcuts: [], version: "3.0+", tags: ["productivity", "organization"] },
    { id: "node_wrangler_texture", category: "node_editor", shortcut: "Ctrl + T", action: "Add Texture Setup", notes: "Añade Texture+Mapping+Coord nodes", tips: "Requiere activar addon Node Wrangler. Ahorra 5 pasos manuales", useCases: ["Texturizado rápido", "Setup PBR"], difficulty: "intermediate", context: ["shader_editor"], workflow: ["texturing"], relatedShortcuts: ["node_preview"], version: "3.0+", tags: ["addon", "productivity", "texturing", "pro_tip"] },
    { id: "reset_cursor", category: "navigation", shortcut: "Shift + C", action: "Reset Cursor & Frame All", notes: "Centra cursor 3D y encuadra todo", tips: "La forma más rápida de resetear tu vista y el cursor al origen", useCases: ["Perdido en el espacio", "Empezar de cero"], difficulty: "beginner", context: ["any"], workflow: ["navigation"], relatedShortcuts: ["frame_all"], version: "3.0+", tags: ["navigation", "reset"] },
    { id: "extrude_menu", category: "modeling", shortcut: "Alt + E", action: "Extrude Menu", notes: "Menú avanzado de extrusión", tips: "Accede a Extrude Manifold, Along Normals e Individual Faces", useCases: ["Modelado complejo", "Extrusión manifold"], difficulty: "intermediate", context: ["edit_mode"], workflow: ["modeling"], relatedShortcuts: ["extrude"], version: "3.0+", tags: ["modeling", "menu"] },
    { id: "walk_navigation", category: "navigation", shortcut: "Shift + ` (Grave Accent)", action: "Walk Navigation", notes: "Navegación tipo FPS (WASD)", tips: "Usa rueda para variar velocidad. Q/E para subir/bajar. Tab para gravedad", useCases: ["Recorrer escenarios", "Posicionar cámara dentro de arquitecturas"], difficulty: "intermediate", context: ["object_mode"], workflow: ["navigation", "presentation"], relatedShortcuts: [], version: "3.0+", tags: ["navigation", "cool"] },
    { id: "link_data", category: "utilities", shortcut: "Ctrl + L", action: "Link/Transfer Data", notes: "Vincula datos del activo a seleccionados", tips: "Copia modificadores, materiales o colecciones a muchos objetos a la vez", useCases: ["Aplicar material a 100 objetos", "Copiar modifiers"], difficulty: "intermediate", context: ["object_mode"], workflow: ["organization", "productivity"], relatedShortcuts: ["duplicate"], version: "3.0+", tags: ["productivity", "advanced"] }
];

const CATEGORIES = {
    transform: "🔄 Transformación",
    selection: "🎯 Selección",
    topology: "🔷 Topología",
    navigation: "🧭 Navegación",
    modeling: "⚙️ Modelado",
    sculpting: "🗿 Sculpting",
    shading: "🎨 Shading",
    animation: "🎞️ Animación",
    utilities: "🔧 Utilidades",
    uv_editing: "🗺️ UV Editing",
    rigging: "🦴 Rigging",
    grease_pencil: "✏️ Grease Pencil",
    modifiers: "🔌 Modifiers",
    camera_render: "📷 Camera & Render",
    text_editor: "📝 Text Editor",
    node_editor: "🔗 Node Editor"
};

const CONTEXTS = {
    object_mode: "Object Mode",
    edit_mode: "Edit Mode",
    sculpt_mode: "Sculpt Mode",
    pose_mode: "Pose Mode",
    weight_paint: "Weight Paint",
    uv_editor: "UV Editor",
    shader_editor: "Shader Editor",
    compositor: "Compositor",
    text_editor: "Text Editor",
    draw_mode: "Draw Mode",
    camera_view: "Camera View",
    render_window: "Render Window",
    any: "Cualquier modo"
};

const WORKFLOWS = {
    modeling: "Modeling",
    sculpting: "Sculpting",
    retopo: "Retopology",
    uv_mapping: "UV Mapping",
    texturing: "Texturing",
    rigging: "Rigging",
    animation: "Animation",
    "2d_animation": "2D Animation",
    rendering: "Rendering",
    compositing: "Compositing",
    scripting: "Scripting",
    general: "General",
    organization: "Organization",
    topology: "Topology",
    presentation: "Presentation",
    navigation: "Navigation"
};

const TIPS = [
    {
        id: "auto_smooth",
        title: "Auto Smooth & Shade Smooth",
        content: "Para objetos 'Low Poly' que parezcan redondos: Click derecho 'Shade Smooth' + activar 'Auto Smooth' en Data Properties (Normals). Esto suaviza las caras curvas pero mantiene los bordes afilados automáticamente.",
        icon: "adjust",
        tags: ["modeling", "shading"]
    },
    {
        id: "backface_culling",
        title: "Backface Culling para Interiores",
        title_en: "Backface Culling for Interiors",
        content: "Si modelas una habitación y la cámara está fuera, activa 'Backface Culling' en las opciones de Shading (arriba derecha). Esto hace invisibles las caras traseras, permitiéndote ver el interior desde fuera.",
        content_en: "If modeling a room and the camera is outside, enable 'Backface Culling' in Shading options (top right). This makes back faces invisible, letting you see inside from outside.",
        icon: "eye-slash",
        tags: ["visualization", "archviz"]
    },
    {
        id: "precision_transform",
        title: "Movimiento de Precisión",
        title_en: "Precision Movement",
        content: "Mantén presionada la tecla SHIFT mientras mueves, rotas o escalas un objeto para reducir la velocidad del transformación y tener mucha más precisión.",
        content_en: "Hold SHIFT while moving, rotating or scaling an object to reduce transform speed and have much more precision.",
        icon: "crosshairs",
        tags: ["transform", "productivity"]
    },
    {
        id: "math_inputs",
        title: "Matemáticas en Campos Numéricos",
        title_en: "Math in Number Fields",
        content: "Puedes escribir operaciones en cualquier campo numérico. Ej: '360/12' crea un ángulo de 30º, o '2*pi' para radianes. También acepta 'sin', 'cos', etc.",
        content_en: "You can type operations in any number field. Ex: '360/12' creates a 30º angle, or '2*pi' for radians. Also accepts 'sin', 'cos', etc.",
        icon: "calculator",
        tags: ["productivity", "ui"]
    },
    {
        id: "multi_edit",
        title: "Edición Multi-Objeto",
        title_en: "Multi-Object Editing",
        content: "Selecciona varios objetos y presiona TAB. Podrás editar la malla de todos ellos simultáneamente. Ideal para ajustar piezas encajadas o UV mapping conjunto.",
        content_en: "Select multiple objects and press TAB. You can edit the mesh of all of them simultaneously. Ideal for adjusting fitted parts or joint UV mapping.",
        icon: "cubes",
        tags: ["modeling", "productivity"]
    },
    {
        id: "reset_transform",
        title: "Resetear Transformaciones",
        title_en: "Reset Transforms",
        content: "¿Objeto deformado o rotado raro? Alt+G (Posición), Alt+R (Rotación), Alt+S (Escala) resetean los valores a 0 (o 1 en escala).",
        content_en: "Object deformed or rotated weirdly? Alt+G (Position), Alt+R (Rotation), Alt+S (Scale) reset values to 0 (or 1 for scale).",
        icon: "undo",
        tags: ["transform", "essential"]
    },
    {
        id: "emulate_numpad",
        title: "Sin Numpad? Emulate Numpad",
        title_en: "No Numpad? Emulate Numpad",
        content: "Si tienes teclado TKL o laptop: Edit > Preferences > Input > Emulate Numpad. Ahora los números superiores 1-0 actúan como el Numpad para cambiar vistas.",
        content_en: "If you have a TKL keyboard or laptop: Edit > Preferences > Input > Emulate Numpad. Now top numbers 1-0 act as Numpad to change views.",
        icon: "keyboard",
        tags: ["settings", "laptop"]
    },
    {
        id: "render_regions",
        title: "Render Region (Crop)",
        title_en: "Render Region (Crop)",
        content: "En vista cámara (0), presiona Ctrl+B y dibuja un rectángulo. Blender solo renderizará esa zona. Ctrl+Alt+B para limpiar. Acelera enormemente las pruebas de render.",
        content_en: "In camera view (0), press Ctrl+B and draw a rectangle. Blender will only render that zone. Ctrl+Alt+B to clear. Huge speedup for render tests.",
        icon: "crop",
        tags: ["rendering", "performance"]
    }
];
