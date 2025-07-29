import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

interface RealisticAvatarProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export const RealisticAvatar = ({
  position = [0, 0, 0],
  scale = [1, 1, 1]
}: RealisticAvatarProps) => {
  const avatarRef = useRef<Group>(null);
  const gltf = useGLTF('/models/68722b4b742cffebe6cece5b.glb');

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.position.set(...position);
      avatarRef.current.scale.set(...scale);
    }
  }, [position, scale]);

  return <primitive ref={avatarRef} object={gltf.scene} />;
};

useGLTF.preload('/models/68722b4b742cffebe6cece5b.glb');
