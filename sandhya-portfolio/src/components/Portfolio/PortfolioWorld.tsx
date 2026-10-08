import { useState, useCallback } from 'react';
import * as THREE from 'three';
import { WorldPath } from './WorldPath';
import { CharacterGuide } from './CharacterGuide';
import { DeveloperDesk } from './DeveloperDesk';
import { TechWorld } from './TechWorld';
import { DebuggingWorld } from './DebuggingWorld';
import { ProjectCity } from './ProjectCity';
import { ExperienceWorld } from './ExperienceWorld';
import { GrowthWorld } from './GrowthWorld';
import { FutureWorld } from './FutureWorld';
import { AmbientEnvironment } from './AmbientEnvironment';
import { CameraController } from './CameraController';
import type { ProjectData } from '../../types/portfolio';

interface PortfolioWorldProps {
  progress: number;
  isWalking: boolean;
  activeSkillId: string;
  onSelectSkill: (id: string) => void;
  onSelectProject: (p: ProjectData) => void;
}

export function PortfolioWorld({
  progress,
  isWalking,
  activeSkillId,
  onSelectSkill,
  onSelectProject,
}: PortfolioWorldProps) {
  const [characterPos, setCharacterPos] = useState<THREE.Vector3>(new THREE.Vector3(0, 1, 0));

  const handleCharacterPosition = useCallback((pos: THREE.Vector3) => {
    setCharacterPos(pos.clone());
  }, []);

  return (
    <>
      {/* 1. Cinematic Environment, Fog & Lighting */}
      <AmbientEnvironment />

      {/* 2. Camera Tracking */}
      <CameraController progress={progress} />

      {/* 3. Continuous Glowing Path & Milestone Platforms */}
      <WorldPath />

      {/* 4. Anime Developer Guide Character */}
      <CharacterGuide
        progress={progress}
        isWalking={isWalking}
        onPositionUpdate={handleCharacterPosition}
      />

      {/* 5. Scene 01: Developer Desk & Workstation */}
      <DeveloperDesk />

      {/* 6. Scene 02: Tech Stack Constellation (Developer DNA) */}
      <TechWorld
        activeSkillId={activeSkillId}
        onSelectSkill={onSelectSkill}
        characterPos={characterPos}
      />

      {/* 7. Scene 03: Problem Solving & Debugging Pipeline */}
      <DebuggingWorld />

      {/* 8. Scene 04: Project City */}
      <ProjectCity onSelectProject={onSelectProject} />

      {/* 9. Scene 05: Engineering Pipeline & Experience Workstation */}
      <ExperienceWorld />

      {/* 10. Scene 06: Growth & System Design Constellation */}
      <GrowthWorld />

      {/* 11. Scene 07: Future Horizon Summit */}
      <FutureWorld />
    </>
  );
}
