import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function FutureWorld() {
  const sunriseGlowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (sunriseGlowRef.current) {
      sunriseGlowRef.current.intensity = 2.8 + Math.sin(clock.elapsedTime * 1.5) * 0.4;
    }
  });

  const pillars = ['LEARN', 'BUILD', 'DEBUG', 'DEPLOY', 'GROW'];

  return (
    <group position={[136, 3.8, -1]}>
      {/* Sunrise Ambient Horizon Light */}
      <pointLight
        ref={sunriseGlowRef}
        position={[4, 3, -6]}
        color="#fb923c"
        distance={25}
        intensity={3.0}
      />
      <pointLight
        position={[-3, 4, -4]}
        color="#c084fc"
        distance={20}
        intensity={2.2}
      />

      {/* Futuristic Sunrise Arch / Torus portal */}
      <mesh position={[0, 2.2, -4]}>
        <torusGeometry args={[3.4, 0.08, 16, 64, Math.PI]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 2.2, -4]}>
        <torusGeometry args={[3.6, 0.04, 16, 64, Math.PI]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
      </mesh>

      {/* Floating 5 Engineering Pillar Crystals */}
      <group position={[0, 4.2, -1]}>
        {pillars.map((pillar, idx) => {
          const posX = -3.2 + idx * 1.6;
          return (
            <group key={pillar} position={[posX, 0, 0]}>
              <mesh>
                <octahedronGeometry args={[0.35, 1]} />
                <meshStandardMaterial
                  color="#c084fc"
                  emissive="#a855f7"
                  emissiveIntensity={1.5}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
