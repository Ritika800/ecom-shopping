
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

  // Add debugging
  console.log('BoyAvatar props:', { selectedClothing, customization });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const getClothingColor = (type: string) => {
    if (selectedClothing?.type === type) {
      return selectedClothing.color?.toLowerCase() || '#4169E1';
    }
    return type === 'shirt' ? '#4169E1' : '#2F4F4F';
  };

  const getSizeScale = (size: string): number => {
    if (!size) return 1.0;
    const sizeMap: { [key: string]: number } = {
      'XS': 0.85, 'S': 0.9, 'M': 1.0, 'L': 1.1, 'XL': 1.2, 'XXL': 1.3,
      '28': 0.85, '30': 0.9, '32': 1.0, '34': 1.1, '36': 1.2, '38': 1.3
    };
    return sizeMap[size] || 1.0;
  };

  // Ensure all values are properly defined
  const bodyScale: [number, number, number] = customization?.bodyType === 'slim' ? [0.9, 1, 0.9] : 
                   customization?.bodyType === 'athletic' ? [1.1, 1.1, 1] : [1, 1, 1];
  
  const sizeScale = selectedClothing?.size ? getSizeScale(selectedClothing.size) : 1.0;

  console.log('Computed values:', { bodyScale, sizeScale, customization: customization || {} });

  return (
    <group>
      {/* Head */}
      <Sphere
        position={[0, 1.8, 0]}
        args={[0.18, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={customization?.skinTone || '#FDBCB4'} />
      </Sphere>

      {/* Hair */}
      <Box position={[0, 1.95, 0]} args={[0.35, 0.15, 0.35]}>
        <meshStandardMaterial color={customization?.hairColor || '#8B4513'} />
      </Box>

      {/* Eyes */}
      <Sphere position={[-0.08, 1.85, 0.15]} args={[0.02, 16, 16]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere position={[0.08, 1.85, 0.15]} args={[0.02, 16, 16]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Torso/Shirt */}
      <Box
        ref={meshRef}
        position={[0, 1.2, 0]}
        args={[0.45 * sizeScale, 0.7 * sizeScale, 0.25]}
        scale={bodyScale}
      >
        <meshStandardMaterial color={getClothingColor('shirt')} />
      </Box>

      {/* Jacket overlay if selected */}
      {selectedClothing?.type === 'jacket' && (
        <Box position={[0, 1.2, 0]} args={[0.5 * sizeScale, 0.75 * sizeScale, 0.28]} scale={bodyScale}>
          <meshStandardMaterial color={getClothingColor('jacket')} transparent opacity={0.9} />
        </Box>
      )}

      {/* Arms */}
      <Cylinder position={[-0.35, 1.3, 0]} args={[0.08, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} scale={bodyScale}>
        <meshStandardMaterial color={customization?.skinTone || '#FDBCB4'} />
      </Cylinder>
      <Cylinder position={[0.35, 1.3, 0]} args={[0.08, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} scale={bodyScale}>
        <meshStandardMaterial color={customization?.skinTone || '#FDBCB4'} />
      </Cylinder>

      {/* Legs/Pants */}
      <Cylinder position={[-0.12, 0.4, 0]} args={[0.09 * sizeScale, 0.09 * sizeScale, 0.6]} scale={bodyScale}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Cylinder>
      <Cylinder position={[0.12, 0.4, 0]} args={[0.09 * sizeScale, 0.09 * sizeScale, 0.6]} scale={bodyScale}>
        <meshStandardMaterial color={getClothingColor('pants')} />
      </Cylinder>

      {/* Product highlight */}
      {selectedClothing && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.08}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          ✨ {selectedClothing.type.charAt(0).toUpperCase() + selectedClothing.type.slice(1)} - Size {selectedClothing.size} ✨
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

  // Add debugging
  console.log('Avatar3D props:', { selectedClothing, onAvatarCustomize });

  const handleCustomizationChange = (field: keyof AvatarCustomization, value: any) => {
    console.log('Customization change:', { field, value });
    const newCustomization = { ...customization, [field]: value };
    setCustomization(newCustomization);
    onAvatarCustomize?.(newCustomization);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden relative">
      <Canvas 
        camera={{ position: [0, 1.5, 4], fov: 50 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: false
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB');
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 5, -10]} intensity={0.3} />
        
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
