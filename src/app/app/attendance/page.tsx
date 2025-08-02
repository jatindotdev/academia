"use client";
import { useAttendance } from "@/hooks/query";
import React from "react";

const Page = () => {
  const data = useAttendance().data;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
