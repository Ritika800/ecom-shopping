import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: id || '1',
    name: 'Premium Leather Jacket',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop'
    ],
    description: 'This premium leather jacket is crafted from the finest materials, offering both style and durability. Perfect for any occasion, from casual outings to formal events.',
    features: [
      'Premium genuine leather construction',
      'Comfortable cotton lining',
      'Multiple interior and exterior pockets',
      'YKK zippers for durability',
      'Adjustable cuffs and hem'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Navy'],
    inStock: true,
    category: 'Jackets'
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Classic Denim Jeans',
      price: 89,
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=300&h=400&fit=crop',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Casual Cotton T-Shirt',
      price: 29,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4ec4?w=300&h=400&fit=crop',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Formal Business Suit',
      price: 599,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop',
      rating: 4.9
    }
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-gray-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-white">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-slate-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-600'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-white ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
                <span className="text-blue-400">{product.category}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-gray-300">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded-lg ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-600 text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-600 text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-white text-xl w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center">
                <Truck className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Free Shipping</span>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Quality Guarantee</span>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="bg-slate-800 border-gray-700">
            <TabsTrigger value="description" className="text-gray-300 data-[state=active]:text-white">
              Description
            </TabsTrigger>
            <TabsTrigger value="features" className="text-gray-300 data-[state=active]:text-white">
              Features
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-gray-300 data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="shipping" className="text-gray-300 data-[state=active]:text-white">
              Shipping
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="bg-slate-800 p-6 rounded-lg mt-4">
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          </TabsContent>
          
          <TabsContent value="features" className="bg-slate-800 p-6 rounded-lg mt-4">
            <ul className="text-gray-300 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="bg-slate-800 p-6 rounded-lg mt-4">
            <div className="text-gray-300">
              <h3 className="text-white font-semibold mb-4">Customer Reviews</h3>
              <p>Reviews feature coming soon...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="bg-slate-800 p-6 rounded-lg mt-4">
            <div className="text-gray-300">
              <h3 className="text-white font-semibold mb-4">Shipping Information</h3>
              <p>Free shipping on orders over $100. Standard delivery takes 3-5 business days.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="bg-slate-800 border-slate-700 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
