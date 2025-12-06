import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";
import { trpc } from "@/lib/trpc";
import { httpBatchLink } from "@trpc/client";

// Create a new QueryClient for each test
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

// Create a test trpc client
export function createTestTRPCClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
      }),
    ],
  });
}

interface AllTheProvidersProps {
  children: ReactNode;
}

// Wrapper with all providers
export function AllTheProviders({ children }: AllTheProvidersProps) {
  const queryClient = createTestQueryClient();
  const trpcClient = createTestTRPCClient();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

// Custom render function
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from testing-library
export * from "@testing-library/react";
export { renderWithProviders as render };
