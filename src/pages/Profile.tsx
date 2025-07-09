
import { useState } from 'react';
import { User, Package, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const recentOrders = [
    {
      id: '12345',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 2
    },
    {
      id: '12344',
      date: '2024-01-10',
      status: 'Processing',
      total: 89.99,
      items: 1
    },
    {
      id: '12343',
      date: '2024-01-05',
      status: 'Shipped',
      total: 159.99,
      items: 3
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-slate-700">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-slate-700">
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-slate-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-400 hover:bg-red-900/20"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="profile" className="text-gray-300 data-[state=active]:text-white">
                  Profile Information
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-gray-300 data-[state=active]:text-white">
                  Recent Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white">
                  Account Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Profile Information</CardTitle>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                          disabled={!isEditing}
                          className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                          disabled={!isEditing}
                          className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        defaultValue={user?.email}
                        disabled={!isEditing}
                        className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                      <Input
                        id="phone"
                        defaultValue="+1 (555) 123-4567"
                        disabled={!isEditing}
                        className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-gray-300">Address</Label>
                      <Input
                        id="address"
                        defaultValue="123 Main St, New York, NY 10001"
                        disabled={!isEditing}
                        className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                      />
                    </div>
                    {isEditing && (
                      <div className="flex space-x-4">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                          <div>
                            <p className="text-white font-semibold">Order #{order.id}</p>
                            <p className="text-gray-400 text-sm">{order.date} • {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">${order.total}</p>
                            <span className={`text-sm px-2 py-1 rounded ${
                              order.status === 'Delivered' 
                                ? 'bg-green-900 text-green-300'
                                : order.status === 'Processing'
                                ? 'bg-yellow-900 text-yellow-300'
                                : 'bg-blue-900 text-blue-300'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-4">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Order updates</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Promotions and offers</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Newsletter</span>
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-4">Password</h3>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        Change Password
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-4">Account</h3>
                      <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
