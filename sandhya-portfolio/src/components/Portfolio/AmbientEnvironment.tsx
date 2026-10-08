import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function AmbientEnvironment() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate ambient stars and particles spread across the entire 90-unit universe
  const { positions, colors } = useMemo(() => {
    const count = 650;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#c084fc'), // Electric violet
      new THREE.Color('#38bdf8'), // Soft blue
      new THREE.Color('#f472b6'), // Pink highlight
      new THREE.Color('#ffffff'), // White star
      new THREE.Color('#818cf8'), // Indigo
    ];

    for (let i = 0; i < count; i++) {
      // Spread across x from -10 to +100
      pos[i * 3] = (Math.random() - 0.1) * 110;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26 + 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      // Subtle cosmic drift
      pointsRef.current.rotation.y = clock.elapsedTime * 0.015;
    }
  });

  return (
    <group>
      {/* Cinematic Fog for atmospheric depth */}
      <fog attach="fog" args={['#030712', 12, 38]} />

      {/* Global Ambient & Directional Lights */}
      <ambientLight intensity={0.8} color="#cbd5e1" />

      {/* Key fill light */}
      <directionalLight
        position={[25, 30, 20]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Rim light with purple tint */}
      <directionalLight
        position={[-10, 15, -20]}
        intensity={0.6}
        color="#8b5cf6"
      />

      {/* Starfield Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.75}
        />
      </points>
    </group>
  );
}
