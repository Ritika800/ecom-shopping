import { useMemo } from 'react';

interface ClothingSystemProps {
  selectedClothing?: {
    id: string;
    name: string;
    color: string;
    type: 'shirt' | 'pants' | 'jacket' | 'dress' | 'shoes';
    size?: string;
  };
  bodyType: 'slim' | 'regular' | 'athletic';
}

export const ClothingSystem = ({ selectedClothing, bodyType }: ClothingSystemProps) => {
  // Body type scaling factors
  const getBodyScale = () => {
    switch (bodyType) {
      case 'slim': return { x: 0.9, y: 1, z: 0.9 };
      case 'athletic': return { x: 1.1, y: 1, z: 1.1 };
      default: return { x: 1, y: 1, z: 1 };
    }
  };

  const bodyScale = getBodyScale();

  // Enhanced clothing materials with better properties
  const getClothingMaterial = (color: string, type: string) => {
    const materialProps = {
      color,
      roughness: type === 'jacket' ? 0.7 : 0.9,
      metalness: type === 'jacket' ? 0.1 : 0.05,
      transparent: true,
      opacity: 0.95
    };
    return materialProps;
  };

  const clothingComponents = useMemo(() => {
    if (!selectedClothing) return null;

    const { type, color } = selectedClothing;
    const materialProps = getClothingMaterial(color, type);

    switch (type) {
      case 'shirt':
        return (
          <group>
            {/* Main shirt body */}
            <mesh 
              position={[0, 1.2, 0]} 
              scale={[bodyScale.x * 1.05, 1.02, bodyScale.z * 1.05]}
            >
              <capsuleGeometry args={[0.22, 0.62, 8, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Sleeves */}
            <mesh 
              position={[-0.25 * bodyScale.x, 1.35, 0]} 
              rotation={[0, 0, Math.PI / 12]}
              scale={[1.1, 1.05, 1.1]}
            >
              <capsuleGeometry args={[0.055, 0.26]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh 
              position={[0.25 * bodyScale.x, 1.35, 0]} 
              rotation={[0, 0, -Math.PI / 12]}
              scale={[1.1, 1.05, 1.1]}
            >
              <capsuleGeometry args={[0.055, 0.26]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Collar */}
            <mesh position={[0, 1.48, 0]}>
              <ringGeometry args={[0.12, 0.15, 8]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );

      case 'pants':
        return (
          <group>
            {/* Waist */}
            <mesh position={[0, 0.8, 0]} scale={[bodyScale.x * 1.05, 1, bodyScale.z * 1.05]}>
              <cylinderGeometry args={[0.16, 0.16, 0.1]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Left leg */}
            <mesh position={[-0.08, 0.5, 0]} scale={[1.1, 1.02, 1.1]}>
              <capsuleGeometry args={[0.065, 0.36]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[-0.08, 0.15, 0]} scale={[1.05, 1.02, 1.05]}>
              <capsuleGeometry args={[0.06, 0.31]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Right leg */}
            <mesh position={[0.08, 0.5, 0]} scale={[1.1, 1.02, 1.1]}>
              <capsuleGeometry args={[0.065, 0.36]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0.08, 0.15, 0]} scale={[1.05, 1.02, 1.05]}>
              <capsuleGeometry args={[0.06, 0.31]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );

      case 'jacket':
        return (
          <group>
            {/* Main jacket body */}
            <mesh 
              position={[0, 1.2, 0]} 
              scale={[bodyScale.x * 1.15, 1.05, bodyScale.z * 1.15]}
            >
              <capsuleGeometry args={[0.25, 0.65, 8, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Jacket sleeves */}
            <mesh 
              position={[-0.26 * bodyScale.x, 1.35, 0]} 
              rotation={[0, 0, Math.PI / 12]}
              scale={[1.2, 1.1, 1.2]}
            >
              <capsuleGeometry args={[0.06, 0.28]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh 
              position={[0.26 * bodyScale.x, 1.35, 0]} 
              rotation={[0, 0, -Math.PI / 12]}
              scale={[1.2, 1.1, 1.2]}
            >
              <capsuleGeometry args={[0.06, 0.28]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Jacket collar */}
            <mesh position={[0, 1.52, 0]} rotation={[Math.PI / 8, 0, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.15]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Jacket buttons */}
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, 1.4 - i * 0.15, 0.22]}>
                <cylinderGeometry args={[0.015, 0.015, 0.01]} />
                <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        );

      case 'dress':
        return (
          <group>
            {/* Dress top */}
            <mesh 
              position={[0, 1.2, 0]} 
              scale={[bodyScale.x * 1.05, 1.02, bodyScale.z * 1.05]}
            >
              <capsuleGeometry args={[0.22, 0.4, 8, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Dress skirt */}
            <mesh position={[0, 0.7, 0]}>
              <coneGeometry args={[0.35, 0.6, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Dress straps */}
            <mesh position={[-0.1, 1.45, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.3]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0.1, 1.45, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.3]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );

      case 'shoes':
        return (
          <group>
            {/* Left shoe */}
            <mesh position={[-0.08, 0.02, 0.05]} scale={[1.1, 1.1, 1.1]}>
              <boxGeometry args={[0.09, 0.05, 0.16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Right shoe */}
            <mesh position={[0.08, 0.02, 0.05]} scale={[1.1, 1.1, 1.1]}>
              <boxGeometry args={[0.09, 0.05, 0.16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            
            {/* Shoe laces */}
            <mesh position={[-0.08, 0.04, 0.08]}>
              <boxGeometry args={[0.06, 0.01, 0.08]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[0.08, 0.04, 0.08]}>
              <boxGeometry args={[0.06, 0.01, 0.08]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
          </group>
        );

      default:
        return null;
    }
  }, [selectedClothing, bodyScale]);

  return <>{clothingComponents}</>;
};