import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number, color: string, size: string) => void;
  updateQuantity: (id: number, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Premium Cotton Vest — White',
      price: 34,
      image: 'https://images.unsplash.com/photo-1608568516718-ff5318b81464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      color: 'White',
      size: 'M',
      quantity: 2,
    },
    {
      id: 7,
      name: 'Silk Camisole — Ivory',
      price: 59,
      image: 'https://images.unsplash.com/photo-1629745572658-598ae487d4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      color: 'Ivory',
      size: 'S',
      quantity: 1,
    },
  ]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.color === newItem.color && i.size === newItem.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.color === newItem.color && i.size === newItem.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: number, color: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.color === color && i.size === size)));
  };

  const updateQuantity = (id: number, color: string, size: string, quantity: number) => {
    if (quantity < 1) return removeItem(id, color, size);
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.color === color && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
