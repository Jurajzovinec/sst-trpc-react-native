import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

// Type definition that matches your backend router
// This should be replaced with the actual imported type from your backend
type AppRouter = any; // Temporary - replace with actual router type

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'https://your-api-endpoint.com/trpc', // Replace with your actual API endpoint
    }),
  ],
});