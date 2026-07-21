"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function KeepTransparent() {
  const scene = useThree((s) => s.scene);
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    scene.background = null;
    gl.setClearColor(0x000000, 0);
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

function Knot({ colorRef }: { colorRef: React.MutableRefObject<string> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const target = useRef(new THREE.Color("#39ff88"));
  const pointer = useRef<[number, number]>([0, 0]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.25;
      mesh.current.rotation.y += delta * 0.35;
      // subtle pointer parallax
      const px = state.pointer.x;
      const py = state.pointer.y;
      mesh.current.rotation.z += (px * 0.3 - mesh.current.rotation.z) * 0.04;
      mesh.current.position.y = py * 0.15;
    }
    if (mat.current) {
      target.current.set(colorRef.current);
      mat.current.color.lerp(target.current, 0.06);
      mat.current.emissive.lerp(target.current, 0.06);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <TorusKnot ref={mesh} args={[0.85, 0.28, 220, 32]}>
        <meshStandardMaterial
          ref={mat}
          metalness={0.95}
          roughness={0.12}
          emissiveIntensity={0.22}
        />
      </TorusKnot>
    </Float>
  );
}

export default function WorkGem({
  colorRef,
}: {
  colorRef: React.MutableRefObject<string>;
}) {
  return (
    <Canvas
      className="absolute! inset-0"
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <KeepTransparent />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} />
      <pointLight position={[-4, -2, 2]} intensity={3} color="#66e7ff" />
      <Knot colorRef={colorRef} />
      <Environment preset="night" />
    </Canvas>
  );
}
