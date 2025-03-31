import React, { createContext, useContext, useState } from 'react';

type FridgeItem = {
  id: number;
  name: string;
};

type FridgeContextType = {
  fridgeItems: FridgeItem[];
  pendingItems: FridgeItem[];
  addPendingItems: (items: Omit<FridgeItem, 'id'>[]) => void;
  acceptItem: (id: number) => void;
  rejectItem: (id: number) => void;
};

const FridgeContext = createContext<FridgeContextType | undefined>(undefined);

let nextId = 1;

export const FridgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [pendingItems, setPendingItems] = useState<FridgeItem[]>([]);

  const addPendingItems = (items: Omit<FridgeItem, 'id'>[]) => {
    const withId = items.map((item) => ({ ...item, id: nextId++ }));
    setPendingItems((prev) => [...prev, ...withId]);
  };

  const acceptItem = (id: number) => {
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
    const accepted = pendingItems.find((item) => item.id === id);
    if (accepted) setFridgeItems((prev) => [...prev, accepted]);
  };

  const rejectItem = (id: number) => {
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FridgeContext.Provider
      value={{
        fridgeItems,
        pendingItems,
        addPendingItems,
        acceptItem,
        rejectItem,
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
