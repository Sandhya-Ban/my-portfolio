import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { debuggingCaseStudy } from '../../data/debugging';

export function DebuggingWorld() {
  const packetRef = useRef<THREE.Mesh>(null);

  // Animate the diagnostic request packet flowing through the 4 stages
  useFrame(({ clock }) => {
    if (packetRef.current) {
      const t = (clock.elapsedTime * 0.8) % 4; // 0 to 4
      const posX = -3.6 + (t / 4) * 7.2;
      packetRef.current.position.x = posX;
      packetRef.current.position.y = Math.sin(t * Math.PI) * 0.25;
    }
  });

  const nodes = debuggingCaseStudy.architectureNodes;

  return (
    <group position={[44, 1.2, -1]}>
      {/* Floating Pipeline Architecture: Frontend -> API Gateway -> Business Logic -> Database */}
      <group position={[0, 1.4, 0]}>
        {/* Connecting bus line */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[7.6, 0.05, 0.05]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>

        {/* Animated moving packet */}
        <mesh ref={packetRef} position={[-3.6, 0, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
          <pointLight color="#38bdf8" distance={3} intensity={2.5} />
        </mesh>

        {/* The 4 Architectural Layers */}
        {nodes.map((node, idx) => {
          const posX = -3.6 + idx * 2.4;
          const isIssue = node.status === 'issue';
          const isFixed = node.status === 'fixed';
          const nodeColor = isFixed ? '#a855f7' : isIssue ? '#f59e0b' : '#38bdf8';

          return (
            <group key={node.name} position={[posX, 0, 0]}>
              {/* 3D Pillar Cube */}
              <mesh>
                <boxGeometry args={[0.55, 0.55, 0.55]} />
                <meshStandardMaterial
                  color={nodeColor}
                  emissive={nodeColor}
                  emissiveIntensity={1.0}
                  roughness={0.3}
                  metalness={0.7}
                />
              </mesh>

              {/* Pedestal Cylinder */}
              <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.12, 0.16, 0.65, 16]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
