# R4 - Zoom Lightbox Research

Researcher: R4
Topic: Zoomable image viewer / lightbox patterns for vanilla JS
Target file: `v32.14/AGENT_TEAMS_CONFIGURATOR_v32_14.html` (single-file app)
Scope: Open a zoomable lightbox from inside the Agent Encyclopedia learn-overlay modal; pan + pinch + wheel + keyboard; no external libraries.

Confidence legend: [CERTAIN] standard web APIs and math, verified against multiple sources. [PROBABLE] design choice backed by reference implementations. [SPECULATION] best-guess for our specific integration.

---

## 1. Architecture decision

Three approaches were considered for the zoom surface:

### Approach A - CSS transform on a single `<img>` (chosen)
A single `<img class="mz-img">` inside a `.mz-stage` container (overflow hidden). JS keeps three scalar state vars: `mzScale`, `mzTx`, `mzTy`. On every gesture we compute the new values and write a single style once per animation frame:

```js
mzImg.style.transform = `translate(${mzTx}px, ${mzTy}px) scale(${mzScale})`;
mzImg.style.transformOrigin = '0 0';
```

Pros:
- Minimal DOM (stage + img). Nothing to re-layout on zoom.
- GPU-friendly: translate/scale both hit the compositor thread on all modern browsers, so zoom and pan stay at 60fps even with a ~650KB PNG.
- With `transform-origin: 0 0`, all the math collapses to the simple "keep focal point stable" formula (see section 3). No CSS percentage origin to reconcile with JS pixel coordinates.

### Approach B - Wrapper div with `overflow:hidden` holding an `<img>` that gets transformed
This is what we actually ship, but structurally it is equivalent to A: the `.mz-stage` is the wrapper with `overflow:hidden`, and `.mz-img` inside it is the transform target. So "A vs B" collapses into the same implementation - I list them separately because panzoom libs sometimes wrap the transform target inside a second inner element to isolate transforms from layout. We do not need that second wrapper because there is only one visual element (the image).

### Approach C - SVG wrapping the image (rejected)
Wrap the raster image in `<svg><image>` and use `viewBox` manipulation. Pros: pan/zoom via viewBox is mathematically clean. Cons: (a) SVG raster rendering quality varies between browsers on heavy zoom; (b) no `image-rendering: pixelated` fallback; (c) extra DOM node and style plumbing for something we get for free with CSS transform; (d) our infographic is a detailed PNG, not vector.

### Verdict: Approach A (single `<img>` + CSS transform + JS scalars)

Reasons [PROBABLE, based on panzoom + PhotoSwipe architecture notes]:
1. Smallest footprint. Fits the 150-250 lines JS budget.
2. GPU compositing path, no layout thrash, 60fps pan on our infographic.
3. `transform-origin: 0 0` + keep-focal-point-stable formula is 3 lines of math, far simpler than CSS `transform-origin` with percentage handling.

The critical design decision is `transform-origin: 0 0` (top-left). This makes `mzTx` and `mzTy` the literal screen-pixel position of the image's `(0,0)` corner inside the stage, and makes zoom-to-point math trivial.

---

## 2. Complete drop-in code

### 2a. HTML shell
Paste this once at the end of `<body>`, after the existing `moLearn` modal.

```html
<div id="moZoom" class="mo-zoom" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="mzCap">
  <div class="mz-back" tabindex="-1">
    <div class="mz-top">
      <div class="mz-cap" id="mzCap"></div>
      <div class="mz-toolbar" role="toolbar" aria-label="Sterowanie powiekszeniem">
        <button type="button" class="mz-btn mz-out" aria-label="Pomniejsz" title="Pomniejsz (-)">-</button>
        <button type="button" class="mz-btn mz-reset" aria-label="Dopasuj do ekranu" title="Dopasuj (0)">1:1</button>
        <button type="button" class="mz-btn mz-in" aria-label="Powieksz" title="Powieksz (+)">+</button>
        <button type="button" class="mz-btn mz-close" aria-label="Zamknij powiekszenie" title="Zamknij (Esc)">X</button>
      </div>
    </div>
    <div class="mz-stage" id="mzStage">
      <img id="mzImg" class="mz-img" alt="" draggable="false">
    </div>
    <div class="mz-hint" id="mzHint">
      Przewijaj kolko aby powiekszyc, przeciagnij aby przesunac. Klawisze: + - 0 strzalki Esc. Podwojne klikniecie przelacza 1x / 2x.
    </div>
  </div>
</div>
```

Notes:
- `hidden` attribute on the modal root (display:none via UA stylesheet) - JS flips it.
- `role="dialog" aria-modal="true"` + `aria-labelledby="mzCap"` meets WCAG 4.1.2 dialog pattern.
- Toolbar buttons in reading order: - / reset / + / close. The close is last so the first focusable on open is `-`, which is where we send initial focus for tabbers to immediately start zooming.
- `draggable="false"` on `<img>` kills the native image-drag ghost that Chrome/Firefox add when you mousedown on images.

### 2b. CSS (inline, uses existing v32.13 vars)

