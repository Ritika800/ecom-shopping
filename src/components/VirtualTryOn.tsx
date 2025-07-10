import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shirt, Palette, RotateCcw, Camera } from 'lucide-react';
import Avatar3D from './Avatar3D';
import PhotoCapture from './PhotoCapture';
import VirtualTryOnWithPhoto from './VirtualTryOnWithPhoto';

interface VirtualTryOnProps {
  productId?: string;
  productName?: string;
  productColor?: string;
  productType?: 'shirt' | 'pants' | 'jacket' | 'dress';
}

const VirtualTryOn = ({ productId, productName, productColor, productType }: VirtualTryOnProps) => {
  const [selectedClothing, setSelectedClothing] = useState<any>(null);
  const [avatarCustomization, setAvatarCustomization] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [tryOnMode, setTryOnMode] = useState<'avatar' | 'photo'>('avatar');

  const clothingOptions = [
    { id: '1', name: 'Classic White Shirt', color: 'white', type: 'shirt' },
    { id: '2', name: 'Blue Denim Jeans', color: 'blue', type: 'pants' },
    { id: '3', name: 'Black Leather Jacket', color: 'black', type: 'jacket' },
    { id: '4', name: 'Red Casual Dress', color: 'red', type: 'dress' },
  ];

  const handleTryOnProduct = () => {
    if (productId && productName && productColor && productType) {
      setSelectedClothing({
        id: productId,
        name: productName,
        color: productColor,
        type: productType
      });
    }
  };

  const handleClothingSelect = (clothing: any) => {
    setSelectedClothing(clothing);
  };

  const handleAvatarCustomize = (customization: any) => {
    setAvatarCustomization(customization);
  };

  const resetAvatar = () => {
    setSelectedClothing(null);
    setAvatarCustomization(null);
    setUserPhoto(null);
    setTryOnMode('avatar');
  };

  const handlePhotoCapture = (photo: string) => {
    setUserPhoto(photo);
    setShowPhotoCapture(false);
    setTryOnMode('photo');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={() => {
              setIsOpen(true);
              if (productId) handleTryOnProduct();
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Try On 3D Avatar
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-6xl h-[80vh] bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Virtual Try-On Studio
            </DialogTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Create your personalized 3D avatar or use your own photo to try on clothes virtually
            </p>
          </DialogHeader>
          
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            {/* 3D Avatar/Photo Display */}
            <div className="lg:col-span-2">
              <Card className="h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4 h-full relative">
                  {/* Mode Toggle */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Button
                      size="sm"
                      variant={tryOnMode === 'avatar' ? 'default' : 'outline'}
                      onClick={() => setTryOnMode('avatar')}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur"
                    >
                      <User className="h-4 w-4 mr-1" />
                      3D Avatar
                    </Button>
                    <Button
                      size="sm"
                      variant={tryOnMode === 'photo' ? 'default' : 'outline'}
                      onClick={() => setShowPhotoCapture(true)}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      My Photo
                    </Button>
                  </div>

                  <div className="h-full min-h-[400px]">
                    {tryOnMode === 'avatar' ? (
                      <Avatar3D 
                        selectedClothing={selectedClothing}
                        onAvatarCustomize={handleAvatarCustomize}
                      />
                    ) : userPhoto ? (
                      <VirtualTryOnWithPhoto
                        userPhoto={userPhoto}
                        selectedClothing={selectedClothing}
                        onBack={() => setShowPhotoCapture(true)}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                        <div className="text-center">
                          <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Add Your Photo
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Take a selfie or upload a photo to see how clothes look on you
                          </p>
                          <Button
                            onClick={() => setShowPhotoCapture(true)}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Add Photo
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetAvatar}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Clothing Selection Panel */}
            <div className="space-y-4">
              <Tabs defaultValue="clothing" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
                  <TabsTrigger value="clothing" className="text-gray-700 dark:text-gray-300">
                    <Shirt className="mr-2 h-4 w-4" />
                    Clothing
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="text-gray-700 dark:text-gray-300">
                    <Palette className="mr-2 h-4 w-4" />
                    Colors
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="clothing" className="space-y-3 max-h-[400px] overflow-y-auto">
                  {/* Current Product */}
                  {productId && (
                    <Card 
                      className={`cursor-pointer transition-all border-2 ${
                        selectedClothing?.id === productId 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={handleTryOnProduct}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full border-2"
                            style={{ backgroundColor: productColor }}
                          />
                          <div>
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{productName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{productType}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Other Clothing Options */}
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Try Other Items</p>
                    {clothingOptions.map((item) => (
                      <Card 
                        key={item.id}
                        className={`cursor-pointer transition-all mb-2 border-2 ${
                          selectedClothing?.id === item.id 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => handleClothingSelect(item)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-8 h-8 rounded-full border-2"
                              style={{ backgroundColor: item.color }}
                            />
                            <div>
                              <p className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.type}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="colors" className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'].map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-600 shadow-md hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          if (selectedClothing) {
                            setSelectedClothing({ ...selectedClothing, color });
                          }
                        }}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Info Panel */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How it works</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Choose between 3D avatar or your own photo</li>
                    <li>• Try on different clothing items</li>
                    <li>• Rotate and zoom to see all angles (3D mode)</li>
                    <li>• Change colors to find your perfect match</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Capture Modal */}
      {showPhotoCapture && (
        <PhotoCapture
          onPhotoCapture={handlePhotoCapture}
          onClose={() => setShowPhotoCapture(false)}
        />
      )}
    </>
  );
};

export default VirtualTryOn;
