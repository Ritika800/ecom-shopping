import { Users, Award, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Years of Excellence', value: '15+' },
    { icon: Globe, label: 'Countries Served', value: '25+' },
    { icon: Heart, label: 'Products Sold', value: '50,000+' }
  ];

  const team = [
    {
      name: 'Michael Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      description: 'Fashion industry veteran with 20+ years of experience'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      description: 'Award-winning designer specializing in contemporary menswear'
    },
    {
      name: 'David Rodriguez',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      description: 'Logistics expert ensuring quality and timely delivery'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About ELITEMEN</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're passionate about redefining men's fashion with premium quality, 
            contemporary designs, and exceptional craftsmanship. Our mission is to help 
            every man express his unique style with confidence.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 text-center p-6 hover:scale-105 transition-transform">
              <CardContent className="p-0">
                <stat.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2009, ELITEMEN began as a small boutique with a simple vision: 
                to create exceptional men's clothing that combines timeless style with 
                modern functionality.
              </p>
              <p>
                What started as a passion project has grown into a globally recognized 
                brand, serving customers in over 25 countries. We've maintained our 
                commitment to quality, sustainability, and customer satisfaction throughout 
                our journey.
              </p>
              <p>
                Today, we continue to push boundaries in men's fashion, collaborating 
                with talented designers and using the finest materials to create pieces 
                that our customers love and trust.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
              alt="Our Story"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700 p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Quality First</h3>
                <p className="text-gray-300">
                  We use only the finest materials and work with skilled artisans 
                  to ensure every piece meets our high standards.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Sustainability</h3>
                <p className="text-gray-300">
                  We're committed to ethical manufacturing practices and 
                  environmental responsibility in everything we do.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Customer Focus</h3>
                <p className="text-gray-300">
                  Your satisfaction is our priority. We listen to feedback and 
                  continuously improve our products and service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 overflow-hidden group hover:scale-105 transition-transform">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
