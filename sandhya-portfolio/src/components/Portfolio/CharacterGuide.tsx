import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import animeSandhya from '../../assets/anime-sandhya.png';
import { createWorldCurve, getSafePointOnCurve } from '../../utils/curve';

interface CharacterGuideProps {
  progress: number;
  isWalking: boolean;
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}

export function CharacterGuide({ progress, isWalking, onPositionUpdate }: CharacterGuideProps) {
  const curve = useMemo(() => createWorldCurve(), []);
  const characterGroup = useRef<THREE.Group>(null);
  const characterSpriteRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const leftRippleRef = useRef<HTMLDivElement>(null);
  const rightRippleRef = useRef<HTMLDivElement>(null);

  // Animation state references
  const walkPhase = useRef(0);
  const facingDirection = useRef<1 | -1>(1);
  const smoothedPosition = useRef(new THREE.Vector3());
  const prevProgress = useRef(progress);
  const lastStepTime = useRef(0);
  const [stepSparkles, setStepSparkles] = useState<number[]>([]);

  useFrame((state, delta) => {
    if (!characterGroup.current) return;

    const p = Math.min(Math.max(progress, 0), 1);
    const progressDelta = p - prevProgress.current;
    prevProgress.current = p;

    // Determine target point along 3D path curve safely
    const targetPoint = getSafePointOnCurve(curve, p);
    smoothedPosition.current.lerp(targetPoint, 0.16);

    // Track movement direction
    if (progressDelta > 0.00015) {
      facingDirection.current = 1; // Facing forward (right)
    } else if (progressDelta < -0.00015) {
      facingDirection.current = -1; // Facing backward (left)
    }

    // Step cycle phase
    if (isWalking) {
      walkPhase.current += delta * 14.5; // Natural human cadence (~2.3 steps/sec)
    }

    const stepCycle = walkPhase.current;

    // 1. Double-bounce vertical gait bob (pelvis peaks at mid-stance, dips at heel strike)
    const walkBob = isWalking
      ? Math.abs(Math.sin(stepCycle)) * 0.09
      : Math.sin(state.clock.elapsedTime * 2.2) * 0.02;

    // 2. Squash and stretch dynamics
    // Compression at foot contact (sin near 0), extension at mid-stride (sin near 1)
    const contactFactor = Math.abs(Math.sin(stepCycle));
    const squashY = isWalking ? 0.94 + contactFactor * 0.09 : 1.0 + Math.sin(state.clock.elapsedTime * 2.2) * 0.015;
    const stretchX = isWalking ? 1.05 - contactFactor * 0.08 : 1.0;

    // 3. Forward walking lean + lateral weight shift
    const forwardLean = isWalking ? facingDirection.current * 4.8 : 0;
    const hipSway = isWalking
      ? Math.sin(stepCycle) * 3.5
      : Math.sin(state.clock.elapsedTime * 1.2) * 0.8;
    const totalRotation = forwardLean + hipSway;

    // 4. Stride shear / skew to simulate dynamic leg swing
    const strideSkew = isWalking ? Math.sin(stepCycle) * 3.2 : 0;

    // Apply translation to 3D Three.js group
    characterGroup.current.position.set(
      smoothedPosition.current.x,
      smoothedPosition.current.y + 0.84 + walkBob,
      smoothedPosition.current.z
    );

    // Apply combined transforms to 2D sprite inside HTML
    if (characterSpriteRef.current) {
      const flip = facingDirection.current === 1 ? 'scaleX(1)' : 'scaleX(-1)';
      characterSpriteRef.current.style.transform = `
        ${flip}
        rotate(${totalRotation}deg)
        skewX(${strideSkew}deg)
        scale(${stretchX}, ${squashY})
      `;
    }

    // 5. Dynamic Ground Shadow (spreads when foot lands, contracts when lifted)
    if (shadowRef.current) {
      const shadowScale = isWalking
        ? 0.88 + (1 - contactFactor) * 0.3
        : 1.0 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08;
      const shadowOpacity = isWalking
        ? 0.5 - walkBob * 1.5
        : 0.38;
      shadowRef.current.style.transform = `translateX(-50%) scale(${shadowScale})`;
      shadowRef.current.style.opacity = `${Math.max(0.18, shadowOpacity)}`;
    }

    // 6. Footstep ground ripple triggers on path
    if (isWalking && state.clock.elapsedTime - lastStepTime.current > 0.22) {
      const isRightFoot = Math.sin(stepCycle) > 0;
      lastStepTime.current = state.clock.elapsedTime;

      const ripple = isRightFoot ? rightRippleRef.current : leftRippleRef.current;
      if (ripple) {
        ripple.style.transform = 'translate(-50%, -50%) scale(1.9)';
        ripple.style.opacity = '0.75';
        setTimeout(() => {
          if (ripple) {
            ripple.style.transform = 'translate(-50%, -50%) scale(2.8)';
            ripple.style.opacity = '0';
          }
        }, 80);
      }
    }

    if (onPositionUpdate) {
      onPositionUpdate(characterGroup.current.position);
    }
  });

  return (
    <group ref={characterGroup} position={[0, 0.84, 0]}>
      <Html
        center
        distanceFactor={6.8}
        transform
        sprite
        className="pointer-events-none select-none"
      >
        <div className="relative flex flex-col items-center">
          {/* Ambient glowing aura behind character */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

          {/* Character Sprite Container with Squash & Stretch */}
          <div
            ref={characterSpriteRef}
            className="relative will-change-transform origin-bottom transition-[transform] duration-75"
            style={{ width: '168px', height: '248px' }}
          >
            <img
              src={animeSandhya}
              alt="Sandhya B — Full Stack Developer Guide"
              className="h-full w-full object-contain filter drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
              loading="eager"
            />
          </div>

          {/* Dynamic Ground Footstep Shockwave Rings */}
          <div
            ref={leftRippleRef}
            className="absolute -bottom-2 left-1/2 h-7 w-20 rounded-full border border-purple-400 bg-purple-500/20 opacity-0 pointer-events-none transition-all duration-300"
            style={{ transform: 'translate(-50%, -50%) scale(1)' }}
          />
          <div
            ref={rightRippleRef}
            className="absolute -bottom-2 left-1/2 h-7 w-20 rounded-full border border-sky-400 bg-sky-500/20 opacity-0 pointer-events-none transition-all duration-300"
            style={{ transform: 'translate(-50%, -50%) scale(1)' }}
          />

          {/* Ground Shadow */}
          <div
            ref={shadowRef}
            className="absolute -bottom-2 left-1/2 h-3.5 w-24 -translate-x-1/2 rounded-full bg-black/65 blur-md pointer-events-none transition-[opacity,transform] duration-75"
          />

          {/* Walk Stride Foot Dust Sparkles */}
          {isWalking && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400/80 animate-ping" />
              <span className="h-1 w-1 rounded-full bg-cyan-300/80 animate-pulse" />
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
