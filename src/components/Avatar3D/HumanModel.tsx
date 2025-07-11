import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

interface HumanModelProps {
  customization: {
    bodyType: 'slim' | 'regular' | 'athletic';
    height: number;
    skinTone: string;
    hairColor: string;
  };
  selectedClothing?: any;
}

export const HumanModel = ({ customization, selectedClothing }: HumanModelProps) => {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);

  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  // Body type scaling factors
  const getBodyScale = () => {
    switch (customization.bodyType) {
      case 'slim': return { x: 0.9, y: 1, z: 0.9 };
      case 'athletic': return { x: 1.1, y: 1, z: 1.1 };
      default: return { x: 1, y: 1, z: 1 };
    }
  };

  const bodyScale = getBodyScale();
  const heightScale = customization.height / 1.75; // Normalize to average height

  return (
    <group ref={groupRef} scale={[1, heightScale, 1]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial 
          color={customization.skinTone}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.15]} />
        <meshStandardMaterial color={customization.skinTone} />
      </mesh>

      {/* Face Features */}
      <group position={[0, 1.7, 0]}>
        {/* Eyes */}
        <mesh position={[-0.04, 0.02, 0.11]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0.04, 0.02, 0.11]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, -0.01, 0.12]}>
          <coneGeometry args={[0.008, 0.025, 8]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        
        {/* Mouth */}
        <mesh position={[0, -0.04, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.025]} />
          <meshStandardMaterial color="#8b4444" />
        </mesh>
      </group>

      {/* Hair */}
      <mesh position={[0, 1.76, -0.02]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial 
          color={customization.hairColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Torso */}
      <mesh 
        position={[0, 1.2, 0]} 
        scale={[bodyScale.x, 1, bodyScale.z]}
      >
        <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
        <meshStandardMaterial color={customization.skinTone} />
      </mesh>

      {/* Arms */}
      <group>
        {/* Left Arm */}
        <mesh position={[-0.25 * bodyScale.x, 1.35, 0]} rotation={[0, 0, Math.PI / 12]}>
          <capsuleGeometry args={[0.05, 0.25]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        <mesh position={[-0.32 * bodyScale.x, 1.05, 0]}>
          <capsuleGeometry args={[0.045, 0.22]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        
        {/* Right Arm */}
        <mesh position={[0.25 * bodyScale.x, 1.35, 0]} rotation={[0, 0, -Math.PI / 12]}>
          <capsuleGeometry args={[0.05, 0.25]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        <mesh position={[0.32 * bodyScale.x, 1.05, 0]}>
          <capsuleGeometry args={[0.045, 0.22]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
      </group>

      {/* Hands */}
      <mesh position={[-0.32 * bodyScale.x, 0.9, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={customization.skinTone} />
      </mesh>
      <mesh position={[0.32 * bodyScale.x, 0.9, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={customization.skinTone} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.8, 0]} scale={[bodyScale.x, 1, bodyScale.z]}>
        <sphereGeometry args={[0.15, 16, 8]} />
        <meshStandardMaterial color={customization.skinTone} />
      </mesh>

      {/* Legs */}
      <group>
        {/* Left Leg */}
        <mesh position={[-0.08, 0.5, 0]}>
          <capsuleGeometry args={[0.06, 0.35]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        <mesh position={[-0.08, 0.15, 0]}>
          <capsuleGeometry args={[0.055, 0.3]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        
        {/* Right Leg */}
        <mesh position={[0.08, 0.5, 0]}>
          <capsuleGeometry args={[0.06, 0.35]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
        <mesh position={[0.08, 0.15, 0]}>
          <capsuleGeometry args={[0.055, 0.3]} />
          <meshStandardMaterial color={customization.skinTone} />
        </mesh>
      </group>

      {/* Feet */}
      <mesh position={[-0.08, 0.02, 0.05]}>
        <boxGeometry args={[0.08, 0.04, 0.15]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.08, 0.02, 0.05]}>
        <boxGeometry args={[0.08, 0.04, 0.15]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
};