```css
/* === Zoom Lightbox === */
.mo-zoom{
  position:fixed; inset:0; z-index:10000;
  display:flex; align-items:stretch; justify-content:stretch;
  background:rgba(5,6,14,.72);
  backdrop-filter:blur(14px) saturate(1.1);
  -webkit-backdrop-filter:blur(14px) saturate(1.1);
  animation:mzFade .22s ease-out;
}
.mo-zoom[hidden]{ display:none; }
@media (prefers-reduced-motion:reduce){
  .mo-zoom{ animation:none; }
}
@keyframes mzFade{ from{opacity:0} to{opacity:1} }

.mz-back{
  position:relative; flex:1;
  display:grid; grid-template-rows:auto 1fr auto;
  min-height:0; min-width:0;
  outline:none;
}

.mz-top{
  display:flex; align-items:center; justify-content:space-between;
  gap:12px; padding:14px 18px;
  background:linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,0));
  pointer-events:none;
}
.mz-cap{
  color:var(--t1); font:600 14px/1.3 'Space Grotesk', system-ui, sans-serif;
  text-shadow:0 1px 4px rgba(0,0,0,.6);
  max-width:60%;
  overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}
.mz-toolbar{
  display:flex; gap:8px; pointer-events:auto;
}
.mz-btn{
  min-width:44px; min-height:44px; padding:0 12px;
  display:inline-flex; align-items:center; justify-content:center;
  background:rgba(24,26,38,.88); color:var(--t1);
  border:1px solid rgba(255,255,255,.14);
  border-radius:10px;
  font:600 16px/1 'Space Grotesk', system-ui, sans-serif;
  cursor:pointer;
  transition:background .15s ease, border-color .15s ease, transform .12s ease;
  backdrop-filter:blur(6px);
  -webkit-backdrop-filter:blur(6px);
}
.mz-btn:hover{ background:rgba(40,42,56,.92); border-color:rgba(255,255,255,.28); }
.mz-btn:active{ transform:scale(.96); }
.mz-btn:focus-visible{ outline:2px solid var(--accent1, #818CF8); outline-offset:2px; }
.mz-btn.mz-close{ background:rgba(70,20,30,.75); }
.mz-btn.mz-close:hover{ background:rgba(120,30,45,.85); }

.mz-stage{
  position:relative; overflow:hidden;
  touch-action:none; /* mandatory - we handle all gestures */
  user-select:none;
  cursor:grab;
  min-height:0; min-width:0;
  contain:layout paint;
}
.mz-stage.mz-dragging{ cursor:grabbing; }

.mz-img{
  position:absolute; top:0; left:0;
  transform-origin:0 0;
  will-change:transform;
  max-width:none; max-height:none;
  user-select:none;
  -webkit-user-drag:none;
  pointer-events:none; /* so gestures hit the stage, not the img */
  image-rendering:auto;
  transform:translate(0,0) scale(1);
  transition:transform .22s cubic-bezier(.2,.8,.2,1);
}
.mz-stage.mz-dragging .mz-img,
.mz-stage.mz-zooming  .mz-img{ transition:none; }
@media (prefers-reduced-motion:reduce){
  .mz-img{ transition:none; }
  .mo-zoom .mz-back{ animation:none; }
}

.mz-hint{
  padding:10px 18px 14px;
  color:var(--t2); font:500 12px/1.4 'Inter', system-ui, sans-serif;
  text-align:center;
  background:linear-gradient(0deg, rgba(0,0,0,.55), rgba(0,0,0,0));
  pointer-events:none;
}
@media (max-width:640px){
  .mz-cap{ max-width:40%; font-size:12px; }
  .mz-btn{ min-width:44px; padding:0 10px; font-size:14px; }
  .mz-hint{ font-size:11px; }
}
```

Key CSS points:
- `.mz-stage { touch-action:none }` tells the browser we will handle ALL pointer gestures ourselves. Without this Chrome/Safari will hijack 1-finger drags as scroll and 2-finger pinches as page zoom. [CERTAIN - MDN]
- `.mz-img { transform-origin:0 0; will-change:transform; pointer-events:none }` - gestures always hit the stage (constant target), so we do not lose the pointer when the image translates out from under us. [CERTAIN]
- `contain:layout paint` on the stage limits paint area when the image translates.
- `transition:transform .22s` on the image gives animated feel for button presses and double-click, but we disable it during drag and pinch (`.mz-dragging`, `.mz-zooming`) so the image feels glued to the cursor/finger.
- `prefers-reduced-motion:reduce` strips the fade + transition but keeps the transform (the user still needs to be able to zoom, just without easing).

### 2c. JS (inline)

