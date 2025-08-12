import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from '@/navigation';
import { trpc, trpcClient } from '@/utils/trpc';

const queryClient = new QueryClient();

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
