import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ThreeCubeCanvas
 * ----------------
 * Premium procedural 3D cube installation for the LIBRA TECHLAB hero.
 * Replaces the previous brain / eye / "L" monogram visuals entirely.
 *
 * A volumetric cluster of translucent sage, olive, warm-ivory and
 * occasional muted-gold cubes, hundreds strong, in varied sizes —
 * with sparse glowing gold particles, a handful of thin gold
 * connection lines, soft studio lighting, gentle idle motion, and
 * damped mouse parallax.
 *
 * Renders a graceful static fallback if WebGL is unavailable.
 */

const PALETTE = {
  primaryDeep: 0x506047,
  primaryDarker: 0x3f4d37,
  primaryDarkest: 0x2b3526,
  mutedGreen: 0x8a9a80,
  mutedGreenSoft: 0xa5b39c,
  ivory: 0xf5f2eb,
  ivorySoft: 0xf9f8f5,
  gold: 0xc6a15b,
  goldLight: 0xd8b672,
  goldDeep: 0xb38e46,
};

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Approximate a normal-ish distribution in [-1, 1] via averaged uniforms,
// so the cluster reads as an organic volumetric mass rather than a
// uniform cube "block wall".
function gaussianish() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

function makeGlowSprite(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,246,224,1)");
    gradient.addColorStop(0.4, "rgba(216,182,114,0.55)");
    gradient.addColorStop(1, "rgba(216,182,114,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface CubeDatum {
  basePos: THREE.Vector3;
  scale: number;
  rotAxis: THREE.Vector3;
  rotSpeed: number;
  floatPhase: number;
  floatAmp: number;
}

function buildCubeGroup(
  count: number,
  color: number,
  opts: {
    minScale: number;
    maxScale: number;
    spread: THREE.Vector3;
    strayFraction: number;
    materialKind: "glass" | "matte" | "metal";
  }
): { mesh: THREE.InstancedMesh; data: CubeDatum[] } {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.computeBoundingBox();

  let material: THREE.Material;
  if (opts.materialKind === "metal") {
    material = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.82,
      roughness: 0.28,
      clearcoat: 0.5,
      clearcoatRoughness: 0.25,
      transparent: true,
      opacity: 0.96,
    });
  } else if (opts.materialKind === "matte") {
    material = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.06,
      roughness: 0.35,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      transparent: true,
      opacity: 0.92,
    });
  } else {
    material = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.1,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.55,
    });
  }

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.frustumCulled = false;

  const data: CubeDatum[] = [];
  const dummy = new THREE.Object3D();

  for (let i = 0; i < count; i++) {
    const stray = Math.random() < opts.strayFraction;
    const strayMult = stray ? 1.6 + Math.random() * 0.9 : 1;

    const basePos = new THREE.Vector3(
      gaussianish() * opts.spread.x * strayMult,
      gaussianish() * opts.spread.y * strayMult,
      gaussianish() * opts.spread.z * strayMult
    );

    const scale =
      opts.minScale + Math.random() * (opts.maxScale - opts.minScale);

    const rotAxis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();

    data.push({
      basePos,
      scale,
      rotAxis,
      rotSpeed: 0.04 + Math.random() * 0.08,
      floatPhase: Math.random() * Math.PI * 2,
      floatAmp: 0.035 + Math.random() * 0.05,
    });

    dummy.position.copy(basePos);
    dummy.scale.setScalar(scale);
    dummy.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;

  return { mesh, data };
}

