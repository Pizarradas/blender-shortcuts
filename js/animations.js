/**
 * GSAP Animation Module for Blender Shortcuts PWA
 * Handles inline SVG animations for visual previews
 */

const Animations = {
    // initialize animation based on shortcut ID or type
    init: (container, shortcutId) => {
        // Wait for DOM to update
        requestAnimationFrame(() => {
            const svg = container.querySelector('svg');
            if (!svg) return;

            // Common setup
            gsap.set(svg, { transformOrigin: "center center" });

            // Dispatch based on shortcut ID or category
            switch (shortcutId) {
                case 'move':
                    Animations.animateMove(svg);
                    break;
                case 'rotate':
                    Animations.animateRotate(svg);
                    break;
                case 'scale':
                    Animations.animateScale(svg);
                    break;
                case 'inset':
                case 'knife':
                case 'loop_cut':
                case 'bevel_edges':
                    Animations.animateTopology(svg, shortcutId);
                    break;
                case 'box_select':
                case 'circle_select':
                    Animations.animateSelection(svg);
                    break;
                case 'middle_mouse':
                    Animations.animateOrbit(svg);
                    break;
                case 'shift_mmb':
                    Animations.animatePan(svg);
                    break;
                case 'scroll':
                    Animations.animateZoom(svg);
                    break;
                case 'duplicate':
                    Animations.animateDuplicate(svg);
                    break;
                case 'delete':
                    Animations.animateDelete(svg);
                    break;
                case 'select_all':
                    Animations.animateSelectAll(svg);
                    break;
                case 'focus':
                    Animations.animateFrameSelected(svg);
                    break;
                case 'frame_all':
                    Animations.animateFrameAll(svg);
                    break;
                case 'toggle_quad_view':
                    Animations.animateQuadView(svg);
                    break;
                case 'local_view':
                    Animations.animateLocalView(svg);
                    break;
                case 'join':
                    Animations.animateJoin(svg);
                    break;
                case 'separate':
                    Animations.animateSeparate(svg);
                    break;
                case 'merge':
                    Animations.animateMerge(svg);
                    break;
                case 'make_face':
                    Animations.animateMakeFace(svg);
                    break;
                case 'subdivide':
                    Animations.animateSubdivide(svg);
                    break;
                case 'shade_smooth':
                    Animations.animateShadeSmooth(svg);
                    break;
                case 'select_many':
                case 'select_more':
                    Animations.animateSelectMore(svg);
                    break;
                case 'select_linked':
                    Animations.animateSelectLinked(svg);
                    break;
                case 'invert_selection':
                    Animations.animateInvertSelection(svg);
                    break;
                case 'category_modeling':
                case 'category_topology':
                case 'category_modifiers':
                    Animations.animateCategoryModeling(svg);
                    break;
                case 'category_transform':
                case 'category_navigation': // Mapped to transform svg for now
                    Animations.animateCategoryTransform(svg);
                    break;
                case 'category_selection':
                    Animations.animateCategorySelection(svg);
                    break;
                case 'category_animation':
                case 'category_rigging':
                    Animations.animateCategoryAnimation(svg);
                    break;
                case 'category_render':
                case 'category_shading':
                case 'category_camera_render':
                case 'category_uv_editing':
                    Animations.animateCategoryRender(svg);
                    break;
                case 'category_general':
                case 'category_utilities':
                case 'category_interface':
                case 'category_text_editor':
                case 'category_sculpting': // Fallback to general for now
                case 'category_grease_pencil':
                    Animations.animateCategoryGeneral(svg);
                    break;
                default:
                    // Generic subtle fade in
                    gsap.from(svg, { opacity: 0, duration: 0.5 });
            }
        });
    },

    animateMove: (svg) => {
        // Target specific elements if they exist, or the whole SVG
        const target = svg.querySelector('.target-element') || svg.querySelector('rect[fill="#2196F3"]');
        const arrow = svg.querySelector('.arrow');

        if (target) {
            gsap.to(target, {
                x: 20,
                y: 20,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    },

    animateRotate: (svg) => {
        const target = svg.querySelector('.target-element') || svg.querySelector('rect[transform*="rotate"]');

        if (target) {
            gsap.to(target, {
                rotation: "+=45",
                duration: 2,
                repeat: -1,
                yoyo: true,
                transformOrigin: "center center",
                ease: "sine.inOut"
            });
        }
    },

    animateScale: (svg) => {
        const target = svg.querySelector('.target-element') || svg.querySelector('rect[fill="#FF9800"]');

        if (target) {
            gsap.fromTo(target,
                { scale: 1 },
                {
                    scale: 1.3,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    transformOrigin: "center center",
                    ease: "elastic.out(1, 0.3)"
                }
            );
        }
    },

    animateTopology: (svg, type) => {
        if (type === 'extrude') {
            const face = svg.querySelector('.target-element');
            if (face) {
                gsap.fromTo(face,
                    { y: 40, opacity: 0.5 },
                    { y: 0, opacity: 1, duration: 2, repeat: -1, yoyo: true, ease: "power2.inOut" }
                );
            }
        } else if (type === 'bevel_edges') {
            const bevelFace = svg.querySelector('.bevel-face');
            const bevelTop = svg.querySelector('.bevel-top');

            if (bevelFace && bevelTop) {
                const tl = gsap.timeline({ repeat: -1, yoyo: true });
                // Animate width of bevel
                tl.to([bevelFace, bevelTop], {
                    scaleX: 1.5,
                    transformOrigin: "center center",
                    duration: 1.5,
                    ease: "sine.inOut"
                });
            }
        } else if (type === 'loop_cut') {
            const loop = svg.querySelector('.highlight-loop');
            const loopHidden = svg.querySelector('.highlight-loop-hidden');
            const arrows = svg.querySelector('.slide-arrows');

            if (loop) {
                const tl = gsap.timeline({ repeat: -1 });
                // Flash
                tl.fromTo([loop, loopHidden], { opacity: 0 }, { opacity: 1, duration: 0.3 });
                // Slide
                tl.to([loop, loopHidden], { y: -10, duration: 1, ease: "power1.inOut" });
                tl.to([loop, loopHidden], { y: 10, duration: 1, ease: "power1.inOut" });

                if (arrows) {
                    gsap.to(arrows, { opacity: 1, duration: 0.5, delay: 0.5, yoyo: true, repeat: -1 });
                }
            }
        } else {
            // Generic fallback
            const newGeo = svg.querySelector('polyline') || svg.querySelector('path[fill-opacity="0.2"]');
            if (newGeo) {
                gsap.fromTo(newGeo,
                    { opacity: 0.2, strokeWidth: 1 },
                    { opacity: 0.8, strokeWidth: 3, duration: 1, repeat: -1, yoyo: true, ease: "power2.inOut" }
                );
            }
        }
    },

    animateSelection: (svg) => {
        // Pulse selected items
        const selectedItems = svg.querySelectorAll('circle[fill="#FF5722"], circle[fill="#4CAF50"]');

        if (selectedItems.length > 0) {
            gsap.to(selectedItems, {
                scale: 1.2,
                duration: 0.5,
                stagger: 0.1,
                repeat: -1,
                yoyo: true,
                transformOrigin: "center center",
                ease: "back.out(1.7)"
            });
        }
    },

    animateOrbit: (svg) => {
        const target = svg.querySelector('.target-element');
        const grid = svg.querySelector('.floor-grid');

        if (target) {
            gsap.to(target, {
                rotationY: 360,
                duration: 8,
                repeat: -1,
                ease: "none",
                transformOrigin: "center center"
            });
        }
        if (grid) {
            gsap.to(grid, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none",
                transformOrigin: "100 120"
            });
        }
    },

    animatePan: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            gsap.to(target, {
                x: 30,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        }
    },

    animateZoom: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            gsap.to(target, {
                scale: 1.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                transformOrigin: "center center",
                ease: "power1.inOut"
            });
        }
    },

    animateDuplicate: (svg) => {
        const original = svg.querySelector('.original-element');
        const duplicate = svg.querySelector('.target-element');

        if (duplicate && original) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial state
            tl.set(duplicate, { opacity: 0, x: 0 });

            // Pop in
            tl.to(duplicate, { opacity: 1, duration: 0.2, ease: "back.out(1.7)" });

            // Move aside
            tl.to(duplicate, { x: 60, duration: 1, ease: "power2.out" });

            // Hold and fade
            tl.to(duplicate, { opacity: 0, duration: 0.5, delay: 0.5 });
        }
    },

    animateFrameSelected: (svg) => {
        const frame = svg.querySelector('.viewport-frame');
        const target = svg.querySelector('.target-object');
        const objects = svg.querySelector('.scene-objects');

        if (objects && target) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial state
            tl.set(objects, { scale: 1, x: 0, y: 0 });
            tl.set(frame, { opacity: 0 });

            // Zoom in to target
            tl.to(objects, {
                scale: 1.8,
                x: -30, // Adjust based on target position
                y: -10,
                duration: 1.5,
                ease: "power2.inOut"
            });

            // Frame appears
            tl.to(frame, { opacity: 1, duration: 0.3 });

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateFrameAll: (svg) => {
        const frame = svg.querySelector('.viewport-frame');
        const objects = svg.querySelector('.scene-objects');

        if (objects) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Start zoomed in/offset
            tl.set(objects, { scale: 2.5, x: -50, y: -50 });
            tl.set(frame, { opacity: 0 });

            // Zoom out to fit all
            tl.to(objects, {
                scale: 1.5,
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "power2.inOut"
            });

            // Frame appears
            tl.to(frame, { opacity: 1, duration: 0.3 });

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateQuadView: (svg) => {
        const singleView = svg.querySelector('.single-view');
        const quadContent = svg.querySelector('.quad-content');
        const splitV = svg.querySelector('.split-line-v');
        const splitH = svg.querySelector('.split-line-h');

        if (singleView) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

            // Start single
            tl.set(singleView, { opacity: 1 });
            tl.set(quadContent, { opacity: 0 });
            tl.set([splitV, splitH], { scaleX: 0, scaleY: 0 });

            // Split lines appear
            tl.to([splitV, splitH], { scaleX: 1, scaleY: 1, duration: 0.5, ease: "power2.out" });

            // Views change
            tl.to(singleView, { opacity: 0.2, duration: 0.5 }, "<");
            tl.to(quadContent, { opacity: 1, duration: 0.5 }, "<");

            // Hold
            tl.to({}, { duration: 2 });
        }
    },

    animateLocalView: (svg) => {
        const distractors = svg.querySelector('.distractors');
        const mainObj = svg.querySelector('.main-object');
        const frame = svg.querySelector('.iso-frame');
        const scene = svg.querySelector('.scene');

        if (distractors && mainObj) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial
            tl.set(distractors, { opacity: 1, scale: 1 });
            tl.set(mainObj, { scale: 1 });
            tl.set(scene, { scale: 1, x: 0, y: 0 });
            tl.set(frame, { opacity: 0 });

            // Isolate
            tl.to(distractors, { opacity: 0, scale: 0, duration: 0.5, ease: "back.in(1.7)" });

            // Zoom to main
            tl.to(scene, {
                scale: 1.5,
                duration: 1,
                ease: "power2.inOut"
            });

            // Frame
            tl.to(frame, { opacity: 1, duration: 0.3 });

            // Return
            tl.to(frame, { opacity: 0, duration: 0.3, delay: 1 });
            tl.to(scene, { scale: 1, duration: 1 });
            tl.to(distractors, { opacity: 1, scale: 1, duration: 0.5 }, "<");
        }
    },

    animateJoin: (svg) => {
        const objA = svg.querySelector('.obj-a');
        const objB = svg.querySelector('.obj-b');
        const unified = svg.querySelector('.obj-unified');

        if (objA && objB && unified) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial
            tl.set([objA, objB], { opacity: 1, x: 0 });
            tl.set(unified, { opacity: 0 });

            // Move together
            tl.to(objA, { x: 20, duration: 1, ease: "power2.inOut" });
            tl.to(objB, { x: -20, duration: 1, ease: "power2.inOut" }, "<");

            // Merge flash
            tl.to([objA, objB], { opacity: 0, duration: 0.1 });
            tl.to(unified, { opacity: 1, duration: 0.1 }, "<");

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateSeparate: (svg) => {
        const part = svg.querySelector('.part-to-separate');
        if (part) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(part, { x: 0, y: 0, fill: "#FFCC80", stroke: "#FF9800" });

            // Highlight selection
            tl.to(part, { fill: "#FF9800", duration: 0.5 });

            // Move away
            tl.to(part, { x: 20, y: -20, duration: 1, ease: "power2.out" });

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateMerge: (svg) => {
        const verts = svg.querySelectorAll('.vert');
        const merged = svg.querySelector('.vert-merged');

        if (verts.length && merged) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(verts, { opacity: 1, x: 0, y: 0 });
            tl.set(merged, { opacity: 0, scale: 0 });

            // Move to center
            tl.to(verts, { x: (i) => [30, -30, 0][i], y: (i) => [-20, -20, 30][i], duration: 1, ease: "power2.in" });

            // Merge
            tl.to(verts, { opacity: 0, duration: 0.1 });
            tl.to(merged, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.7)" }, "<");

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateMakeFace: (svg) => {
        const face = svg.querySelector('.new-face');
        if (face) {
            gsap.fromTo(face,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, repeat: -1, yoyo: true, repeatDelay: 1 }
            );
        }
    },

    animateSubdivide: (svg) => {
        const cutV = svg.querySelector('.cut-v');
        const cutH = svg.querySelector('.cut-h');
        const vert = svg.querySelector('.center-vert');

        if (cutV) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set([cutV, cutH], { scaleX: 0, scaleY: 0 });
            tl.set(vert, { opacity: 0 });

            // Cuts appear
            tl.to(cutV, { scaleY: 1, duration: 0.5 });
            tl.to(cutH, { scaleX: 1, duration: 0.5 }, "<");

            // Vertex appears
            tl.to(vert, { opacity: 1, duration: 0.3 });

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateShadeSmooth: (svg) => {
        const flat = svg.querySelector('.object-flat');
        const smooth = svg.querySelector('.object-smooth');

        if (flat && smooth) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(flat, { opacity: 1 });
            tl.set(smooth, { opacity: 0 });

            // Morph/Fade
            tl.to(flat, { opacity: 0, duration: 1 });
            tl.to(smooth, { opacity: 1, duration: 1 }, "<");

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateSelectLinked: (svg) => {
        const mesh1 = svg.querySelector('.mesh-1');
        const cursor = svg.querySelector('.cursor-1');

        if (mesh1) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

            tl.set(mesh1, { fill: "#e0e0e0" }); // Reset
            tl.set(cursor, { opacity: 0 });

            // Cursor hovers
            tl.to(cursor, { opacity: 1, duration: 0.5 });

            // Click flash
            tl.to(cursor, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });

            // Select whole island
            tl.to(mesh1, { fill: "#FF9800", duration: 0.2 }, "<");
            tl.to(cursor, { opacity: 0, duration: 0.5 });
        }
    },

    animateSelectMore: (svg) => {
        const l1 = svg.querySelector('.sel-level-1');
        const l2 = svg.querySelector('.sel-level-2');
        const l3 = svg.querySelector('.sel-level-3');

        if (l1 && l2 && l3) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set([l1, l2, l3], { opacity: 0 }); // Reset

            // Start
            tl.to(l1, { opacity: 0.6, duration: 0.5 });

            // Grow 1
            tl.to(l2, { opacity: 0.6, duration: 0.5 });

            // Grow 2
            tl.to(l3, { opacity: 0.6, duration: 0.5 });

            // Hold
            tl.to({}, { duration: 1 });
        }
    },

    animateInvertSelection: (svg) => {
        const center = svg.querySelector('.sel-center');
        const outer = svg.querySelector('.sel-outer');

        if (center && outer) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial: Center selected
            tl.set(center, { opacity: 1 });
            tl.set(outer, { opacity: 0 });

            // Wait
            tl.to({}, { duration: 1 });

            // Flip
            tl.to(center, { opacity: 0, duration: 0.2 });
            tl.to(outer, { opacity: 1, duration: 0.2 }, "<");

            // Hold
            tl.to({}, { duration: 2 });
        }
    },

    animateDelete: (svg) => {
        const target = svg.querySelector('.target-element');
        const particles = svg.querySelectorAll('.particles circle');

        if (target) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(target, { scale: 1, opacity: 1 });
            tl.set(particles, { opacity: 0, scale: 0, x: 0, y: 0 });

            // Scale down anticipating
            tl.to(target, { scale: 0.9, duration: 0.2 });

            // Poof
            tl.to(target, { scale: 0, opacity: 0, duration: 0.1, ease: "power1.in" });

            // Particles explosion
            if (particles.length) {
                tl.to(particles, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.1
                }, "<");

                tl.to(particles, {
                    x: (i) => (Math.random() - 0.5) * 60,
                    y: (i) => (Math.random() - 0.5) * 60,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, ">");
            }
        }
    },

    animateCategoryModeling: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            gsap.to(target, { rotationY: 360, duration: 10, repeat: -1, ease: "none", transformOrigin: "center center" });
        }
    },
    animateCategoryTransform: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            gsap.to(target, { rotation: 360, duration: 15, repeat: -1, ease: "none", transformOrigin: "100 100" });
        }
    },
    animateCategorySelection: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            gsap.to(target, { strokeDashoffset: -20, duration: 1, repeat: -1, ease: "linear" });
        }
    },
    animateCategoryAnimation: (svg) => {
        const playhead = svg.querySelector('.target-element');
        const ball = svg.querySelector('.ball');

        if (playhead) {
            gsap.to(playhead, { x: 140, duration: 2, repeat: -1, yoyo: true, ease: "linear" });
        }
        if (ball) {
            gsap.to(ball, { y: 150 - 15, duration: 0.5, repeat: -1, yoyo: true, ease: "power2.in" }); // Bounce
        }
    },
    animateCategoryRender: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            // Pulse light/shadow
            gsap.to(target, { filter: "brightness(1.2)", duration: 2, repeat: -1, yoyo: true });
        }
    },
    animateCategoryGeneral: (svg) => {
        const target = svg.querySelector('.target-element');
        if (target) {
            gsap.to(target, { rotation: 360, duration: 8, repeat: -1, ease: "linear", transformOrigin: "center center" });
        }
    },
    animateSelectAll: (svg) => {
        const highlights = svg.querySelectorAll('.highlight-1, .highlight-2, .highlight-3');
        const objects = svg.querySelectorAll('.obj-1, .obj-2, .obj-3');

        if (highlights.length) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(highlights, { opacity: 0 });
            tl.set(objects, { fill: "#ccc" });

            // Flash selection
            tl.to(highlights, { opacity: 1, stagger: 0.1, duration: 0.3 });
            tl.to(objects, { fill: "#FF9800", stagger: 0.1, duration: 0.3, opacity: 0.5 }, "<");

            // Hold
            tl.to({}, { duration: 1 });
        }
    }
};

// Make available globally
window.Animations = Animations;
