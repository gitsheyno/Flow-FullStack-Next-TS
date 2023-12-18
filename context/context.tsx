"use client";

import React, { createContext, useState } from "react";

// Define the shape of your data
interface DataItem {
  name: string;
  type: string;
}

interface StoreContextProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

const initialData: DataItem[] = [
  { name: "Excel Reader", type: "Source" },
  { name: "Column Filter", type: "Manipulator" },
  { name: "Excel Writer", type: "Predictor" },
];

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
