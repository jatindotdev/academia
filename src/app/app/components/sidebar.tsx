import { useUserInfo } from "@/hooks/query";
import { SidebarToggle } from "@/utils/sidebarToggle";
import Link from "next/link";
import React from "react";
import { GlobalLoader } from "./loader";
import { X } from "lucide-react";
import { useScreen } from "@/hooks/zustand";
type MenuType = {
  name: string;
  url: string;
}[];
const Sidebar = () => {
  return (
    <div className="relative h-full w-full flex flex-col rounded-lg bg-black/30 apply-border-md shadow">
      <Header />
      <Menu />
      <Footer />
      {/* <div className="absolute inset-0 bg-blue-500/30 blur-3xl -z-50"></div> */}
    </div>
  );
};

export default Sidebar;

const Header = () => {
  return (
    <div
      className={`flex px-4 w-full min-h-12 items-center  border-b border-white/5 ${
        useScreen().isMobile ? "justify-between" : "justify-center"
      }`}
    >
      <h1 className="text-lg tracking-wide">AcademiaX</h1>
      {useScreen().isMobile && (
        <div className="bg-white/5 rounded p-1 backdrop-blur-xs apply-border-sm hover:scale-95">
          <X onClick={SidebarToggle} className="w-5 h-5 cursor-pointer " />
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  const item: MenuType = [
    { name: "timetable", url: "/app/timetable" },
    { name: "attendance", url: "/app/attendance" },
    { name: "marks", url: "/app/marks" },
    { name: "course", url: "/app/course" },
    { name: "calendar", url: "/app/calendar" },
    { name: "profile", url: "/app/profile" },
  ];

  return (
    <div className="px-3 py-3  flex-1 flex-col overflow-y-auto space-y-2 ">
      {item.map((i) => {
        return (
          <Link
            key={i.name}
            href={i.url}
            onClick={SidebarToggle}
            className="flex gap-3 justify-between px-4 py-1.5 rounded-md capitalize apply-border-sm bg-[#16171b] "
          >
            <h1>{i.name}</h1>
            <span>Icon</span>
          </Link>
        );
      })}
    </div>
  );
};

const Footer = () => {
  const { data, isPending } = useUserInfo();

  return (
    <div className="min-h-25 flex border-t border-white/5 w-full gap-4 items-center justify-center px-6 ">
      {!isPending ? (
        <div className="flex items-center justify-center gap-4 ">
          <div className="w-10 h-10 flex items-center font-semibold apply-border-md background-rounded">
            {data?.name
              .split(" ")
              .map((i) => i[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="flex flex-col gap-2 w-full items-end ">
            <h1>{data?.name}</h1>
            <h1 className="text-white/60">{data?.regNumber}</h1>
          </div>
        </div>
      ) : (
        <GlobalLoader className="h-5 w-5" />
      )}
    </div>
  );
};
