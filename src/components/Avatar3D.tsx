
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { Mesh } from 'three';

interface Avatar3DProps {
  selectedClothing?: {
    id: string;
    name: string;
    color: string;
    type: 'shirt' | 'pants' | 'jacket' | 'dress';
  };
  onAvatarCustomize?: (customization: AvatarCustomization) => void;
}

interface AvatarCustomization {
  bodyType: 'slim' | 'regular' | 'athletic';
  height: number;
  skinTone: string;
  hairColor: string;
}

const Avatar = ({ selectedClothing, customization }: { selectedClothing?: any; customization: AvatarCustomization }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const getClothingColor = (type: string) => {
    if (selectedClothing?.type === type) {
      return selectedClothing.color.toLowerCase();
    }
    return '#cccccc';
  };

  return (
    <group>
      {/* Head */}
      <Sphere
        position={[0, 1.7, 0]}
        args={[0.15, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={customization.skinTone} />
      </Sphere>

      {/* Hair */}
      <Sphere position={[0, 1.85, 0]} args={[0.18, 32, 32]}>
        <meshStandardMaterial color={customization.hairColor} />
      </Sphere>

      {/* Body */}
      <Box
        ref={meshRef}
        position={[0, 1, 0]}
        args={[0.4, 0.8, 0.2]}
        scale={customization.bodyType === 'slim' ? [0.8, 1, 0.8] : customization.bodyType === 'athletic' ? [1.2, 1, 1] : [1, 1, 1]}
      >
        <meshStandardMaterial color={getClothingColor('shirt')} />
      </Box>

      {/* Arms */}
      <Cylinder position={[-0.3, 1.2, 0]} args={[0.08, 0.08, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={customization.skinTone} />
      </Cylinder>
      <Cylinder position={[0.3, 1.2, 0]} args={[0.08, 0.08, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={customization.skinTone} />
      </Cylinder>

      {/* Jacket overlay if selected */}
      {selectedClothing?.type === 'jacket' && (
        <Box position={[0, 1, 0]} args={[0.45, 0.85, 0.22]}>
          <meshStandardMaterial color={getClothingColor('jacket')} transparent opacity={0.8} />
        </Box>
      )}

      {/* Legs */}
      <Cylinder position={[-0.1, 0.2, 0]} args={[0.08, 0.08, 0.8]}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Cylinder>
      <Cylinder position={[0.1, 0.2, 0]} args={[0.08, 0.08, 0.8]}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Cylinder>

      {/* Text label when hovered */}
      {hovered && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {selectedClothing ? `Wearing: ${selectedClothing.name}` : 'Click to customize avatar'}
        </Text>
      )}
    </group>
  );
};

const Avatar3D = ({ selectedClothing, onAvatarCustomize }: Avatar3DProps) => {
  const [customization, setCustomization] = useState<AvatarCustomization>({
    bodyType: 'regular',
    height: 1.75,
    skinTone: '#FDBCB4',
    hairColor: '#8B4513'
  });

  const handleCustomizationChange = (field: keyof AvatarCustomization, value: any) => {
    const newCustomization = { ...customization, [field]: value };
    setCustomization(newCustomization);
    onAvatarCustomize?.(newCustomization);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 3, 0]} intensity={0.5} />
        
        <Avatar selectedClothing={selectedClothing} customization={customization} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
      
      {/* Customization Controls */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-lg p-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Body Type</label>
            <select 
              value={customization.bodyType}
              onChange={(e) => handleCustomizationChange('bodyType', e.target.value)}
              className="w-full p-1 rounded border bg-white dark:bg-slate-700 dark:border-slate-600 text-gray-900 dark:text-white"
            >
              <option value="slim">Slim</option>
              <option value="regular">Regular</option>
              <option value="athletic">Athletic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Skin Tone</label>
            <select 
              value={customization.skinTone}
              onChange={(e) => handleCustomizationChange('skinTone', e.target.value)}
              className="w-full p-1 rounded border bg-white dark:bg-slate-700 dark:border-slate-600 text-gray-900 dark:text-white"
            >
              <option value="#FDBCB4">Light</option>
              <option value="#F1C27D">Medium</option>
              <option value="#E0AC69">Tan</option>
              <option value="#C68642">Brown</option>
              <option value="#8D5524">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar3D;
