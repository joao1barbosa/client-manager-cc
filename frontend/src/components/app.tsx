'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeToggleButton } from '@/components/ui/themeToggleButton';

export function App({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <ThemeToggleButton/>
        <main className="board flex flex-col space-y-4">
            {children}
        </main>
    </QueryClientProvider>
  );
}