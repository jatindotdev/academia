import React from "react";
import Sidebar from "./components/sidebar";
import LastUpdated from "./components/lastUpdated";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-dvw h-dvh p-2 gap-2 ">
      <div className="w-76 ">
        <Sidebar />
      </div>
      <div className=" flex-1 bg-black/30 rounded-lg apply-border-md">
        <LastUpdated />
        <div className=" p-4 ">{children}</div>
      </div>
    </div>
  );
}
