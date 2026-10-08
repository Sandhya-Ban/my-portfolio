import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { projectsData } from '../../data/projects';
import type { ProjectData } from '../../types/portfolio';

interface ProjectCityProps {
  onSelectProject: (project: ProjectData) => void;
  activeProjectId?: string | null;
}

export function ProjectCity({ onSelectProject }: ProjectCityProps) {
  const cityGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (cityGroupRef.current) {
      cityGroupRef.current.position.y = 1.6 + Math.sin(clock.elapsedTime * 0.8) * 0.05;
    }
  });

  const buildingOffsets: [number, number, number][] = [
    [-4.5, 0, 0],    // 1. Divine Food
    [-1.5, 0, -1.2], // 2. HMS
    [1.5, 0, 0.4],   // 3. Job Tracker
    [4.5, 0, -0.8],  // 4. Vegetable Inventory
  ];

  return (
    <group position={[68, 1.6, -5]} ref={cityGroupRef}>
      {projectsData.map((project, idx) => {
        const pos = buildingOffsets[idx];
        const isCoupon = project.id === 'divine-food';
        const isHms = project.id === 'hms';
        const isJob = project.id === 'job-tracker';

        const height = isCoupon ? 3.8 : isHms ? 4.0 : isJob ? 3.4 : 3.2;

        return (
          <group
            key={project.id}
            position={pos}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project);
            }}
          >
            {/* Building Main Tower Mesh */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, height, 1.5]} />
              <meshStandardMaterial
                color="#0a101f"
                roughness={0.25}
                metalness={0.85}
              />
            </mesh>

            {/* Glowing neon window bands */}
            <mesh position={[0, height * 0.75, 0]}>
              <boxGeometry args={[1.52, 0.12, 1.52]} />
              <meshBasicMaterial color={project.accentColor} />
            </mesh>
            <mesh position={[0, height * 0.45, 0]}>
              <boxGeometry args={[1.52, 0.08, 1.52]} />
              <meshBasicMaterial color={project.accentColor} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, height * 0.2, 0]}>
              <boxGeometry args={[1.52, 0.08, 1.52]} />
              <meshBasicMaterial color={project.accentColor} transparent opacity={0.6} />
            </mesh>

            {/* Spire / Antenna on top */}
            <mesh position={[0, height + 0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.06, 1.0, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
            </mesh>
            <mesh position={[0, height + 1.0, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color={project.accentColor} />
            </mesh>

            {/* Glowing Point Light on Building Top */}
            <pointLight
              position={[0, height + 0.8, 0]}
              color={project.accentColor}
              distance={5}
              intensity={2.5}
            />
          </group>
        );
      })}
    </group>
  );
}
