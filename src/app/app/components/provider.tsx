"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Sidebar from "./sidebar";
import LastUpdated from "./lastUpdated";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: false,
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  if (typeof window !== "undefined") {
    const localStoragePersister = createAsyncStoragePersister({
      storage: window.localStorage,
    });
    persistQueryClient({
      persister: localStoragePersister,
      queryClient,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      buster: "v2.0.0",
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-dvw h-dvh p-2 gap-2 ">
        <div className="w-76 ">
          <Sidebar />
        </div>
        <div className=" flex-1 bg-black/30 rounded-lg apply-border-md flex flex-col ">
          <LastUpdated />
          <div className=" p-4 overflow-y-auto ">{children}</div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default QueryProvider;
