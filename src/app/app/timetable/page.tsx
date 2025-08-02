"use client";
import { useTimetable } from "@/hooks/query";
import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full ">
      <DayChange />
      <Data />
    </div>
  );
};

export default Page;

const DayChange = () => {
  return <div></div>;
};

const Data = () => {
  const data = useTimetable().data;
  if (!data) return <div>No Data</div>;
  return <div>{JSON.stringify(data)}</div>;
};
