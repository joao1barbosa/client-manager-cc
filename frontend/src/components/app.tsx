'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { RefetchProvider } from "@/contexts/refetch-context";
import { Suspense } from 'react';

export function App({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RefetchProvider>
        <Suspense>
          <ThemeToggleButton/>
          <main className="board flex flex-col space-y-4">
              {children}
          </main>
        </Suspense>
      </RefetchProvider>
    </QueryClientProvider>
  );
}