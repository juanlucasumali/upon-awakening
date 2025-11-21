import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, forwardRef } from "react";
import * as THREE from "three";

export const Cube = forwardRef<THREE.Mesh>((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const keys = useRef<Set<string>>(new Set());
  const velocity = useRef(0);
  
  const speed = 0.5;
  const jumpPower = 0.3;
  const gravity = 0.02;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current.add(e.key.toLowerCase());
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const pos = meshRef.current.position;
    const isGrounded = pos.y <= 0.5;

    // Movement
    if (keys.current.has("w")) pos.z -= speed;
    if (keys.current.has("s")) pos.z += speed;
    if (keys.current.has("a")) pos.x -= speed;
    if (keys.current.has("d")) pos.x += speed;
    if (keys.current.has(" ") && isGrounded) {
      velocity.current = jumpPower;
    }

    // Jump physics
    pos.y += velocity.current;
    if (pos.y > 0.5) {
      velocity.current -= gravity;
    } else {
      pos.y = 0.5;
      velocity.current = 0;
    }
  });

  return (
    <mesh ref={(node) => {
      meshRef.current = node!;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }} position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4a9eff" />
    </mesh>
  );
});
