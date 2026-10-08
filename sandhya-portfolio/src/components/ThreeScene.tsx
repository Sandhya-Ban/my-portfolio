import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DeveloperOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x =
      state.clock.elapsedTime * 0.15;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.2;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={meshRef} scale={1.1}>

        <icosahedronGeometry args={[1, 2]} />

        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.25}
          metalness={0.8}
        />

      </mesh>
    </Float>
  );
}

function ThreeScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 45,
      }}
    >

      <ambientLight intensity={0.4} />

      <pointLight
        position={[2, 2, 3]}
        intensity={2}
        color="#8b5cf6"
      />

      <DeveloperOrb />

    </Canvas>
  );
}

export default ThreeScene;