
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, Smartphone, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    toast({
      title: "Payment successful!",
      description: "Your order has been placed successfully. You will receive a confirmation email shortly.",
    });
    
    navigate('/orders');
  };

  const tax = totalPrice * 0.08;
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const total = totalPrice + tax + shipping;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-muted-foreground">First Name</Label>
                    <Input id="firstName" className="bg-background border-border text-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-muted-foreground">Last Name</Label>
                    <Input id="lastName" className="bg-background border-border text-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                  <Input id="email" type="email" className="bg-background border-border text-foreground" />
                </div>
                <div>
                  <Label htmlFor="address" className="text-muted-foreground">Address</Label>
                  <Input id="address" className="bg-background border-border text-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-muted-foreground">City</Label>
                    <Input id="city" className="bg-background border-border text-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-muted-foreground">State</Label>
                    <Input id="state" className="bg-background border-border text-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-muted-foreground">ZIP Code</Label>
                    <Input id="zip" className="bg-background border-border text-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                    <RadioGroupItem value="card" id="card" className="border-muted-foreground" />
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="card" className="text-foreground flex-1">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" className="border-muted-foreground" />
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="paypal" className="text-foreground flex-1">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                    <RadioGroupItem value="apple" id="apple" className="border-muted-foreground" />
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="apple" className="text-foreground flex-1">Apple Pay</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                    <RadioGroupItem value="google" id="google" className="border-muted-foreground" />
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="google" className="text-foreground flex-1">Google Pay</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber" className="text-muted-foreground">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        className="bg-background border-border text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-muted-foreground">Cardholder Name</Label>
                      <Input 
                        id="cardName" 
                        placeholder="John Doe"
                        className="bg-background border-border text-foreground" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-muted-foreground">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          className="bg-background border-border text-foreground" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-muted-foreground">CVC</Label>
                        <Input 
                          id="cvc" 
                          placeholder="123"
                          className="bg-background border-border text-foreground" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground text-sm">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}

                {(paymentMethod === 'apple' || paymentMethod === 'google') && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground text-sm">
                      Use your {paymentMethod === 'apple' ? 'Touch ID or Face ID' : 'fingerprint or PIN'} to complete the payment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle className="text-card-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-foreground text-sm">{item.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.size} | {item.color} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-border" />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-500" : ""}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-xl font-bold text-foreground">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-green-500 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>

                {/* Place Order Button */}
                <form onSubmit={handleSubmit}>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : `Place Order - $${total.toFixed(2)}`}
                  </Button>
                </form>

                {/* Payment Methods Display */}
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-6" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