export function ThreeCubeCanvas({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglOk(false);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglOk(false);
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 9.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    mount.appendChild(renderer.domElement);

    // -----------------------------
    // LIGHTING — soft studio setup
    // -----------------------------
    scene.add(new THREE.AmbientLight(PALETTE.ivory, 1.4));

    const keyLight = new THREE.PointLight(PALETTE.goldLight, 10, 18);
    keyLight.position.set(4, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(PALETTE.ivorySoft, 6, 16);
    rimLight.position.set(-3, 2, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(PALETTE.mutedGreenSoft, 4, 14);
    fillLight.position.set(-4, -3, 4);
    scene.add(fillLight);

    // -----------------------------
    // CUBE CLUSTER
    // -----------------------------
    const cluster = new THREE.Group();
    scene.add(cluster);

    const spread = new THREE.Vector3(2.5, 2.9, 2.1);

    const groups = [
      buildCubeGroup(90, PALETTE.primaryDeep, {
        minScale: 0.16,
        maxScale: 0.42,
        spread,
        strayFraction: 0.14,
        materialKind: "glass",
      }),
      buildCubeGroup(55, PALETTE.primaryDarker, {
        minScale: 0.14,
        maxScale: 0.3,
        spread,
        strayFraction: 0.16,
        materialKind: "glass",
      }),
      buildCubeGroup(50, PALETTE.ivory, {
        minScale: 0.14,
        maxScale: 0.34,
        spread,
        strayFraction: 0.14,
        materialKind: "matte",
      }),
      buildCubeGroup(14, PALETTE.gold, {
        minScale: 0.09,
        maxScale: 0.16,
        spread,
        strayFraction: 0.35,
        materialKind: "metal",
      }),
    ];

    groups.forEach(({ mesh }) => cluster.add(mesh));

    // -----------------------------
    // GLOWING GOLD PARTICLES
    // -----------------------------
    const particleCount = 90;
    const particlePositions = new Float32Array(particleCount * 3);
    const particlePoints: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Vector3(
        gaussianish() * spread.x * 1.7,
        gaussianish() * spread.y * 1.7,
        gaussianish() * spread.z * 1.7
      );
      particlePoints.push(p);
      particlePositions[i * 3] = p.x;
      particlePositions[i * 3 + 1] = p.y;
      particlePositions[i * 3 + 2] = p.z;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const glowTexture = makeGlowSprite();
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        map: glowTexture,
        size: 0.14,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    cluster.add(particles);

    // -----------------------------
    // THIN GOLD CONNECTION LINES (sparse, elegant)
    // -----------------------------
    const linePositions: number[] = [];
    const maxLines = 16;
    const usedIndices = new Set<number>();

    for (let l = 0; l < maxLines; l++) {
      const a = particlePoints[Math.floor(Math.random() * particlePoints.length)];
      let candidate = -1;
      let candidateDist = Infinity;

      for (let j = 0; j < particlePoints.length; j++) {
        if (usedIndices.has(j)) continue;
        const d = a.distanceTo(particlePoints[j]);
        if (d > 0.4 && d < 2.4 && d < candidateDist) {
          candidateDist = d;
          candidate = j;
        }
      }

      if (candidate >= 0) {
        const b = particlePoints[candidate];
        linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        usedIndices.add(candidate);
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: PALETTE.gold,
      transparent: true,
      opacity: 0.22,
    });
    const connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    cluster.add(connectionLines);

    // Softly pulsing gold connection markers at a few line endpoints.
    const markerGeometry = new THREE.SphereGeometry(0.032, 12, 12);
    const markerCount = Math.min(10, linePositions.length / 3);
    const markers: THREE.Mesh[] = [];

    for (let m = 0; m < markerCount; m++) {
      const material = new THREE.MeshBasicMaterial({
        color: PALETTE.goldLight,
        transparent: true,
        opacity: 0.9,
      });
      const marker = new THREE.Mesh(markerGeometry, material);
      const idx = m * 3;
      marker.position.set(
        linePositions[idx] ?? 0,
        linePositions[idx + 1] ?? 0,
        linePositions[idx + 2] ?? 0
      );
      markers.push(marker);
      cluster.add(marker);
    }

    // -----------------------------
    // MOUSE PARALLAX (smooth, damped)
    // -----------------------------
    const pointer = new THREE.Vector2();
    const targetTilt = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      targetTilt.x = pointer.y * 0.09;
      targetTilt.y = pointer.x * 0.16;
    };

    mount.addEventListener("pointermove", onPointerMove);

    // -----------------------------
    // RESIZE
    // -----------------------------
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", onResize);

    // -----------------------------
    // ANIMATION — calm, premium, never game-like
    // -----------------------------
    const clock = new THREE.Clock();
    let animationFrame = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    const dummy = new THREE.Object3D();

    const BASE_SPIN_SPEED = 0.045;
    const DAMPING = 0.03;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      currentTiltX += (targetTilt.x - currentTiltX) * DAMPING;
      currentTiltY += (targetTilt.y - currentTiltY) * DAMPING;

      cluster.rotation.y = elapsed * BASE_SPIN_SPEED + currentTiltY;
      cluster.rotation.x = currentTiltX;
      cluster.position.y = Math.sin(elapsed * 0.35) * 0.06;

      // Gentle individual cube float (per-instance matrix update).
      groups.forEach(({ mesh, data }) => {
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          const floatY = Math.sin(elapsed * 0.6 + d.floatPhase) * d.floatAmp;

          dummy.position.set(d.basePos.x, d.basePos.y + floatY, d.basePos.z);
          dummy.scale.setScalar(d.scale);
          dummy.rotation.set(
            d.rotAxis.x * elapsed * d.rotSpeed,
            d.rotAxis.y * elapsed * d.rotSpeed,
            d.rotAxis.z * elapsed * d.rotSpeed
          );
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      });

      // Slow particle drift.
      particles.rotation.y = elapsed * 0.02;

      // Soft pulse on connection markers.
      markers.forEach((marker, i) => {
        const pulse = 0.6 + Math.sin(elapsed * 1.4 + i) * 0.4;
        (marker.material as THREE.MeshBasicMaterial).opacity = 0.5 + pulse * 0.4;
        marker.scale.setScalar(0.85 + pulse * 0.3);
      });

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.InstancedMesh ||
          object instanceof THREE.LineSegments ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      glowTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglOk) {
    // Graceful fallback — no WebGL, no broken canvas, still on-brand.
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "420px",
          position: "relative",
          borderRadius: "1.5rem",
          background:
            "radial-gradient(circle at 35% 30%, rgba(198,161,91,0.18), transparent 55%), radial-gradient(circle at 65% 65%, rgba(80,96,71,0.16), transparent 60%), #F5F2EB",
        }}
      />
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "420px",
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
}

export default ThreeCubeCanvas;
