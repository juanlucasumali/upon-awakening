import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Plane } from "./components/Plane";
import { Cube } from "./components/Cube";
import { Lights } from "./components/Lights";
import { Camera } from "./components/Camera";
import * as THREE from "three";

export default function App() {
  const cubeRef = useRef<THREE.Mesh>(null);

  return (
    <div id="canvas-container">
      <Canvas shadows camera={{ position: [0, 5, 5], fov: 50 }}>
        <Lights />
        <Plane />
        <Cube ref={cubeRef} />
        <Camera target={cubeRef} />
      </Canvas>
    </div>
  );
}
