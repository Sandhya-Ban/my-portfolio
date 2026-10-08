import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { skillsData } from '../../data/skills';
import type { SkillNode } from '../../types/portfolio';

interface TechWorldProps {
  activeSkillId: string;
  onSelectSkill: (id: string) => void;
  characterPos?: THREE.Vector3;
}

export function TechWorld({ activeSkillId, onSelectSkill, characterPos }: TechWorldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const worldCenter = useMemo(() => new THREE.Vector3(22, 1.8, -3), []);

  // Compute connections between skill nodes
  const connectionLines = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    const skillMap = new Map<string, SkillNode>(skillsData.map((s) => [s.id, s]));

    skillsData.forEach((skill) => {
      skill.connectionTo.forEach((targetId) => {
        const target = skillMap.get(targetId);
        if (target) {
          lines.push({
            start: skill.position,
            end: target.position,
            color: skill.color,
          });
        }
      });
    });

    return lines;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.12;
    }

    if (characterPos) {
      const dist = characterPos.distanceTo(worldCenter);
      if (dist < 6.0) {
        const skillsToCycle = ['react', 'typescript', 'fastapi', 'postgresql', 'apis'];
        const cycleIdx = Math.floor((clock.elapsedTime * 0.5) % skillsToCycle.length);
        if (skillsToCycle[cycleIdx] !== activeSkillId) {
          onSelectSkill(skillsToCycle[cycleIdx]);
        }
      }
    }
  });

  return (
    <group position={[22, 1.8, -3]} ref={groupRef}>
      {/* Central Pulsing SANDHYA Core Node */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.65, 2]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={2.0}
            wireframe
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
        <pointLight color="#a855f7" distance={8} intensity={3.5} />
      </Float>

      {/* Glowing Connecting Data Beams between Nodes */}
      {connectionLines.map((line, idx) => {
        const points = [
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive
            key={idx}
            object={
              new THREE.Line(
                lineGeo,
                new THREE.LineBasicMaterial({
                  color: line.color,
                  transparent: true,
                  opacity: 0.4,
                })
              )
            }
          />
        );
      })}

      {/* Orbiting Tech Nodes */}
      {skillsData
        .filter((s) => s.id !== 'sandhya')
        .map((skill) => {
          const isActive = skill.id === activeSkillId;
          const scale = isActive ? 1.4 : 1.0;

          return (
            <group
              key={skill.id}
              position={skill.position}
              onClick={(e) => {
                e.stopPropagation();
                onSelectSkill(skill.id);
              }}
            >
              <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
                {/* Node Orb */}
                <mesh scale={scale}>
                  <icosahedronGeometry args={[0.26, 1]} />
                  <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={isActive ? 2.5 : 1.0}
                    roughness={0.2}
                    metalness={0.8}
                  />
                </mesh>

                {/* Outer selection ring if active */}
                {isActive && (
                  <mesh scale={1.8}>
                    <ringGeometry args={[0.28, 0.32, 24]} />
                    <meshBasicMaterial
                      color="#ffffff"
                      side={THREE.DoubleSide}
                      transparent
                      opacity={0.8}
                    />
                  </mesh>
                )}
              </Float>
            </group>
          );
        })}
    </group>
  );
}
