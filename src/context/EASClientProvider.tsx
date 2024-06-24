"use client";

import React, { createContext, useContext, useState } from "react";

type EASClientContextValue = null;

const EASClientContext = createContext<EASClientContextValue | undefined>(
  undefined
);

interface EASClientProviderProps {
  children: React.ReactNode;
}

export const EASClientProvider = ({ children }: EASClientProviderProps) => {
  const [easClient, setEASClient] = useState<EASClientContextValue>(null);

  return (
    <EASClientContext.Provider value={easClient}>
      {children}
    </EASClientContext.Provider>
  );
};

export const useEASClient = (): EASClientContextValue => {
  const context = useContext(EASClientContext);
  if (typeof context === "undefined") {
    throw new Error("useEASClient must be used within a EASClientProvider");
  }
  return context;
};

export default EASClientProvider;
