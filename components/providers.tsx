"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const NextThemeProvider = dynamic(
    () => import("next-themes").then((mod) => mod.ThemeProvider),
    {
        ssr: false,
    }
);

const queryClient = new QueryClient();

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem

        >
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </NextThemeProvider>
    );
};
