import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThemeColors } from '../../types';

interface Interactive3DMeshProps {
  theme: ThemeColors;
  mode?: 'wireframe-orb' | 'mesh-plane' | 'particle-field';
  wireframe?: boolean;
  speed?: number;
  opacity?: number;
  className?: string;
}

export const Interactive3DMesh: React.FC<Interactive3DMeshProps> = ({
  theme,
  mode = 'wireframe-orb',
  wireframe = true,
  speed = 1.0,
  opacity = 0.65,
  className,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // Primary 3D Geometry
    let mainMesh: THREE.Mesh | THREE.Points;
    const themeColor = new THREE.Color(theme.primary);

    if (mode === 'particle-field') {
      const count = 700;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 6;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.04,
        color: themeColor,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
      });
      mainMesh = new THREE.Points(geom, mat);
    } else if (mode === 'mesh-plane') {
      const geom = new THREE.PlaneGeometry(8, 6, 24, 20);
      const mat = new THREE.MeshBasicMaterial({
        color: themeColor,
        wireframe: true,
        transparent: true,
        opacity: opacity * 0.7,
      });
      mainMesh = new THREE.Mesh(geom, mat);
      mainMesh.rotation.x = -Math.PI / 3;
    } else {
      // Default: High-tech icosahedron / sphere orb
      const geom = new THREE.IcosahedronGeometry(1.6, 2);
      const mat = new THREE.MeshBasicMaterial({
        color: themeColor,
        wireframe: wireframe,
        transparent: true,
        opacity: opacity,
      });
      mainMesh = new THREE.Mesh(geom, mat);

      // Inner glowing core
      const innerGeom = new THREE.SphereGeometry(1.0, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(theme.accent),
        wireframe: true,
        transparent: true,
        opacity: opacity * 0.4,
      });
      const innerCore = new THREE.Mesh(innerGeom, innerMat);
      group.add(innerCore);
    }

    group.add(mainMesh);

    // Mouse tracker
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW === 0 || newH === 0) continue;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse dampening
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Group rotation
      group.rotation.y += delta * 0.4 * speed;
      group.rotation.x = mouseRef.current.y * 0.6;
      group.rotation.z = mouseRef.current.x * 0.4;

      // Subtle pulse breathing
      const scale = 1 + Math.sin(elapsed * 1.5) * 0.04;
      group.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme.primary, theme.accent, mode, wireframe, speed, opacity]);

  return (
    <div
      ref={mountRef}
      className={className || "absolute inset-0 pointer-events-none overflow-hidden"}
      style={{ zIndex: 0 }}
    />
  );
};
