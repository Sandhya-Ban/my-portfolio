import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { pipelineStages } from '../../data/experience';

export function ExperienceWorld() {
  const pipelineRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (pipelineRef.current) {
      pipelineRef.current.position.y = 1.2 + Math.sin(clock.elapsedTime * 0.9) * 0.04;
    }
  });

  return (
    <group position={[92, 1.2, -2]} ref={pipelineRef}>
      {/* Floating 5-Stage Engineering Pipeline */}
      <group position={[0, 1.8, 0]}>
        {/* Connecting pipeline beam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[8.6, 0.05, 0.05]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>

        {pipelineStages.map((stage, idx) => {
          const posX = -4.0 + idx * 2.0;

          return (
            <group key={stage.id} position={[posX, 0, 0]}>
              {/* Pipeline Node Cube */}
              <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                  color="#8b5cf6"
                  emissive="#7c3aed"
                  emissiveIntensity={1.0}
                  metalness={0.8}
                />
              </mesh>

              {/* Pedestal Stand */}
              <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.1, 0.14, 0.7, 16]} />
                <meshStandardMaterial color="#1f2937" metalness={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
