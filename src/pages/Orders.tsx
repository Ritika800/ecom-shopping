
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Orders = () => {
  const orders = [
    {
      id: '12345',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: [
        {
          name: 'Premium Leather Jacket',
          image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=100&h=100&fit=crop',
          price: 299.99,
          quantity: 1
        }
      ],
      trackingNumber: 'TRK123456789'
    },
    {
      id: '12344',
      date: '2024-01-10',
      status: 'Processing',
      total: 89.99,
      items: [
        {
          name: 'Classic Denim Jeans',
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
          price: 89.99,
          quantity: 1
        }
      ]
    },
    {
      id: '12343',
      date: '2024-01-05',
      status: 'Shipped',
      total: 159.99,
      items: [
        {
          name: 'Casual Cotton T-Shirt',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
          price: 29.99,
          quantity: 2
        },
        {
          name: 'Business Shirt',
          image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop',
          price: 99.99,
          quantity: 1
        }
      ],
      trackingNumber: 'TRK987654321'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'Shipped':
        return 'bg-blue-900 text-blue-300 border-blue-700';
      case 'Delivered':
        return 'bg-green-900 text-green-300 border-green-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">Order #{order.id}</CardTitle>
                    <p className="text-gray-400">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                    {order.trackingNumber && (
                      <p className="text-gray-400 text-sm mt-1">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <span className="text-white font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Total */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-xl font-bold text-white">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {orders.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No orders yet</h2>
            <p className="text-gray-400">Start shopping to see your orders here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
