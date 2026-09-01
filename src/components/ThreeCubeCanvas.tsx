import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CubeData {
  basePosition: THREE.Vector3;
  scatterPosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  scale: number;
  rotation: THREE.Euler;
  floatPhase: number;
  floatSpeed: number;
  floatAmplitude: number;
}

export function ThreeCubeCanvas(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#506047;font-size:0.9rem;">Interactive 3D preview requires WebGL</div>';
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 560;

    // Camera calibrated so 1.25x cluster is fully visible without clipping
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFBF4, 2.4);
    scene.add(ambientLight);

    // Primary Warm Studio Key Light
    const keyLight = new THREE.DirectionalLight(0xFFF4DE, 3.6);
    keyLight.position.set(5.5, 7.5, 5.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    // Sage Green Rim Light
    const rimLight = new THREE.DirectionalLight(0x8A9E80, 2.6);
    rimLight.position.set(-6, 2.5, -4);
    scene.add(rimLight);

    // Soft Gold Bottom Fill Light
    const goldFillLight = new THREE.DirectionalLight(0xDEC282, 1.8);
    goldFillLight.position.set(2, -5, 3.5);
    scene.add(goldFillLight);

    // Warm Internal Core Light
    const corePointLight = new THREE.PointLight(0xFFF3D4, 2.8, 5.0);
    corePointLight.position.set(0, 0.1, 0);
    scene.add(corePointLight);

    // 4. Cube Cluster Master Group
    const clusterMasterGroup = new THREE.Group();
    scene.add(clusterMasterGroup);
    clusterMasterGroup.position.set(0, 0, 0);

    // Responsive Display Scaling: Desktop 1.25x, Mobile 1.15x
    const isMobile = window.innerWidth <= 768;
    const currentScale = isMobile ? 1.15 : 1.25;
    clusterMasterGroup.scale.set(currentScale, currentScale, currentScale);

    // 3/4 Isometric Perspective Tilt
    clusterMasterGroup.rotation.y = -0.28;
    clusterMasterGroup.rotation.x = 0.14;

    // Counts per material category
    const countOlive = isMobile ? 80 : 140;
    const countIvory = isMobile ? 70 : 130;
    const countSage = isMobile ? 30 : 50;
    const countGold = isMobile ? 25 : 45;
    const countGlass = isMobile ? 20 : 35;

    // Materials Palette matching reference image
    // 1. Deep Olive / Forest Green
    const deepOliveMat = new THREE.MeshStandardMaterial({
      color: 0x36442E,
      roughness: 0.28,
      metalness: 0.32,
      shadowSide: THREE.FrontSide,
    });

    // 2. Warm Ivory / Porcelain
    const ivoryMat = new THREE.MeshStandardMaterial({
      color: 0xFDFBF7,
      roughness: 0.36,
      metalness: 0.06,
      shadowSide: THREE.FrontSide,
    });

    // 3. Muted Sage Green
    const sageMat = new THREE.MeshStandardMaterial({
      color: 0x6E8260,
      roughness: 0.32,
      metalness: 0.24,
      shadowSide: THREE.FrontSide,
    });

    // 4. Luxury Polished Gold
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC8A35F,
      roughness: 0.2,
      metalness: 0.9,
      shadowSide: THREE.FrontSide,
    });

    // 5. Translucent Frosted Glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x8FA584,
      roughness: 0.16,
      metalness: 0.15,
      transmission: 0.78,
      thickness: 1.1,
      transparent: true,
      opacity: 0.82,
      reflectivity: 0.92,
      clearcoat: 0.5,
    });

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    // InstancedMesh Builder
    const createInstancedGroup = (
      count: number,
      material: THREE.Material,
      colorType: 'olive' | 'ivory' | 'sage' | 'gold' | 'glass',
      startIndex: number
    ) => {
      const instMesh = new THREE.InstancedMesh(boxGeometry, material, count);
      instMesh.castShadow = true;
      instMesh.receiveShadow = true;

      const cubeList: CubeData[] = [];
      const dummy = new THREE.Object3D();
      const gridUnit = 0.28;

      for (let i = 0; i < count; i++) {
        const globalIdx = startIndex + i;

        // Voxel coordinate generator with organic clustering
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);

        // Core concentrated distribution
        const rPower = Math.pow(Math.random(), 1.75);
        const radius = 0.2 + rPower * 1.75;

        const rawX = radius * Math.sin(phi) * Math.cos(theta) * 1.15;
        const rawY = radius * Math.cos(phi) * 0.95;
        const rawZ = radius * Math.sin(phi) * Math.sin(theta) * 1.05;

        // Snap to clean voxel steps
        const posX = Math.round(rawX / gridUnit) * gridUnit;
        const posY = Math.round(rawY / gridUnit) * gridUnit;
        const posZ = Math.round(rawZ / gridUnit) * gridUnit;

        const basePos = new THREE.Vector3(posX, posY, posZ);

        // Scatter offset for page-load assembly animation
        const scatterMagnitude = 2.0 + Math.random() * 2.8;
        const scatterPos = basePos.clone().add(
          new THREE.Vector3(
            (Math.random() - 0.5) * scatterMagnitude,
            (Math.random() - 0.5) * scatterMagnitude,
            (Math.random() - 0.5) * scatterMagnitude
          )
        );

        // Scale variation
        let scale = 0.22;
        if (colorType === 'gold') {
          scale = Math.random() > 0.4 ? 0.25 : 0.32;
        } else if (colorType === 'ivory') {
          scale = Math.random() > 0.6 ? 0.30 : Math.random() > 0.25 ? 0.24 : 0.18;
        } else if (colorType === 'olive') {
          scale = Math.random() > 0.65 ? 0.34 : Math.random() > 0.3 ? 0.26 : 0.20;
        } else if (colorType === 'sage') {
          scale = Math.random() > 0.5 ? 0.28 : 0.20;
        } else {
          // Glass
          scale = Math.random() > 0.5 ? 0.28 : 0.22;
        }

        // Selected large focal cubes
        if (basePos.length() < 0.9 && Math.random() > 0.8) {
          scale *= 1.38;
        }

        cubeList.push({
          basePosition: basePos,
          scatterPosition: scatterPos,
          currentPosition: scatterPos.clone(),
          scale,
          rotation: new THREE.Euler(0, 0, 0),
          floatPhase: globalIdx * 0.28 + Math.random() * Math.PI,
          floatSpeed: 0.85 + Math.random() * 0.75,
          floatAmplitude: 0.018 + Math.random() * 0.025,
        });

        dummy.position.copy(scatterPos);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        instMesh.setMatrixAt(i, dummy.matrix);
      }

      instMesh.instanceMatrix.needsUpdate = true;
      clusterMasterGroup.add(instMesh);

      return { instMesh, cubeList, dummy };
    };

    let totalOffset = 0;
    const oliveGroup = createInstancedGroup(countOlive, deepOliveMat, 'olive', totalOffset);
    totalOffset += countOlive;

    const ivoryGroup = createInstancedGroup(countIvory, ivoryMat, 'ivory', totalOffset);
    totalOffset += countIvory;

    const sageGroup = createInstancedGroup(countSage, sageMat, 'sage', totalOffset);
    totalOffset += countSage;

    const goldGroup = createInstancedGroup(countGold, goldMat, 'gold', totalOffset);
    totalOffset += countGold;

    const glassGroup = createInstancedGroup(countGlass, glassMat, 'glass', totalOffset);
    totalOffset += countGlass;

    const allGroups = [oliveGroup, ivoryGroup, sageGroup, goldGroup, glassGroup];

    // 5. Delicate Gold Connection Wireframe Grid & Junction Nodes
    const allCubes: CubeData[] = [];
    allGroups.forEach(g => allCubes.push(...g.cubeList));

    const lineCoords: number[] = [];
    const maxConnectionDist = 0.58;

    for (let i = 0; i < allCubes.length; i++) {
      let links = 0;
      for (let j = i + 1; j < allCubes.length; j++) {
        const d = allCubes[i].basePosition.distanceTo(allCubes[j].basePosition);
        const dx = Math.abs(allCubes[i].basePosition.x - allCubes[j].basePosition.x);
        const dy = Math.abs(allCubes[i].basePosition.y - allCubes[j].basePosition.y);
        const dz = Math.abs(allCubes[i].basePosition.z - allCubes[j].basePosition.z);

        // Connect along orthogonal grid axes
        const isAxisAligned = (dx < 0.05 || dy < 0.05 || dz < 0.05);

        if (d < maxConnectionDist && isAxisAligned && links < 2 && Math.random() > 0.4) {
          lineCoords.push(
            allCubes[i].basePosition.x, allCubes[i].basePosition.y, allCubes[i].basePosition.z,
            allCubes[j].basePosition.x, allCubes[j].basePosition.y, allCubes[j].basePosition.z
          );
          links++;
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0xD8B672,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const connectorLinesMesh = new THREE.LineSegments(linesGeo, linesMat);
    clusterMasterGroup.add(connectorLinesMesh);

    // Glowing Junction Beads
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(240, 210, 130, 0.95)');
      grad.addColorStop(0.65, 'rgba(150, 175, 140, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    // 6. Floating Drifting Gold Sparks
    const particleCount = isMobile ? 60 : 110;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 5.4;
      particlePos[p * 3 + 1] = (Math.random() - 0.5) * 4.8;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 4.8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.075,
      color: 0xDFC282,
      map: glowTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // 7. Interactive Mouse Parallax & Assembly Animation
    let targetRotationX = 0.14;
    let targetRotationY = -0.28;
    let currentRotationX = 0.14;
    let currentRotationY = -0.28;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    let assemblyProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = -0.28 + x * 0.32;
      targetRotationX = 0.14 - y * 0.2;

      targetTiltX = x * 0.1;
      targetTiltY = y * 0.07;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler with responsive cluster scaling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);

      const isMob = window.innerWidth <= 768;
      const scale = isMob ? 1.15 : 1.25;
      clusterMasterGroup.scale.set(scale, scale, scale);
    };

    window.addEventListener('resize', handleResize);

    // 8. Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsedTime = 0;

    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsedTime += delta;

      // Smooth assembly interpolation
      if (assemblyProgress < 1) {
        assemblyProgress += 0.016;
        if (assemblyProgress > 1) assemblyProgress = 1;
      }

      // Smooth LERP mouse parallax
      currentRotationX += (targetRotationX - currentRotationX) * 0.045;
      currentRotationY += (targetRotationY - currentRotationY) * 0.045;
      currentTiltX += (targetTiltX - currentTiltX) * 0.04;
      currentTiltY += (targetTiltY - currentTiltY) * 0.04;

      if (!prefersReducedMotion) {
        // Slow organic rotation
        clusterMasterGroup.rotation.y = currentRotationY + elapsedTime * 0.055;
        clusterMasterGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.4) * 0.02;
        clusterMasterGroup.rotation.z = currentTiltX * 0.18;

        const easeVal = 1 - Math.pow(1 - assemblyProgress, 3);

        allGroups.forEach(group => {
          const { instMesh, cubeList, dummy } = group;

          for (let i = 0; i < cubeList.length; i++) {
            const cube = cubeList[i];

            // Subtle float
            const floatY = Math.sin(elapsedTime * cube.floatSpeed + cube.floatPhase) * cube.floatAmplitude;
            const floatX = Math.cos(elapsedTime * cube.floatSpeed * 0.85 + cube.floatPhase) * (cube.floatAmplitude * 0.5);

            cube.currentPosition.lerpVectors(cube.scatterPosition, cube.basePosition, easeVal);

            dummy.position.set(
              cube.currentPosition.x + floatX,
              cube.currentPosition.y + floatY,
              cube.currentPosition.z
            );

            // Subtle orientation wobble
            dummy.rotation.x = Math.sin(elapsedTime * 0.25 + cube.floatPhase) * 0.04;
            dummy.rotation.y = Math.cos(elapsedTime * 0.35 + cube.floatPhase) * 0.04;

            dummy.scale.setScalar(cube.scale * Math.min(1, easeVal * 1.08));
            dummy.updateMatrix();

            instMesh.setMatrixAt(i, dummy.matrix);
          }

          instMesh.instanceMatrix.needsUpdate = true;
        });

        linesMat.opacity = 0.38 * easeVal;

        // Drift particles
        particleMesh.rotation.y = elapsedTime * 0.022;
        particleMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.04;

        // Core light soft breathing
        corePointLight.intensity = 2.6 + Math.sin(elapsedTime * 2.0) * 0.5;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Cleanup & Disposal
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      boxGeometry.dispose();
      deepOliveMat.dispose();
      ivoryMat.dispose();
      sageMat.dispose();
      goldMat.dispose();
      glassMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      glowTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-cube-canvas-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '520px',
        position: 'relative',
        cursor: 'grab',
      }}
      aria-label="Interactive 3D Abstract Cube Cluster Visual"
    />
  );
}

export default ThreeCubeCanvas;