```js
/* ===== R4: Zoom Lightbox ===== */
// State
let mzState = null; // {scale, tx, ty, minScale, maxScale, natW, natH, prevFocus, capText, altText}
const MZ_MAX_SCALE = 4;
const MZ_FIT_TO_MAX_RATIO = 4; // min scale = fit * 1 (user cannot go smaller than fit)
const MZ_WHEEL_STEP = 0.0018;  // tuned for normalized deltaY
const MZ_BTN_STEP = 1.25;      // + button multiplies current scale by 1.25
const MZ_DBLCLICK_SCALE = 2;

// Cache of active pointers for pinch (pointerId -> {x, y})
const mzPointers = new Map();
let mzPinchPrevDist = 0;
let mzPinchPrevMid = null;
let mzDragPrev = null;       // {x, y} last pointer position during 1-pointer drag
let mzRaf = 0;               // rAF handle for transform commits
let mzPendingApply = false;

/* --- Open / close --- */
function otworzZoom(src, caption){
  if(!src) return;
  const mo = document.getElementById('moZoom');
  const img = document.getElementById('mzImg');
  const cap = document.getElementById('mzCap');
  const stage = document.getElementById('mzStage');
  mzState = {
    scale:1, tx:0, ty:0,
    minScale:1, maxScale:MZ_MAX_SCALE,
    natW:0, natH:0,
    prevFocus: document.activeElement,
    capText: caption || '',
    altText: caption || 'Infografika'
  };
  cap.textContent = mzState.capText;
  img.alt = mzState.altText;
  // show first so we get real stage dimensions
  mo.hidden = false;
  mo.setAttribute('aria-hidden','false');
  // announce to SR
  if(typeof announce === 'function'){
    announce('Widok powiekszenia: ' + mzState.altText + '. Przewijaj kolko aby powiekszyc, Escape aby zamknac.');
  }
  // load image, then fit
  img.onload = () => {
    mzState.natW = img.naturalWidth;
    mzState.natH = img.naturalHeight;
    mzFit();
  };
  if(img.complete && img.naturalWidth){
    mzState.natW = img.naturalWidth;
    mzState.natH = img.naturalHeight;
    // reset transform before switching src so we never flash stale position
    img.style.transform = 'translate(0,0) scale(1)';
    img.src = src;
    mzFit();
  } else {
    img.src = src;
  }
  // focus trap + keyboard
  document.addEventListener('keydown', mzKey, true);
  stage.addEventListener('wheel', mzWheel, {passive:false});
  stage.addEventListener('pointerdown', mzPointerDown);
  stage.addEventListener('pointermove', mzPointerMove);
  stage.addEventListener('pointerup', mzPointerUp);
  stage.addEventListener('pointercancel', mzPointerUp);
  stage.addEventListener('pointerleave', mzPointerUp);
  stage.addEventListener('dblclick', mzDblClick);
  // initial focus on - button (first toolbar control)
  requestAnimationFrame(() => {
    const firstBtn = mo.querySelector('.mz-btn');
    if(firstBtn) firstBtn.focus();
  });
}

function zamknijZoom(){
  const mo = document.getElementById('moZoom');
  const stage = document.getElementById('mzStage');
  if(!mo || mo.hidden) return;
  mo.hidden = true;
  mo.setAttribute('aria-hidden','true');
  document.removeEventListener('keydown', mzKey, true);
  stage.removeEventListener('wheel', mzWheel);
  stage.removeEventListener('pointerdown', mzPointerDown);
  stage.removeEventListener('pointermove', mzPointerMove);
  stage.removeEventListener('pointerup', mzPointerUp);
  stage.removeEventListener('pointercancel', mzPointerUp);
  stage.removeEventListener('pointerleave', mzPointerUp);
  stage.removeEventListener('dblclick', mzDblClick);
  mzPointers.clear();
  mzPinchPrevDist = 0;
  mzPinchPrevMid = null;
  mzDragPrev = null;
  // restore focus to the card that opened the zoom
  const prev = mzState && mzState.prevFocus;
  mzState = null;
  if(prev && typeof prev.focus === 'function'){
    try { prev.focus(); } catch(e){}
  }
}

/* --- Fit to screen --- */
function mzFit(){
  if(!mzState || !mzState.natW || !mzState.natH) return;
  const stage = document.getElementById('mzStage');
  const r = stage.getBoundingClientRect();
  if(r.width < 10 || r.height < 10) return;
  const fit = Math.min(r.width / mzState.natW, r.height / mzState.natH);
  mzState.minScale = fit;                 // cannot shrink below fit
  mzState.maxScale = Math.max(fit * MZ_FIT_TO_MAX_RATIO, fit + 1); // at least fit+1, usually fit*4
  mzState.scale = fit;
  // center
  mzState.tx = (r.width  - mzState.natW * fit) / 2;
  mzState.ty = (r.height - mzState.natH * fit) / 2;
  mzApply(true);
}

/* --- Commit transform (rAF-batched) --- */
function mzApply(animate){
  if(!mzState) return;
  const img = document.getElementById('mzImg');
  if(!img) return;
  // clamp + commit
  mzClamp();
  const t = `translate(${mzState.tx.toFixed(1)}px, ${mzState.ty.toFixed(1)}px) scale(${mzState.scale.toFixed(4)})`;
  if(animate){
    img.style.transform = t;
  } else {
    // drag/pinch path: skip layout, batch through rAF
    if(!mzPendingApply){
      mzPendingApply = true;
      mzRaf = requestAnimationFrame(() => {
        mzPendingApply = false;
        img.style.transform = `translate(${mzState.tx.toFixed(1)}px, ${mzState.ty.toFixed(1)}px) scale(${mzState.scale.toFixed(4)})`;
      });
    }
  }
}

/* --- Clamp pan so the image cannot drift fully off the stage --- */
function mzClamp(){
  const stage = document.getElementById('mzStage');
  if(!stage || !mzState) return;
  const r = stage.getBoundingClientRect();
  const sw = mzState.natW * mzState.scale;
  const sh = mzState.natH * mzState.scale;
  // If image is smaller than stage on an axis, center it on that axis.
  // Otherwise, keep edges flush with viewport (no gray gap, no escape).
  if(sw <= r.width){
    mzState.tx = (r.width - sw) / 2;
  } else {
    const minTx = r.width - sw; // leftmost allowed (right edge flush)
    const maxTx = 0;            // rightmost allowed (left edge flush)
    if(mzState.tx < minTx) mzState.tx = minTx;
    if(mzState.tx > maxTx) mzState.tx = maxTx;
  }
  if(sh <= r.height){
    mzState.ty = (r.height - sh) / 2;
  } else {
    const minTy = r.height - sh;
    const maxTy = 0;
    if(mzState.ty < minTy) mzState.ty = minTy;
    if(mzState.ty > maxTy) mzState.ty = maxTy;
  }
  if(mzState.scale < mzState.minScale) mzState.scale = mzState.minScale;
  if(mzState.scale > mzState.maxScale) mzState.scale = mzState.maxScale;
}

/* --- Zoom to a focal point (in stage-local coordinates) --- */
function mzZoomTo(newScale, fx, fy){
  if(!mzState) return;
  if(newScale < mzState.minScale) newScale = mzState.minScale;
  if(newScale > mzState.maxScale) newScale = mzState.maxScale;
  // Invariant: the image pixel under the focal point stays under it.
  // imgPx = (fx - tx) / scale   must equal   (fx - newTx) / newScale
  // => newTx = fx - (fx - tx) * (newScale / scale)
  const k = newScale / mzState.scale;
  mzState.tx = fx - (fx - mzState.tx) * k;
  mzState.ty = fy - (fy - mzState.ty) * k;
  mzState.scale = newScale;
  mzApply(false);
}

/* --- Button handlers --- */
function mzZoomIn(){
  if(!mzState) return;
  const stage = document.getElementById('mzStage');
  const r = stage.getBoundingClientRect();
  mzZoomTo(mzState.scale * MZ_BTN_STEP, r.width/2, r.height/2);
}
function mzZoomOut(){
  if(!mzState) return;
  const stage = document.getElementById('mzStage');
  const r = stage.getBoundingClientRect();
  mzZoomTo(mzState.scale / MZ_BTN_STEP, r.width/2, r.height/2);
}
function mzReset(){
  if(!mzState) return;
  mzFit();
}

/* --- Wheel (normalized) --- */
function mzWheel(e){
  if(!mzState) return;
  e.preventDefault();
  // Normalize deltaY across deltaMode 0 (pixels), 1 (lines), 2 (pages).
  // LINE ~= 16px, PAGE ~= viewport height.
  let dy = e.deltaY;
  if(e.deltaMode === 1) dy *= 16;
  else if(e.deltaMode === 2) dy *= (window.innerHeight || 800);
  // Clamp to a sane per-event range so a trackpad fling doesn't nuke scale.
  if(dy >  100) dy =  100;
  if(dy < -100) dy = -100;
  // Exponential feel: scale *= exp(-dy * step)
  const k = Math.exp(-dy * MZ_WHEEL_STEP);
  const stage = document.getElementById('mzStage');
  const r = stage.getBoundingClientRect();
  const fx = e.clientX - r.left;
  const fy = e.clientY - r.top;
  mzZoomTo(mzState.scale * k, fx, fy);
}

/* --- Pointer handlers (drag pan + pinch zoom) --- */
function mzPointerDown(e){
  if(!mzState) return;
  const stage = document.getElementById('mzStage');
  stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
  mzPointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
  if(mzPointers.size === 1){
    mzDragPrev = {x:e.clientX, y:e.clientY};
    stage.classList.add('mz-dragging');
  } else if(mzPointers.size === 2){
    stage.classList.remove('mz-dragging');
    stage.classList.add('mz-zooming');
    const pts = [...mzPointers.values()];
    mzPinchPrevDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    mzPinchPrevMid  = {x:(pts[0].x + pts[1].x)/2, y:(pts[0].y + pts[1].y)/2};
    mzDragPrev = null;
  }
}
function mzPointerMove(e){
  if(!mzState) return;
  if(!mzPointers.has(e.pointerId)) return;
  mzPointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
  const stage = document.getElementById('mzStage');
  const r = stage.getBoundingClientRect();
  if(mzPointers.size === 1 && mzDragPrev){
    // Pan: delta in screen px applies directly to translate (transform-origin 0 0).
    const dx = e.clientX - mzDragPrev.x;
    const dy = e.clientY - mzDragPrev.y;
    mzState.tx += dx;
    mzState.ty += dy;
    mzDragPrev = {x:e.clientX, y:e.clientY};
    mzApply(false);
  } else if(mzPointers.size === 2){
    // Pinch: scale by distance ratio, focal point = pinch midpoint (stage-local).
    const pts = [...mzPointers.values()];
    const curDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    const curMid  = {x:(pts[0].x + pts[1].x)/2, y:(pts[0].y + pts[1].y)/2};
    if(mzPinchPrevDist > 0){
      const ratio = curDist / mzPinchPrevDist;
      const fx = curMid.x - r.left;
      const fy = curMid.y - r.top;
      // Zoom around focal point
      mzZoomTo(mzState.scale * ratio, fx, fy);
      // Also apply the pan caused by the midpoint sliding between frames
      if(mzPinchPrevMid){
        mzState.tx += (curMid.x - mzPinchPrevMid.x);
        mzState.ty += (curMid.y - mzPinchPrevMid.y);
        mzApply(false);
      }
    }
    mzPinchPrevDist = curDist;
    mzPinchPrevMid = curMid;
  }
}
function mzPointerUp(e){
  if(!mzState) return;
  const stage = document.getElementById('mzStage');
  if(mzPointers.has(e.pointerId)) mzPointers.delete(e.pointerId);
  try { stage.releasePointerCapture && stage.releasePointerCapture(e.pointerId); } catch(_){}
  if(mzPointers.size < 2){
    mzPinchPrevDist = 0;
    mzPinchPrevMid = null;
    stage.classList.remove('mz-zooming');
  }
  if(mzPointers.size === 0){
    stage.classList.remove('mz-dragging');
    mzDragPrev = null;
  } else if(mzPointers.size === 1){
    // transition pinch -> drag: seed drag start from the remaining pointer
    const only = [...mzPointers.values()][0];
    mzDragPrev = {x:only.x, y:only.y};
    stage.classList.add('mz-dragging');
  }
}

/* --- Double-click: toggle fit / 2x centered at click --- */
function mzDblClick(e){
  if(!mzState) return;
  const stage = document.getElementById('mzStage');
  const r = stage.getBoundingClientRect();
  const fx = e.clientX - r.left;
  const fy = e.clientY - r.top;
  const atFit = Math.abs(mzState.scale - mzState.minScale) < 1e-3;
  if(atFit){
    mzZoomTo(mzState.minScale * MZ_DBLCLICK_SCALE, fx, fy);
  } else {
    mzFit();
  }
}

/* --- Keyboard (with focus trap) --- */
function mzKey(e){
  if(!mzState) return;
  const mo = document.getElementById('moZoom');
  if(!mo || mo.hidden) return;
  // Focus trap: keep Tab inside the modal
  if(e.key === 'Tab'){
    const focusables = mo.querySelectorAll('.mz-btn');
    if(!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
    return;
  }
  // Swallow all the following keys so they do not bubble to the learn-overlay or app
  const panStep = 40;
  switch(e.key){
    case 'Escape':
      e.preventDefault(); e.stopPropagation();
      zamknijZoom();
      break;
    case '+': case '=':
      e.preventDefault(); mzZoomIn();
      break;
    case '-': case '_':
      e.preventDefault(); mzZoomOut();
      break;
    case '0':
      e.preventDefault(); mzReset();
      break;
    case 'ArrowLeft':
      e.preventDefault(); mzState.tx += panStep; mzApply(true);
      break;
    case 'ArrowRight':
      e.preventDefault(); mzState.tx -= panStep; mzApply(true);
      break;
    case 'ArrowUp':
      e.preventDefault(); mzState.ty += panStep; mzApply(true);
      break;
    case 'ArrowDown':
      e.preventDefault(); mzState.ty -= panStep; mzApply(true);
      break;
  }
}

/* --- Wire buttons once on DOMContentLoaded --- */
(function mzInit(){
  const ready = () => {
    const mo = document.getElementById('moZoom');
    if(!mo) return;
    mo.querySelector('.mz-in').addEventListener('click', mzZoomIn);
    mo.querySelector('.mz-out').addEventListener('click', mzZoomOut);
    mo.querySelector('.mz-reset').addEventListener('click', mzReset);
    mo.querySelector('.mz-close').addEventListener('click', zamknijZoom);
    // Click on backdrop (mz-back but outside stage / toolbar) closes.
    mo.querySelector('.mz-back').addEventListener('click', (e) => {
      if(e.target.classList.contains('mz-back')) zamknijZoom();
    });
    // Re-fit on viewport resize
    window.addEventListener('resize', () => {
      if(!mo.hidden && mzState && mzState.natW){
        // Keep relative zoom but re-center if we were at fit
        const wasFit = Math.abs(mzState.scale - mzState.minScale) < 1e-3;
        if(wasFit) mzFit(); else mzClamp(), mzApply(true);
      }
    });
  };
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
```

