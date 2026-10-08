import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createWorldCurve, getSafePointOnCurve, getSafeTangentOnCurve } from '../../utils/curve';

interface CameraControllerProps {
  progress: number;
}

export function CameraController({ progress }: CameraControllerProps) {
  const curve = useMemo(() => createWorldCurve(), []);

  const targetCamPos = useRef(new THREE.Vector3(-1.5, 1.6, 5.8));
  const targetLookAt = useRef(new THREE.Vector3(-0.7, 0.9, 0));
  const currentLookAt = useRef(new THREE.Vector3(-0.7, 0.9, 0));

  useFrame(({ camera }) => {
    const p = Math.min(Math.max(progress, 0), 1);

    // Get character point along curve safely
    const charPoint = getSafePointOnCurve(curve, p);

    // Determine dynamic camera offset based on chapter progress
    let offsetX = 0;
    let offsetY = 1.9;
    let offsetZ = 6.0;
    let lookAtOffsetX = 0;

    if (p < 0.14) {
      // Scene 01 Intro: Position camera to the left so character & workstation sit on the right
      offsetX = -1.5;
      offsetY = 1.6;
      offsetZ = 5.8;
      lookAtOffsetX = -0.7;
    } else if (p < 0.29) {
      // Scene 02 Tech Stack: Angled to see floating nodes and character
      offsetX = -1.2;
      offsetY = 2.2;
      offsetZ = 5.8;
      lookAtOffsetX = 0;
    } else if (p < 0.44) {
      // Scene 03 Debugging: Isometric angle viewing pipeline flow
      offsetX = 0.2;
      offsetY = 2.4;
      offsetZ = 6.0;
      lookAtOffsetX = 0;
    } else if (p < 0.65) {
      // Scene 04 Project City: Pulled back viewing building towers
      offsetX = -1.0;
      offsetY = 2.6;
      offsetZ = 6.5;
      lookAtOffsetX = 0;
    } else if (p < 0.80) {
      // Scene 05 Experience: Focused on workstation & pipeline
      offsetX = 0;
      offsetY = 2.0;
      offsetZ = 5.8;
      lookAtOffsetX = 0;
    } else if (p < 0.92) {
      // Scene 06 Growth: Elevated observing spherical constellation
      offsetX = 1.2;
      offsetY = 2.4;
      offsetZ = 5.6;
      lookAtOffsetX = 0;
    } else {
      // Scene 07 Future: Grand panoramic sunrise vista
      offsetX = 0;
      offsetY = 2.6;
      offsetZ = 6.8;
      lookAtOffsetX = 0;
    }

    // Set smooth camera position
    targetCamPos.current.set(
      charPoint.x + offsetX,
      charPoint.y + offsetY,
      charPoint.z + offsetZ
    );

    // Camera smoothly lerps to target position
    camera.position.lerp(targetCamPos.current, 0.08);

    // Set lookAt target
    const tangent = getSafeTangentOnCurve(curve, p).multiplyScalar(1.2);
    targetLookAt.current.set(
      charPoint.x + lookAtOffsetX + tangent.x * 0.3,
      charPoint.y + 0.9,
      charPoint.z + tangent.z * 0.3
    );

    currentLookAt.current.lerp(targetLookAt.current, 0.09);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
