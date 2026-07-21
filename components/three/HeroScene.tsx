"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Icosahedron,
} from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  The morphing core — a distorted icosahedron that reacts to the     */
/*  pointer and pulses. Wireframe twin gives it a technical, "wire"    */
/*  build-in-progress feel.                                            */
/* ------------------------------------------------------------------ */
function Core({ pointer }: { pointer: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null);
  // drei's DistortMaterialImpl type isn't exported; a loose ref keeps the
  // animated `distort` uniform writable without fighting the internal type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mat = useRef<any>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const [px, py] = pointer.current;
    // ease rotation toward pointer
    group.current.rotation.y +=
      (px * 0.6 - group.current.rotation.y) * 0.05 + delta * 0.08;
    group.current.rotation.x += (-py * 0.4 - group.current.rotation.x) * 0.05;

    if (mat.current) {
      const t = state.clock.elapsedTime;
      mat.current.distort = 0.34 + Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <Icosahedron args={[1.35, 12]}>
          <MeshDistortMaterial
            ref={mat}
            color="#0e0e10"
            roughness={0.15}
            metalness={0.9}
            distort={0.34}
            speed={1.6}
            emissive="#5a6a0f"
            emissiveIntensity={0.15}
          />
        </Icosahedron>
        {/* wire shell */}
        <Icosahedron args={[1.6, 2]}>
          <meshBasicMaterial
            color="#d7fb4a"
            wireframe
            transparent
            opacity={0.12}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle constellation — drifts, and gently parallax-follows the   */
/*  pointer.                                                           */
/* ------------------------------------------------------------------ */
function Particles({
  count = 900,
  pointer,
}: {
  count?: number;
  pointer: React.MutableRefObject<[number, number]>;
}) {
  const points = useRef<THREE.Points>(null);

  const positions = useRef<Float32Array>(
    (() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
      return arr;
    })(),
  );

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.03;
    const [px, py] = pointer.current;
    points.current.rotation.x += (py * 0.25 - points.current.rotation.x) * 0.03;
    points.current.position.x += (px * 0.6 - points.current.position.x) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#9aa0aa"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Guarantees the canvas never paints an opaque background. The scene stays
 * transparent (alpha) so the dark page shows through — this is what stops the
 * environment map from ever leaking in as a washed-out background after a
 * re-render or WebGL context restore.
 */
function KeepTransparent() {
  const scene = useThree((s) => s.scene);
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    scene.background = null;
    gl.setClearColor(0x000000, 0);
    // Recover gracefully if the GPU drops the context on scroll / tab switch.
    const canvas = gl.domElement;
    const onLost = (e: Event) => e.preventDefault();
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [scene, gl]);
  useFrame(() => {
    if (scene.background !== null) scene.background = null;
  });
  return null;
}

function PointerTracker({
  pointer,
}: {
  pointer: React.MutableRefObject<[number, number]>;
}) {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current = [
        ((e.clientX - r.left) / r.width) * 2 - 1,
        ((e.clientY - r.top) / r.height) * 2 - 1,
      ];
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl, pointer]);
  return null;
}

export default function HeroScene() {
  const pointer = useRef<[number, number]>([0, 0]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // Static, calm fallback for reduced motion — still renders the object,
  // just without drift/interaction.
  return (
    <Canvas
      className="absolute! inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <KeepTransparent />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#d7fb4a" />
      <directionalLight position={[-6, -2, -4]} intensity={1.4} color="#66e7ff" />
      <pointLight position={[0, 0, 3]} intensity={6} color="#ffffff" distance={9} />

      {!reduced && <PointerTracker pointer={pointer} />}
      <Core pointer={reduced ? { current: [0, 0] } : pointer} />
      <Particles pointer={reduced ? { current: [0, 0] } : pointer} />

      <Environment preset="city" />
    </Canvas>
  );
}
