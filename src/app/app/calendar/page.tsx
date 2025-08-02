"use client";
import { useCalendar } from "@/hooks/query";
import React from "react";

const Page = () => {
  const data = useCalendar().data;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
