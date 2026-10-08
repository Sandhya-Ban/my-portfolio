import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function DeveloperDesk() {
  const monitorGlowRef = useRef<THREE.PointLight>(null);
  const monitorMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // Generate high-resolution dynamic terminal canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = texture;

    if (monitorMatRef.current) {
      monitorMatRef.current.map = texture;
      monitorMatRef.current.needsUpdate = true;
    }

    const lines = [
      { text: '$ whoami', color: '#c084fc' },
      { text: 'Sandhya B • Hyderabad, India', color: '#f3f4f6' },
      { text: '$ role', color: '#c084fc' },
      { text: 'Software Engineer | Full Stack Development', color: '#f3f4f6' },
      { text: '$ contact', color: '#c084fc' },
      { text: 'banothsandhya119@gmail.com | +91 6305457284', color: '#38bdf8' },
      { text: '$ stack', color: '#c084fc' },
      { text: 'React.js • TypeScript • Python • MySQL • PostgreSQL • FastAPI', color: '#a855f7' },
      { text: '$ ./launch-portfolio', color: '#c084fc' },
      { text: '[OK] 20% HMS latency cut & Divine Food delivered end-to-end', color: '#10b981' },
      { text: '$ _', color: '#c084fc' },
    ];

    let visibleCount = 0;
    const interval = setInterval(() => {
      if (visibleCount < lines.length) {
        visibleCount++;

        // Draw terminal background
        ctx.fillStyle = '#060a14';
        ctx.fillRect(0, 0, 1024, 512);

        // Window header bar
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 1024, 60);

        // Window buttons (red, yellow, green)
        ctx.beginPath();
        ctx.arc(36, 30, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(72, 30, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(108, 30, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        // Header title
        ctx.fillStyle = '#94a3b8';
        ctx.font = '22px monospace';
        ctx.fillText('sandhya@workstation:~ (zsh)', 160, 38);

        // Terminal text lines
        ctx.font = 'bold 28px monospace';
        let y = 120;
        for (let i = 0; i < visibleCount; i++) {
          ctx.fillStyle = lines[i].color;
          ctx.fillText(lines[i].text, 48, y);
          y += 44;
        }

        texture.needsUpdate = true;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (monitorGlowRef.current) {
      monitorGlowRef.current.intensity = 1.6 + Math.sin(t * 3) * 0.25;
    }
  });

  return (
    <group position={[1.4, 0, -0.6]}>
      {/* 1. Main Ergonomic Desk Surface */}
      <mesh position={[0, 0.75, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.4]} />
        <meshStandardMaterial
          color="#0d111c"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Desk Bevel Edge / Subtle RGB Accent */}
      <mesh position={[0, 0.72, -0.1]}>
        <boxGeometry args={[3.22, 0.02, 0.02]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>

      {/* Desk Legs (Steel T-Frame) */}
      <mesh position={[-1.4, 0.375, -0.8]}>
        <boxGeometry args={[0.08, 0.75, 1.2]} />
        <meshStandardMaterial color="#1a2030" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[1.4, 0.375, -0.8]}>
        <boxGeometry args={[0.08, 0.75, 1.2]} />
        <meshStandardMaterial color="#1a2030" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 2. Primary Curved Ultrawide Monitor */}
      <group position={[0, 1.5, -1.1]}>
        {/* Monitor Screen Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.5, 1.2, 0.06]} />
          <meshStandardMaterial color="#050811" roughness={0.5} metalness={0.8} />
        </mesh>

        {/* Display Panel Face using CanvasTexture */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[2.42, 1.12]} />
          <meshBasicMaterial ref={monitorMatRef} color="#ffffff" />
        </mesh>

        {/* Monitor Stand Base & Arm */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.75, 0.1]}>
          <cylinderGeometry args={[0.3, 0.32, 0.02, 32]} />
          <meshStandardMaterial color="#1a202c" metalness={0.9} />
        </mesh>

        {/* Emissive light casting from monitor onto desk */}
        <pointLight
          ref={monitorGlowRef}
          position={[0, 0, 0.5]}
          color="#8b5cf6"
          distance={4}
          intensity={1.8}
        />
      </group>

      {/* 3. Developer Laptop */}
      <group position={[-1.0, 0.81, -0.7]} rotation={[0, 0.35, 0]}>
        <mesh>
          <boxGeometry args={[0.55, 0.015, 0.38]} />
          <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.3} />
        </mesh>
        <group position={[0, 0.01, -0.19]} rotation={[-0.4, 0, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.55, 0.36, 0.012]} />
            <meshStandardMaterial color="#1a202c" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.18, 0.008]}>
            <planeGeometry args={[0.52, 0.33]} />
            <meshBasicMaterial color="#0d1627" />
          </mesh>
        </group>
      </group>

      {/* 4. Mechanical Keyboard */}
      <group position={[0, 0.805, -0.5]}>
        <mesh>
          <boxGeometry args={[0.8, 0.02, 0.28]} />
          <meshStandardMaterial color="#111827" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.76, 0.015, 0.24]} />
          <meshStandardMaterial color="#1f2937" roughness={0.8} />
        </mesh>
      </group>

      {/* 5. Minimalist Mouse */}
      <mesh position={[0.6, 0.805, -0.5]}>
        <boxGeometry args={[0.1, 0.025, 0.16]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>

      {/* 6. Coffee Mug */}
      <group position={[1.1, 0.87, -0.55]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
          <meshStandardMaterial color="#374151" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <circleGeometry args={[0.062, 16]} />
          <meshBasicMaterial color="#2d1b0d" />
        </mesh>
      </group>

      {/* 7. Subtle Ambient Floating Code Particles */}
      <points position={[0, 1.4, -0.8]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={60}
            array={
              new Float32Array(
                Array.from({ length: 180 }, () => (Math.random() - 0.5) * 2.5)
              )
            }
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#a855f7" transparent opacity={0.6} />
      </points>
    </group>
  );
}
