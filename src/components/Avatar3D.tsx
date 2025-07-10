
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

const BoyAvatar = ({ selectedClothing, customization }: { selectedClothing?: any; customization: AvatarCustomization }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const getClothingColor = (type: string) => {
    if (selectedClothing?.type === type) {
      return selectedClothing.color.toLowerCase();
    }
    return type === 'shirt' ? '#4169E1' : '#2F4F4F'; // Default blue shirt, dark pants
  };

  const bodyScale = customization.bodyType === 'slim' ? [0.9, 1, 0.9] : 
                   customization.bodyType === 'athletic' ? [1.1, 1.1, 1] : [1, 1, 1];

  return (
    <group>
      {/* Head */}
      <Sphere
        position={[0, 1.8, 0]}
        args={[0.18, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={customization.skinTone} />
      </Sphere>

      {/* Hair - Boy style */}
      <Box position={[0, 1.95, 0]} args={[0.35, 0.15, 0.35]}>
        <meshStandardMaterial color={customization.hairColor} />
      </Box>
      <Box position={[0, 1.85, -0.15]} args={[0.32, 0.12, 0.1]}>
        <meshStandardMaterial color={customization.hairColor} />
      </Box>

      {/* Eyes */}
      <Sphere position={[-0.08, 1.85, 0.15]} args={[0.02, 16, 16]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere position={[0.08, 1.85, 0.15]} args={[0.02, 16, 16]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Nose */}
      <Box position={[0, 1.78, 0.16]} args={[0.02, 0.04, 0.02]}>
        <meshStandardMaterial color={customization.skinTone} />
      </Box>

      {/* Neck */}
      <Cylinder position={[0, 1.6, 0]} args={[0.06, 0.06, 0.15]}>
        <meshStandardMaterial color={customization.skinTone} />
      </Cylinder>

      {/* Torso/Shirt */}
      <Box
        ref={meshRef}
        position={[0, 1.2, 0]}
        args={[0.45, 0.7, 0.25]}
        scale={bodyScale}
      >
        <meshStandardMaterial color={getClothingColor('shirt')} />
      </Box>

      {/* Jacket overlay if selected */}
      {selectedClothing?.type === 'jacket' && (
        <Box position={[0, 1.2, 0]} args={[0.5, 0.75, 0.28]} scale={bodyScale}>
          <meshStandardMaterial color={getClothingColor('jacket')} transparent opacity={0.9} />
        </Box>
      )}

      {/* Arms */}
      <Cylinder position={[-0.35, 1.3, 0]} args={[0.08, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} scale={bodyScale}>
        <meshStandardMaterial color={customization.skinTone} />
      </Cylinder>
      <Cylinder position={[0.35, 1.3, 0]} args={[0.08, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} scale={bodyScale}>
        <meshStandardMaterial color={customization.skinTone} />
      </Cylinder>

      {/* Hands */}
      <Sphere position={[-0.6, 1.3, 0]} args={[0.06, 16, 16]} scale={bodyScale}>
        <meshStandardMaterial color={customization.skinTone} />
      </Sphere>
      <Sphere position={[0.6, 1.3, 0]} args={[0.06, 16, 16]} scale={bodyScale}>
        <meshStandardMaterial color={customization.skinTone} />
      </Sphere>

      {/* Waist */}
      <Box position={[0, 0.8, 0]} args={[0.42, 0.15, 0.23]} scale={bodyScale}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Box>

      {/* Legs/Pants */}
      <Cylinder position={[-0.12, 0.4, 0]} args={[0.09, 0.09, 0.6]} scale={bodyScale}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Cylinder>
      <Cylinder position={[0.12, 0.4, 0]} args={[0.09, 0.09, 0.6]} scale={bodyScale}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Cylinder>

      {/* Feet/Shoes */}
      <Box position={[-0.12, 0.05, 0.08]} args={[0.12, 0.08, 0.25]} scale={bodyScale}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box position={[0.12, 0.05, 0.08]} args={[0.12, 0.08, 0.25]} scale={bodyScale}>
        <meshStandardMaterial color="#8B4513" />
      </Box>

      {/* Text label when hovered */}
      {hovered && (
        <Text
          position={[0, 2.8, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {selectedClothing ? `Trying on: ${selectedClothing.name}` : 'Select clothes to try on'}
        </Text>
      )}

      {/* Product highlight effect */}
      {selectedClothing && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.08}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          ✨ {selectedClothing.type.charAt(0).toUpperCase() + selectedClothing.type.slice(1)} ✨
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
    <div className="w-full h-full bg-gradient-to-b from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden relative">
      <Canvas 
        camera={{ position: [0, 1.5, 4], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB');
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 5, -10]} intensity={0.3} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={0.1} />
        
        <BoyAvatar selectedClothing={selectedClothing} customization={customization} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          autoRotate={!selectedClothing}
          autoRotateSpeed={1}
        />
      </Canvas>
      
      {/* Customization Controls */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Body Type</label>
            <select 
              value={customization.bodyType}
              onChange={(e) => handleCustomizationChange('bodyType', e.target.value)}
              className="w-full p-2 rounded-md border bg-white dark:bg-slate-700 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="slim">Slim</option>
              <option value="regular">Regular</option>
              <option value="athletic">Athletic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Skin Tone</label>
            <select 
              value={customization.skinTone}
              onChange={(e) => handleCustomizationChange('skinTone', e.target.value)}
              className="w-full p-2 rounded-md border bg-white dark:bg-slate-700 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="#FDBCB4">Light</option>
              <option value="#F1C27D">Medium</option>
              <option value="#E0AC69">Tan</option>
              <option value="#C68642">Brown</option>
              <option value="#8D5524">Dark</option>
            </select>
          </div>
        </div>
        
        <div className="mt-3">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Hair Color</label>
          <div className="grid grid-cols-5 gap-2">
            {['#8B4513', '#D2691E', '#000000', '#FFD700', '#FF6347'].map((color, index) => (
              <button
                key={index}
                onClick={() => handleCustomizationChange('hairColor', color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  customization.hairColor === color 
                    ? 'border-blue-500 scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info Display */}
      {selectedClothing && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-medium">{selectedClothing.name}</div>
          <div className="text-xs opacity-90 capitalize">{selectedClothing.type}</div>
        </div>
      )}
    </div>
  );
};

export default Avatar3D;
