
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      id: 'jackets',
      name: 'Jackets & Coats',
      description: 'Premium leather jackets, blazers, and coats',
      image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=300&fit=crop',
      count: 45
    },
    {
      id: 'shirts',
      name: 'Shirts',
      description: 'Formal dress shirts and casual shirts',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=300&fit=crop',
      count: 67
    },
    {
      id: 'jeans',
      name: 'Jeans & Trousers',
      description: 'Classic denim and formal trousers',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
      count: 52
    },
    {
      id: 'tshirts',
      name: 'T-Shirts',
      description: 'Casual and premium cotton t-shirts',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      count: 89
    },
    {
      id: 'suits',
      name: 'Suits',
      description: 'Formal business and wedding suits',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      count: 23
    },
    {
      id: 'hoodies',
      name: 'Hoodies & Sweaters',
      description: 'Comfortable hoodies and warm sweaters',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
      count: 34
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Shop by Category</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our curated collections of premium men's fashion, 
            carefully organized to help you find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={`/products?category=${category.id}`} key={category.id}>
              <Card className={`bg-slate-800 border-slate-700 overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1">{category.name}</h3>
                        <p className="text-gray-300 text-sm">{category.description}</p>
                      </div>
                      <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded">
                        {category.count} items
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Explore Collection</span>
                    <svg 
                      className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Categories Banner */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">New Season Collection</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Discover the latest trends in men's fashion. From casual wear to formal attire, 
            find pieces that reflect your unique style and personality.
          </p>
          <Link to="/products">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop New Arrivals
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
