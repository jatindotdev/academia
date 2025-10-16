"use client";
import { useUserInfo } from "@/hooks/query";
import { useScreen, useSidebar } from "@/hooks/zustand";
import { SidebarToggle } from "@/utils/sidebarToggle";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { Github, LogOut, PanelRightOpen, ShieldAlert } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DiNpm } from "react-icons/di";
import Loading from "../loading";
import LastUpdated from "./lastUpdated";
import Sidebar from "./sidebar";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const myDivRef = useRef(null);
  const { isMobile } = useScreen();
  const { isOpen } = useSidebar();

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

  if (typeof window === "undefined") return <Loading />;

  const localStoragePersister = createAsyncStoragePersister({
    storage: window.localStorage,
  });
  persistQueryClient({
    persister: localStoragePersister,
    queryClient,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    buster: "v1.0.2",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-dvw h-dvh p-2 gap-2 overflow-hidden">
        <div
          ref={isOpen && isMobile ? myDivRef : null}
          className={`${
            isMobile
              ? `z-10 fixed inset-y-2 bg-white/5 backdrop-blur-xl rounded-lg  min-w-64 transform-gpu transition-transform duration-300 ${
                  isOpen ? "translate-x-0 " : "-translate-x-96"
                } `
              : "min-w-76"
          } `}
        >
          <Sidebar />
        </div>
        <div className="flex-1 bg-black/30 rounded-lg apply-border-md flex flex-col w-full h-full ">
          <MenuBar />
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

const MenuBar = () => {
  const isMobile = useScreen().isMobile;
  const path = usePathname().split("/");
  const router = useRouter();

  return (
    <div className="min-h-14 px-4 justify-between items-center flex text-lg  border-b border-slate-400/10">
      <span className="flex items-center gap-4">
        {isMobile && (
          <span onClick={SidebarToggle}>
            <PanelRightOpen className="w-5 h-5 cursor-pointer" />
          </span>
        )}
        <span className="capitalize">{path[path.length - 1]}</span>
      </span>
      <ProfileIcon />
    </div>
  );
};

const ProfileIcon = () => {
  const [toggle, setToggle] = useState(false);
  const { data } = useUserInfo();
  const iconRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toggle) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropRef.current &&
        !dropRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div
      ref={iconRef}
      className={`relative w-10 h-10 shadow-2xl flex items-center justify-center font-semibold apply-border-md background-rounded cursor-pointer ${
        !toggle && "apply-hover-scale"
      }`}
      onClick={() => setToggle((prev) => !prev)}
    >
      {data?.name
        ?.split(" ")
        .map((i) => i[0])
        .join("")
        .slice(0, 2)}
      {toggle && (
        <ProfileDrop dropRef={dropRef as React.RefObject<HTMLDivElement>} />
      )}
    </div>
  );
};

const ProfileDrop = ({
  dropRef,
}: {
  dropRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={dropRef}
      className="absolute top-14 right-0 w-48  bg-white/5 backdrop-blur-lg rounded-lg border border-white/5 z-50 flex flex-col shadow-2xl overflow-hidden "
    >
      <a
        href="https://github.com/jatindotdev"
        className="w-full px-4 py-3 flex justify-between items-center font-medium hover:bg-white/10 transition-colors focus:outline-none border-b border-white/5"
      >
        <span>AcademiaX (patched)</span>
      </a>

      <a
        href="https://github.com/jackwaghan/AcademiaX"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-4 py-3 flex justify-between items-center font-medium hover:bg-white/10 transition-colors focus:outline-none border-b border-white/5"
        onClick={(e) => {
          if (window.matchMedia("(display-mode: standalone)").matches) {
            e.preventDefault();
            window.open(
              "https://github.com/jackwaghan/AcademiaX",
              "_blank",
              "noopener,noreferrer"
            );
          }
        }}
      >
        <span>GitHub</span>
        <span>
          <Github className="w-5 h-5" />
        </span>
      </a>
      <a
        href="https://www.npmjs.com/package/srm-academia-api"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-4 py-3 flex justify-between items-center font-medium hover:bg-white/10 transition-colors focus:outline-none border-b border-white/5"
        onClick={(e) => {
          if (window.matchMedia("(display-mode: standalone)").matches) {
            e.preventDefault();
            window.open(
              "https://www.npmjs.com/package/srm-academia-api",
              "_blank",
              "noopener,noreferrer"
            );
          }
        }}
      >
        <span>Npm Package</span>
        <span>
          <DiNpm className="w-6 h-6" />
        </span>
      </a>
      <a
        href="https://chat.whatsapp.com/B6a15jYEKgI1UD7QzX39cM"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-4 py-3 flex justify-between items-center font-medium hover:bg-white/10 transition-colors focus:outline-none border-b border-white/5"
        onClick={(e) => {
          e.preventDefault();
          window.open(
            "https://chat.whatsapp.com/B6a15jYEKgI1UD7QzX39cM",
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        <span>Need Help</span>
        <span>
          <ShieldAlert className="w-5 h-5" />
        </span>
      </a>
      <a
        href="/auth/logout"
        className="w-full px-4 py-3 flex justify-between items-center font-medium text-red-400 hover:bg-white/10 transition-colors focus:outline-none"
      >
        <span>Log Out</span>
        <span>
          <LogOut className="w-5 h-5" />
        </span>
      </a>
    </div>
  );
};
