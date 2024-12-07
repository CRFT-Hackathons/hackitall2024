"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "~/components/theme";
import { Toaster } from "~/components/ui/toaster";

import { cn } from "~/lib/utils";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
          <Toaster />
        </ThemeProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
