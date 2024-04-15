"use client";

import { Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, useGLTF, MeshTransmissionMaterial } from "@react-three/drei";

export const Model = () => {
  const { viewport } = useThree();
  const shirtRef = useRef<Mesh | null>(null);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const [active, setActive] = useState(false);

  const handleMeshClick = () => {
    if (!shirtRef.current) return;

    shirtRef.current.scale.x = active ? 1 : 1.5;
    shirtRef.current.scale.y = active ? 1 : 1.5;
    shirtRef.current.scale.z = active ? 1 : 1.5;

    setActive((prev) => !prev);
  };

  const handleWheelSpin = (distance: number) => {
    if (!shirtRef.current) return;

    shirtRef.current.rotation.y += distance * 0.01;
  };

  useFrame(() => {
    if (!shirtRef.current) return;

    shirtRef.current.rotation.y += 0.01;
  });

  return (
    <group scale={viewport.width / 3}>
      <Text
        position={[0, 0, -1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello World
      </Text>
      <mesh
        ref={shirtRef}
        onClick={handleMeshClick}
        onWheel={(e) => handleWheelSpin(e.distance)}
        castShadow
        //   @ts-ignore
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        <MeshTransmissionMaterial
          {...{
            thickness: 0.1,
            roughness: 0.5,
            transmission: 1,
            ior: 1.5,
            chromaticAberration: 0.02,
            backside: true,
          }}
        />
      </mesh>
    </group>
  );
};