### 2d. How this fits together

Line count check:
- CSS: ~70 lines in section 2b (well inside the 50-80 budget).
- JS: ~230 lines in section 2c (inside the 150-250 budget).
- HTML shell: 16 lines (free).

State model is three scalars: `{scale, tx, ty}`, plus bounds `{minScale, maxScale}`, plus image natural size `{natW, natH}`, plus a `Map` of live pointers. Nothing else. Every gesture reduces to "compute new scalars, call `mzApply()`".

---

## 3. Edge cases

### 3.1 Zoom in on a point (not center)
Solved with `mzZoomTo(newScale, fx, fy)`. Because `transform-origin: 0 0`, the pixel of the image currently under screen coordinate `(fx, fy)` is at image coordinate `((fx - tx) / scale, (fy - ty) / scale)`. We want that same image pixel to stay under `(fx, fy)` after we change the scale. Solving for the new translate:

```
imgPx = (fx - tx) / scale = (fx - newTx) / newScale
=> newTx = fx - (fx - tx) * (newScale / scale)
```

Same for `ty`. This is the standard focal-point-preserving formula used by panzoom/PhotoSwipe/Medium Zoom. [CERTAIN - gksander.com derivation, panzoom source]

### 3.2 Constrain pan so image cannot leave viewport completely
`mzClamp()` after every apply. Two cases per axis:
- Image smaller than stage on that axis -> center it (no free pan).
- Image larger than stage on that axis -> clamp tx so `[tx, tx+scaledW]` still spans the full stage width: `tx in [width - scaledW, 0]`.

