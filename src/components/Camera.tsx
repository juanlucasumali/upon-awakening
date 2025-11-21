import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface CameraProps {
  target: React.RefObject<THREE.Mesh | null>;
}

export function Camera({ target }: CameraProps) {
  const { camera } = useThree();
  const cameraOffset = useRef(new THREE.Vector3(0, 3, 7));

  useFrame(() => {
    if (!target.current) return;

    const pos = target.current.position;
    camera.position.copy(pos).add(cameraOffset.current);
    camera.lookAt(pos);
  });

  return null;
}

