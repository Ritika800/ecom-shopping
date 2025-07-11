
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Avatar3D from '@/components/Avatar3D';

const VirtualTryOnPage = () => {
  const [selectedClothing, setSelectedClothing] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('M');

  const clothingOptions = [
    { id: '1', name: 'Classic White Shirt', color: '#ffffff', type: 'shirt', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { id: '2', name: 'Blue Denim Jeans', color: '#1e40af', type: 'pants', sizes: ['28', '30', '32', '34', '36', '38'] },
    { id: '3', name: 'Black Leather Jacket', color: '#000000', type: 'jacket', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { id: '4', name: 'Red Casual T-Shirt', color: '#dc2626', type: 'shirt', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { id: '5', name: 'Navy Blue Hoodie', color: '#1e3a8a', type: 'jacket', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { id: '6', name: 'Khaki Chinos', color: '#d4a574', type: 'pants', sizes: ['28', '30', '32', '34', '36', '38'] },
  ];

  const handleClothingSelect = (clothing: any) => {
    setSelectedClothing({ ...clothing, size: selectedSize });
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-0 sm:mr-4 mb-2 sm:mb-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Virtual Try-On Studio</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Create your personalized 3D avatar to try on clothes virtually
            </p>
          </div>
        </div>

        {/* Try-On Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Try-On Area */}
          <div className="lg:col-span-2">
            <Card className="h-[400px] sm:h-[500px] lg:h-[600px] bg-white dark:bg-slate-800">
              <CardContent className="p-2 sm:p-4 h-full relative">
                <div className="h-full">
                  <Avatar3D selectedClothing={selectedClothing} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clothing & Size Selection */}
          <div className="space-y-4">
            {/* Size Selection */}
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Select Size
                </h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose size" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedClothing?.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size: string) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Clothing Selection */}
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
                            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.type}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pro Tips */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 360° view with interactive avatar</li>
                  <li>• Multiple clothing types available</li>
                  <li>• Real-time size adjustments</li>
                  <li>• Customizable body type and appearance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnPage;
