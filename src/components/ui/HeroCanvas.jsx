import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

/** Floating distorted sphere — the hero centerpiece */
function DistortBlob({ position, color, speed = 1, distort = 0.4, scale = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.12 * speed;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.18 * speed;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={distort}
            speed={speed * 2}
            roughness={0.1}
            metalness={0.05}
            transparent
            opacity={0.55}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

/** Rotating torus ring */
function Ring({ position, color, scale = 1, rotSpeed = 0.5 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * rotSpeed * 0.7;
    mesh.current.rotation.y = state.clock.elapsedTime * rotSpeed;
  });
  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <Torus args={[1, 0.08, 32, 120]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.35}
            roughness={0.2}
            metalness={0.6}
          />
        </Torus>
      </mesh>
    </Float>
  );
}

/** Particle field */
function Particles({ count = 120 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6C63FF"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/** Grid plane */
function GridPlane() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -3.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, -1]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshStandardMaterial
        color="#6C63FF"
        wireframe
        transparent
        opacity={0.07}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={1.5} color="#6C63FF" />
        <pointLight position={[4, -2, 3]} intensity={1} color="#3B82F6" />

        {/* Main blobs */}
        <DistortBlob position={[-3.2, 1.2, -1]} color="#6C63FF" speed={0.8} distort={0.5} scale={1.6} />
        <DistortBlob position={[3.2, -1.0, -1.5]} color="#3B82F6" speed={1.1} distort={0.35} scale={1.2} />
        <DistortBlob position={[0.6, 2.2, -3]} color="#A78BFA" speed={0.6} distort={0.6} scale={0.9} />

        {/* Rings */}
        <Ring position={[2.8, 1.6, -2]} color="#6C63FF" scale={1.4} rotSpeed={0.4} />
        <Ring position={[-2.4, -1.4, -2.5]} color="#3B82F6" scale={1.0} rotSpeed={0.6} />

        {/* Particles */}
        <Particles count={140} />

        {/* Grid */}
        <GridPlane />
      </Canvas>
    </div>
  );
}
