import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import AppNavigator from '@/navigation';
import { queryClient } from '@/utils/api';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