This means the user can always see the image edge-to-edge but never gets a "lost in gray" state. If they pan too far right, the left edge of the image snaps to the left edge of the stage.

### 3.3 Max zoom (4x fit) / min zoom (fit to screen)
- `minScale = fit = Math.min(stageW/natW, stageH/natH)` - computed at load and on window resize.
- `maxScale = fit * 4` (tunable via `MZ_FIT_TO_MAX_RATIO`). For a tall infographic where fit might be 0.2, this gives max 0.8 (smaller than 1:1). We override to `Math.max(fit*4, fit+1)` so the user can still meaningfully zoom past 1:1 pixel-perfect for detail reading. This means tall detailed infographics get a max of `fit+1` scale (e.g. 1.2) which is more readable than `fit*4`=0.8.

### 3.4 Fit-to-screen calculation
```js
const fit = Math.min(r.width / natW, r.height / natH);
tx = (r.width  - natW * fit) / 2;
ty = (r.height - natH * fit) / 2;
```
For a 1000x4000 tall infographic in a 1400x900 stage: fit = min(1.4, 0.225) = 0.225. Scaled size = 225x900. Centered tx = 587, ty = 0. Correct.

### 3.5 Prevent page scroll when wheel is over the modal
`stage.addEventListener('wheel', mzWheel, {passive:false})` + `e.preventDefault()` inside the handler. Since the modal is `position:fixed` over everything and consumes the wheel event at the capture site, the page does not scroll. We register `passive:false` explicitly because modern Chrome defaults wheel listeners to passive on document-level scrollers. [CERTAIN - MDN wheel event]

