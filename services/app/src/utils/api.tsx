import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import superjson from 'superjson';

// TODO: Use module import like `import { AppRouter } from '@trpc-api'` when the monorepo is set up correctly.
import type { AppRouter } from '../../../trpc-api/src/index';

// TODO: Specify this dynamically
const TRPC_BASE_URL: string =
  'https://fudfcik3k7.execute-api.eu-central-1.amazonaws.com/dev/trpc';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ...
    },
  },
});

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
        colorMode: 'ansi',
      }),
      httpBatchLink({
        transformer: superjson,
        url: TRPC_BASE_URL,
        headers() {
          const headers = new Map<string, string>();
          // headers.set("x-trpc-source", "expo-react");

          // TODO: Attach cookies with auth later
          //   const cookies = authClient.getCookie();
          //   if (cookies) {
          //     headers.set("Cookie", cookies);
          //   }

          return headers;
        },
      }),
    ],
  }),
  queryClient,
});

// TODO: Use module import like `import { AppRouter } from '@trpc-api'` when the monorepo is set up correctly.
export { type RouterInputs, type RouterOutputs } from '../../../trpc-api/src';
