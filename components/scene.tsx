"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Environment,
  Text,
} from "@react-three/drei";
import type { Mesh, Group } from "three";

function AnimatedBox({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  );
}

function AnimatedSphere({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function AnimatedTorus({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function AnimatedCone({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <coneGeometry args={[0.4, 0.8, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
      </mesh>
    </Float>
  );
}

function AnimatedOctahedron({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function SceneTitle() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2.5, 0]}>
      <Text
        fontSize={1}
        color="#a78bfa"
        anchorX="center"
        anchorY="middle"
      >
        Tomas Lönnblad
        <meshStandardMaterial color="#a78bfa" metalness={0.5} roughness={0.3} />
      </Text>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#1a1625" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <color attach="background" args={["#0f0d15"]} />
        <fog attach="fog" args={["#0f0d15", 10, 30]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f97316" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />

        <SceneTitle />

        {/* Main shapes cluster */}
        <AnimatedBox position={[-2.5, 0, 0]} color="#a78bfa" scale={1.2} speed={0.8} />
        <AnimatedSphere position={[2.5, 0.5, 0]} color="#f97316" scale={1.5} />
        <AnimatedTorus position={[0, -0.5, 2]} color="#4ade80" scale={1.3} />
        <AnimatedCone position={[-1.5, 1, -2]} color="#f472b6" scale={1.4} />
        <AnimatedOctahedron position={[1.5, 1.5, -1.5]} color="#60a5fa" scale={1.1} />

        {/* Secondary shapes */}
        <AnimatedBox position={[4, -1, 2]} color="#fbbf24" scale={0.7} speed={1.2} />
        <AnimatedSphere position={[-4, 1, -2]} color="#f87171" scale={0.8} />
        <AnimatedTorus position={[3, 2, -3]} color="#34d399" scale={0.6} />
        <AnimatedCone position={[-3, -1, 3]} color="#c084fc" scale={0.9} />
        <AnimatedOctahedron position={[0, -1.2, -3]} color="#38bdf8" scale={0.8} />

        {/* Background shapes */}
        <AnimatedBox position={[-6, 2, -5]} color="#818cf8" scale={0.5} speed={0.5} />
        <AnimatedSphere position={[6, -1, -6]} color="#fb923c" scale={0.6} />
        <AnimatedTorus position={[-5, -2, 4]} color="#a3e635" scale={0.5} />

        <Floor />
        <Environment preset="night" />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
