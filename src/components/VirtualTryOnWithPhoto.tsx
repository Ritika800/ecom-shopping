
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shirt, User, Palette } from 'lucide-react';

interface VirtualTryOnWithPhotoProps {
  userPhoto: string;
  selectedClothing?: {
    id: string;
    name: string;
    color: string;
    type: 'shirt' | 'pants' | 'jacket' | 'dress';
  };
  onBack: () => void;
}

const VirtualTryOnWithPhoto = ({ userPhoto, selectedClothing, onBack }: VirtualTryOnWithPhotoProps) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [fitStyle, setFitStyle] = useState<'loose' | 'regular' | 'tight'>('regular');

  const getClothingOverlay = () => {
    if (!selectedClothing) return null;

    const baseStyles = {
      position: 'absolute' as const,
      background: `linear-gradient(135deg, ${selectedClothing.color}aa, ${selectedClothing.color}66)`,
      opacity: overlayOpacity,
      border: `2px solid ${selectedClothing.color}`,
      backdropFilter: 'blur(1px)',
      borderRadius: selectedClothing.type === 'jacket' ? '12px' : '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const getFitDimensions = () => {
      const baseWidth = fitStyle === 'loose' ? '45%' : fitStyle === 'tight' ? '35%' : '40%';
      const baseHeight = selectedClothing.type === 'pants' ? '60%' : selectedClothing.type === 'dress' ? '70%' : '45%';
      
      return { width: baseWidth, height: baseHeight };
    };

    const getPosition = () => {
      const marginTop = selectedClothing.type === 'pants' ? '25%' : 
                       selectedClothing.type === 'dress' ? '15%' : '10%';
      return { marginTop };
    };

    const dimensions = getFitDimensions();
    const position = getPosition();

    return (
      <div 
        style={{
          ...baseStyles,
          ...dimensions,
          ...position,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="text-center">
          <Shirt className="h-8 w-8 text-white/80 mb-2" />
          <div className="text-white/90 text-xs font-medium">
            {selectedClothing.type.charAt(0).toUpperCase() + selectedClothing.type.slice(1)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <User className="h-5 w-5 mr-2" />
            Virtual Try-On
          </h3>
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Change Photo
          </Button>
        </div>

        <Card className="h-[calc(100%-4rem)] overflow-hidden">
          <CardContent className="p-0 h-full relative">
            {/* User photo background */}
            <img
              src={userPhoto}
              alt="User"
              className="w-full h-full object-cover"
            />
            
            {/* Clothing overlay */}
            {getClothingOverlay()}

            {/* Product info overlay */}
            {selectedClothing && (
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-sm font-medium">{selectedClothing.name}</div>
                <div className="text-xs opacity-80 capitalize">{selectedClothing.type}</div>
              </div>
            )}

            {/* Enhanced controls overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-lg p-4 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedClothing ? `Trying on: ${selectedClothing.name}` : 'Select an item to try on'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Adjust settings to see how it looks
                    </p>
                  </div>
                  <Palette className="h-5 w-5 text-gray-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">Opacity</label>
                    <input
                      type="range"
                      min="0.3"
                      max="1"
                      step="0.1"
                      value={overlayOpacity}
                      onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">Fit</label>
                    <select
                      value={fitStyle}
                      onChange={(e) => setFitStyle(e.target.value as any)}
                      className="w-full text-xs p-1 rounded border bg-white dark:bg-slate-700 dark:border-slate-600 text-gray-900 dark:text-white"
                    >
                      <option value="loose">Loose</option>
                      <option value="regular">Regular</option>
                      <option value="tight">Tight</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VirtualTryOnWithPhoto;
