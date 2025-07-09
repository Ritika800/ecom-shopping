
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid3X3, List, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    {
      id: '1',
      name: 'Premium Leather Jacket',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=500&fit=crop',
      rating: 4.8,
      reviews: 124,
      category: 'Jackets',
      isNew: true,
      isSale: true
    },
    {
      id: '2',
      name: 'Classic Denim Jeans',
      price: 89,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
      rating: 4.6,
      reviews: 89,
      category: 'Jeans'
    },
    {
      id: '3',
      name: 'Casual Cotton T-Shirt',
      price: 29,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      rating: 4.7,
      reviews: 203,
      category: 'T-Shirts'
    },
    {
      id: '4',
      name: 'Formal Business Suit',
      price: 599,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      rating: 4.9,
      reviews: 67,
      category: 'Suits',
      isNew: true
    },
    {
      id: '5',
      name: 'Casual Hoodie',
      price: 79,
      originalPrice: 99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
      rating: 4.5,
      reviews: 156,
      category: 'Hoodies',
      isSale: true
    },
    {
      id: '6',
      name: 'Formal Dress Shirt',
      price: 69,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
      rating: 4.4,
      reviews: 92,
      category: 'Shirts'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">All Products</h1>
          <p className="text-gray-400">Discover our complete collection of premium men's fashion</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <span className="text-gray-400">{products.length} products</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-gray-600">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center bg-slate-800 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="text-gray-300"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="text-gray-300"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className={`bg-slate-800 border-slate-700 overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : ''}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                    viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                  )}
                  {product.isSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
                  )}
                </div>
              </div>
              
              <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="mb-2">
                  <span className="text-blue-400 text-sm">{product.category}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
