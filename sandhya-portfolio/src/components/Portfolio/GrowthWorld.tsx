import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { growthConcepts } from '../../data/experience';

export function GrowthWorld() {
  const constellationRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (constellationRef.current) {
      constellationRef.current.rotation.y = clock.elapsedTime * 0.12;
    }
  });

  return (
    <group position={[114, 2.2, -4]}>
      {/* Orbiting Constellation of Growth Concepts */}
      <group ref={constellationRef} position={[0, 1.5, 0]}>
        {growthConcepts.map((concept, idx) => {
          const angle = (idx / growthConcepts.length) * Math.PI * 2;
          const radius = 3.6;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = idx % 2 === 0 ? 0.4 : -0.4;

          return (
            <group key={concept.id} position={[x, y, z]}>
              {/* Concept Node Orb */}
              <mesh>
                <octahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial
                  color="#c084fc"
                  emissive="#a855f7"
                  emissiveIntensity={1.4}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            </group>
          );
        })}

        {/* Central Core Lattice */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
