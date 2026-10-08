import * as THREE from 'three';

export const WORLD_WAYPOINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 0),         // 0. Intro / Developer Desk
  new THREE.Vector3(22, 1.2, -3),     // 1. Tech Stack Constellation
  new THREE.Vector3(44, 0.8, -1),     // 2. Debugging Pipeline
  new THREE.Vector3(68, 1.6, -5),     // 3. Project City
  new THREE.Vector3(92, 1.2, -2),     // 4. Experience Workstation
  new THREE.Vector3(114, 2.2, -4),    // 5. Growth Constellation
  new THREE.Vector3(136, 3.8, -1),    // 6. Future Summit
];

export function createWorldCurve(): THREE.CatmullRomCurve3 {
  const points = WORLD_WAYPOINTS.map((p) => p.clone());
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
}

export function getSafePointOnCurve(curve: THREE.CatmullRomCurve3, progress: number): THREE.Vector3 {
  const safeP = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 0.9999) : 0;
  try {
    return curve.getPointAt(safeP);
  } catch {
    return new THREE.Vector3(0, 0, 0);
  }
}

export function getSafeTangentOnCurve(curve: THREE.CatmullRomCurve3, progress: number): THREE.Vector3 {
  const safeP = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 0.9999) : 0;
  try {
    return curve.getTangentAt(safeP);
  } catch {
    return new THREE.Vector3(1, 0, 0);
  }
}