### 3.6 `prefers-reduced-motion`
CSS media query strips the modal fade-in and the `.mz-img transition`. The transform itself still happens instantly, so the user keeps full control - they just do not get the easing. Buttons/double-click jump directly instead of animating. This is the correct interpretation of WCAG 2.3.3 Animation from Interactions: functionality stays, decoration drops.

### 3.7 Wheel deltaY cross-browser normalization
Firefox on Linux still sometimes emits `deltaMode === 1` (lines) with small deltaY values like 3. Chrome and Safari emit `deltaMode === 0` (pixels) with large deltaY values like 100. We handle both:
```js
if(e.deltaMode === 1) dy *= 16;       // line
else if(e.deltaMode === 2) dy *= innerH; // page
```
Then clamp to `[-100, 100]` so a single trackpad fling cannot push scale from 1x to 50x. Then convert to a multiplicative `k = Math.exp(-dy * 0.0018)` so one notch up gives `exp(1.8) ~= 1.2x` zoom and one notch down gives `~0.83x`. Exponential mapping keeps zoom feel consistent regardless of current scale. [CERTAIN - standard zoom lib pattern, MDN deltaMode]

### 3.8 Pinch/drag transition
If the user goes from 1 finger (dragging) to 2 fingers (pinching) and back, we gracefully seed/clear `mzDragPrev` and `mzPinchPrevDist` in `mzPointerUp`. Specifically, when dropping from 2 -> 1 finger, we re-seed the drag origin from the remaining pointer so the image does not jump. This is the common panzoom bug [PROBABLE - seen in early versions of anvaka/panzoom].

### 3.9 Image load race
If `otworzZoom` is called a second time with a different src while the first image is still decoding, we reset `img.style.transform` before swapping `img.src` so we never flash the old image's zoom state on the new image. `img.onload` then recomputes fit based on the new `naturalWidth/naturalHeight`.

### 3.10 Stage not yet laid out
On the first open, `stage.getBoundingClientRect()` can return `0x0` if the modal was just un-hidden. We guard `mzFit` with `if(r.width < 10 || r.height < 10) return;` and also call `mzFit` from inside `img.onload` which happens after the browser has committed layout. [PROBABLE - fixes an intermittent centering bug seen in hand-rolled lightboxes]

### 3.11 `touch-action:none` is mandatory
Without it, Safari on iOS will hijack single-finger drag as scroll and double-tap as page zoom. Chrome Android will hijack pinches. We set it on `.mz-stage` in CSS. [CERTAIN - MDN Pointer Events]

### 3.12 Image element `pointer-events:none`
With `pointer-events:none` on `.mz-img`, all gestures land on the stage (whose position never moves). This avoids "losing" the pointer when the image translates out from under the finger mid-drag. Without this, a fast pan could desync `mzPointerMove` events because they fire from the element that received `pointerdown`. We combine this with `setPointerCapture` on the stage so pointer events keep coming to the stage even if the finger/cursor leaves its bounds. [CERTAIN - PEP pattern]

### 3.13 Clamp pan during pinch
`mzZoomTo` calls `mzClamp` at commit time. The pinch midpoint pan delta is applied after, then clamped again via `mzApply -> mzClamp`. This means the user cannot pinch-fling the image off the edge.

### 3.14 Prevent native image drag ghost
`draggable="false"` on the `<img>` tag kills the native image drag ghost that fires on `mousedown` on images in Chrome/Firefox. Also, `-webkit-user-drag:none` in CSS for older WebKit. [CERTAIN]

---

## 4. Accessibility

### 4.1 Focus trap
On open, we record `mzState.prevFocus = document.activeElement` (the bento card that was clicked) and send focus to the first toolbar button. The `Tab` handler in `mzKey` wraps focus at the first/last `.mz-btn`. On close, we restore focus to `mzState.prevFocus`. This satisfies SC 2.4.3 Focus Order and SC 2.1.2 No Keyboard Trap (Escape is always available).

