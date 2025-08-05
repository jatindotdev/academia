"use client";
import React from "react";
import { RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader } from "./loader";
import { getTime } from "@/utils/getLastUpdated";
import {
  useAttendance,
  useCalendar,
  useCourse,
  useMarks,
  useTimetable,
  useUserInfo,
} from "@/hooks/query";

type ItemType =
  | "timetable"
  | "attendance"
  | "marks"
  | "calendar"
  | "course"
  | "profile";

const TimetableLastUpdated = () => {
  const query = useTimetable();
  return <LastUpdatedContent query={query} />;
};

const AttendanceLastUpdated = () => {
  const query = useAttendance();
  return <LastUpdatedContent query={query} />;
};

const MarksLastUpdated = () => {
  const query = useMarks();
  return <LastUpdatedContent query={query} />;
};

const CourseLastUpdated = () => {
  const query = useCourse();
  return <LastUpdatedContent query={query} />;
};

const CalendarLastUpdated = () => {
  const query = useCalendar();
  return <LastUpdatedContent query={query} />;
};

const ProfileLastUpdated = () => {
  const query = useUserInfo();
  return <LastUpdatedContent query={query} />;
};

// Shared content component
const LastUpdatedContent = ({
  query,
}: {
  query: UseQueryResult<unknown, Error>;
}) => {
  const date = Date.now();

  const lastUpdated =
    !query.isLoading && query.dataUpdatedAt > 0
      ? getTime(date - query.dataUpdatedAt)
      : null;

  return (
    <div className="w-full min-h-10 border-b border-slate-400/10 flex px-4 items-center justify-between ">
      {query.isRefetching ? (
        <h1 className="text-white/50">Fetching</h1>
      ) : query.isLoading ? (
        <h1 className="text-white/50">Loading...</h1>
      ) : lastUpdated ? (
        <h1 className="text-white/50">Last updated {lastUpdated} ago </h1>
      ) : (
        <h1 className="text-white/50">No data available</h1>
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

const LastUpdated = () => {
  const pathArr = usePathname().split("/");
  const path = pathArr[pathArr.length - 1] as ItemType;

  switch (path) {
    case "timetable":
      return <TimetableLastUpdated />;
    case "attendance":
      return <AttendanceLastUpdated />;
    case "marks":
      return <MarksLastUpdated />;
    case "course":
      return <CourseLastUpdated />;
    case "calendar":
      return <CalendarLastUpdated />;
    case "profile":
      return <ProfileLastUpdated />;
    default:
      return <TimetableLastUpdated />; // fallback
  }
};

export default LastUpdated;
