import {
  attendance,
  Calendar,
  Course,
  marks,
  timetable,
  userInfo,
} from "@/server/action";
import { useQuery } from "@tanstack/react-query";
import {
  DaySchedule,
  AttendanceDetail,
  MarkDetail,
  UserInfo,
  CourseDetail,
  Month,
} from "srm-academia-api";
import { getCookie } from "@/utils/getCookieClient";

export function useTimetable() {
  return useQuery({
    queryKey: ["timetable"],
    queryFn: async () => {
      const { data } = await timetable(await getCookie());
      if (data.error) throw new Error(data.error);
      return data.timetable as DaySchedule[];
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useAttendance() {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data } = await attendance(await getCookie());
      if (data.error) throw new Error(data.error);
      return data.attendance as AttendanceDetail[];
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useMarks() {
  return useQuery({
    queryKey: ["marks"],
    queryFn: async () => {
      const { data } = await marks(await getCookie());
      if (data.error) throw new Error(data.error);
      return data.markList as MarkDetail[];
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await userInfo(await getCookie());
      if (data.error) throw new Error(data.error);
      return data.userInfo as UserInfo;
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useCourse() {
  return useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await Course(await getCookie());
      if (data.error) throw new Error(data.error);
      return data.courseList as CourseDetail[];
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useCalendar() {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: async () => {
      const { data } = await Calendar(await getCookie());
      if (data.error) throw new Error(data.error);
      return data.calendar as Month[];
    },
    staleTime: 1000 * 60 * 60,
  });
}
