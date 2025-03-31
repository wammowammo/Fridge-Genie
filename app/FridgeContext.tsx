import React, { createContext, useContext, useState } from 'react';

type FridgeItem = {
  id: number;
  name: string;
  dateScanned: Date;
};

type FridgeContextType = {
  fridgeItems: FridgeItem[];
  pendingItems: Omit<FridgeItem, 'dateScanned'>[];
  addPendingItems: (items: Omit<FridgeItem, 'id' | 'dateScanned'>[]) => void;
  acceptItem: (id: number) => void;
  rejectItem: (id: number) => void;
  addToFridge: (name: string) => void;
  removeItem: (id: number) => void;
};

const FridgeContext = createContext<FridgeContextType | undefined>(undefined);

let nextId = 1;

export const FridgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [pendingItems, setPendingItems] = useState<Omit<FridgeItem, 'dateScanned'>[]>([]);

  const addPendingItems = (items: Omit<FridgeItem, 'id' | 'dateScanned'>[]) => {
    const withId = items.map((item) => ({ ...item, id: nextId++ }));
    setPendingItems((prev) => [...prev, ...withId]);
  };

  const acceptItem = (id: number) => {
    const accepted = pendingItems.find((item) => item.id === id);
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
    if (accepted) {
      const withDate: FridgeItem = { ...accepted, dateScanned: new Date() };
      setFridgeItems((prev) => [...prev, withDate]);
    }
  };

  const rejectItem = (id: number) => {
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToFridge = (name: string) => {
    const newItem: FridgeItem = { id: nextId++, name, dateScanned: new Date() };
    setFridgeItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: number) => {
    setFridgeItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FridgeContext.Provider
      value={{
        fridgeItems,
        pendingItems,
        addPendingItems,
        acceptItem,
        rejectItem,
        addToFridge,
        removeItem,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};

export const useFridge = () => {
  const context = useContext(FridgeContext);
  if (!context) throw new Error('useFridge must be used within FridgeProvider');
  return context;
};
