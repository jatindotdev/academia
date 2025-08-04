import {
  useAttendance,
  useCalendar,
  useCourse,
  useMarks,
  useTimetable,
  useUserInfo,
} from "@/hooks/query";
import { SidebarToggle } from "@/utils/sidebarToggle";
import Link from "next/link";
import React from "react";
import { Loader } from "./loader";
import {
  BookCopy,
  BookOpenText,
  Calendar1,
  CalendarClock,
  CircleCheck,
  CircleUserRound,
  CircleX,
  Hourglass,
  X,
} from "lucide-react";
import { useScreen } from "@/hooks/zustand";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Icon from "@/../public/favicon.svg";

type MenuType = {
  name: string;
  url: string;
  icon: React.JSX.Element;
}[];
const Sidebar = () => {
  return (
    <div className="relative h-full w-full flex flex-col rounded-lg bg-black/30 apply-border-md shadow ">
      <Header />
      <Menu />
      <Status />
      {/* <Footer /> / */}
      {/* <div className="absolute inset-0 bg-blue-500/30 blur-3xl -z-50"></div> */}
    </div>
  );
};

export default Sidebar;

const Header = () => {
  return (
    <div
      className={`flex px-4 w-full min-h-12 items-center  border-b border-white/5 gap-4 ${
        useScreen().isMobile ? "justify-between" : "justify-center"
      }`}
    >
      <div className="flex gap-4 items-center justify-center">
        <Image src={Icon} width={25} height={25} alt="icon" />
        <h1 className="text-lg tracking-wide">
          AcademiaX <span className="text-white/50 text-sm ">v2</span>
        </h1>
      </div>
      {useScreen().isMobile && (
        <div className="bg-white/5 rounded p-1 backdrop-blur-xs apply-border-sm hover:scale-95">
          <X onClick={SidebarToggle} className="w-5 h-5 cursor-pointer " />
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  const path = usePathname();
  const item: MenuType = [
    {
      name: "timetable",
      url: "/app/timetable",
      icon: <Hourglass className="w-5 h-5" />,
    },
    {
      name: "attendance",
      url: "/app/attendance",
      icon: <CalendarClock className="w-5 h-5" />,
    },
    {
      name: "marks",
      url: "/app/marks",
      icon: <BookOpenText className="w-5 h-5 " />,
    },
    {
      name: "course",
      url: "/app/course",
      icon: <BookCopy className="w-5 h-5" />,
    },
    {
      name: "calendar",
      url: "/app/calendar",
      icon: <Calendar1 className="w-5 h-5" />,
    },
    {
      name: "profile",
      url: "/app/profile",
      icon: <CircleUserRound className="w-5 h-5" />,
    },
  ];

  return (
    <div className="px-3 py-3 flex-1 flex-col overflow-y-auto space-y-2 ">
      {item.map((i) => {
        return (
          <Link
            key={i.name}
            href={i.url}
            onClick={SidebarToggle}
            prefetch={false}
            className={`flex gap-3 justify-between px-4 py-2 capitalize ${
              i.url === path
                ? "apply-border-sm bg-white/5  rounded-lg text-blue-400"
                : "text-white/50"
            } `}
          >
            <h1>{i.name}</h1>
            <span>{i.icon}</span>
          </Link>
        );
      })}
    </div>
  );
};

const Status = () => {
  const item = [
    { name: "timetable", query: useTimetable() },
    { name: "attendance", query: useAttendance() },
    { name: "marks", query: useMarks() },
    { name: "course", query: useCourse() },
    { name: "calendar", query: useCalendar() },
    { name: "profile", query: useUserInfo() },
  ];
  return (
    <div className="min-h-50 w-full p-3">
      <div className=" bg-white/5  apply-border-md rounded-lg flex flex-col gap-4 px-1 py-2 text-white/60 ">
        <h1 className="w-full text-center p-2  border-b border-white/5">
          Status
        </h1>
        {item.map((item, i) => {
          return (
            <div
              key={i}
              className="w-full flex px-3 items-center justify-between"
            >
              <h1 className="capitalize ">{item.name}</h1>
              <span>
                {item.query.isPending || item.query.isRefetching ? (
                  <div>
                    <Loader className="w-5 h-5" />
                  </div>
                ) : item.query.isError ? (
                  <div>
                    <CircleX className="w-5 h-5 text-red-400" />
                  </div>
                ) : (
                  <div>
                    <CircleCheck className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
