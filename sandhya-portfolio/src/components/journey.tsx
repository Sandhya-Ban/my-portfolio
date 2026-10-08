import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  Float,
  Html,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import animeSandhya from "../assets/anime-sandhya.png";

// ─────────────────────────────────────────────
// Journey data
// ─────────────────────────────────────────────

const journey = [
  {
    title: "Learning",
    subtitle: "Where my journey began",
    skills: "Python • DSA • Web Basics",
    color: "#f6c7a5",
  },

  {
    title: "Building Skills",
    subtitle: "Turning curiosity into skills",
    skills: "React • TypeScript • FastAPI",
    color: "#c9b6ff",
  },

  {
    title: "Real Projects",
    subtitle: "Turning ideas into real products",
    skills: "Divine Food • HMS • Job Tracker",
    color: "#a9d8ff",
  },

  {
    title: "Experience",
    subtitle: "Solving real-world problems",
    skills: "Frontend • Backend • Full Stack",
    color: "#b8e0c8",
  },

  {
    title: "Growth",
    subtitle: "Always learning. Always building.",
    skills: "APIs • Databases • System Design",
    color: "#ffd6a5",
  },

  {
    title: "Future Goals",
    subtitle: "Building something meaningful",
    skills: "Scalable Apps • Open Source • Tech",
    color: "#f7b2d8",
  },
];


// ─────────────────────────────────────────────
// Little anime developer
// ─────────────────────────────────────────────

function DeveloperCharacter() {
  const character = useRef<HTMLDivElement>(null);

  return (
    <Html
      center
      distanceFactor={6}
      transform
      sprite
    >
      <div
        ref={character}
        className="relative"
        style={{
          width: "180px",
          height: "260px",
        }}
      >
        <img
          src={animeSandhya}
          alt="Anime Sandhya"
          className="h-full w-full object-contain"
        />

        {/* Walking shadow */}
        <div
          className="absolute bottom-1 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-black/30 blur-md"
        />
      </div>
    </Html>
  );
}


// ─────────────────────────────────────────────
// Floating island
// ─────────────────────────────────────────────

function Island({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  return (
    <group position={position}>

      {/* Island */}
      <mesh>
        <cylinderGeometry args={[2.2, 1.6, 0.6, 32]} />

        <meshStandardMaterial
          color="#3f5f50"
          roughness={0.9}
        />
      </mesh>

      {/* Grass */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.15, 32]} />

        <meshStandardMaterial color={color} />
      </mesh>

      {/* Little tree */}
      <mesh position={[0.9, 1, -0.3]}>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 12]} />

        <meshStandardMaterial color="#70452b" />
      </mesh>

      <mesh position={[0.9, 1.55, -0.3]}>
        <sphereGeometry args={[0.45, 16, 16]} />

        <meshStandardMaterial color="#6fa878" />
      </mesh>

      {/* Number */}
      <Html
        position={[0, 1.2, 0]}
        center
        distanceFactor={7}
      >
        <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/20 bg-black/60 px-4 py-2 text-center text-white backdrop-blur-md">
          <div className="text-xs text-purple-300">
            {index + 1}
          </div>

          <div className="text-sm font-semibold">
            {journey[index].title}
          </div>
        </div>
      </Html>

    </group>
  );
}


// ─────────────────────────────────────────────
// Journey world
// ─────────────────────────────────────────────

function JourneyWorld() {
  const scroll = useScroll();

  const character = useRef<THREE.Group>(null);
  const cameraTarget = useRef(new THREE.Vector3());
const path = useMemo(() => {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-8, 0, 0),

    new THREE.Vector3(-5.5, 1.2, -1),

    new THREE.Vector3(-2.5, 0.3, 0),

    new THREE.Vector3(0.5, 1.5, -1),

    new THREE.Vector3(3.5, 0.8, 0),

    new THREE.Vector3(7, 2.5, -1),
  ]);
}, []);

  useFrame(({ camera }) => {

    const progress = scroll.offset;

    const point = path.getPointAt(progress);

    if (character.current) {
  character.current.position.lerp(point, 0.08);

  // Small walking/bouncing motion
  character.current.position.y +=
    Math.sin(progress * Math.PI * 30) * 0.04;
}
    cameraTarget.current.set(
      point.x,
      point.y + 2,
      point.z + 9
    );

    camera.position.lerp(
      cameraTarget.current,
      0.04
    );

    camera.lookAt(
      point.x,
      point.y,
      point.z
    );
  });

  const islandPositions: [number, number, number][] = [
    [-8, 0, 0],
    [-5, 1, -1],
    [-2, 0, 0],
    [1, 1, -1],
    [4, 0, 0],
    [7, 2, -1],
  ];

  return (
    <>
      {/* Character */}

      <group ref={character}>
        <DeveloperCharacter />
      </group>


      {/* Islands */}

      {islandPositions.map((position, index) => (
        <Island
          key={index}
          position={position}
          index={index}
          color={journey[index].color}
        />
      ))}


      {/* Stars */}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={
              new Float32Array(
                Array.from(
                  { length: 900 },
                  () => (Math.random() - 0.5) * 40
                )
              )
            }
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.035}
          color="#ffffff"
        />
      </points>
    </>
  );
}


// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function Journey() {

  return (
    <section className="relative h-screen bg-[#071018]">

      <Canvas
        camera={{
          position: [0, 3, 10],
          fov: 50,
        }}
      >

        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 10, 5]}
          intensity={3}
        />

        <ScrollControls
          pages={6}
          damping={0.15}
        >

          <JourneyWorld />

          <Scroll html>

            <div className="pointer-events-none w-screen">

              {journey.map((item, index) => (

                <div
                  key={item.title}
                  className="flex h-screen items-center px-8 md:px-24"
                >

                  <div
                    className={`max-w-md ${
                      index % 2 === 0
                        ? ""
                        : "ml-auto text-right"
                    }`}
                  >

                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-300">
                      Chapter {index + 1}
                    </p>

                    <h2 className="text-5xl font-bold text-white md:text-7xl">
                      {item.title}
                    </h2>

                    <p className="mt-5 text-xl text-gray-300">
                      {item.subtitle}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                      {item.skills}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </Scroll>

        </ScrollControls>

      </Canvas>

      {/* Scroll hint */}

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center text-sm text-gray-400">

        ↓ Scroll to follow my journey

      </div>

    </section>
  );
}

export default Journey;