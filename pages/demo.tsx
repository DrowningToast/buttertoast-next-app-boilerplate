import { NextPage } from "next";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,

  Environment,
  Float,
  Loader,
  PerspectiveCamera,
  Plane,
  Preload,
} from "@react-three/drei";
import { Duck } from "@components/r3f/demo/Duck";

const Demo: NextPage = () => {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={null}>
        <Canvas
          dpr={[0.1, 1.5]}
          style={{ width: "100%", height: "100%" }}
          gl={{
            toneMappingExposure: 0.95,
          }}
          shadows
        >
          <spotLight
            intensity={1.5}
            position={[2, 6, 3]}
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
            castShadow
            shadow-camera-near={2}
            shadow-camera-far={100}
            shadow-bias={-0.003}
          />
          <Plane
            args={[10, 10, 10, 10]}
            rotation={[(-1 * Math.PI) / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="#efefef" />
          </Plane>
          <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1.1}>
            <Duck position={[0, 0.25, 1.5]} />
          </Float>
          <PerspectiveCamera
            makeDefault
            position={[0, 2, 6]}
            rotation={[-0.35, 0, 0]}
          />
          <AdaptiveDpr pixelated />
          <Environment preset="city" />
          <Preload all />
        </Canvas>
        <Loader />
      </Suspense>
    </div>
  );
};

export default Demo;
