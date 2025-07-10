
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shirt, User } from 'lucide-react';

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
            
            {/* Clothing overlay simulation */}
            {selectedClothing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="relative"
                  style={{
                    background: `linear-gradient(135deg, ${selectedClothing.color}aa, ${selectedClothing.color}66)`,
                    opacity: overlayOpacity,
                    width: '40%',
                    height: selectedClothing.type === 'pants' ? '60%' : '45%',
                    marginTop: selectedClothing.type === 'pants' ? '20%' : '5%',
                    borderRadius: selectedClothing.type === 'jacket' ? '12px' : '8px',
                    border: `2px solid ${selectedClothing.color}`,
                    backdropFilter: 'blur(1px)'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shirt className="h-8 w-8 text-white/80" />
                  </div>
                </div>
              </div>
            )}

            {/* Controls overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedClothing ? `Trying on: ${selectedClothing.name}` : 'Select an item to try on'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Adjust opacity to see how it looks
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Opacity</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                    className="w-20"
                  />
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
