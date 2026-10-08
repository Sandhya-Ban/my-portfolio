import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { WORLD_WAYPOINTS, createWorldCurve } from '../../utils/curve';

export function WorldPath() {
  const curve = useMemo(() => createWorldCurve(), []);
  const lineRef = useRef<THREE.Line>(null);

  // Generate smooth tube geometry along the curve
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 220, 0.08, 8, false);
  }, [curve]);

  // Points along the curve for glow particles
  const pathPoints = useMemo(() => {
    const pts: number[] = [];
    const count = 400;
    for (let i = 0; i <= count; i++) {
      const p = curve.getPointAt(i / count);
      pts.push(p.x, p.y + 0.02, p.z);
    }
    return new Float32Array(pts);
  }, [curve]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  return (
    <group>
      {/* Main glowing path tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer ambient path halo */}
      <mesh geometry={new THREE.TubeGeometry(curve, 160, 0.22, 6, false)}>
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pathway guide particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pathPoints.length / 3}
            array={pathPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#c084fc"
          transparent
          opacity={0.7}
        />
      </points>

      {/* Environment Islands / Platforms under each milestone */}
      {WORLD_WAYPOINTS.map((wp, idx) => {
        const radius = idx === 3 ? 7.5 : idx === 6 ? 6.5 : 4.8;
        return (
          <group key={idx} position={[wp.x, wp.y - 0.25, wp.z]}>
            {/* Hexagonal / cylindrical dark platform */}
            <mesh receiveShadow>
              <cylinderGeometry args={[radius, radius * 0.85, 0.4, 32]} />
              <meshStandardMaterial
                color="#060b17"
                roughness={0.8}
                metalness={0.6}
              />
            </mesh>

            {/* Glowing neon edge ring */}
            <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 0.94, radius, 32]} />
              <meshBasicMaterial
                color={idx === 3 ? '#ec4899' : idx === 2 ? '#38bdf8' : '#8b5cf6'}
                transparent
                opacity={0.4}
              />
            </mesh>

            {/* Subtle inner grid lines */}
            <mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 0.45, radius * 0.47, 32]} />
              <meshBasicMaterial
                color="#6366f1"
                transparent
                opacity={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
