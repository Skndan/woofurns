'use client';
import React, { Suspense } from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import ProgressBarProvider from '@/providers/progress-bar-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { Loader } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth-provider';
export default function Providers({
  // session,
  children
}: {
  // session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {

  const Loading = () => (
    <div className="grid h-screen place-items-center">
      <Loader className="animate-spin h-5 w-5 mr-3" />
    </div>
  )

  const queryClient = new QueryClient()
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <ProgressBarProvider>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<Loading />}>
                <ToastProvider />
                {children}
              </Suspense>
            </QueryClientProvider>
          </ProgressBarProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
