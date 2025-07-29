import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { RealisticAvatar } from '@/components/RealisticAvatar';
import { ClothingSystem } from './ClothingSystem';
import { CustomizationPanel } from './CustomizationPanel';
import { Skeleton } from '@/components/ui/skeleton';

interface Avatar3DProps {
  selectedClothing?: {
    id: string;
    name: string;
    color: string;
    type: 'shirt' | 'pants' | 'jacket' | 'dress' | 'shoes';
    size?: string;
  };
  onAvatarCustomize?: (customization: AvatarCustomization) => void;
}

interface AvatarCustomization {
  bodyType: 'slim' | 'regular' | 'athletic';
  height: number;
  skinTone: string;
  hairColor: string;
}

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
    <div className="space-y-4 text-center">
      <Skeleton className="h-32 w-32 rounded-full mx-auto" />
      <Skeleton className="h-4 w-48 mx-auto" />
      <Skeleton className="h-3 w-32 mx-auto" />
    </div>
  </div>
);

const Avatar3DScene = ({ customization, selectedClothing }: {
  customization: AvatarCustomization;
  selectedClothing?: any;
}) => {
  return (
    <>
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8}
        shadow-mapSize={[2048, 2048]}
        castShadow
      />
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={0.3}
      />
      <pointLight position={[0, 5, -5]} intensity={0.2} />
      
      {/* Environment and shadows */}
      <Environment preset="studio" />
      <ContactShadows 
        position={[0, -0.1, 0]} 
        opacity={0.3} 
        scale={3} 
        blur={2.5} 
        far={4}
      />
      
      {/* 3D Models */}
      <group>
        <RealisticAvatar 
          position={[0, 0, 0]} 
          scale={[1, 1, 1]} 
/>

        <ClothingSystem 
          selectedClothing={selectedClothing} 
          bodyType={customization.bodyType}
        />
      </group>
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        autoRotate={!selectedClothing}
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  );
};

const Avatar3D = ({ selectedClothing, onAvatarCustomize }: Avatar3DProps) => {
  const [customization, setCustomization] = useState<AvatarCustomization>({
    bodyType: 'regular',
    height: 1.75,
    skinTone: '#F1C27D',
    hairColor: '#8B4513'
  });

  const handleCustomizationChange = (field: keyof AvatarCustomization, value: any) => {
    const newCustomization = { ...customization, [field]: value };
    setCustomization(newCustomization);
    onAvatarCustomize?.(newCustomization);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ 
            position: [0, 1.5, 4], 
            fov: 45,
            near: 0.1,
            far: 100
          }}
          gl={{ 
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: false
          }}
          shadows
        >
          <Avatar3DScene 
            customization={customization} 
            selectedClothing={selectedClothing}
          />
        </Canvas>
      </Suspense>
      
      <CustomizationPanel
        customization={customization}
        onCustomizationChange={handleCustomizationChange}
        selectedClothing={selectedClothing}
      />
    </div>
  );
};

export default Avatar3D;