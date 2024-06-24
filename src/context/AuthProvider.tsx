"use client";
import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

type AuthContextValue = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { push } = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const authContextValue: AuthContextValue = {
    isAuthenticated: isConnected,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
