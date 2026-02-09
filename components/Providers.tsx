"use client"; // This is the magic line

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import NavigationTracker from "@/lib/NavigationTracker";
import AuthGate from "@/lib/AuthGate";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <NavigationTracker />
        <AuthGate>
          {children}
        </AuthGate>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}