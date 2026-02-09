"use client";

import { createContext, useContext } from "react";

type AuthError =
  | { type: "user_not_registered" }
  | { type: "auth_required" };

type AuthContextType = {
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: AuthError | null;
  navigateToLogin: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoadingAuth: false,
  isLoadingPublicSettings: false,
  authError: null,
  navigateToLogin: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        isLoadingAuth: false,
        isLoadingPublicSettings: false,
        authError: null,
        navigateToLogin: () => {
          window.location.href = "/login";
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
