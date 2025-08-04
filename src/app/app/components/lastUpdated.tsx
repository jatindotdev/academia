"use client";
import React from "react";
import { RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  useAttendance,
  useCalendar,
  useCourse,
  useMarks,
  useTimetable,
  useUserInfo,
} from "@/hooks/query";
import { Loader } from "./loader";
import { getTime } from "@/utils/getLastUpdated";

type ItemType =
  | "timetable"
  | "attendance"
  | "marks"
  | "calendar"
  | "course"
  | "profile";
const LastUpdated = () => {
  const pathArr = usePathname().split("/");
  const path = pathArr[pathArr.length - 1] as string;

  const item = {
    timetable: useTimetable(),
    attendance: useAttendance(),
    marks: useMarks(),
    course: useCourse(),
    calendar: useCalendar(),
    profile: useUserInfo(),
  };

  const query = item[path as ItemType];
  const date = Date.now();
  const lastUpdated = !query.isLoading
    ? getTime(date - query.dataUpdatedAt)
    : 0;

  return (
    <div className="w-full min-h-10 border-b border-slate-400/10 flex px-4 items-center justify-between ">
      {query.isRefetching ? (
        <h1 className="text-white/50">Fetching</h1>
      ) : (
        <h1 className="text-white/50">Last updated {lastUpdated} ago </h1>
      )}
      <span className="cursor-pointer ">
        {query.isRefetching ? (
          <Loader className="w-4 h-4" />
        ) : (
          <RotateCcw onClick={() => query.refetch()} className="w-4 h-4 " />
        )}
      </span>
    </div>
  );
};

export default LastUpdated;
