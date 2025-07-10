
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, User, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PhotoCapture from '@/components/PhotoCapture';
import VirtualTryOnWithPhoto from '@/components/VirtualTryOnWithPhoto';
import Avatar3D from '@/components/Avatar3D';

const VirtualTryOnPage = () => {
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [tryOnMode, setTryOnMode] = useState<'avatar' | 'photo' | 'choose'>('choose');
  const [selectedClothing, setSelectedClothing] = useState<any>(null);

  const clothingOptions = [
    { id: '1', name: 'Classic White Shirt', color: '#ffffff', type: 'shirt' },
    { id: '2', name: 'Blue Denim Jeans', color: '#1e40af', type: 'pants' },
    { id: '3', name: 'Black Leather Jacket', color: '#000000', type: 'jacket' },
    { id: '4', name: 'Red Casual Dress', color: '#dc2626', type: 'dress' },
  ];

  const handlePhotoCapture = (photo: string) => {
    setUserPhoto(photo);
    setShowPhotoCapture(false);
    setTryOnMode('photo');
  };

  const handleClothingSelect = (clothing: any) => {
    setSelectedClothing(clothing);
  };

  const resetTryOn = () => {
    setTryOnMode('choose');
    setUserPhoto(null);
    setSelectedClothing(null);
  };

  if (showPhotoCapture) {
    return (
      <PhotoCapture
        onPhotoCapture={handlePhotoCapture}
        onClose={() => setShowPhotoCapture(false)}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Virtual Try-On Studio</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create your personalized 3D avatar or use your own photo to try on clothes virtually
            </p>
          </div>
        </div>

        {/* Mode Selection */}
        {tryOnMode === 'choose' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Try-On Method
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Select how you'd like to try on clothes virtually
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* 3D Avatar Option */}
              <Card className="bg-white dark:bg-slate-800 border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3D Avatar</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Create a customizable 3D avatar and see how clothes look from every angle
                  </p>
                  <Button 
                    onClick={() => setTryOnMode('avatar')}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Use 3D Avatar
                  </Button>
                </CardContent>
              </Card>

              {/* Photo Upload Option */}
              <Card className="bg-white dark:bg-slate-800 border-2 border-transparent hover:border-green-500 transition-all cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Photo</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Take a selfie or upload your photo to see realistic try-on results
                  </p>
                  <Button 
                    onClick={() => setShowPhotoCapture(true)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    Upload Photo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Virtual Try-On Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shirt className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Clothing Types</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Try on shirts, pants, jackets, and dresses</p>
                </div>
                <div className="text-center">
                  <User className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Realistic Fitting</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">See how clothes fit your body type</p>
                </div>
                <div className="text-center">
                  <Camera className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Angles</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">View from different perspectives</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Try-On Interface */}
        {(tryOnMode === 'avatar' || tryOnMode === 'photo') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Try-On Area */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] bg-white dark:bg-slate-800">
                <CardContent className="p-4 h-full relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetTryOn}
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Change Method
                    </Button>
                  </div>

                  <div className="h-full">
                    {tryOnMode === 'avatar' ? (
                      <Avatar3D selectedClothing={selectedClothing} />
                    ) : userPhoto ? (
                      <VirtualTryOnWithPhoto
                        userPhoto={userPhoto}
                        selectedClothing={selectedClothing}
                        onBack={() => setShowPhotoCapture(true)}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Button
                          onClick={() => setShowPhotoCapture(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clothing Selection */}
            <div className="space-y-4">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Try On Clothes
                  </h3>
                  <div className="space-y-3">
                    {clothingOptions.map((item) => (
                      <Card 
                        key={item.id}
                        className={`cursor-pointer transition-all border-2 ${
                          selectedClothing?.id === item.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
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
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pro Tips</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Use good lighting for better photo results</li>
                    <li>• Stand against a plain background</li>
                    <li>• Face the camera directly</li>
                    <li>• Keep your arms slightly away from your body</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTryOnPage;
