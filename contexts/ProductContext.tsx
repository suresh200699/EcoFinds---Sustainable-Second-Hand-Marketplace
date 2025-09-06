import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
  sellerName: string;
  datePosted: string;
  status: 'available' | 'sold' | 'pending';
}

interface ProductContextType {
  products: Product[];
  myListings: Product[];
  addProduct: (product: Omit<Product, 'id' | 'datePosted'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  searchProducts: (query: string, category?: string) => Product[];
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      description: 'Beautiful vintage leather jacket in excellent condition. Perfect for casual outings and has a timeless style.',
      price: 89.99,
      category: 'Fashion',
      image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
      sellerId: '2',
      sellerName: 'FashionLover',
      datePosted: '2024-01-15',
      status: 'available'
    },
    {
      id: '2',
      title: 'MacBook Air 2020',
      description: 'Gently used MacBook Air 2020 with M1 chip. Great for students and professionals.',
      price: 799.99,
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      sellerId: '3',
      sellerName: 'TechGuru',
      datePosted: '2024-01-14',
      status: 'available'
    },
    {
      id: '3',
      title: 'Wooden Coffee Table',
      description: 'Solid oak coffee table with unique grain pattern. Minor wear adds character.',
      price: 150.00,
      category: 'Furniture',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      sellerId: '4',
      sellerName: 'HomeDesigner',
      datePosted: '2024-01-13',
      status: 'available'
    },
    {
      id: '4',
      title: 'Nike Running Shoes',
      description: 'Lightly worn Nike running shoes, size 9. Great for jogging and casual wear.',
      price: 45.99,
      category: 'Fashion',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      sellerId: '5',
      sellerName: 'RunnerLife',
      datePosted: '2024-01-12',
      status: 'available'
    },
    {
      id: '5',
      title: 'Guitar Acoustic',
      description: 'Beautiful acoustic guitar in great condition. Perfect for beginners or professionals.',
      price: 250.00,
      category: 'Music',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      sellerId: '6',
      sellerName: 'MusicMaker',
      datePosted: '2024-01-11',
      status: 'available'
    },
  ]);

  const addProduct = (productData: Omit<Product, 'id' | 'datePosted'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      datePosted: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const searchProducts = (query: string, category?: string): Product[] => {
    return products.filter(product => {
      const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase()) ||
                          product.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || category === 'All' || product.category === category;
      return matchesQuery && matchesCategory && product.status === 'available';
    });
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  // Get current user's listings (mock user with id '1')
  const myListings = products.filter(product => product.sellerId === '1');

  return (
    <ProductContext.Provider value={{
      products,
      myListings,
      addProduct,
      updateProduct,
      deleteProduct,
      searchProducts,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}