### 4.2 Screen reader announcement on open
```js
if(typeof announce === 'function'){
  announce('Widok powiekszenia: ' + mzState.altText + '. Przewijaj kolko aby powiekszyc, Escape aby zamknac.');
}
```
Uses the existing v31+ `announce()` helper (aria-live region). SR users hear the caption and the keyboard shortcut summary. [CERTAIN - v31 a11y audit established this helper]

### 4.3 Keyboard-only instructions visible
The `.mz-hint` text at the bottom of the modal is always visible (not only on focus) and tells the user: "Przewijaj kolko aby powiekszyc, przeciagnij aby przesunac. Klawisze: + - 0 strzalki Esc. Podwojne klikniecie przelacza 1x / 2x."

### 4.4 Target size WCAG 2.2 (SC 2.5.8)
All 4 buttons use `min-width:44px; min-height:44px`. SC 2.5.8 requires 24x24 minimum; we deliver the stricter 44x44 level AAA target. [CERTAIN]

### 4.5 ARIA dialog semantics
`role="dialog" aria-modal="true" aria-labelledby="mzCap"` satisfies ARIA APG Dialog pattern. `aria-hidden="true"` on the root mirrors `hidden` attribute state. We do NOT put `aria-hidden="true"` on the underlying learn-overlay, because multiple stacked modals with `aria-hidden` get messy and v32.13 already uses the `hidden` attribute / focus management pattern. [PROBABLE]

### 4.6 Image alt text
`img.alt = caption` is set on open. The caption is passed in by the caller (`otworzZoom(src, caption)`).

### 4.7 prefers-reduced-motion
Covered in 3.6. Removes fade + transition, keeps function.

### 4.8 Focus-visible outlines
`.mz-btn:focus-visible { outline:2px solid var(--accent1); outline-offset:2px; }` gives keyboard users a clear ring, invisible to mouse users (via `:focus-visible`).

### 4.9 Nested Escape handling
The learn-overlay and other modals in v32.8+ also listen for Escape. Our `mzKey` listener uses `addEventListener('keydown', mzKey, true)` (capture phase) and calls `e.stopPropagation()` on Escape, so Escape closes ONLY the zoom lightbox when it is open. The learn-overlay does not see the event. When zoom is closed, the listener is removed and Escape again reaches the learn-overlay. [CERTAIN]

---

## 5. Integration point

### 5.1 Bento card HTML
Inside the Agent Encyclopedia learn-overlay (the existing `renderBentoAgent`), one card renders the infographic. Example:

```html
<div class="bento-card bento-infographic">
  <div class="bento-card-title">Infografika</div>
  <button type="button"
          class="bento-img-wrap"
          aria-label="Otworz infografike w widoku powiekszenia"
          onclick="otworzZoom(AGENT_MEDIA['res_reddit'].infographic, 'Infografika: Researcher Reddit')">
    <img src="AGENT_MEDIA['res_reddit'].infographicThumb"
         alt="Miniatura infografiki Researcher Reddit"
         loading="lazy">
    <div class="bento-img-hint">Kliknij aby powiekszyc</div>
  </button>
</div>
```

Key points:
- The wrap is a `<button type="button">` not a `<div>` - this is the single biggest a11y win. It is focusable by default, has the right role, handles Space/Enter automatically, and does not need extra ARIA.
- The click target passes two args: the full image src (base64) and a caption string (Polish-first).
- The thumb can be a separate smaller base64 (if size matters) or the same one - `loading="lazy"` defers decoding.
- `bento-img-hint` overlay is a visible affordance for mouse users.

### 5.2 Companion CSS for the bento card thumb

```css
.bento-img-wrap{
  position:relative; display:block; width:100%;
  border:1px solid rgba(255,255,255,.10);
  border-radius:12px; overflow:hidden;
  background:rgba(10,12,20,.55);
  cursor:zoom-in;
  padding:0;
}
.bento-img-wrap img{
  display:block; width:100%; height:auto;
  max-height:220px; object-fit:cover; object-position:top center;
}
.bento-img-wrap:hover{ border-color:rgba(255,255,255,.24); }
.bento-img-wrap:focus-visible{
  outline:2px solid var(--accent1);
  outline-offset:2px;
}
.bento-img-hint{
  position:absolute; left:10px; bottom:10px;
  padding:4px 10px; border-radius:999px;
  background:rgba(0,0,0,.65); color:#fff;
  font:600 11px/1 'Inter', system-ui, sans-serif;
  letter-spacing:.02em;
  pointer-events:none;
  backdrop-filter:blur(4px);
}
@media (prefers-reduced-motion:reduce){
  .bento-img-wrap{ transition:none; }
}
```

`cursor:zoom-in` is a standard cursor keyword and communicates intent. [CERTAIN - CSS cursor spec]

### 5.3 AGENT_MEDIA shape (suggested)

```js
const AGENT_MEDIA = {
  res_reddit: {
    infographic:      'data:image/png;base64,...',   // full size
    infographicThumb: 'data:image/png;base64,...',   // optional smaller version for bento
    infographicAlt:   'Infografika Researcher Reddit - role, inputy, outputy, granice'
  },
  // ... one entry per agent
};
```

