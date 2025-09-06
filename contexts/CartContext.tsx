import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface Purchase {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface CartContextType {
  cartItems: CartItem[];
  purchases: Purchase[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: '1',
      items: [
        {
          productId: '1',
          title: 'Vintage Leather Jacket',
          price: 89.99,
          image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
          category: 'Fashion',
          quantity: 1
        }
      ],
      total: 89.99,
      date: '2024-01-10',
      status: 'completed'
    }
  ]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    if (cartItems.length === 0) return;

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      items: [...cartItems],
      total: getTotalPrice(),
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    setPurchases(prev => [newPurchase, ...prev]);
    clearCart();
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      purchases,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkout,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}