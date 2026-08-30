# Nintendo Switch 3D Pricing Component — Configuration Reference

This project renders a 3D Nintendo Switch model inside the pricing section using 
@react-three/fiber and @react-three/drei. The configuration below is the **known-working 
baseline** — restore to this if things break.

---

## File Location
`src/components/RentalCards.tsx`

---

## Key Dependencies
```json
"@react-three/fiber": "^8.x",
"@react-three/drei": "^9.x",
"three": "^0.x",
"framer-motion": "^11.x"
```

## GLB Model Path
`/public/models/nintendo_switch.glb`

The model is a **single merged mesh** — individual button meshes cannot be isolated.  
Node name: `Nintendo Switch_Nintendo Switch Material_0`

---

## Critical Configuration (DO NOT CHANGE without testing)

### 1. Scene Cloning — MANDATORY
Always clone the GLTF scene to prevent hot-reload mutation buildup:
```tsx
const gltf = useGLTF("/models/nintendo_switch.glb");
const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
```
**Why:** Without cloning, `scene.rotation.x` and `scene.scale.setScalar()` mutations 
stack up across hot-reloads and push the model off-screen (invisible).

### 2. Model Orientation — rotation.x = Math.PI / 2
The GLB model's screen face points **upward (+Y axis)** in its default pose.  
Apply `Math.PI / 2` on the **X-axis** to rotate the screen to face the camera (+Z):
```tsx
scene.rotation.set(Math.PI / 2, 0, 0);
```
- `+Math.PI / 2` ✅ screen faces camera (correct)
- `-Math.PI / 2` ❌ screen faces away from camera
- `0` ❌ bird's-eye view (screen faces up)

### 3. Scale — Box3-based dynamic calculation
```tsx
const box = new THREE.Box3().setFromObject(scene);
const size = box.getSize(new THREE.Vector3());
const center = box.getCenter(new THREE.Vector3());

// Center at world origin
scene.position.sub(center);

// Target: 85% of viewport width, max 5 units (prevents camera clipping)
const naturalLongAxis = Math.max(size.x, size.z);
const targetWidth = Math.min(viewport.width * 0.85, 5);
const scaleFactor = targetWidth / naturalLongAxis;

scene.scale.setScalar(scaleFactor);
```

### 4. Camera
```tsx
<Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
```
At z=7 with fov=45, the visible width ≈ 5.8 units.  
Model target width = 5 units → fills ~86% of view. ✓

### 5. Html Overlay (pricing card on screen) — CONFIRMED WORKING VALUES
```tsx
<Html
  transform
  occlude="blending"
  position={[0, 0.1, screenZ]}   // Y=0.1 lifts card to center of screen glass vertically
  scale={0.22}                    // CSS scale — confirmed visible and correctly sized
  rotation={[0, 0, 0]}           // No extra rotation — text stays upright
  className="w-[820px] h-[460px] pointer-events-none"
>
```
- `screenZ` = `(box.max.y - 0) * sf + 0.02` — places card on screen surface
- `scale={0.22}` is a **CSS scale factor** (NOT world-units). Drei's Html transform applies this as `element.style.transform = scale(0.22)`. So 820px → ~180px displayed.
- `position[1] = 0.1` shifts card **up** by 0.1 world units to center it in the screen glass

> ⚠️ IMPORTANT: Do NOT recompute htmlScale dynamically using `size.x * sf / 820`.
> That formula gives ~0.009 (world-unit ratio) which makes the card only 7px wide — INVISIBLE.
> Always use a fixed CSS scale value in the 0.10–0.25 range for Drei's Html transform.

### 6. Camera — CONFIRMED WORKING
```tsx
<Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
```
- Closer camera (z=5 vs z=7) + wider FOV (60° vs 45°) = model appears much larger on screen

### 7. Canvas Container Size — CONFIRMED WORKING
```tsx
<div className="relative w-full h-[90vh] min-h-[700px]">
```

### 8. Model Scale — CONFIRMED WORKING
```tsx
const targetWidth = Math.min(viewport.width * 0.75, 6.5);
const sf = targetWidth / naturalLongAxis;
```

## Click Interaction
Since the model is a single merged mesh, use **coordinate-based** click detection:
```tsx
const handleClick = (e: any) => {
  e.stopPropagation();
  if (e.point.x < -0.4) switchConsole(-1);   // Left Joy-Con side
  else if (e.point.x > 0.4) switchConsole(1); // Right Joy-Con side
};
```

---

## Common Bugs & Fixes

| Bug | Cause | Fix |
|-----|-------|-----|
| Model invisible after hot-reload | scene mutations accumulating | Use `scene.clone(true)` |
| Bird's-eye view (screen faces up) | Wrong/missing rotation | `scene.rotation.set(Math.PI/2, 0, 0)` |
| Screen faces away from camera | Wrong rotation sign | Use `+Math.PI/2` not `-Math.PI/2` |
| Model way too small | Scale cap too low | Raise `targetWidth` cap (currently 5 units) |
| Model clips off screen | Scale cap too high (>8 units at fov=45, z=7) | Lower `targetWidth` cap |
| Pricing card floating off screen | `screenZ` wrong or `htmlScale` too large | Recompute from Box3 using formula above |
| Syntax error "Unexpected `}`" | Missing closing tag (motion.group / Center) | Check JSX nesting after Html close |
| `isPressed is not defined` | State var deleted during user revert | Add `const [isPressed, setIsPressed] = useState(false)` |

---

## Lighting Rig (Premium Gaming Look)
```tsx
<ambientLight intensity={0.6} />
<directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
<spotLight position={[-7, 6, -4]} intensity={5} color="#3b82f6" penumbra={2} angle={0.3} />
<spotLight position={[6, -2, 4]} intensity={2} color="#a855f7" penumbra={2} angle={0.4} />
<Environment preset="city" />
```

---

## Imports (Required)
```tsx
import { useState, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
```

---

## Design System
- Background: `#020202`
- Accent blue: `#3b82f6`
- Accent purple: `#a855f7`
- Screen background: `#080808`
- Text: white with `/40`, `/60`, `/90` opacity variants
- Console tabs (PS5/PS4) use pill-shaped toggle above the canvas
