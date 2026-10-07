// "Data terrain": a field of 3D bars, like a live bar chart seen in
// perspective, with heights driven by layered waves plus a ripple that
// follows the cursor. Plain Three.js, loaded lazily by <DataTerrain/>.

import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  HemisphereLight,
  InstancedMesh,
  MathUtils,
  Matrix4,
  MeshStandardMaterial,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export function createTerrain(container, { reducedMotion = false } = {}) {
  const small = window.matchMedia("(max-width: 820px)").matches;
  const N = small ? 16 : 22; // bars per side
  const GAP = 1.3;
  const COUNT = N * N;
  const half = ((N - 1) * GAP) / 2;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 200);
  const camBase = new Vector3(36, 27, 36);
  const target = new Vector3(0, -2.5, 0); // aims low so the field sits high in frame
  camera.position.copy(camBase);
  camera.lookAt(target);

  scene.add(new HemisphereLight(0xffffff, 0x223355, 1.1));
  const sun = new DirectionalLight(0xffffff, 1.6);
  sun.position.set(-10, 24, 12);
  scene.add(sun);

  const geo = new BoxGeometry(0.62, 1, 0.62);
  geo.translate(0, 0.5, 0); // grow upward from the floor
  const mat = new MeshStandardMaterial({ roughness: 0.45, metalness: 0.15 });
  const bars = new InstancedMesh(geo, mat, COUNT);
  scene.add(bars);

  let grid = null;
  const low = new Color();
  const high = new Color();
  const tmp = new Color();

  function refreshTheme() {
    high.set(cssVar("--accent-hi") || "#94b6ff");
    mat.emissive.set(cssVar("--accent") || "#6f9cff").multiplyScalar(0.07);
    low.set(cssVar("--surface-2") || "#131c2f").lerp(new Color(cssVar("--accent") || "#6f9cff"), 0.32);
    const bg = new Color(cssVar("--bg") || "#070b14");
    scene.fog = new Fog(bg, 42, 82);
    if (grid) {
      scene.remove(grid);
      grid.geometry.dispose();
      grid.material.dispose();
    }
    grid = new GridHelper(N * GAP + 6, N + 6, new Color(cssVar("--line-2") || "#2a3856"), new Color(cssVar("--line") || "#1c2740"));
    grid.position.y = -0.01;
    scene.add(grid);
  }
  refreshTheme();

  // Cursor → point on the floor plane, eased so the ripple glides.
  const ray = new Raycaster();
  const ndc = new Vector2(10, 10);
  const floor = new Plane(new Vector3(0, 1, 0), 0);
  const hit = new Vector3(999, 0, 999);
  const ripple = new Vector3(999, 0, 999);
  const look = new Vector2(0, 0);
  const wander = new Vector3();
  let pointerActive = false;

  const onPointer = (e) => {
    const r = container.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    look.set(MathUtils.clamp(ndc.x, -1.5, 1.5), MathUtils.clamp(ndc.y, -1.5, 1.5));
    pointerActive = Math.abs(ndc.x) <= 1.2 && Math.abs(ndc.y) <= 1.2;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const m4 = new Matrix4();
  function layout(t) {
    if (pointerActive) {
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(floor, hit)) ripple.lerp(hit, 0.08);
    } else {
      ripple.lerp(wander.set(Math.sin(t * 0.25) * half * 0.7, 0, Math.cos(t * 0.31) * half * 0.7), 0.02);
    }
    let i = 0;
    for (let x = 0; x < N; x++) {
      for (let z = 0; z < N; z++) {
        const px = x * GAP - half;
        const pz = z * GAP - half;
        const wave =
          Math.sin(px * 0.32 + t * 0.9) * 0.9 +
          Math.cos(pz * 0.27 - t * 0.7) * 0.8 +
          Math.sin((px + pz) * 0.18 + t * 0.5) * 0.7;
        const d2 = (px - ripple.x) ** 2 + (pz - ripple.z) ** 2;
        const bump = Math.exp(-d2 / 14) * 5;
        const h = Math.max(0.15, 1.6 + wave + bump);
        m4.makeScale(1, h, 1).setPosition(px, 0, pz);
        bars.setMatrixAt(i, m4);
        tmp.copy(low).lerp(high, Math.pow(MathUtils.clamp((h - 0.6) / 4.2, 0, 1), 1.25));
        bars.setColorAt(i, tmp);
        i++;
      }
    }
    bars.instanceMatrix.needsUpdate = true;
    bars.instanceColor.needsUpdate = true;

    bars.rotation.y = grid.rotation.y = t * 0.04;
    camera.position.set(camBase.x + look.x * 2.2, camBase.y + look.y * 1.6, camBase.z - look.x * 2.2);
    camera.lookAt(target);
  }

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(() => {
    resize();
    if (!running) renderer.render(scene, camera);
  });
  ro.observe(container);
  resize();

  // Animate only while on screen and the tab is visible.
  let raf = 0;
  let running = false;
  let onScreen = true;
  let still = reducedMotion;
  const t0 = performance.now();
  const frame = () => {
    layout((performance.now() - t0) / 1000);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    const should = onScreen && !still && !document.hidden;
    if (should && !running) {
      running = true;
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    sync();
  });
  io.observe(container);
  document.addEventListener("visibilitychange", sync);

  // First frame (also the permanent one under reduced motion).
  layout(2.4);
  renderer.render(scene, camera);
  sync();

  return {
    refreshTheme() {
      refreshTheme();
      if (!running) {
        layout(2.4);
        renderer.render(scene, camera);
      }
    },
    setReducedMotion(v) {
      still = v;
      sync();
      if (still) {
        layout(2.4);
        renderer.render(scene, camera);
      }
    },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      mat.dispose();
      grid?.geometry.dispose();
      grid?.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
