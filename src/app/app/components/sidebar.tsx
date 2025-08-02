import { useScreen } from "@/hooks/zustand";
import { SidebarToggle } from "@/utils/sidebarToggle";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
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
    <div className="flex px-4 w-full min-h-12 items-center justify-center border-b border-white/5">
      <h1 className="text-lg tracking-wide">AcademiaX</h1>
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
  return (
    <div className="min-h-12 flex items-center justify-center border-t border-white/5">
      Footer
    </div>
  );
};
