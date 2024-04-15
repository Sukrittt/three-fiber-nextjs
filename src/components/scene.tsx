"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { Model } from "./model";

export const Scene = () => {
  return (
    <Canvas style={{ background: "#000" }}>
      <Model />

      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
    </Canvas>
  );
};
