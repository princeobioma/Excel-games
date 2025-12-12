import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      meshStandardMaterial: any;
      coneGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      dodecahedronGeometry: any;
      icosahedronGeometry: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      planeGeometry: any;
      fog: any;
      torusGeometry: any;
      ringGeometry: any;
      gridHelper: any;
    }
  }
}

// Interactive Camera Rig
const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, 8), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// Cyber Rings for the Tree
const CyberRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// A Cyber-Tree Component
const CyberTree = (props: any) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.5, 1, 1, 8]} />
        <meshStandardMaterial color="#222" roughness={0.5} />
      </mesh>
      
      {/* Tree Layers - Stylized Polygons */}
      <mesh position={[0, -0.5, 0]}>
        <coneGeometry args={[2.5, 2.5, 4]} />
        <meshStandardMaterial color="#0b3d22" emissive="#00ff66" emissiveIntensity={0.1} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[2, 2, 4]} />
        <meshStandardMaterial color="#0b4d2b" emissive="#00ff66" emissiveIntensity={0.2} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[1.5, 1.5, 4]} />
        <meshStandardMaterial color="#0b5e34" emissive="#00ff66" emissiveIntensity={0.3} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Glowing Star */}
      <mesh position={[0, 3.2, 0]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} />
      </mesh>

      {/* Ornaments / Nodes */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
         <mesh position={[1.5, 0, 1.5]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={1} />
         </mesh>
         <mesh position={[-1.2, 1.5, 0.5]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={1} />
         </mesh>
         <mesh position={[0.5, -0.5, -1.5]}>
            <dodecahedronGeometry args={[0.2]} />
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
         </mesh>
      </Float>

      <CyberRings />
    </group>
  );
};

// Floating Gaming Gear
const FloatingLoot = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[3.5, 1, -1]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <MeshDistortMaterial color="#00ff66" speed={3} distort={0.5} radius={1} />
      </mesh>
      <pointLight position={[3.5, 1, -1]} color="#00ff66" distance={3} intensity={2} />
    </Float>
  );
};

// Lootbox or Present
const CyberPresent = () => {
   const ref = useRef<THREE.Group>(null);
   useFrame((state) => {
       if(ref.current) {
           ref.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
       }
   });

   return (
       <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
           <group ref={ref} position={[-3, -1, 1]}>
               <mesh>
                   <boxGeometry args={[1, 1, 1]} />
                   <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
               </mesh>
               <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial wireframe color="#ff003c" />
               </mesh>
               <pointLight color="#ff003c" distance={3} intensity={2} />
           </group>
       </Float>
   )
}

const SceneContent = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <Rig />
      
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00ff66" />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#ff003c" />
      <spotLight position={[0, 10, 0]} angle={0.6} penumbra={0.5} intensity={2} color="#ffffff" castShadow />

      {/* Background Elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={500} scale={15} size={3} speed={0.4} opacity={0.8} color="#ffffff" />
      <Sparkles count={100} scale={10} size={5} speed={0.2} opacity={0.5} color="#00ff66" />
      
      {/* Objects */}
      <CyberTree position={[0, -1.5, 0]} />
      <FloatingLoot />
      <CyberPresent />
      
      {/* Floor */}
      <gridHelper args={[50, 50, 0x333333, 0x111111]} position={[0, -3, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050a14" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Atmosphere */}
      <fog attach="fog" args={['#050a14', 5, 25]} />
    </>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default ThreeScene;