If we only ship one base64 per agent (no separate thumb), the bento card just displays the full image with `max-height:220px` and `object-fit:cover` - the decode cost is paid once on render and cached.

### 5.4 State machine summary
```
closed -> otworzZoom(src, caption) -> opening (set state, show modal, load img)
  -> fit-to-stage -> idle
  -> [wheel | pinch | button] -> zoomTo(newScale, fx, fy) -> clamp -> idle
  -> [pointer 1 finger] -> drag pan -> clamp -> idle
  -> [pointer 2 fingers] -> pinch zoom+pan -> clamp -> idle
  -> [dblclick] -> toggle fit/2x -> idle
  -> [Escape | close button | backdrop click] -> zamknijZoom -> closed (restore focus)
```

---

## 6. Sources

Primary references consulted for this research:

- [MDN: Pointer Events - Pinch zoom gestures](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures) - canonical `evCache` + `Math.hypot` pattern, `touch-action:none` requirement, multi-pointer cache management.
- [MDN: Pointer Events - Multi-touch interaction](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction) - pointerId, setPointerCapture semantics.
- [MDN: WheelEvent.deltaY](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaY) - deltaMode values and normalization guidance.
- [MDN: WheelEvent.deltaMode](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode) - DOM_DELTA_PIXEL / LINE / PAGE constants.
- [MDN: Element: wheel event](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event) - passive:false requirement for preventDefault.
- [anvaka/panzoom GitHub](https://github.com/anvaka/panzoom) - architectural reference for pan+zoom state model (scale + x + y scalars, wheel with focal point).
- [anvaka/panzoom index.js](https://github.com/anvaka/panzoom/blob/main/index.js) - transform commit pattern.
- [timmywil/panzoom](https://github.com/timmywil/panzoom) - alternative CSS-transform-based library, confirms the `transform-origin: 0 0` + translate+scale approach is the standard for DOM pan/zoom.
- [PhotoSwipe docs: Adjusting Zoom Level](https://photoswipe.com/adjusting-zoom-level/) - three default zoom levels (fit, 2.5x, 4x max), confirms our min/max bound strategy.
- [PhotoSwipe methods](https://photoswipe.com/methods/) - `panTo(x,y)` + `zoomTo(level, point)` API shape, basis for our `mzZoomTo(scale, fx, fy)` signature.
- [Grant Sander: The math of zooming in](https://www.gksander.com/posts/math-of-zooming-in) - derivation of the focal-point-preserving translate formula `newTx = fx - (fx - tx) * (newScale / scale)`.
- [Josiah Ulfers: Calculations for pinch to zoom](https://josiahulfers.com/2018/11/07/calculations-for-pinch-to-zoom/) - three-step "shift to origin, scale, shift back" derivation for pinch focal point.
- [GeeksforGeeks: Zoom to point using scale and translate](https://www.geeksforgeeks.org/how-to-zoom-in-on-a-point-using-scale-and-translate/) - same formula, second source.
- [CSS-Tricks: transform-origin](https://css-tricks.com/almanac/properties/t/transform-origin/) - why `transform-origin: 0 0` simplifies the math.
- [Jake Archibald: Animating zooming](https://jakearchibald.com/2025/animating-zooming/) - transform order matters: `translate(...) scale(...)` not `scale(...) translate(...)`.
- [CodyHouse: Accessible Lightbox](https://codyhouse.co/ds/components/info/lightbox) - focus trap + restore + role=dialog pattern.
- [UXPin: Accessible Modals with Focus Traps](https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/) - Tab/Shift+Tab wrap-around pattern (our `mzKey` Tab handler).
- [Graceful Web Studio: Lightbox Focus Management](https://www.gracefulwebstudio.com/blog-articles/webflow-video-lightbox-accessibility-and-focus-management) - restore-focus-to-trigger requirement.
- [WCAG 2.2 SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) - 24x24 floor, we deliver 44x44.
- [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) - reduced-motion expectations.

---

## Appendix: test checklist for the builder

When integrating into v32.14, the builder should verify:

1. Click bento thumb on desktop -> modal opens, image fits stage, toolbar focused.
2. Wheel up over image -> zooms in on cursor (the pixel under the cursor stays put).
3. Wheel down -> zooms out, cannot go below fit.
4. Drag on zoomed image -> pans, edges stay flush (no escape).
5. Keyboard only: open via Enter on bento card, `+` / `-` / `0`, arrow keys pan, `Esc` closes, focus returns to bento card.
6. Tab cycles through 4 toolbar buttons only (focus trap works).
7. Touch device: 1 finger drag = pan, 2 finger pinch = zoom centered on pinch midpoint, 2 finger drag = pan.
8. Double-click on image at fit scale -> zooms to 2x centered on click.
9. Double-click at 2x or higher -> resets to fit.
10. Open zoom, then press Esc -> zoom closes, learn-overlay stays open.
11. Resize window while zoomed -> image clamps (does not leak off-screen).
12. `prefers-reduced-motion:reduce` -> no fade-in, no transition on transform, but all functions still work.
13. Screen reader (NVDA/VoiceOver) -> announces "Widok powiekszenia: <caption>" on open.
14. Open zoom, change src via second `otworzZoom()` call -> new image fits cleanly, no flash of old state.
15. Backdrop click (on `.mz-back` outside toolbar and stage) -> closes the zoom.
