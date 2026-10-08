import { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PortfolioWorld } from './PortfolioWorld';
import { Navbar } from '../ui/Navbar';
import { ChapterOverlay } from '../ui/ChapterOverlay';
import { ChapterContentOverlay } from '../ui/ChapterContentOverlay';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { ContactModal } from '../ui/ContactModal';
import type { ProjectData } from '../../types/portfolio';
import { chapters } from '../../data/journey';

export function PortfolioCanvas() {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState('react');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Target and current progress references for buttery smooth lerping
  const targetProgress = useRef(0);
  const smoothedProgress = useRef(0);
  const touchStartY = useRef(0);

  // Compute active chapter index from progress
  const activeChapterIndex = Math.min(
    chapters.length - 1,
    Math.max(
      0,
      chapters.findIndex(
        (ch) =>
          currentProgress >= ch.progressRange[0] &&
          currentProgress < ch.progressRange[1]
      ) !== -1
        ? chapters.findIndex(
            (ch) =>
              currentProgress >= ch.progressRange[0] &&
              currentProgress < ch.progressRange[1]
          )
        : currentProgress >= 0.92
        ? 6
        : 0
    )
  );

  const handleNavigate = useCallback((prog: number) => {
    targetProgress.current = Math.min(1, Math.max(0, prog));
  }, []);

  const isModalOpenRef = useRef(false);
  useEffect(() => {
    isModalOpenRef.current = Boolean(selectedProject || isContactOpen);
  }, [selectedProject, isContactOpen]);

  // Universal smooth wheel, touch, and mouse drag controls
  useEffect(() => {
    let isMouseDown = false;
    let dragStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isModalOpenRef.current) return;
      const rawDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const delta = rawDelta * 0.00045;
      if (!Number.isFinite(delta)) return;
      targetProgress.current = Math.min(1, Math.max(0, targetProgress.current + delta));
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isModalOpenRef.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isModalOpenRef.current) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      targetProgress.current = Math.min(1, Math.max(0, targetProgress.current + deltaY * 0.0012));
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isModalOpenRef.current) return;
      if (e.button !== 0) return;
      if (e.target instanceof HTMLElement && e.target.closest('button, a, input, textarea, select')) return;
      isMouseDown = true;
      dragStartY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || isModalOpenRef.current) return;
      const deltaY = dragStartY - e.clientY;
      dragStartY = e.clientY;
      if (Math.abs(deltaY) > 0) {
        targetProgress.current = Math.min(1, Math.max(0, targetProgress.current + deltaY * 0.0015));
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpenRef.current) return;
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight' || e.key === ' ') {
        targetProgress.current = Math.min(1, targetProgress.current + 0.06);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        targetProgress.current = Math.max(0, targetProgress.current - 0.06);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Animation frame loop for continuous lerp
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (!Number.isFinite(targetProgress.current)) targetProgress.current = 0;
      targetProgress.current = Math.min(1, Math.max(0, targetProgress.current));

      const diff = targetProgress.current - smoothedProgress.current;
      const absDiff = Math.abs(diff);

      if (absDiff > 0.00005) {
        // Natural walking travel speed across chapters:
        // For inter-chapter jumps, govern speed so character visibly takes walking strides along path
        const isInterChapterNav = absDiff > 0.04;
        const maxStepPerFrame = isInterChapterNav ? 0.0034 : 0.009;
        const step = Math.sign(diff) * Math.min(absDiff * 0.07, maxStepPerFrame);
        const appliedStep = absDiff < 0.0006 ? diff : Math.sign(diff) * Math.max(Math.abs(step), 0.0005);

        smoothedProgress.current += appliedStep;
        smoothedProgress.current = Math.min(1, Math.max(0, smoothedProgress.current));
        setCurrentProgress(smoothedProgress.current);
        setIsWalking(true);
      } else {
        smoothedProgress.current = targetProgress.current;
        setCurrentProgress(smoothedProgress.current);
        setIsWalking(false);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#030712] select-none text-white">
      {/* 1. Fixed Top Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        isScrolled={currentProgress > 0.04}
        activeChapterIndex={activeChapterIndex}
        currentProgress={currentProgress}
      />

      {/* 2. Fixed HUD / Chapter Indicator & Progress Dots */}
      <ChapterOverlay
        activeChapterIndex={activeChapterIndex}
        onJumpToChapter={handleNavigate}
      />

      {/* 3. Fixed Chapter Content Overlay (Hero, Skills, Debug, Projects, etc.) */}
      <ChapterContentOverlay
        activeChapterIndex={activeChapterIndex}
        activeSkillId={activeSkillId}
        onSelectSkill={setActiveSkillId}
        onSelectProject={setSelectedProject}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 4. Primary 3D WebGL Canvas */}
      <Canvas
        camera={{
          position: [-1.5, 1.6, 5.8],
          fov: 48,
        }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        className="h-full w-full"
      >
        <PortfolioWorld
          progress={currentProgress}
          isWalking={isWalking}
          activeSkillId={activeSkillId}
          onSelectSkill={setActiveSkillId}
          onSelectProject={setSelectedProject}
        />
      </Canvas>

      {/* 5. Interactive Project Detail Inspection Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 6. Contact & Collaboration Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
