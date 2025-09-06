import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ProductProvider } from '@/contexts/ProductContext';
import { CartProvider } from '@/contexts/CartProvider';

function RootLayoutContent() {
  useFrameworkReady();
  const { user } = useAuth();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="(auth)" />
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="add-product" />
            <Stack.Screen name="product/[id]" />
            <Stack.Screen name="edit-product/[id]" />
            <Stack.Screen name="purchases" />
          </>
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RootLayoutContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}