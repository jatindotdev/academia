"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import Sidebar from "./sidebar";
import LastUpdated from "./lastUpdated";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useScreen, useSidebar } from "@/hooks/zustand";
import { usePathname } from "next/navigation";
import { PanelRightOpen } from "lucide-react";
import { SidebarToggle } from "@/utils/sidebarToggle";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: false,
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const myDivRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        myDivRef.current &&
        event.target instanceof Node &&
        (myDivRef.current as HTMLElement).contains &&
        !(myDivRef.current as HTMLElement).contains(event.target)
      ) {
        SidebarToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myDivRef]);

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
  const { isMobile } = useScreen();
  const { isOpen } = useSidebar();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-dvw h-dvh p-2 gap-2 overflow-hidden">
        <div
          ref={isOpen && isMobile ? myDivRef : null}
          className={`${
            isMobile
              ? `z-10 fixed inset-y-2 bg-white/5 backdrop-blur-xl rounded-lg transform-gpu transition-transform duration-300 min-w-64 ${
                  isOpen ? "translate-x-0" : "-translate-x-96"
                } `
              : "min-w-76"
          } `}
        >
          <Sidebar />
        </div>
        <div className="flex-1 bg-black/30 rounded-lg apply-border-md flex flex-col w-full h-full ">
          <MobileMenuBar />
          <LastUpdated />
          <div className="p-3 overflow-y-auto h-full w-full overflow-x-clip ">
            {children}
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default QueryProvider;

const MobileMenuBar = () => {
  const path = usePathname().split("/");
  return (
    <div className="min-h-12 px-4 justify-between items-center flex text-lg  border-b border-slate-400/10">
      <span className="flex items-center gap-4">
        {useScreen().isMobile && (
          <span onClick={SidebarToggle}>
            <PanelRightOpen className="w-5 h-5 " />
          </span>
        )}
        <span className="capitalize">{path[path.length - 1]}</span>
      </span>
      <h1>Share</h1>
    </div>
  );
};
