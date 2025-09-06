import React from 'react';
import { CartProvider as CartContext } from './CartContext';

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  return <CartContext>{children}</CartContext>;
}