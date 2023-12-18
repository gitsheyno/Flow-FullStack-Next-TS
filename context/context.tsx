"use client";

import React, { createContext, useState } from "react";

// Define the shape of your data
interface DataItem {
  name: string;
  type: string;
}

// Define the shape of the context value
interface StoreContextProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

// Initial data to populate the context
const initialData: DataItem[] = [
  { name: "Excel Reader", type: "Source" },
  { name: "Column Filter", type: "Manipulator" },
  { name: "Excel Writer", type: "Predictor" },
];

// Create a context for managing the data
export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined
);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataItem[]>(initialData);

  return (
    <StoreContext.Provider value={{ data, setData }}>
      {children}
    </StoreContext.Provider>
  );
}
